import React from "react";
import { usePermission } from "../hooks/usePermission";
import type { CanProps } from "../types/permissions";

export const Can: React.FC<CanProps> = ({
  permission,
  role,
  fallback = null,
  children,
}) => {
  const { can, hasRole } = usePermission();

  const hasAccess = (() => {
    if (permission && role) {
      return can(permission) && hasRole(role);
    }
    if (permission) {
      return can(permission);
    }
    if (role) {
      return hasRole(role);
    }
    return true;
  })();

  return <>{hasAccess ? children : fallback}</>;
};
