---
sidebar_position: 5
---

# Worker Architecture

The **Worker** is a standalone, headless NestJS application that runs background tasks, scheduled jobs, and queue-based processing independently of the main API server. It shares the same database, plugin ecosystem, and core packages as the API but is designed to run as a **separate process** — with no HTTP server and no inbound API traffic.

## Why a Separate Worker?

The Ever Gauzy platform follows a **process separation** pattern for background work:

| Concern       | API Server                             | Worker                                      |
| ------------- | -------------------------------------- | ------------------------------------------- |
| **Purpose**   | Serve HTTP requests, REST/GraphQL APIs | Execute scheduled jobs, process queues      |
| **Inbound**   | HTTP traffic from clients              | None — headless, no HTTP listener           |
| **Scaling**   | Horizontal (multiple replicas)         | Single instance per environment             |
| **Lifecycle** | Request-driven                         | Timer-driven (cron/interval) + queue-driven |

Running background work outside the API process provides several advantages:

- **Isolation** — long-running or CPU-intensive jobs do not block API request handling
- **Independent scaling** — the worker runs as a single replica while the API scales horizontally
- **Fault tolerance** — a crashing worker does not take down the API, and vice-versa
- **Queue reliability** — BullMQ + Redis provide at-least-once delivery guarantees with automatic retries

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Ever Gauzy Platform                          │
│                                                                      │
│  ┌──────────────┐       ┌──────────────┐       ┌──────────────────┐ │
│  │   API Server │       │    Worker    │       │    Web Frontend   │ │
│  │  (NestJS)    │       │  (NestJS)    │       │   (Angular)       │ │
│  │              │       │              │       │                    │ │
│  │ HTTP Server  │       │  No HTTP     │       │  Static Assets    │ │
│  │ REST/GraphQL │       │  Cron Jobs   │       │  SPA Bundle       │ │
│  └──────┬───────┘       │  BullMQ      │       └──────────────────┘ │
│         │               └──────┬───────┘                             │
│         │                      │                                     │
│         ▼                      ▼                                     │
│  ┌────────────┐         ┌────────────┐                               │
│  │ PostgreSQL  │◄───────│   Redis     │                               │
│  │ (Database)  │        │  (Queues)   │                               │
│  └────────────┘         └────────────┘                               │
└──────────────────────────────────────────────────────────────────────┘
```

The Worker connects to the **same PostgreSQL database** as the API, and both processes share a **Redis instance** that serves as the transport layer for BullMQ job queues.

## Application Bootstrap

The worker boots through `apps/worker/src/main.ts` and is fundamentally different from the API:

```typescript
// apps/worker/src/main.ts
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  loadEnv();
  const { registerPluginConfig } = await import("@gauzy/core");
  await registerPluginConfig({});

  const { AppModule } = await import("./app/app.module");

  // NOTE: createApplicationContext, NOT create()
  // This boots NestJS WITHOUT an HTTP server
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });

  Logger.log("Worker application started.", "WorkerBootstrap");
}
```

Key differences from the API bootstrap:

| Aspect                | API Server                    | Worker                                   |
| --------------------- | ----------------------------- | ---------------------------------------- |
| NestJS factory method | `NestFactory.create()`        | `NestFactory.createApplicationContext()` |
| HTTP listener         | Yes (Express, port 3000)      | **No** — headless process                |
| Routes/Controllers    | Full REST + GraphQL endpoints | **None** — no HTTP routing               |
| Swagger documentation | Available at `/swg`           | **N/A**                                  |
| Signal handling       | Framework-managed             | Manual `SIGINT`/`SIGTERM` handlers       |

The worker uses `createApplicationContext()` which instantiates the full NestJS dependency injection container, executes all lifecycle hooks (`OnModuleInit`, `OnApplicationBootstrap`), and starts all scheduled jobs and queue workers — but without binding to any network port.

### Environment Loading

Environment variables are loaded from `.env` and `.env.local` files using `dotenv` before the NestJS modules are initialized:

```typescript
// apps/worker/src/load-env.ts
export function loadEnv(): void {
  const cwd = process.cwd();
  loadEnvFile(path.resolve(cwd, ".env"));
  loadEnvFile(path.resolve(cwd, ".env.local"), { override: true });
}
```

Variables from `.env.local` take precedence over `.env`, which is the standard `dotenv` convention.

## Module Structure

The worker's `AppModule` is intentionally minimal, importing only what is needed for background task execution:

```typescript
// apps/worker/src/app/app.module.ts
@Module({
  imports: [
    DatabaseModule, // Shared database connection (same DB as API)
    TokenModule.forRoot({
      enableScheduler: WORKER_SCHEDULER_ENABLED,
    }),
    SchedulerModule.forRoot({
      // Core scheduling + queueing infrastructure
      enabled: WORKER_SCHEDULER_ENABLED,
      enableQueueing: WORKER_QUEUE_ENABLED,
      defaultQueueName: WORKER_DEFAULT_QUEUE,
      defaultTimezone: process.env.WORKER_TIMEZONE,
      defaultJobOptions: {
        preventOverlap: true, // No concurrent runs of the same job
        retries: 1, // Retry once on failure
        retryDelayMs: 5000, // Wait 5 seconds before retrying
      },
    }),
    WorkerJobsModule, // Feature module containing job definitions
  ],
})
export class AppModule {}
```

This means the worker has:

- ✅ Full database access (reads and writes to the same PostgreSQL/SQLite DB as the API)
- ✅ All registered plugins (inherited from `registerPluginConfig()`)
- ✅ Token management and refresh scheduling
- ✅ BullMQ queue processing (when Redis is available)
- ✅ Cron and interval-based job scheduling
- ❌ No HTTP server, no REST/GraphQL routes, no Swagger

## The Scheduler Package (`@gauzy/scheduler`)

The `@gauzy/scheduler` package is a **custom NestJS module** that provides a unified API for:

1. **Cron-based scheduling** (via `@nestjs/schedule` and the `cron` library)
2. **Interval-based scheduling** (via `setInterval`)
3. **BullMQ job queues** (via `@nestjs/bullmq` and `bullmq`)
4. **Automatic job discovery** (via NestJS `DiscoveryService` and custom decorators)

### Package Exports

The `@gauzy/scheduler` package exports the following public API:

```typescript
// Module
export { SchedulerModule } from "./scheduler.module";

