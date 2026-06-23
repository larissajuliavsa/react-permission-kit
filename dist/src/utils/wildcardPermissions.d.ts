/**
 * Utilitário para verificar permissões com suporte a wildcards
 *
 * Wildcards suportados:
 * - asterisco (*): combina zero ou mais caracteres em um nível ou múltiplos
 * - exemplos: "admin.*", "users.*.read", "*.delete"
 *
 * Exemplos:
 * matchesPermissionPattern("admin.*", "admin.users.read") => true
 * matchesPermissionPattern("admin.read", "admin.read") => true (match exato)
 * matchesPermissionPattern("users.*.delete", "users.admin.delete") => true
 * matchesPermissionPattern("admin.*", "users.read") => false
 */
export declare const matchesPermissionPattern: (pattern: string, permission: string) => boolean;
/**
 * Verifica se uma permissão corresponde a algum padrão da lista
 */
export declare const permissionMatchesAny: (permissions: string[], requiredPattern: string | string[]) => boolean;
/**
 * Verifica se uma permissão corresponde a todos os padrões da lista
 */
export declare const permissionMatchesAll: (permissions: string[], requiredPatterns: string[]) => boolean;
/**
 * Hook para verificar permissões com suporte a wildcards
 */
export declare const useWildcardPermission: (permissions: string[]) => {
    canWithWildcard: (pattern: string | string[]) => boolean;
    canAnyWithWildcard: (patterns: string[]) => boolean;
    canAllWithWildcard: (patterns: string[]) => boolean;
};
