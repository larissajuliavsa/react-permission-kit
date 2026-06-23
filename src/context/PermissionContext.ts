import { createContext } from "react";
import type { PermissionContextType } from "../types/permissions";

export const PermissionContext = createContext<PermissionContextType | undefined>(undefined);
