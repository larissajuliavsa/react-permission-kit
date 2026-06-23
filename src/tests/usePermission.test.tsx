import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { PermissionProvider } from "../context/PermissionProvider";
import { usePermission } from "../hooks/usePermission";

describe("usePermission Hook", () => {
  it("should throw error when used outside PermissionProvider", () => {
    expect(() => {
      renderHook(() => usePermission());
    }).toThrow("usePermission must be used within a PermissionProvider");
  });

  it("should return initial permissions and roles", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PermissionProvider initialPermissions={["read", "write"]}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => usePermission(), { wrapper });

    expect(result.current.permissions).toEqual(["read", "write"]);
  });

  it("should check if user can perform action", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PermissionProvider initialPermissions={["users.read", "users.write"]}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => usePermission(), { wrapper });

    expect(result.current.can("users.read")).toBe(true);
    expect(result.current.can("users.delete")).toBe(false);
  });

  it("should check multiple permissions as array", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PermissionProvider initialPermissions={["users.read", "users.write"]}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => usePermission(), { wrapper });

    expect(result.current.can(["users.read", "users.write"])).toBe(true);
    expect(result.current.can(["users.read", "users.delete"])).toBe(false);
  });

  it("should check if user has role", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PermissionProvider initialRoles={["admin", "user"]}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => usePermission(), { wrapper });

    expect(result.current.hasRole("admin")).toBe(true);
    expect(result.current.hasRole("superuser")).toBe(false);
  });

  it("should add permission", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PermissionProvider initialPermissions={["read"]}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => usePermission(), { wrapper });

    expect(result.current.can("write")).toBe(false);

    act(() => {
      result.current.addPermission("write");
    });

    expect(result.current.can("write")).toBe(true);
    expect(result.current.permissions).toEqual(["read", "write"]);
  });

  it("should remove permission", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PermissionProvider initialPermissions={["read", "write"]}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => usePermission(), { wrapper });

    expect(result.current.can("write")).toBe(true);

    act(() => {
      result.current.removePermission("write");
    });

    expect(result.current.can("write")).toBe(false);
    expect(result.current.permissions).toEqual(["read"]);
  });

  it("should add role", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PermissionProvider initialRoles={["user"]}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => usePermission(), { wrapper });

    act(() => {
      result.current.addRole("admin");
    });

    expect(result.current.hasRole("admin")).toBe(true);
    expect(result.current.roles).toEqual(["user", "admin"]);
  });

  it("should remove role", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PermissionProvider initialRoles={["user", "admin"]}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => usePermission(), { wrapper });

    act(() => {
      result.current.removeRole("admin");
    });

    expect(result.current.hasRole("admin")).toBe(false);
    expect(result.current.roles).toEqual(["user"]);
  });
});
