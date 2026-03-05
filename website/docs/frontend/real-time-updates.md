---
sidebar_position: 14
---

# Real-Time Updates (Socket.IO)

Client-side real-time updates using Socket.IO.

## Overview

Gauzy uses Socket.IO on the frontend for:

- Live timer status across team members
- Instant notifications
- Real-time dashboard updates
- Collaborative editing signals

## Socket Service

```typescript
@Injectable()
export class SocketService {
  private socket: Socket;

  constructor(private authService: AuthService) {}

  connect() {
    this.socket = io(environment.API_BASE_URL, {
      auth: { token: this.authService.getToken() },
    });

    this.socket.on("connect", () => {
      console.log("WebSocket connected");
    });
  }

  onTimerStarted(callback: (data: any) => void) {
    this.socket.on("timer-started", callback);
  }

  onNotification(callback: (data: any) => void) {
    this.socket.on("notification", callback);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}
```

## Usage in Components

```typescript
@Component({ ... })
export class TeamDashboardComponent implements OnInit, OnDestroy {
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.onTimerStarted((data) => {
      this.updateTeamMemberStatus(data);
    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
```

## Events Reference

| Event           | Payload                    | Description      |
| --------------- | -------------------------- | ---------------- |
| `timer-started` | `{ employeeId, task }`     | Timer started    |
| `timer-stopped` | `{ employeeId, duration }` | Timer stopped    |
| `notification`  | `{ type, message }`        | New notification |
| `task-updated`  | `{ taskId, changes }`      | Task changed     |
| `screenshot`    | `{ employeeId, url }`      | New screenshot   |

## Related Pages

- [WebSocket Architecture](../architecture/websocket-realtime) — server-side
- [Employee Notifications](../features/employee-notifications) — notification system
