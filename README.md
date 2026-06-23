# React Permission Kit 🔐

[![npm version](https://img.shields.io/npm/v/react-permission-kit)](https://www.npmjs.com/package/react-permission-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-permission-kit)](https://www.npmjs.com/package/react-permission-kit)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> A lightweight, type-safe, and framework-agnostic React library for permission control and authorization in modern web applications.

Built for enterprise-grade applications that require scalable role and permission management.

---

## ✨ Features

* 🎯 Simple and intuitive API
* 💪 TypeScript-first with full type safety
* 🪶 Lightweight (~3.8 KB gzipped)
* 🔌 Authentication agnostic (JWT, OAuth2, Auth0, Cognito, Keycloak, Firebase, etc.)
* 🎨 Supports permissions and roles out of the box
* ⚡ Fast permission evaluation
* ✅ 100% test coverage
* 📚 Comprehensive documentation
* 🚀 Designed for enterprise applications

---

## 🆚 Why React Permission Kit?

Most applications start with simple permission checks:

```tsx
if (user.permissions.includes("users.delete")) {
  return <DeleteButton />;
}
```

As applications grow, authorization logic becomes scattered across components, routes, menus, and business rules.

React Permission Kit centralizes permission management into a predictable, reusable, and type-safe solution.

### Comparison

| Feature                           | React Permission Kit | Custom Implementation |
| --------------------------------- | -------------------- | --------------------- |
| TypeScript Support                | ✅                    | ⚠️ Depends            |
| Centralized Permission Management | ✅                    | ❌                     |
| React Hooks API                   | ✅                    | ❌                     |
| Role-Based Access Control (RBAC)  | ✅                    | ⚠️ Manual             |
| Multi-Permission Checks           | ✅                    | ⚠️ Manual             |
| Wildcard Permissions              | ✅                    | ❌                     |
| Route Protection                  | ✅                    | ⚠️ Manual             |
| Unit Tests Included               | ✅                    | ⚠️ Depends            |
| Documentation Included            | ✅                    | ❌                     |
| Bundle Size                       | ~3.8 KB              | Varies                |

### Benefits

* Reduce authorization boilerplate.
* Keep permission logic consistent across your application.
* Improve maintainability as projects scale.
* Integrate with any authentication provider.
* Simplify onboarding for new developers.

### Ideal For

* SaaS Platforms
* Enterprise Applications
* Banking Systems
* Healthcare Platforms
* Admin Panels
* CRM / ERP Systems
* Internal Corporate Tools
* Multi-Tenant Applications

---

## 🚀 Quick Start

### Installation

```bash
npm install react-permission-kit
```

or

```bash
yarn add react-permission-kit
```

or

```bash
pnpm add react-permission-kit
```

---

## Basic Example

```tsx
import {
  PermissionProvider,
  Can,
  usePermission,
} from "react-permission-kit";

function App() {
  return (
    <PermissionProvider
      initialPermissions={[
        "users.read",
        "users.write",
      ]}
    >
      <Dashboard />
    </PermissionProvider>
  );
}

function Dashboard() {
  const { can } = usePermission();

  return (
    <div>
      <h1>Dashboard</h1>

      <Can permission="users.read">
        <p>You have access to read users</p>
      </Can>

      <Can
        permission="users.delete"
        fallback={<p>No permission</p>}
      >
        <button>Delete</button>
      </Can>
    </div>
  );
}
```

---

## 📖 Documentation

### Resources

* 📚 Complete API Documentation
* 💡 Usage Examples
* 🧪 Testing Examples
* 🚀 Migration Guides

---

## 🎯 Real World Use Cases

### Protect Buttons

```tsx
<Can permission="users.delete">
  <button onClick={deleteUser}>
    Delete User
  </button>
</Can>
```

### Protect Menus

```tsx
<nav>
  <Can permission="dashboard.view">
    <Link to="/dashboard">
      Dashboard
    </Link>
  </Can>

  <Can role="admin">
    <Link to="/admin">
      Administration
    </Link>
  </Can>
</nav>
```

### Protect Pages

```tsx
export default function UsersPage() {
  return (
    <Can
      permission="users.read"
      fallback={<NotFound />}
    >
      <UsersList />
    </Can>
  );
}
```

### Feature Flags

```tsx
function Reports() {
  const { canAny } = usePermission();

  const canExport = canAny([
    "reports.export",
    "admin.access",
  ]);

  return (
    <ReportTable exportable={canExport} />
  );
}
```

---

## 🔑 Core API

### PermissionProvider

Provides permission context to the application.

```tsx
<PermissionProvider
  initialPermissions={[
    "users.read",
  ]}
  initialRoles={[
    "user",
  ]}
>
  <App />
</PermissionProvider>
```

---

### usePermission

Access and manage permissions anywhere in your application.

```tsx
const {
  permissions,
  roles,
  can,
  canAny,
  canAll,
  hasRole,
  setPermissions,
  setRoles,
  addPermission,
  removePermission,
  addRole,
  removeRole,
} = usePermission();
```

---

### Can

Render content conditionally based on permissions or roles.

```tsx
<Can
  permission="users.edit"
  role="admin"
  fallback={<p>No access</p>}
>
  Restricted Content
</Can>
```

---

## 📊 Permission Conventions

### Simple Permissions

```ts
"users.read";
"users.write";
"users.delete";
```

### Resource-Based Permissions

```ts
"users.read";
"users.create";
"users.update";
"users.delete";
```

### Module-Based Permissions

```ts
"accounting.invoices.export";
"reports.dashboard.view";
"finance.payments.approve";
```

### Enterprise Example

```ts
"accounts.read";
"accounts.transfer";
"investments.trade";
"customers.approve";
```

---

## 💡 Authentication Integration

React Permission Kit does not manage authentication.

It integrates seamlessly with:

* JWT
* OAuth2
* Auth0
* Cognito
* Keycloak
* Firebase
* Custom Authentication Systems

Example:

```tsx
function LoginForm() {
  const {
    setPermissions,
    setRoles,
  } = usePermission();

  async function handleLogin() {
    const { user } =
      await authenticateUser();

    setPermissions(
      user.permissions
    );

    setRoles(user.roles);
  }
}
```

---

## 🧪 Testing

All components, hooks, and utilities are fully tested.

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

### Coverage

* ✅ 76 Tests
* ✅ 100% Coverage
* ✅ Type Safety Validation

---

## 📦 Bundle Size

| Metric   | Size      |
| -------- | --------- |
| Minified | ~10.79 KB |
| Gzipped  | ~3.82 KB  |

---

## 🏗️ Roadmap

| Version | Status | Feature                 |
| ------- | ------ | ----------------------- |
| v0.1.0  | ✅      | Core API                |
| v0.2.0  | ✅      | Multi Permission Checks |
| v0.3.0  | ✅      | Route Guards            |
| v0.4.0  | ✅      | Wildcard Permissions    |
| v0.5.0  | 🚧     | Menu Guards             |
| v0.6.0  | 🚧     | Feature Flags           |
| v0.7.0  | 🚧     | Storybook               |
| v0.8.0  | 🚧     | Demo Application        |

---

## 🎨 Tech Stack

| Layer       | Technology               |
| ----------- | ------------------------ |
| Framework   | React 19                 |
| Language    | TypeScript               |
| Build Tool  | Vite                     |
| Testing     | Vitest + Testing Library |
| Linting     | ESLint                   |
| Type Safety | TypeScript Strict Mode   |

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

ISC License.

See the LICENSE file for more details.

---

## 🙏 Acknowledgements

Built with ❤️ for developers building scalable and secure React applications.

---

**Current Version:** v0.4.0

📦 NPM Package
📚 Documentation
🚀 Examples
⭐ Contributions Welcome