// Decorators
export { ScheduledJob } from "./decorators/scheduled-job.decorator";
export { QueueWorker } from "./decorators/queue-worker.decorator";
export { QueueJobHandler } from "./decorators/queue-job-handler.decorator";

// Interfaces
export { ScheduledJobOptions } from "./interfaces/scheduled-job-options.interface";
export { SchedulerModuleOptions } from "./interfaces/scheduler-module-options.interface";
export { SchedulerFeatureOptions } from "./interfaces/scheduler-feature-options.interface";
export { DiscoveredScheduledJob } from "./interfaces/discovered-scheduled-job.interface";
export { SchedulerJobDescriptor } from "./interfaces/scheduler-job-descriptor.interface";
export { SchedulerQueueJobInput } from "./interfaces/scheduler-queue-job.interface";

// Base classes
export { QueueWorkerHost } from "./hosts/queue-worker.host";

// Services
export { SchedulerService } from "./services/scheduler.service";
export { SchedulerQueueService } from "./services/scheduler-queue.service";
```

### Module Initialization

The `SchedulerModule` follows NestJS conventions with `forRoot()` and `forFeature()` patterns:

#### `SchedulerModule.forRoot(options)`

Called **once** in the root `AppModule` to set up the global scheduling infrastructure:

```typescript
SchedulerModule.forRoot({
  enabled: true, // Master switch for the entire scheduler
  enableQueueing: true, // Enable BullMQ integration
  defaultQueueName: "worker-default", // Default queue for jobs without explicit queueName
  defaultTimezone: "UTC", // Timezone for cron expressions
  logRegisteredJobs: true, // Log each discovered job on startup
  defaultJobOptions: {
    enabled: true, // Jobs are enabled by default
    preventOverlap: true, // Skip if previous run still in progress
    retries: 1, // Number of retries on failure
    retryDelayMs: 5000, // Delay between retries
    timeoutMs: undefined, // No timeout by default
    maxRandomDelayMs: 0, // No jitter by default
  },
});
```

When `enableQueueing` is `true`, this registers:

- `ScheduleModule.forRoot()` from `@nestjs/schedule` (cron engine)
- `BullModule.forRoot()` from `@nestjs/bullmq` (Redis connection for queues)
- All internal scheduler services (discovery, registry, runner, queue service)

#### `SchedulerModule.forFeature(options)`

Called in **feature modules** to register job providers and additional queues:

```typescript
@Module({
  imports: [
    SchedulerModule.forFeature({
      jobProviders: [WorkerLifecycleJob, WorkerLifecycleProcessor],
      queues: ["worker-default"],
    }),
  ],
})
export class WorkerJobsModule {}
```

### Internal Service Architecture

The scheduler package has a layered internal architecture:

```
┌──────────────────────────────────────────────────────────────┐
│                     SchedulerModule                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              SchedulerDiscoveryService                   │ │
│  │                                                         │ │
│  │  OnModuleInit:                                          │ │
│  │    1. Scan all providers for @ScheduledJob metadata     │ │
│  │    2. Register each discovered job in the registry      │ │
│  │    3. Register cron jobs with SchedulerRegistry         │ │
│  │    4. Register interval jobs with setInterval           │ │
│  │                                                         │ │
│  │  OnApplicationBootstrap:                                │ │
│  │    - Execute all "runOnStart" jobs immediately          │ │
│  │                                                         │ │
│  │  OnApplicationShutdown:                                 │ │
│  │    - Clean up all registered cron jobs and intervals    │ │
│  └─────────────────────┬───────────────────────────────────┘ │
│                        │                                     │
│                        ▼                                     │
│  ┌──────────────────────────────────────────────────────┐    │
│  │           SchedulerJobRegistryService                │    │
│  │                                                      │    │
│  │  - Stores all discovered jobs in a Map<id, job>      │    │
│  │  - Resolves job IDs from provider + method names     │    │
│  │  - Merges per-job options with module defaults        │    │
│  │  - Validates cron/interval/queue configuration       │    │
│  └──────────────────────┬───────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │           SchedulerJobRunnerService                  │    │
│  │                                                      │    │
│  │  - Executes job handlers with overlap prevention     │    │
│  │  - Implements retry logic with configurable delay    │    │
│  │  - Supports execution timeouts (AbortController)     │    │
│  │  - Routes queue-targeted results to SchedulerQueue   │    │
│  └──────────────────────┬───────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │            SchedulerQueueService                     │    │
│  │                                                      │    │
│  │  - Wraps BullMQ Queue.add() for job enqueuing        │    │
│  │  - Resolves queue instances from NestJS module ref   │    │
│  │  - Validates that queueing is enabled before use     │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              SchedulerService (Public API)           │    │
│  │                                                      │    │
│  │  - listJobs(): Returns all registered job descriptors│    │
│  │  - triggerNow(jobId): Manually triggers a job        │    │
│  │  - enqueue<T>(input): Directly enqueue to a queue    │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

