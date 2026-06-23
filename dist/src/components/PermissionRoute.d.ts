import { default as React } from 'react';
import { CanMultiProps } from './CanMulti';
export interface PermissionRouteProps extends Omit<CanMultiProps, "children" | "fallback"> {
    component: React.ComponentType<any>;
    fallback?: React.ReactNode;
    path?: string;
}
/**
 * PermissionRoute - Componente para proteção de rotas baseado em permissões
 *
 * Uso com React Router:
 * <Routes>
 *   <Route element={<PermissionRoute component={Dashboard} permission="dashboard.view" />} path="/dashboard" />
 *   <Route element={<PermissionRoute component={Users} permission={["users.read"]} mode="all" />} path="/users" />
 * </Routes>
 *
 * Ou standalone:
 * <PermissionRoute
 *   component={AdminPanel}
 *   permission="admin.access"
 *   fallback={<NotAuthorized />}
 * />
 */
export declare const PermissionRoute: React.FC<PermissionRouteProps>;
/**
 * Hook para verificar se uma rota é acessível
 * Útil para condicionar renderização de links de navegação
 *
 * Exemplo:
 * const canAccessUsers = useCanAccessRoute("users.read");
 * return canAccessUsers ? <Link to="/users">Usuários</Link> : null;
 */
export declare const useCanAccessRoute: (permission?: string | string[], role?: string, mode?: "all" | "any") => boolean;
