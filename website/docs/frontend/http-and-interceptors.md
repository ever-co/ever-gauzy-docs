---
sidebar_position: 7
---

# HTTP & Interceptors

HTTP client configuration and interceptors for API communication.

## HTTP Client Setup

```typescript
@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
})
export class CoreModule {}
```

## Interceptors

### AuthInterceptor

Attaches the JWT bearer token to all API requests:

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const token = this.authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next.handle(req);
}
```

### TenantInterceptor

Includes the current tenant ID in request headers:

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const tenantId = this.store.selectedOrganization?.tenantId;
  if (tenantId) {
    req = req.clone({
      setHeaders: { 'Tenant-Id': tenantId },
    });
  }
  return next.handle(req);
}
```

### ErrorInterceptor

Global error handling for API responses:

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      }
      if (error.status === 403) {
        this.toastrService.danger('Access denied');
      }
      return throwError(() => error);
    }),
  );
}
```

### LanguageInterceptor

Sends the current locale for server-side localization:

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const lang = this.translateService.currentLang || 'en';
  req = req.clone({
    setHeaders: { 'Language': lang },
  });
  return next.handle(req);
}
```

## API Service Pattern

```typescript
@Injectable({ providedIn: "root" })
export class EmployeesService {
  private readonly API_URL = "/api/employee";

  constructor(private http: HttpClient) {}

  getAll(params?: any): Observable<IPagination<IEmployee>> {
    return this.http.get<IPagination<IEmployee>>(this.API_URL, { params });
  }

  getById(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.API_URL}/${id}`);
  }

  create(input: IEmployeeCreateInput): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.API_URL, input);
  }

  update(id: string, input: Partial<IEmployee>): Observable<IEmployee> {
    return this.http.put<IEmployee>(`${this.API_URL}/${id}`, input);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
```

## Related Pages

- [Frontend Overview](./frontend-overview)
- [Error Handling](../api/error-handling) — API error format
- [JWT Authentication](../authentication/jwt-authentication) — token management