## Job System

### Decorators

The scheduler exposes three custom decorators for defining jobs and processors:

#### `@ScheduledJob(options)` — Define a Scheduled Job

Applied to a method to mark it as a scheduled job. The discovery service automatically finds and registers methods decorated with `@ScheduledJob`:

```typescript
@Injectable()
export class MyJobProvider {

  @ScheduledJob({
    name: 'my-custom-job',           // Unique job identifier (optional)
    description: 'Does something',    // Human-readable description (optional)
    enabled: true,                    // Can disable individual jobs
    cron: CronExpression.EVERY_HOUR,  // Cron expression (mutually exclusive with intervalMs)
    // intervalMs: 60000,             // OR interval in milliseconds
    runOnStart: false,                // Execute immediately on application boot
    preventOverlap: true,             // Skip if previous run is still active
    retries: 2,                       // Retry count on failure
    retryDelayMs: 3000,               // Delay between retries (ms)
    timeoutMs: 30000,                 // Kill the job after 30 seconds
    maxRandomDelayMs: 5000,           // Add random jitter up to 5 seconds
    queueName: 'worker-default',      // Target BullMQ queue (optional)
    queueJobName: 'my-job',           // Job name used in the queue
    queueJobOptions: { ... }          // BullMQ-specific options (priority, delay, etc.)
  })
  async doWork(): Promise<any> {
    // Return value is used as the queue job payload if queueName is set
    return { result: 'done' };
  }
}
```

**Schedule types:**

| Type         | Configuration                   | Behavior                                     |
| ------------ | ------------------------------- | -------------------------------------------- |
| **Cron**     | `cron: '*/5 * * * *'`           | Runs on a cron schedule (timezone-aware)     |
| **Interval** | `intervalMs: 30000`             | Runs every N milliseconds                    |
| **Manual**   | Neither `cron` nor `intervalMs` | Only runs via `runOnStart` or `triggerNow()` |

