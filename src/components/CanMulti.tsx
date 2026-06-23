import React from "react";
import { usePermission } from "../hooks/usePermission";
import type { CanProps } from "../types/permissions";

export type CanMode = "all" | "any";

export interface CanMultiProps extends Omit<CanProps, "permission"> {
  permission?: string | string[];
  mode?: CanMode; // 'all' (AND) ou 'any' (OR) para múltiplas permissões
}

/**
 * Enhanced Can component with support for multiple modes
 *
 * Modes:
 * - 'all' (default): user must HAVE ALL permissions
 * - 'any': user must HAVE ANY ONE of the permissions
 *
 * Examples:
 * <CanMulti permission={["users.read", "users.write"]} mode="all">
 *   Edit user
 * </CanMulti>
 *
 * <CanMulti permission={["users.admin", "users.manager"]} mode="any">
 *   Admin or Manager
 * </CanMulti>
 */
export const CanMulti: React.FC<CanMultiProps> = ({
  permission,
  role,
  mode = "all",
  fallback = null,
  children,
}) => {
  const { can, canAll, canAny, hasRole } = usePermission();

  const hasAccessToPermission = (() => {
    if (!permission) {
      return true;
    }

    if (typeof permission === "string") {
      return can(permission);
    }

    // permission é um array
    if (mode === "any") {
      return canAny(permission);
    }

    // modo padrão "all"
    return canAll(permission);
  })();

  const hasAccessToRole = role ? hasRole(role) : true;

  const hasAccess = hasAccessToPermission && hasAccessToRole;

  return <>{hasAccess ? children : fallback}</>;
};
