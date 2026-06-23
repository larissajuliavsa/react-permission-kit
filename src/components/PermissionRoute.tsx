import React from "react";
import { usePermission } from "../hooks/usePermission";
import type { CanMultiProps } from "./CanMulti";

export interface PermissionRouteProps extends Omit<CanMultiProps, "children" | "fallback"> {
  component: React.ComponentType<any>;
  fallback?: React.ReactNode;
  path?: string;
}

/**
 * PermissionRoute - Component for route protection based on permissions
 *
 * Usage with React Router:
 * <Routes>
 *   <Route element={<PermissionRoute component={Dashboard} permission="dashboard.view" />} path="/dashboard" />
 *   <Route element={<PermissionRoute component={Users} permission={["users.read"]} mode="all" />} path="/users" />
 * </Routes>
 *
 * Or standalone:
 * <PermissionRoute 
 *   component={AdminPanel} 
 *   permission="admin.access"
 *   fallback={<NotAuthorized />}
 * />
 */
export const PermissionRoute: React.FC<PermissionRouteProps> = ({
  component: Component,
  permission,
  role,
  fallback = <div>Acesso Negado</div>,
  path,
  ...props
}) => {
  const { can, canAll, canAny, hasRole } = usePermission();

  const hasAccessToPermission = (() => {
    if (!permission) {
      return true;
    }

    if (typeof permission === "string") {
      return can(permission);
    }

    // permission é um array - usar modo all por padrão
    const mode = (props as any).mode || "all";
    if (mode === "any") {
      return canAny(permission);
    }

    return canAll(permission);
  })();

  const hasAccessToRole = role ? hasRole(role) : true;

  const hasAccess = hasAccessToPermission && hasAccessToRole;

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <Component />;
};

/**
 * Hook to check if a route is accessible
 * Useful for conditioning navigation link rendering
 *
 * Example:
 * const canAccessUsers = useCanAccessRoute("users.read");
 * return canAccessUsers ? <Link to="/users">Users</Link> : null;
 */
export const useCanAccessRoute = (
  permission?: string | string[],
  role?: string,
  mode: "all" | "any" = "all"
): boolean => {
  const { can, canAll, canAny, hasRole } = usePermission();

  const hasAccessToPermission = (() => {
    if (!permission) {
      return true;
    }

    if (typeof permission === "string") {
      return can(permission);
    }

    if (mode === "any") {
      return canAny(permission);
    }

    return canAll(permission);
  })();

  const hasAccessToRole = role ? hasRole(role) : true;

  return hasAccessToPermission && hasAccessToRole;
};