**Execution target:**

| Configuration                            | Behavior                                     |
| ---------------------------------------- | -------------------------------------------- |
| No `queueName`                           | **Inline** — method executes directly        |
| `queueName` set + `enableQueueing: true` | **Queued** — method return value is enqueued |

When a job targets a queue:

1. The cron/interval trigger fires the method
2. The method's return value becomes the job payload
3. The payload is added to the BullMQ queue
4. A separate `@QueueWorker` processor picks it up and processes it

#### `@QueueWorker(queueName)` — Define a Queue Processor

Applied to a class to bind it to a specific BullMQ queue. This is an alias for `@nestjs/bullmq`'s `@Processor` decorator:

```typescript
@Injectable()
@QueueWorker("worker-default")
export class MyProcessor extends QueueWorkerHost {
  // This class processes jobs from the 'worker-default' queue
}
```

#### `@QueueJobHandler(jobName)` — Handle a Specific Queue Job

Applied to methods within a `QueueWorkerHost` subclass to route specific job types:

```typescript
@Injectable()
@QueueWorker("worker-default")
export class MyProcessor extends QueueWorkerHost {
  @QueueJobHandler("my-job")
  async handleMyJob(job: Job<MyPayload>): Promise<void> {
    console.log("Processing:", job.data);
  }

  @QueueJobHandler("another-job")
  async handleAnotherJob(job: Job<AnotherPayload>): Promise<void> {
    console.log("Processing another:", job.data);
  }
}
```

The `QueueWorkerHost` base class automatically dispatches incoming BullMQ jobs to the correct handler method based on the `@QueueJobHandler` metadata. If no matching handler is found, it throws an error with a list of available handlers.

### Built-in Jobs

The worker ships with two built-in jobs in the `WorkerJobsModule`:

#### Worker Startup Job

```typescript
@ScheduledJob({
  name: 'worker.startup.scheduler',
  enabled: WORKER_QUEUE_ENABLED,     // Only if Redis is available
  runOnStart: true,                  // Fires immediately on boot
  preventOverlap: true,
  queueName: WORKER_DEFAULT_QUEUE,
  queueJobName: 'worker.startup'
})
async announceStartup(): Promise<{ timestamp: string }> {
  this.logger.log('Queueing worker startup job.');
  return { timestamp: new Date().toISOString() };
}
```

This job runs **once at startup** to announce that the worker process has started. The timestamp is enqueued to the default queue and processed by the `WorkerLifecycleProcessor`.

#### Worker Heartbeat Job

```typescript
@ScheduledJob({
  name: 'worker.heartbeat.scheduler',
  enabled: WORKER_QUEUE_ENABLED && process.env.WORKER_HEARTBEAT_ENABLED !== 'false',
  cron: CronExpression.EVERY_30_SECONDS,
  queueName: WORKER_DEFAULT_QUEUE,
  queueJobName: 'worker.heartbeat'
})
async heartbeat(): Promise<{ timestamp: string }> {
  this.logger.log('Queueing worker heartbeat job...');
  return { timestamp: new Date().toISOString() };
}
```

This job runs **every 30 seconds** to confirm the worker is alive and processing. It can be disabled by setting `WORKER_HEARTBEAT_ENABLED=false`.

#### Built-in Processor

The `WorkerLifecycleProcessor` handles both queue job types:

```typescript
@Injectable()
@QueueWorker(WORKER_DEFAULT_QUEUE)
export class WorkerLifecycleProcessor extends QueueWorkerHost {
  @QueueJobHandler("worker.startup")
  async handleStartup(job: Job<WorkerLifecyclePayload>): Promise<void> {
    this.logger.log(`Worker startup event processed at ${job.data.timestamp}`);
  }

  @QueueJobHandler("worker.heartbeat")
  async handleHeartbeat(job: Job<WorkerLifecyclePayload>): Promise<void> {
    this.logger.log(`Worker heartbeat processed at ${job.data.timestamp}`);
  }
}
```

### Job Execution Flow

The following diagram illustrates how a scheduled job flows from trigger to execution:

