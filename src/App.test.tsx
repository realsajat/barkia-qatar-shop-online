/**
 * Test file: src/App.test.tsx
 *
 * Testing library/framework note:
 * - Preferred stack: React Testing Library with Jest or Vitest.
 * - These tests use @testing-library/react and @testing-library/jest-dom assertions.
 * - If the project uses Vitest, its Jest-compatible APIs (describe/test/expect/vi) will work.
 */

import React, { Suspense } from "react";
import { describe, test, expect, beforeEach, vi } from "vitest"; // Vitest API; if using Jest, this is auto-provided
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import type { MemoryRouterProps } from "react-router-dom";

// Mock react-router-dom's BrowserRouter to be MemoryRouter for testable navigation
vi.mock("react-router-dom", async (importOriginal) => {
  const mod: any = await importOriginal();
  // Wrap MemoryRouter to accept initialEntries from tests via data attribute
  const MemoryRouter = mod.MemoryRouter as React.ComponentType<MemoryRouterProps>;
  const BrowserRouterShim: React.FC<React.PropsWithChildren<{ initialEntries?: string[] }>> = ({ children, initialEntries }) => (
    <MemoryRouter initialEntries={initialEntries || ["/"]}>{children}</MemoryRouter>
  );
  return {
    ...mod,
    BrowserRouter: BrowserRouterShim,
  };
});

// Mock UI components that are not critical to logic
vi.mock("@/components/ui/toaster", () => ({
  Toaster: () => <div data-testid="toaster" />,
}));
vi.mock("@/components/ui/sonner", () => ({
  Toaster: () => <div data-testid="sonner" />,
}));
vi.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="tooltip-provider">{children}</div>,
}));
vi.mock("@/components/ImagePreloader", () => ({
  default: () => <div data-testid="image-preloader" />,
}));

// Mock all lazy-loaded pages to simple identifiable components
vi.mock("./pages/Index", () => ({ default: () => <h1>Home Page</h1> }));
vi.mock("./pages/Products", () => ({ default: () => <h1>Products Page</h1> }));
vi.mock("./pages/ProductDetail", () => ({ default: () => <h1>Product Detail Page</h1> }));
vi.mock("./pages/About", () => ({ default: () => <h1>About Page</h1> }));
vi.mock("./pages/Contact", () => ({ default: () => <h1>Contact Page</h1> }));
vi.mock("./pages/NotFound", () => ({ default: () => <h1>Not Found</h1> }));

// Import after mocks so App wires in the mocked modules
import App from "./App";

// Helper to render with initial route (thanks to mocked BrowserRouter)
const renderAt = (path: string = "/") => {
  // We pass initial route through a prop on the mocked BrowserRouter replacement
  // by setting a data attribute on a wrapper that App can ignore. Since App itself
  // instantiates <BrowserRouter>, we rely on our module mock to treat it as MemoryRouter
  // with initialEntries; we inject via a global shim on the component's props using vi.spy.
  // Simplify: we temporarily override React.createElement for BrowserRouter to pass initialEntries.
  const createElementSpy = vi.spyOn(React, "createElement");
  createElementSpy.mockImplementation(((type: any, props: any, ...children: any[]) => {
    if (type && (type as any).name === "BrowserRouterShim") {
      return (React.createElement as any).wrappedOrig(type, { ...props, initialEntries: [path] }, ...children);
    }
    return (React.createElement as any).wrappedOrig(type, props, ...children);
  }) as any);
  // Preserve original to call inside our impl
  (React.createElement as any).wrappedOrig ||= (React.createElement as any);

  const result = render(<App />);
  // restore immediately so other elements are unaffected
  createElementSpy.mockRestore();
  return result;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("App routing and providers", () => {
  test("shows Suspense fallback (PageLoader) initially and then renders Home Page for '/'", async () => {
    renderAt("/");
    // The skeleton loader structure should be visible quickly; we check by class hints present in fallback
    // We use role/presence since fallback is a generic div; look for loading circle via class
    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();

    // After lazy resolves, the Home Page should appear
    await screen.findByRole("heading", { name: "Home Page" });
    // Fallback should disappear
    await waitFor(() => {
      expect(document.querySelector(".animate-pulse")).not.toBeInTheDocument();
    });
  });

  test("navigates to /products and renders Products Page", async () => {
    renderAt("/products");
    await screen.findByRole("heading", { name: "Products Page" });
  });

  test("navigates to /products/123 and renders Product Detail Page", async () => {
    renderAt("/products/123");
    await screen.findByRole("heading", { name: "Product Detail Page" });
  });

  test("navigates to /about and renders About Page", async () => {
    renderAt("/about");
    await screen.findByRole("heading", { name: "About Page" });
  });

  test("navigates to /contact and renders Contact Page", async () => {
    renderAt("/contact");
    await screen.findByRole("heading", { name: "Contact Page" });
  });

  test("unknown route renders NotFound page via catch-all", async () => {
    renderAt("/this/does/not/exist");
    await screen.findByRole("heading", { name: "Not Found" });
  });

  test("providers are mounted: Toaster, Sonner, TooltipProvider, ImagePreloader, and QueryClientProvider context", async () => {
    renderAt("/");
    // Verify provider components are present
    expect(screen.getByTestId("toaster")).toBeInTheDocument();
    expect(screen.getByTestId("sonner")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-provider")).toBeInTheDocument();
    expect(screen.getByTestId("image-preloader")).toBeInTheDocument();

    // React Query context smoke check: create a simple consumer to assert the context exists
    // We dynamically import QueryClient and use its hook inside a test component.
    const { useQueryClient } = await import("@tanstack/react-query");
    const Probe: React.FC = () => {
      const qc = useQueryClient();
      return <div data-testid="rq-present">{qc ? "yes" : "no"}</div>;
    };
    const { rerender } = render(
      <Suspense fallback={null}>
        <Probe />
      </Suspense>
    );
    // Rerender within the same tree ensures provider context remains available
    rerender(
      <Suspense fallback={null}>
        <Probe />
      </Suspense>
    );
    expect(await screen.findByTestId("rq-present")).toHaveTextContent("yes");
  });

  test("gracefully handles rapid route changes (fallback can appear again during re-suspense)", async () => {
    renderAt("/products");
    await screen.findByRole("heading", { name: "Products Page" });

    // Trigger another route programmatically by re-rendering at a new path
    renderAt("/about");
    // Fallback may briefly appear again
    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
    await screen.findByRole("heading", { name: "About Page" });
  });
});