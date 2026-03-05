---
sidebar_position: 30
---

# Load Testing with k6

Performance and load testing guide for the Gauzy API.

## Setup

```bash
# Install k6
brew install k6   # macOS
# or
choco install k6  # Windows
```

## Basic Load Test

```javascript
// load-test.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 10 }, // Ramp up
    { duration: "3m", target: 50 }, // Sustained load
    { duration: "1m", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = __ENV.API_URL || "http://localhost:3000";

export function setup() {
  const loginRes = http.post(
    `${BASE_URL}/api/auth/login`,
    JSON.stringify({
      email: "admin@ever.co",
      password: "admin",
    }),
    { headers: { "Content-Type": "application/json" } },
  );

  return { token: loginRes.json("token") };
}

export default function (data) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
    "Content-Type": "application/json",
  };

  // List employees
  const res = http.get(`${BASE_URL}/api/employee`, { headers });
  check(res, {
    "status 200": (r) => r.status === 200,
    "response < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

## Running

```bash
k6 run --env API_URL=http://localhost:3000 load-test.js
```

## Performance Targets

| Metric      | Target      |
| ----------- | ----------- |
| P95 Latency | < 500ms     |
| P99 Latency | < 2s        |
| Error Rate  | < 1%        |
| Throughput  | > 100 req/s |

## Related Pages

- [Performance Troubleshooting](../troubleshooting/performance-issues) — perf issues
- [Scaling & HA](./scaling) — scaling strategies
- [Prometheus Metrics](../observability/prometheus-metrics) — monitoring