```
┌─────────────────┐
│  Cron Timer or   │
│  setInterval     │
│  (trigger fires) │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│  Jitter delay        │  (if maxRandomDelayMs > 0)
│  (random 0..N ms)    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐     ┌──────────────────────┐
│  Overlap check       │────▶│  SKIP (warn log)     │
│  (is previous run    │ yes │                      │
│   still active?)     │     └──────────────────────┘
└────────┬────────────┘
         │ no
         ▼
┌─────────────────────┐
│  Execute handler     │
│  with retries        │
│  (up to N attempts,  │
│   retryDelayMs wait) │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Has queueName?      │
└────────┬────────────┘
    yes  │        │ no
         ▼        ▼
┌──────────┐  ┌──────────┐
│ Enqueue  │  │  Done    │
│ to Redis │  │ (inline) │
│ (BullMQ) │  └──────────┘
└────┬─────┘
     │
     ▼
┌──────────────────────┐
│  QueueWorker picks   │
│  up from Redis       │
│  └─ @QueueJobHandler │
│     dispatches to    │
│     correct method   │
└──────────────────────┘
```

## Redis and BullMQ Integration

### Connection Resolution

The scheduler automatically resolves the Redis connection from environment variables:

```typescript
// Priority order:
// 1. Explicitly passed ConnectionOptions (programmatic)
// 2. REDIS_URL environment variable (full connection string)
// 3. Individual REDIS_* environment variables

// Example: REDIS_URL=redis://myuser:mypass@redis.example.com:6380/5
// → host: redis.example.com, port: 6380, user: myuser, pass: mypass, db: 5

// Example: Individual variables
// REDIS_HOST=127.0.0.1
// REDIS_PORT=6379
// REDIS_USER=default
// REDIS_PASSWORD=secret
// REDIS_TLS=true  → enables TLS
```

### Queue Architecture

BullMQ queues are backed by Redis and provide:

- **At-least-once delivery** — jobs are only removed after successful processing
- **Automatic retries** — failed jobs can be retried with exponential backoff
- **Job prioritization** — via BullMQ's built-in priority system
- **Stalled job detection** — jobs that stop responding are automatically retried
- **Persistence** — jobs survive process restarts (stored in Redis)

The default queue name is `worker-default`, configurable via `WORKER_DEFAULT_QUEUE`.

### Conditional Queueing

The `enableQueueing` flag (and `WORKER_QUEUE_ENABLED` env var) controls whether BullMQ is initialized:

```typescript
// WORKER_QUEUE_ENABLED is true ONLY when:
// 1. WORKER_QUEUE_ENABLED env var is NOT 'false'  AND
// 2. REDIS_ENABLED env var IS 'true'
export const WORKER_QUEUE_ENABLED =
  process.env.WORKER_QUEUE_ENABLED !== "false" &&
  process.env.REDIS_ENABLED === "true";
```

When queueing is **disabled** (no Redis):

- Jobs still fire on their cron/interval schedule
- Jobs execute inline (no queue dispatch)
- `QueueWorker` processors are **not** registered
- The worker still functions, but without distributed queue guarantees

When queueing is **enabled** (Redis available):

- BullMQ queues are created and connected to Redis
- Jobs that specify a `queueName` dispatch their return value to the queue
- `QueueWorker` processors consume and process jobs from their bound queues

## Configuration Reference

### Environment Variables

| Variable                   | Default            | Description                                            |
| -------------------------- | ------------------ | ------------------------------------------------------ |
| `WORKER_DEFAULT_QUEUE`     | `worker-default`   | Name of the default BullMQ queue                       |
| `WORKER_QUEUE_ENABLED`     | (depends on Redis) | Set to `false` to disable queue processing             |
| `WORKER_SCHEDULER_ENABLED` | `true`             | Master switch for the scheduler (cron + interval jobs) |
| `WORKER_TIMEZONE`          | System default     | IANA timezone for cron expressions (e.g., `UTC`)       |
| `WORKER_HEARTBEAT_ENABLED` | `true`             | Set to `false` to disable the heartbeat job            |
| `REDIS_ENABLED`            | `false`            | Must be `true` for BullMQ queues to work               |
| `REDIS_HOST`               | `127.0.0.1`        | Redis server hostname                                  |
| `REDIS_PORT`               | `6379`             | Redis server port                                      |
| `REDIS_USER`               | (none)             | Redis username (ACL)                                   |
| `REDIS_PASSWORD`           | (none)             | Redis password                                         |
| `REDIS_TLS`                | `false`            | Set to `true` to enable TLS/SSL connections            |
| `REDIS_URL`                | (none)             | Full Redis connection URL (overrides individual vars)  |

