import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PermissionProvider } from "../context/PermissionProvider";
import { usePermission } from "../hooks/usePermission";

describe("PermissionProvider", () => {
  const TestComponent = () => {
    const { permissions, roles } = usePermission();
    return (
      <div>
        <div data-testid="permissions">{JSON.stringify(permissions)}</div>
        <div data-testid="roles">{JSON.stringify(roles)}</div>
      </div>
    );
  };

  it("should provide initial permissions and roles", () => {
    render(
      <PermissionProvider initialPermissions={["read", "write"]} initialRoles={["admin"]}>
        <TestComponent />
      </PermissionProvider>
    );

    expect(screen.getByTestId("permissions")).toHaveTextContent(
      JSON.stringify(["read", "write"])
    );
    expect(screen.getByTestId("roles")).toHaveTextContent(JSON.stringify(["admin"]));
  });

  it("should have empty permissions and roles by default", () => {
    render(
      <PermissionProvider>
        <TestComponent />
      </PermissionProvider>
    );

    expect(screen.getByTestId("permissions")).toHaveTextContent("[]");
    expect(screen.getByTestId("roles")).toHaveTextContent("[]");
  });

  it("should work with multiple children using context", () => {
    const Component1 = () => {
      const { permissions } = usePermission();
      return <div data-testid="comp1">{permissions.length}</div>;
    };

    const Component2 = () => {
      const { permissions } = usePermission();
      return <div data-testid="comp2">{permissions.length}</div>;
    };

    render(
      <PermissionProvider initialPermissions={["read", "write", "delete"]}>
        <Component1 />
        <Component2 />
      </PermissionProvider>
    );

    expect(screen.getByTestId("comp1")).toHaveTextContent("3");
    expect(screen.getByTestId("comp2")).toHaveTextContent("3");
  });
});
