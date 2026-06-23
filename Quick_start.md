# React Permission Kit - Quick Start Guide

## 🚀 Installation (When Published)

```bash
npm install react-permission-kit
```

## 📋 Basic Setup

### 1. Wrap with PermissionProvider

```tsx
import { PermissionProvider } from 'react-permission-kit';

function App() {
  return (
    <PermissionProvider 
      initialPermissions={['users.read', 'users.write']}
      initialRoles={['user']}
    >
      <Dashboard />
    </PermissionProvider>
  );
}
```

## 🎯 Usage Examples

### Example 1: Button Control

```tsx
import { Can } from 'react-permission-kit';

export function UserActions() {
  return (
    <div>
      <Can permission="users.read">
        <button>View Users</button>
      </Can>
      
      <Can permission="users.delete">
        <button>Delete User</button>
      </Can>
      
      <Can 
        permission="users.export" 
        fallback={<span>No export permission</span>}
      >
        <button>Export CSV</button>
      </Can>
    </div>
  );
}
```

### Example 2: Using Hooks

```tsx
import { usePermission } from 'react-permission-kit';

export function UserList() {
  const { can, addPermission, removePermission } = usePermission();

  if (!can('users.read')) {
    return <div>No access</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      {can('users.write') && <button>New User</button>}
      {can('users.delete') && <button>Delete Selected</button>}
    </div>
  );
}
```

### Example 3: Multiple Permissions

```tsx
import { CanMulti } from 'react-permission-kit';

export function ReportActions() {
  return (
    <>
      {/* User must HAVE ALL permissions */}
      <CanMulti 
        permission={['reports.read', 'reports.export']} 
        mode="all"
      >
        <button>Export Report</button>
      </CanMulti>

      {/* User must HAVE ANY permission */}
      <CanMulti 
        permission={['admin.access', 'reports.manage']} 
        mode="any"
      >
        <button>Manage Reports</button>
      </CanMulti>
    </>
  );
}
```

### Example 4: Route Protection

```tsx
import { PermissionRoute } from 'react-permission-kit';
import AdminPanel from './pages/AdminPanel';
import NotAuthorized from './pages/NotAuthorized';

export function Routes() {
  return (
    <Switch>
      <Route path="/admin">
        <PermissionRoute 
          component={AdminPanel}
          permission="admin.access"
          fallback={<NotAuthorized />}
        />
      </Route>
    </Switch>
  );
}
```

### Example 5: Wildcards

```tsx
import { useWildcardPermission } from 'react-permission-kit';

export function AdminMenu() {
  const { canWithWildcard } = useWildcardPermission([
    'admin.users.read',
    'admin.users.write',
    'admin.settings.read',
  ]);

  return (
    <nav>
      {/* Match anything starting with admin */}
      {canWithWildcard('admin.*') && (
        <a href="/admin">Administration</a>
      )}
      
      {/* Match specific pattern */}
      {canWithWildcard('admin.users.*') && (
        <a href="/admin/users">Manage Users</a>
      )}
    </nav>
  );
}
```

### Example 6: Login with Dynamic Update

```tsx
import { usePermission } from 'react-permission-kit';

export function LoginForm() {
  const { setPermissions, setRoles } = usePermission();

  const handleLogin = async (email, password) => {
    try {
      const response = await authenticateUser(email, password);
      
      // Update permissions and roles
      setPermissions(response.permissions);
      setRoles(response.roles);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      handleLogin(email, password);
    }}>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

## 🎓 Common Use Cases

### Menu with Permission Filtering

```tsx
export function Header() {
  const { can } = usePermission();
  
  const menuItems = [
    { label: 'Dashboard', perm: 'dashboard.view' },
    { label: 'Users', perm: 'users.read' },
    { label: 'Reports', perm: 'reports.view' },
    { label: 'Admin', perm: 'admin.access' },
  ];

  return (
    <nav>
      {menuItems.map(item => 
        can(item.perm) && <a key={item.perm}>{item.label}</a>
      )}
    </nav>
  );
}
```

### Feature Control

```tsx
export function Features() {
  const { canAny } = usePermission();

  const canExport = canAny(['reports.export', 'admin.access']);
  const canDelete = canAny(['users.delete', 'admin.access']);

  return (
    <Toolbar>
      {canExport && <ExportButton />}
      {canDelete && <DeleteButton />}
    </Toolbar>
  );
}
```

## 💡 Recommended Permission Patterns

```typescript
// Simple
'read'
'write'
'delete'

// With resource
'users.read'
'users.write'
'users.delete'

// With module
'accounting.invoices.read'
'accounting.invoices.write'

// Multi-tenant
'tenant:acme.users.read'
'tenant:beta.users.read'

// Wildcards
'admin.*'           // Everything under admin
'*.read'            // All reads
'users.*.delete'    // All user deletes
```

## 🔍 usePermission Methods

```typescript
const {
  // State
  permissions,        // string[]
  roles,             // string[]
  
  // Verification methods
  can(permission),           // boolean
  canAny(permissions),       // boolean
  canAll(permissions),       // boolean
  hasRole(role),            // boolean
  
  // Update methods
  setPermissions(perms),
  setRoles(roles),
  addPermission(perm),
  removePermission(perm),
  addRole(role),
  removeRole(role),
} = usePermission();
```

## ⚠️ Common Pitfalls

### ❌ Forget to wrap with Provider

```tsx
// Error!
function MyComponent() {
  const { can } = usePermission(); // Throws error!
}
```

### ✅ Always wrap with Provider

```tsx
function App() {
  return (
    <PermissionProvider>
      <MyComponent /> {/* OK! */}
    </PermissionProvider>
  );
}
```

### ❌ Don't await setPermissions

```tsx
// May not work
const handleLogin = (response) => {
  setPermissions(response.permissions);
  navigate('/dashboard'); // May navigate before update
};
```

### ✅ Use useEffect for reactions

```tsx
useEffect(() => {
  if (permissions.length > 0) {
    navigate('/dashboard');
  }
}, [permissions]);
```

## 📚 References

- [Complete API](./API_EN.md)
- [README](./README_EN.md)
- [Development](./DEVELOPMENT_EN.md)

## 🆘 Support

- Issues: https://github.com/larissa/react-permission-kit/issues
- Discussions: https://github.com/larissa/react-permission-kit/discussions
- Email: support@react-permission-kit.com

---

**Version:** 0.4.0  
**Last Updated:** June 22, 2026