### Worker Constants

These constants are defined in `apps/worker/src/app/worker.constants.ts` and are resolved at import time:

```typescript
export const WORKER_DEFAULT_QUEUE =
  process.env.WORKER_DEFAULT_QUEUE || "worker-default";

export const WORKER_QUEUE_ENABLED =
  process.env.WORKER_QUEUE_ENABLED !== "false" &&
  process.env.REDIS_ENABLED === "true";

export const WORKER_SCHEDULER_ENABLED =
  process.env.WORKER_SCHEDULER_ENABLED !== "false";
```

### SchedulerModuleOptions Interface

The full configuration surface for `SchedulerModule.forRoot()`:

| Option              | Type                   | Default                 | Description                                    |
| ------------------- | ---------------------- | ----------------------- | ---------------------------------------------- |
| `enabled`           | `boolean`              | `true`                  | Master switch: disables all job execution      |
| `defaultTimezone`   | `string`               | System default          | IANA timezone for cron expressions             |
| `logRegisteredJobs` | `boolean`              | `true`                  | Log each job discovered at startup             |
| `enableQueueing`    | `boolean`              | `REDIS_ENABLED=true`    | Enable BullMQ queue integration                |
| `queueConnection`   | `ConnectionOptions`    | From `REDIS_*` env vars | BullMQ/Redis connection configuration          |
| `queues`            | `string[] / options`   | `[]`                    | Additional queues to register                  |
| `defaultQueueName`  | `string`               | `'default'`             | Fallback queue name for jobs with queueJobName |
| `defaultJobOptions` | `ScheduledJobDefaults` | See below               | Default options applied to all discovered jobs |

### ScheduledJobOptions Interface

Per-job configuration for the `@ScheduledJob()` decorator:

| Option             | Type          | Default (from module) | Description                                             |
| ------------------ | ------------- | --------------------- | ------------------------------------------------------- |
| `name`             | `string`      | `Provider.method`     | Unique job identifier                                   |
| `description`      | `string`      | (none)                | Human-readable job description                          |
| `enabled`          | `boolean`     | `true`                | Whether this job is active                              |
| `cron`             | `string`      | (none)                | Cron expression (e.g., `*/5 * * * *`)                   |
| `intervalMs`       | `number`      | (none)                | Interval in milliseconds (mutually exclusive with cron) |
| `runOnStart`       | `boolean`     | `false`               | Execute immediately on application bootstrap            |
| `preventOverlap`   | `boolean`     | `true`                | Skip execution if previous run still active             |
| `retries`          | `number`      | `0`                   | Number of retries on failure                            |
| `retryDelayMs`     | `number`      | `0`                   | Delay between retry attempts (ms)                       |
| `timeoutMs`        | `number`      | (none)                | Kill the job if it exceeds this duration                |
| `maxRandomDelayMs` | `number`      | `0`                   | Add random jitter before execution                      |
| `queueName`        | `string`      | (none)                | Target BullMQ queue for dispatching results             |
| `queueJobName`     | `string`      | Job ID                | Name of the job within the queue                        |
| `queueJobOptions`  | `JobsOptions` | (none)                | BullMQ-specific options (priority, delay, attempts)     |

## Adding New Jobs

### Step 1: Create a Job Provider

```typescript
// apps/worker/src/app/jobs/my-cleanup.job.ts
import { Injectable, Logger } from "@nestjs/common";
import { CronExpression } from "@nestjs/schedule";
import { ScheduledJob } from "@gauzy/scheduler";

@Injectable()
export class MyCleanupJob {
  private readonly logger = new Logger(MyCleanupJob.name);

  @ScheduledJob({
    name: "cleanup.expired-sessions",
    cron: CronExpression.EVERY_DAY_AT_3AM,
    preventOverlap: true,
    retries: 2,
    retryDelayMs: 10000,
    timeoutMs: 60000,
  })
  async cleanExpiredSessions(): Promise<void> {
    this.logger.log("Cleaning up expired sessions...");
    // Database operations here — same DB as the API
  }
}
```

### Step 2: Create a Queue Processor (Optional)

If the job dispatches to a queue, create a processor:

