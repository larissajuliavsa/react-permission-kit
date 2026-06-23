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
export const matchesPermissionPattern = (pattern: string, permission: string): boolean => {
  // Se não há wildcard, fazer match exato
  if (!pattern.includes("*")) {
    return pattern === permission;
  }

  // Converter padrão em regex
  // "admin.*" => "admin\\..*" => /^admin\..*$/
  // "users.*.delete" => "users\\..*\\.delete" => /^users\..*\.delete$/
  const regexPattern = pattern
    .split(".")
    .map((part) => {
      if (part === "*") {
        return ".*"; // Match anything including dots
      }
      return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex chars
    })
    .join("\\.");

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(permission);
};

/**
 * Checks if a permission matches any pattern in the list
 */
export const permissionMatchesAny = (
  permissions: string[],
  requiredPattern: string | string[]
): boolean => {
  const patterns = Array.isArray(requiredPattern) ? requiredPattern : [requiredPattern];

  return patterns.some((pattern) => permissions.some((perm) => matchesPermissionPattern(pattern, perm)));
};

/**
 * Checks if a permission matches all patterns in the list
 */
export const permissionMatchesAll = (
  permissions: string[],
  requiredPatterns: string[]
): boolean => {
  return requiredPatterns.every((pattern) =>
    permissions.some((perm) => matchesPermissionPattern(pattern, perm))
  );
};

/**
 * Hook for checking permissions with wildcard support
 */
export const useWildcardPermission = (permissions: string[]) => {
  return {
    canWithWildcard: (pattern: string | string[]): boolean => {
      if (typeof pattern === "string") {
        return permissions.some((perm) => matchesPermissionPattern(pattern, perm));
      }
      return permissionMatchesAll(permissions, pattern);
    },
    canAnyWithWildcard: (patterns: string[]): boolean => {
      return permissionMatchesAny(permissions, patterns);
    },
    canAllWithWildcard: (patterns: string[]): boolean => {
      return permissionMatchesAll(permissions, patterns);
    },
  };
};
