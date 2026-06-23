export type Permission = string | string[];
export type Role = string;

export interface PermissionContextType {
  permissions: string[];
  roles: string[];
  can: (permission: Permission) => boolean;
  canAny: (permissions: string[]) => boolean;
  canAll: (permissions: string[]) => boolean;
  hasRole: (role: Role) => boolean;
  setPermissions: (permissions: string[]) => void;
  setRoles: (roles: string[]) => void;
  addPermission: (permission: string) => void;
  removePermission: (permission: string) => void;
  addRole: (role: string) => void;
  removeRole: (role: string) => void;
}

export interface CanProps {
  permission?: Permission;
  role?: Role;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}