```typescript
// apps/worker/src/app/processors/my-cleanup.processor.ts
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bullmq";
import {
  QueueJobHandler,
  QueueWorker,
  QueueWorkerHost,
} from "@gauzy/scheduler";

@Injectable()
@QueueWorker("cleanup-queue")
export class MyCleanupProcessor extends QueueWorkerHost {
  private readonly logger = new Logger(MyCleanupProcessor.name);

  @QueueJobHandler("cleanup.expired-sessions")
  async handle(job: Job<{ count: number }>): Promise<void> {
    this.logger.log(`Cleaned ${job.data.count} expired sessions`);
  }
}
```

### Step 3: Register in WorkerJobsModule

```typescript
// apps/worker/src/app/worker-jobs.module.ts
@Module({
  imports: [
    SchedulerModule.forFeature({
      jobProviders: [
        WorkerLifecycleJob,
        WorkerLifecycleProcessor,
        MyCleanupJob, // Add new job
        MyCleanupProcessor, // Add new processor (if using queues)
      ],
      queues: WORKER_QUEUE_ENABLED
        ? [WORKER_DEFAULT_QUEUE, "cleanup-queue"] // Register the queue
        : [],
    }),
  ],
})
export class WorkerJobsModule {}
```

## Deployment

### Docker

The worker has its own Dockerfile at `.deploy/worker/Dockerfile` that produces a production-ready Docker image. The image:

- Uses `node:24.14.0-alpine3.23` as the base
- Installs all dependencies with `yarn install` (including dev dependencies for building)
- Builds the worker with `nx build worker`
- Copies only the built output to a clean production stage
- Sets all environment variables from Docker build args with sensible defaults
- Starts with `node main.js`

**Docker image naming convention:**

| Environment | Image Tag                                                  |
| ----------- | ---------------------------------------------------------- |
| Demo        | `registry.digitalocean.com/ever/gauzy-worker-demo:latest`  |
| Staging     | `registry.digitalocean.com/ever/gauzy-worker-stage:latest` |
| Production  | `registry.digitalocean.com/ever/gauzy-worker:latest`       |

### Kubernetes

The worker is deployed as a Kubernetes `Deployment` resource with a **single replica** in each environment. Since it is a headless background process, it requires:

- ✅ `Deployment` — manages the worker pod lifecycle
- ❌ `Service` — not needed (no HTTP traffic)
- ❌ `Ingress` — not needed (no external access)

Example Kubernetes manifest (production):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gauzy-prod-worker
spec:
  replicas: 1 # Single instance — multiple replicas would duplicate job execution
  selector:
    matchLabels:
      app: gauzy-prod-worker
  template:
    spec:
      containers:
        - name: gauzy-prod-worker
          image: registry.digitalocean.com/ever/gauzy-worker:latest
          env:
            - name: NODE_ENV
              value: "production"
            - name: WORKER_DEFAULT_QUEUE
              value: "$WORKER_DEFAULT_QUEUE"
            - name: WORKER_QUEUE_ENABLED
              value: "$WORKER_QUEUE_ENABLED"
            - name: WORKER_SCHEDULER_ENABLED
              value: "$WORKER_SCHEDULER_ENABLED"
            - name: WORKER_TIMEZONE
              value: "$WORKER_TIMEZONE"
            # ... additional env vars (database, Redis, Sentry, etc.)
          resources:
            requests:
              memory: "1536Mi"
            limits:
              memory: "2048Mi"
```

**Why single replica?** The worker uses node-level scheduling (cron/interval). Running multiple replicas would cause each job to execute N times per trigger, unless distributed locking is implemented. Currently, a single replica per environment is the intended deployment strategy.

### CI/CD Pipeline

The worker is built and deployed through three GitHub Actions workflows per environment:

#### Build & Publish (Docker)

- `docker-build-publish-demo.yml`
- `docker-build-publish-stage.yml`
- `docker-build-publish-prod.yml`

Each workflow has a `gauzy-worker` job that:

1. Builds the Docker image using `.deploy/worker/Dockerfile`
2. Passes all environment variables as Docker build args from GitHub Secrets
3. Pushes to multiple registries (DigitalOcean, Docker Hub, GHCR)

#### Deploy (Kubernetes)

- `deploy-do-demo.yml`
- `deploy-do-stage.yml`
- `deploy-do-prod.yml`

Each deployment workflow:

1. Sets up `doctl` and `kubectl` credentials
2. Runs `envsubst` on the K8s manifest file, substituting `$VARIABLE` placeholders with GitHub Secret values
3. Applies the manifest with `kubectl apply`
4. Triggers a `kubectl rollout restart deployment/gauzy-{env}-worker`

## Local Development

### Running the Worker Locally

```bash
# Start the worker in development mode
yarn start:worker

