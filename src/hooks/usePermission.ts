import { useContext } from "react";
import { PermissionContext } from "../context/PermissionContext";
import type { PermissionContextType } from "../types/permissions";

export const usePermission = (): PermissionContextType => {
  const context = useContext(PermissionContext);

  if (context === undefined) {
    throw new Error(
      "usePermission must be used within a PermissionProvider"
    );
  }

  return context;
};
