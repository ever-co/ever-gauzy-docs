---
sidebar_position: 3
---

# State Management

NgRx-based state management for the Angular frontend.

## Overview

Ever Gauzy uses NgRx for global state management alongside Angular services for local component state.

## Store Structure

```
AppState
├── auth         → User, token, permissions
├── organization → Current organization
├── employee     → Current employee context
├── navigation   → Sidebar, breadcrumbs
├── layout       → Theme, sidebar state
└── feature stores (lazy-loaded)
    ├── employees
    ├── projects
    ├── tasks
    └── time-tracker
```

## Patterns

### Actions

```typescript
export const login = createAction(
  "[Auth] Login",
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ user: IUser; token: string }>(),
);

export const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{ error: string }>(),
);
```

### Reducers

```typescript
export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    isAuthenticated: false,
  })),
);
```

### Effects

```typescript
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((result) => loginSuccess(result)),
          catchError((error) => of(loginFailure({ error }))),
        ),
      ),
    ),
  );
}
```

### Selectors

```typescript
export const selectAuth = createFeatureSelector<AuthState>("auth");
export const selectCurrentUser = createSelector(
  selectAuth,
  (state) => state.user,
);
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state) => state.isAuthenticated,
);
```

## Service-Based State

For simpler component state, services with BehaviorSubject:

```typescript
@Injectable({ providedIn: "root" })
export class OrganizationService {
  private selectedOrganization$ = new BehaviorSubject<IOrganization>(null);

  get organization$(): Observable<IOrganization> {
    return this.selectedOrganization$.asObservable();
  }

  setOrganization(org: IOrganization): void {
    this.selectedOrganization$.next(org);
  }
}
```

## Related Pages

- [Frontend Overview](./frontend-overview)
- [Routing & Modules](./routing-and-modules)
