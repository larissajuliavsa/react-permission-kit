import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { PermissionProvider } from "../context/PermissionProvider";
import { PermissionRoute, useCanAccessRoute } from "../components/PermissionRoute";

describe("Sprint 3 - Route Guards", () => {
  describe("PermissionRoute Component", () => {
    const TestComponent = () => <div data-testid="protected-component">Protected Content</div>;
    const NotAuthorized = () => <div data-testid="not-authorized">Acesso Negado</div>;

    it("should render component when user has permission", () => {
      render(
        <PermissionProvider initialPermissions={["dashboard.view"]}>
          <PermissionRoute component={TestComponent} permission="dashboard.view" />
        </PermissionProvider>
      );

      expect(screen.getByTestId("protected-component")).toBeInTheDocument();
    });

    it("should render fallback when user lacks permission", () => {
      render(
        <PermissionProvider initialPermissions={["dashboard.view"]}>
          <PermissionRoute 
            component={TestComponent} 
            permission="admin.access"
            fallback={<NotAuthorized />}
          />
        </PermissionProvider>
      );

      expect(screen.getByTestId("not-authorized")).toBeInTheDocument();
      expect(screen.queryByTestId("protected-component")).not.toBeInTheDocument();
    });

    it("should render default fallback when user lacks permission", () => {
      render(
        <PermissionProvider initialPermissions={["dashboard.view"]}>
          <PermissionRoute 
            component={TestComponent} 
            permission="admin.access"
          />
        </PermissionProvider>
      );

      expect(screen.getByText("Acesso Negado")).toBeInTheDocument();
      expect(screen.queryByTestId("protected-component")).not.toBeInTheDocument();
    });

    it("should support role-based access", () => {
      render(
        <PermissionProvider initialRoles={["admin"]}>
          <PermissionRoute 
            component={TestComponent} 
            role="admin"
          />
        </PermissionProvider>
      );

      expect(screen.getByTestId("protected-component")).toBeInTheDocument();
    });

    it("should support permission AND role", () => {
      render(
        <PermissionProvider 
          initialPermissions={["users.manage"]}
          initialRoles={["admin"]}
        >
          <PermissionRoute 
            component={TestComponent} 
            permission="users.manage"
            role="admin"
          />
        </PermissionProvider>
      );

      expect(screen.getByTestId("protected-component")).toBeInTheDocument();
    });

    it("should support multiple permissions with mode", () => {
      render(
        <PermissionProvider initialPermissions={["users.read", "users.write"]}>
          <PermissionRoute 
            component={TestComponent} 
            permission={["users.read", "users.write"]}
            mode="all"
          />
        </PermissionProvider>
      );

      expect(screen.getByTestId("protected-component")).toBeInTheDocument();
    });

    it("should support multiple permissions with mode any", () => {
      render(
        <PermissionProvider initialPermissions={["users.read"]}>
          <PermissionRoute 
            component={TestComponent} 
            permission={["users.read", "users.write"]}
            mode="any"
          />
        </PermissionProvider>
      );

      expect(screen.getByTestId("protected-component")).toBeInTheDocument();
    });
  });

  describe("useCanAccessRoute Hook", () => {
    it("should return true when user has permission", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["dashboard.view"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => useCanAccessRoute("dashboard.view"), { wrapper });

      expect(result.current).toBe(true);
    });

    it("should return false when user lacks permission", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["dashboard.view"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => useCanAccessRoute("admin.access"), { wrapper });

      expect(result.current).toBe(false);
    });

    it("should support role checking", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialRoles={["admin"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(() => useCanAccessRoute(undefined, "admin"), { wrapper });

      expect(result.current).toBe(true);
    });

    it("should support multiple permissions with mode all", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read", "users.write"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(
        () => useCanAccessRoute(["users.read", "users.write"], undefined, "all"),
        { wrapper }
      );

      expect(result.current).toBe(true);
    });

    it("should support multiple permissions with mode any", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <PermissionProvider initialPermissions={["users.read"]}>
          {children}
        </PermissionProvider>
      );

      const { result } = renderHook(
        () => useCanAccessRoute(["users.read", "users.write"], undefined, "any"),
        { wrapper }
      );

      expect(result.current).toBe(true);
    });
  });

  describe("Real-world scenarios", () => {
    const Dashboard = () => <div data-testid="dashboard">Dashboard</div>;
    const Users = () => <div data-testid="users">Users</div>;
    const Admin = () => <div data-testid="admin">Admin Panel</div>;

    it("should protect multiple routes correctly", () => {
      const { rerender } = render(
        <PermissionProvider 
          initialPermissions={["dashboard.view"]}
          initialRoles={["user"]}
        >
          <PermissionRoute component={Dashboard} permission="dashboard.view" />
          <PermissionRoute 
            component={Users} 
            permission="users.read"
            fallback={<div data-testid="users-fallback">No access</div>}
          />
          <PermissionRoute 
            component={Admin} 
            role="admin"
            fallback={<div data-testid="admin-fallback">Admin only</div>}
          />
        </PermissionProvider>
      );

      expect(screen.getByTestId("dashboard")).toBeInTheDocument();
      expect(screen.getByTestId("users-fallback")).toBeInTheDocument();
      expect(screen.getByTestId("admin-fallback")).toBeInTheDocument();
    });
  });
});
