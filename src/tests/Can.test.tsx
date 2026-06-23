import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PermissionProvider } from "../context/PermissionProvider";
import { Can } from "../components/Can";

describe("Can Component", () => {
  it("should render children when user has permission", () => {
    render(
      <PermissionProvider initialPermissions={["users.read"]}>
        <Can permission="users.read">
          <div data-testid="restricted-content">Conteúdo Restrito</div>
        </Can>
      </PermissionProvider>
    );

    expect(screen.getByTestId("restricted-content")).toBeInTheDocument();
  });

  it("should not render children when user lacks permission", () => {
    render(
      <PermissionProvider initialPermissions={["users.read"]}>
        <Can permission="users.delete">
          <div data-testid="restricted-content">Conteúdo Restrito</div>
        </Can>
      </PermissionProvider>
    );

    expect(screen.queryByTestId("restricted-content")).not.toBeInTheDocument();
  });

  it("should render fallback when user lacks permission", () => {
    render(
      <PermissionProvider initialPermissions={["users.read"]}>
        <Can permission="users.delete" fallback={<div data-testid="fallback">Sem Acesso</div>}>
          <div data-testid="restricted-content">Conteúdo Restrito</div>
        </Can>
      </PermissionProvider>
    );

    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    expect(screen.queryByTestId("restricted-content")).not.toBeInTheDocument();
  });

  it("should render children when user has role", () => {
    render(
      <PermissionProvider initialRoles={["admin"]}>
        <Can role="admin">
          <div data-testid="admin-content">Conteúdo Admin</div>
        </Can>
      </PermissionProvider>
    );

    expect(screen.getByTestId("admin-content")).toBeInTheDocument();
  });

  it("should render children when user has both permission and role", () => {
    render(
      <PermissionProvider initialPermissions={["users.edit"]} initialRoles={["admin"]}>
        <Can permission="users.edit" role="admin">
          <div data-testid="restricted-content">Conteúdo Restrito</div>
        </Can>
      </PermissionProvider>
    );

    expect(screen.getByTestId("restricted-content")).toBeInTheDocument();
  });

  it("should not render when missing permission but having role", () => {
    render(
      <PermissionProvider initialPermissions={["users.read"]} initialRoles={["admin"]}>
        <Can permission="users.delete" role="admin">
          <div data-testid="restricted-content">Conteúdo Restrito</div>
        </Can>
      </PermissionProvider>
    );

    expect(screen.queryByTestId("restricted-content")).not.toBeInTheDocument();
  });

  it("should render without permission or role specified", () => {
    render(
      <PermissionProvider>
        <Can>
          <div data-testid="content">Conteúdo</div>
        </Can>
      </PermissionProvider>
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("should handle multiple permissions as array", () => {
    render(
      <PermissionProvider initialPermissions={["users.read", "users.write"]}>
        <Can permission={["users.read", "users.write"]}>
          <div data-testid="restricted-content">Conteúdo Restrito</div>
        </Can>
      </PermissionProvider>
    );

    expect(screen.getByTestId("restricted-content")).toBeInTheDocument();
  });
});
