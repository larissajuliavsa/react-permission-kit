import { default as React } from 'react';
interface PermissionProviderProps {
    initialPermissions?: string[];
    initialRoles?: string[];
    children: React.ReactNode;
}
export declare const PermissionProvider: React.FC<PermissionProviderProps>;
export {};
