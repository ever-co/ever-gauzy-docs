---
sidebar_position: 49
---

# Scheduler Architecture

Background task scheduling infrastructure.

## Overview

Gauzy uses multiple scheduling mechanisms:

- **NestJS Schedule** — cron-based in-process tasks
- **BullMQ** — Redis-backed job queues
- **Custom Timers** — interval-based operations

## Cron Scheduling

```typescript
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class CleanupService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupExpiredSessions() {
    await this.sessionRepository
      .createQueryBuilder()
      .delete()
      .where("expiresAt < :now", { now: new Date() })
      .execute();
  }

  @Cron("0 */5 * * * *") // Every 5 minutes
  async syncTimerStatus() {
    await this.timerService.syncAllActiveTimers();
  }
}
```

## BullMQ Job Queues

```typescript
// Producer
@Injectable()
export class EmailService {
  constructor(@InjectQueue("email") private emailQueue: Queue) {}

  async sendWelcome(employee: IEmployee) {
    await this.emailQueue.add("welcome", {
      to: employee.user.email,
      template: "welcome-user",
      context: { firstName: employee.firstName },
    });
  }
}

// Consumer
@Processor("email")
export class EmailProcessor {
  @Process("welcome")
  async handleWelcome(job: Job) {
    await this.mailerService.send(job.data);
  }
}
```

## Scheduled Tasks

| Task              | Schedule       | Purpose            |
| ----------------- | -------------- | ------------------ |
| Session cleanup   | Daily midnight | Remove expired     |
| Timer sync        | Every 5 min    | Sync active timers |
| Report generation | Weekly Monday  | Generate reports   |
| Backup trigger    | Daily 2 AM     | Database backup    |
| Integration sync  | Every hour     | Sync external data |

## Related Pages

- [Background Jobs](./background-jobs) — job processing
- [Worker Architecture](./worker-architecture) — worker process
- [Redis Caching](./redis-caching) — Redis config