# Or directly via NX
yarn nx serve worker
```

The worker will:

1. Load `.env` and `.env.local` files
2. Register all plugins from `@gauzy/core`
3. Connect to the local database
4. Start all enabled cron/interval jobs
5. Connect to Redis and start BullMQ processors (if `REDIS_ENABLED=true`)

### Minimal `.env` for Local Development

```bash
# Database (same as API)
DB_TYPE=better-sqlite3
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=gauzy
# DB_USER=postgres
# DB_PASS=root

# Redis (optional — worker runs without it)
REDIS_ENABLED=true
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Worker-specific
WORKER_SCHEDULER_ENABLED=true
WORKER_QUEUE_ENABLED=true
WORKER_DEFAULT_QUEUE=worker-default
# WORKER_TIMEZONE=UTC
# WORKER_HEARTBEAT_ENABLED=true
```

### Debugging Jobs

The worker logs all job registrations and executions. You can enable verbose logging:

```bash
# The worker starts with all log levels enabled
# logger: ['log', 'error', 'warn', 'debug', 'verbose']
```

Use the `SchedulerService` to inspect registered jobs programmatically:

```typescript
const jobs = schedulerService.listJobs();
// Returns: id, providerName, methodName, enabled, scheduleType, cron, running, etc.
```

## File Structure Reference

```
apps/worker/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── load-env.ts                      # .env file loader
│   └── app/
│       ├── app.module.ts                # Root module (Database + Scheduler)
│       ├── worker.constants.ts          # WORKER_* environment variables
│       ├── worker-jobs.module.ts         # Feature module for job registration
│       ├── jobs/
│       │   └── worker-lifecycle.job.ts   # Startup + heartbeat job definitions
│       └── processors/
│           └── worker-lifecycle.processor.ts  # BullMQ queue processor

packages/scheduler/
├── src/
│   ├── index.ts                          # Public API exports
│   └── lib/
│       ├── scheduler.module.ts           # Module with forRoot/forFeature
│       ├── constants/
│       │   └── scheduler.constants.ts    # Injection tokens
│       ├── decorators/
│       │   ├── scheduled-job.decorator.ts    # @ScheduledJob
│       │   ├── queue-worker.decorator.ts     # @QueueWorker (alias for @Processor)
│       │   └── queue-job-handler.decorator.ts # @QueueJobHandler
│       ├── hosts/
│       │   └── queue-worker.host.ts      # QueueWorkerHost base class
│       ├── interfaces/
│       │   ├── scheduled-job-options.interface.ts
│       │   ├── scheduler-module-options.interface.ts
│       │   ├── scheduler-feature-options.interface.ts
│       │   ├── discovered-scheduled-job.interface.ts
│       │   ├── scheduler-job-descriptor.interface.ts
│       │   └── scheduler-queue-job.interface.ts
│       ├── services/
│       │   ├── scheduler.service.ts              # Public service (list, trigger, enqueue)
│       │   ├── scheduler-discovery.service.ts    # Auto-discovers @ScheduledJob methods
│       │   ├── scheduler-job-registry.service.ts # Stores discovered jobs
│       │   ├── scheduler-job-runner.service.ts   # Executes with retries/timeout/overlap
│       │   ├── scheduler-queue.service.ts        # BullMQ enqueue adapter
│       │   └── scheduled-job-metadata.accessor.ts # Reads @ScheduledJob metadata
│       └── utils/
│           ├── normalize-scheduler-options.ts    # Options normalization + defaults
│           ├── normalize-queue-registrations.ts  # Queue name normalization
│           └── resolve-bull-connection.ts         # Redis connection resolution
```

## Related Pages

- [Backend Architecture](./backend-architecture) — API server architecture and patterns
- [Plugin System](./plugin-system) — extending backend functionality with plugins
- [Technology Stack](./technology-stack) — overview of all technologies used
- [Deployment](../deployment) — deployment guides and infrastructure
