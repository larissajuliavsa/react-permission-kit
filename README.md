# React Permission Kit 🔐

[![npm version](https://img.shields.io/npm/v/react-permission-kit)](https://www.npmjs.com/package/react-permission-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-permission-kit)](https://www.npmjs.com/package/react-permission-kit)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> A lightweight, type-safe, and framework-agnostic React library for permission control and authorization in web applications.

## ✨ Features

- 🎯 **Simple API** - Intuitive and easy-to-use interface
- 💪 **Fully Typed** - TypeScript first with complete support
- 🪶 **Lightweight** - Zero dependencies, small bundle (~3KB gzipped)
- 🔌 **Agnostic** - Works with any authentication solution (JWT, OAuth2, etc.)
- 🎨 **Flexible** - Supports simple permissions and role-based access
- ✅ **Well Tested** - 100% test coverage
- 📚 **Well Documented** - Clear API with practical examples

## 🚀 Quick Start

### Installation

```bash
npm install react-permission-kit
# or
yarn add react-permission-kit
# or
pnpm add react-permission-kit
```

### Basic Example

```tsx
import { PermissionProvider, Can, usePermission } from 'react-permission-kit';

function App() {
  return (
    <PermissionProvider initialPermissions={['users.read', 'users.write']}>
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

      <Can permission="users.delete" fallback={<p>No permission</p>}>
        <button>Delete</button>
      </Can>
    </div>
  );
}
```

## 📖 Documentation

- [Complete API](./API.md) - Detailed reference for components and hooks
- [Examples](./examples) - Practical usage examples

## 🎯 Use Cases

### Button Control

```tsx
<Can permission="users.delete">
  <button onClick={deleteUser}>Delete</button>
</Can>
```

### Menu Control

```tsx
<nav>
  <Can permission="dashboard.view">
    <Link to="/dashboard">Dashboard</Link>
  </Can>
  
  <Can role="admin">
    <Link to="/admin">Administration</Link>
  </Can>
</nav>
```

### Page Control

```tsx
export default function UsersPage() {
  return (
    <Can permission="users.read" fallback={<NotFound />}>
      <UsersList />
    </Can>
  );
}
```

### Feature Control

```tsx
function Reports() {
  const { can, canAny } = usePermission();

  const canExport = canAny(['reports.export', 'admin.access']);
  
  return <ReportTable exportable={canExport} />;
}
```

## 🔑 Main API

### `<PermissionProvider />`

Context provider to manage application permissions.

```tsx
<PermissionProvider 
  initialPermissions={['users.read']}
  initialRoles={['user']}
>
  <App />
</PermissionProvider>
```

### `usePermission()`

Hook to access and manipulate permissions.

```tsx
const {
  permissions,           // string[]
  roles,                // string[]
  can,                  // (p: string | string[]) => boolean
  canAny,               // (p: string[]) => boolean
  canAll,               // (p: string[]) => boolean
  hasRole,              // (r: string) => boolean
  setPermissions,       // (p: string[]) => void
  setRoles,             // (r: string[]) => void
  addPermission,        // (p: string) => void
  removePermission,     // (p: string) => void
  addRole,              // (r: string) => void
  removeRole,           // (r: string) => void
} = usePermission();
```

### `<Can />`

Conditional component based on permissions.

```tsx
<Can 
  permission="users.edit"
  role="admin"
  fallback={<p>No access</p>}
>
  Restricted content
</Can>
```

## 📊 Permission Examples

```typescript
// Simple permissions
'users.read'
'users.write'
'users.delete'

// Namespace convention
'resources.action'
'users.read'
'users.create'
'users.update'
'users.delete'

// With module
'modules.resources.action'
'accounting.invoices.export'
'reports.dashboard.view'
```

## 🏗️ Roadmap

- **v0.1.0** ✅ Core (PermissionProvider, usePermission, Can)
- **v0.2.0** ✅ Multi Permissions (canAll, canAny)
- **v0.3.0** ✅ Route Guards (PermissionRoute)
- **v0.4.0** ✅ Wildcards (admin.*)
- **v0.5.0** 🚧 Menu Guards (automatic filtering)
- **v0.6.0** 🚧 Feature Flags
- **v0.7.0** 🚧 Storybook
- **v0.8.0** 🚧 Demo Application

## 🧪 Testing

All components and hooks have unit tests:

```bash
npm test              # Run tests once
npm run test:watch   # Watch mode
```

**Coverage:** 76 tests, 100% coverage

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Core | React 19 |
| Language | TypeScript |
| Build | Vite |
| Testing | Vitest + Testing Library |
| Quality | ESLint + TypeScript Strict Mode |
| Types | TypeScript |

## 📦 Bundle Size

- **Minified:** ~10.79 KB (ESM)
- **Gzipped:** ~3.82 KB

## 💡 Authentication Integration

React Permission Kit is agnostic about authentication solution. Works with:

- JWT
- OAuth2
- Auth0
- Cognito
- Keycloak
- Firebase
- Any other provider

```tsx
// After authentication, update permissions
function LoginForm() {
  const { setPermissions, setRoles } = usePermission();

  const handleLogin = async (credentials) => {
    const { user } = await authenticateUser(credentials);
    setPermissions(user.permissions);
    setRoles(user.roles);
  };

  return (
    // form
  );
}
```

## ⚙️ TypeScript Configuration

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

Built with ❤️ for the React community.

---

**v0.4.0** | [npm](https://www.npmjs.com/package/react-permission-kit) | [GitHub](https://github.com/larissa/react-permission-kit)
