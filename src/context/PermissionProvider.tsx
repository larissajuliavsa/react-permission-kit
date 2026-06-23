import React, { useState, useCallback } from "react";
import { PermissionContext } from "./PermissionContext";
import type { PermissionContextType } from "../types/permissions";

interface PermissionProviderProps {
  initialPermissions?: string[];
  initialRoles?: string[];
  children: React.ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  initialPermissions = [],
  initialRoles = [],
  children,
}) => {
  const [permissions, setPermissions] = useState<string[]>(initialPermissions);
  const [roles, setRoles] = useState<string[]>(initialRoles);

  const can = useCallback(
    (permission: string | string[]): boolean => {
      const permissionsArray = Array.isArray(permission) ? permission : [permission];
      return permissionsArray.every((p) => permissions.includes(p));
    },
    [permissions]
  );

  const canAny = useCallback(
    (permissionsList: string[]): boolean => {
      return permissionsList.some((p) => permissions.includes(p));
    },
    [permissions]
  );

  const canAll = useCallback(
    (permissionsList: string[]): boolean => {
      return permissionsList.every((p) => permissions.includes(p));
    },
    [permissions]
  );

  const hasRole = useCallback(
    (role: string): boolean => {
      return roles.includes(role);
    },
    [roles]
  );

  const addPermission = useCallback((permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission) ? prev : [...prev, permission]
    );
  }, []);

  const removePermission = useCallback((permission: string) => {
    setPermissions((prev) => prev.filter((p) => p !== permission));
  }, []);

  const addRole = useCallback((role: string) => {
    setRoles((prev) => (prev.includes(role) ? prev : [...prev, role]));
  }, []);

  const removeRole = useCallback((role: string) => {
    setRoles((prev) => prev.filter((r) => r !== role));
  }, []);

  const value: PermissionContextType = {
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
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};
