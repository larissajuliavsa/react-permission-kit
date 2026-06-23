import { describe, it, expect } from "vitest";
import {
  matchesPermissionPattern,
  permissionMatchesAny,
  permissionMatchesAll,
  useWildcardPermission,
} from "../utils/wildcardPermissions";

describe("Sprint 4 - Wildcards", () => {
  describe("matchesPermissionPattern", () => {
    it("should match exact permissions", () => {
      expect(matchesPermissionPattern("users.read", "users.read")).toBe(true);
      expect(matchesPermissionPattern("admin.access", "admin.access")).toBe(true);
    });

    it("should match single wildcard", () => {
      expect(matchesPermissionPattern("admin.*", "admin.read")).toBe(true);
      expect(matchesPermissionPattern("admin.*", "admin.write")).toBe(true);
      expect(matchesPermissionPattern("admin.*", "admin.delete")).toBe(true);
      expect(matchesPermissionPattern("admin.*", "admin.users.read")).toBe(true);
    });

    it("should not match wildcard from different scope", () => {
      expect(matchesPermissionPattern("admin.*", "users.read")).toBe(false);
      expect(matchesPermissionPattern("users.*", "admin.read")).toBe(false);
    });

    it("should match nested wildcards", () => {
      expect(matchesPermissionPattern("admin.users.*", "admin.users.read")).toBe(true);
      expect(matchesPermissionPattern("admin.users.*", "admin.users.create")).toBe(true);
      expect(matchesPermissionPattern("admin.*.read", "admin.users.read")).toBe(true);
      expect(matchesPermissionPattern("admin.*.read", "admin.settings.read")).toBe(true);
    });

    it("should not match nested wildcards incorrectly", () => {
      expect(matchesPermissionPattern("admin.users.*", "admin.read")).toBe(false);
      expect(matchesPermissionPattern("admin.*.read", "admin.users.write")).toBe(false);
    });

    it("should handle multiple wildcards", () => {
      expect(matchesPermissionPattern("*.*.read", "admin.users.read")).toBe(true);
      expect(matchesPermissionPattern("*.*.read", "tenant.reports.read")).toBe(true);
      expect(matchesPermissionPattern("*.*.read", "admin.read")).toBe(false);
    });

    it("should handle wildcard at start", () => {
      expect(matchesPermissionPattern("*.read", "admin.read")).toBe(true);
      expect(matchesPermissionPattern("*.read", "users.read")).toBe(true);
      expect(matchesPermissionPattern("*.read", "admin.write")).toBe(false);
    });

    it("should handle wildcard at end", () => {
      expect(matchesPermissionPattern("admin.*", "admin.anything")).toBe(true);
      expect(matchesPermissionPattern("users.*", "users.management")).toBe(true);
    });
  });

  describe("permissionMatchesAny", () => {
    it("should match any single permission pattern", () => {
      const permissions = ["users.read", "users.write", "admin.access"];

      expect(permissionMatchesAny(permissions, "users.*")).toBe(true);
      expect(permissionMatchesAny(permissions, "admin.*")).toBe(true);
      expect(permissionMatchesAny(permissions, "reports.*")).toBe(false);
    });

    it("should match any of multiple patterns", () => {
      const permissions = ["users.read", "admin.access"];

      expect(
        permissionMatchesAny(permissions, ["users.write", "users.*"])
      ).toBe(true);

      expect(
        permissionMatchesAny(permissions, ["reports.read", "admin.*"])
      ).toBe(true);

      expect(
        permissionMatchesAny(permissions, ["reports.*", "settings.*"])
      ).toBe(false);
    });
  });

  describe("permissionMatchesAll", () => {
    it("should match all permission patterns", () => {
      const permissions = ["users.read", "users.write", "admin.access"];

      expect(
        permissionMatchesAll(permissions, ["users.*", "admin.*"])
      ).toBe(true);
    });

    it("should not match if missing one pattern", () => {
      const permissions = ["users.read", "users.write"];

      expect(
        permissionMatchesAll(permissions, ["users.*", "admin.*"])
      ).toBe(false);
    });

    it("should handle exact match with wildcards", () => {
      const permissions = ["admin.users.read", "admin.settings.write"];

      expect(
        permissionMatchesAll(permissions, ["admin.*.read", "admin.*.write"])
      ).toBe(true);

      expect(
        permissionMatchesAll(permissions, ["admin.*.read", "admin.*.delete"])
      ).toBe(false);
    });
  });

  describe("useWildcardPermission Hook", () => {
    it("should provide canWithWildcard", () => {
      const { canWithWildcard } = useWildcardPermission([
        "users.read",
        "users.write",
        "admin.access",
      ]);

      expect(canWithWildcard("users.*")).toBe(true);
      expect(canWithWildcard("admin.*")).toBe(true);
      expect(canWithWildcard("reports.*")).toBe(false);
    });

    it("should provide canAnyWithWildcard", () => {
      const { canAnyWithWildcard } = useWildcardPermission([
        "users.read",
        "admin.access",
      ]);

      expect(canAnyWithWildcard(["users.*", "reports.*"])).toBe(true);
      expect(canAnyWithWildcard(["reports.*", "settings.*"])).toBe(false);
    });

    it("should provide canAllWithWildcard", () => {
      const { canAllWithWildcard } = useWildcardPermission([
        "users.read",
        "users.write",
        "admin.access",
      ]);

      expect(canAllWithWildcard(["users.*", "admin.*"])).toBe(true);
      expect(canAllWithWildcard(["users.*", "reports.*"])).toBe(false);
    });
  });

  describe("Real-world scenarios", () => {
    it("should handle admin wildcard scenario", () => {
      const adminPermissions = ["admin.*"];
      const userPermissions = ["users.read", "reports.view"];

      // Admin tem acesso a tudo que começa com admin
      expect(permissionMatchesAny(["admin.users.read"], "admin.*")).toBe(true);

      // User não tem acesso a admin
      expect(permissionMatchesAny(userPermissions, "admin.*")).toBe(false);
    });

    it("should handle module.resource.action pattern", () => {
      const permissions = [
        "accounting.invoices.read",
        "accounting.invoices.write",
        "accounting.reports.read",
        "sales.orders.read",
      ];

      // Todos os acessos de accounting
      expect(permissionMatchesAny(permissions, "accounting.*")).toBe(true);

      // Todos os reads
      expect(permissionMatchesAny(permissions, "*.*.read")).toBe(true);

      // Todos os invoices
      expect(permissionMatchesAny(permissions, "*.invoices.*")).toBe(true);

      // Apenas accounting invoices
      expect(permissionMatchesAny(permissions, "accounting.invoices.*")).toBe(true);

      // Sem acesso a HR
      expect(permissionMatchesAny(permissions, "hr.*")).toBe(false);
    });

    it("should handle tenant-based permissions with wildcards", () => {
      const tenantAPermissions = [
        "tenant:acme.users.read",
        "tenant:acme.users.write",
        "tenant:acme.reports.read",
      ];

      // Acesso a todos os usuários da ACME
      expect(permissionMatchesAny(tenantAPermissions, "tenant:acme.users.*")).toBe(true);

      // Acesso a tudo da ACME
      expect(permissionMatchesAny(tenantAPermissions, "tenant:acme.*")).toBe(true);

      // Sem acesso a BETA
      expect(permissionMatchesAny(tenantAPermissions, "tenant:beta.*")).toBe(false);
    });
  });
});
