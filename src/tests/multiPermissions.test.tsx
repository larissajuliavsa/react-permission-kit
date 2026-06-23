import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { PermissionProvider } from "../context/PermissionProvider";
import { usePermission } from "../hooks/usePermission";

describe("Sprint 2 - Multi Permissions", () => {
  describe("canAll - Múltiplas permissões (AND)", () => {
    it("should return true when user has all permissions", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read", "users.write", "users.delete"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAll(["users.read", "users.write"])).toBe(true);
      expect(result.current.canAll(["users.read", "users.write", "users.delete"])).toBe(true);
    });

    it("should return false when user lacks one permission", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read", "users.write"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAll(["users.read", "users.delete"])).toBe(false);
      expect(result.current.canAll(["users.create", "users.update"])).toBe(false);
    });

    it("should return true for empty array", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAll([])).toBe(true);
    });

    it("should handle single permission in array", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAll(["users.read"])).toBe(true);
      expect(result.current.canAll(["users.write"])).toBe(false);
    });
  });

  describe("canAny - Múltiplas permissões (OR)", () => {
    it("should return true when user has at least one permission", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAny(["users.read", "users.write"])).toBe(true);
      expect(result.current.canAny(["users.delete", "users.read"])).toBe(true);
    });

    it("should return false when user lacks all permissions", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAny(["users.write", "users.delete"])).toBe(false);
      expect(result.current.canAny(["users.create", "users.update"])).toBe(false);
    });

    it("should return true when user has multiple matching permissions", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read", "users.write", "users.delete"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAny(["users.read", "users.write"])).toBe(true);
      expect(result.current.canAny(["users.create", "users.read", "users.update"])).toBe(true);
    });

    it("should return false for empty array", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAny([])).toBe(false);
    });

    it("should handle single permission in array", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      expect(result.current.canAny(["users.read"])).toBe(true);
      expect(result.current.canAny(["users.write"])).toBe(false);
    });
  });

  describe("Real-world scenarios", () => {
    it("should handle admin override scenario", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["admin.access"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      // Admin pode fazer qualquer coisa
      expect(result.current.canAny(["users.delete", "users.update", "admin.access"])).toBe(true);
    });

    it("should handle role-based multi-action scenario", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={[
          "reports.view",
          "reports.export",
          "reports.email",
        ]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      // Usuário pode fazer todas as operações de reports
      expect(result.current.canAll(["reports.view", "reports.export"])).toBe(true);

      // Usuário pode escolher entre algumas ações
      expect(result.current.canAny(["reports.delete", "reports.export"])).toBe(true);
    });

    it("should handle multi-tenant scenario", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={[
          "tenant:acme.users.read",
          "tenant:acme.users.write",
          "tenant:beta.users.read",
        ]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => usePermission(), { wrapper });

      // User tem todas as permissões para ACME
      expect(result.current.canAll(["tenant:acme.users.read", "tenant:acme.users.write"])).toBe(
        true
      );

      // User não tem write para BETA
      expect(result.current.canAll(["tenant:beta.users.read", "tenant:beta.users.write"])).toBe(
        false
      );

      // Mas tem read para algum tenant
      expect(result.current.canAny(["tenant:acme.users.read", "tenant:beta.users.read"])).toBe(
        true
      );
    });
  });
});
