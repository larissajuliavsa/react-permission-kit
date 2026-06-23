import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PermissionProvider } from "../context/PermissionProvider";
import { CanMulti } from "../components/CanMulti";

describe("CanMulti Component - Sprint 2", () => {
  describe("Mode: all (AND)", () => {
    it("should render when user has all permissions", () => {
      render(
        <PermissionProvider initialPermissions={["users.read", "users.write"]}>
          <CanMulti permission={["users.read", "users.write"]} mode="all">
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("should not render when user lacks one permission (mode=all)", () => {
      render(
        <PermissionProvider initialPermissions={["users.read"]}>
          <CanMulti permission={["users.read", "users.write"]} mode="all">
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    });

    it("should use 'all' mode as default", () => {
      render(
        <PermissionProvider initialPermissions={["users.read", "users.write"]}>
          <CanMulti permission={["users.read", "users.write"]}>
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });
  });

  describe("Mode: any (OR)", () => {
    it("should render when user has at least one permission", () => {
      render(
        <PermissionProvider initialPermissions={["users.read"]}>
          <CanMulti permission={["users.read", "users.write"]} mode="any">
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("should render when user has multiple matching permissions", () => {
      render(
        <PermissionProvider initialPermissions={["users.read", "users.write"]}>
          <CanMulti permission={["users.read", "users.write", "users.delete"]} mode="any">
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("should not render when user lacks all permissions", () => {
      render(
        <PermissionProvider initialPermissions={["users.read"]}>
          <CanMulti permission={["users.write", "users.delete"]} mode="any">
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    });
  });

  describe("Multiple permissions with role", () => {
    it("should render when user has permissions AND role", () => {
      render(
        <PermissionProvider initialPermissions={["users.read", "users.write"]} initialRoles={["admin"]}>
          <CanMulti 
            permission={["users.read", "users.write"]} 
            role="admin" 
            mode="all"
          >
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("should not render when user has permissions but no role", () => {
      render(
        <PermissionProvider initialPermissions={["users.read", "users.write"]} initialRoles={["user"]}>
          <CanMulti 
            permission={["users.read", "users.write"]} 
            role="admin" 
            mode="all"
          >
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    });
  });

  describe("Fallback", () => {
    it("should render fallback when lacking permissions in 'all' mode", () => {
      render(
        <PermissionProvider initialPermissions={["users.read"]}>
          <CanMulti 
            permission={["users.read", "users.write"]} 
            mode="all"
            fallback={<div data-testid="fallback">Sem Acesso</div>}
          >
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("fallback")).toBeInTheDocument();
      expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    });

    it("should render fallback when lacking permissions in 'any' mode", () => {
      render(
        <PermissionProvider initialPermissions={["users.read"]}>
          <CanMulti 
            permission={["users.write", "users.delete"]} 
            mode="any"
            fallback={<div data-testid="fallback">Sem Acesso</div>}
          >
            <div data-testid="content">Conteúdo</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("fallback")).toBeInTheDocument();
      expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    });
  });

  describe("Real-world scenarios", () => {
    it("should handle admin or manager scenario (mode=any)", () => {
      render(
        <PermissionProvider initialPermissions={["users.manage"]}>
          <CanMulti 
            permission={["admin.access", "users.manage"]} 
            mode="any"
          >
            <div data-testid="content">Admin Panel</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("should handle complex permission requirements", () => {
      render(
        <PermissionProvider 
          initialPermissions={["reports.view", "reports.export"]}
          initialRoles={["analyst"]}
        >
          <CanMulti 
            permission={["reports.view", "reports.export"]} 
            role="analyst"
            mode="all"
          >
            <div data-testid="content">Export Report</div>
          </CanMulti>
        </PermissionProvider>
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });
  });
});
