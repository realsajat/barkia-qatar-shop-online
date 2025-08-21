/**
 * Additional tests for Navbar component.
 * Frameworks/Libraries: React Testing Library + jest-dom.
 * Runner-agnostic: works with Jest or Vitest (uses globalThis.vi || globalThis.jest).
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Detect test runner (Vitest or Jest)
const runner: any = (globalThis as any).vi ?? (globalThis as any).jest;

// Mock alias-based UI button to avoid path alias resolution issues in tests
if (runner?.mock) {
  runner.mock("@/components/ui/button", () => ({
    // minimal shim behaves like a native button
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  }));
}

// Optional: lucide-react can remain real; if missing, uncomment the mock below.
// if (runner?.mock) {
//   runner.mock("lucide-react", () => {
//     const Icon = (props: any) => <svg {...props} />;
//     return { Menu: Icon, X: Icon, Home: Icon, ShoppingCart: Icon, Info: Icon, MessageCircle: Icon };
//   });
// }

import Navbar from "./Navbar";

// Utility to render with router
function renderWithRoute(route: string = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Navbar />
    </MemoryRouter>
  );
}

// Helpers to create sections with deterministic geometry in JSDOM
function createSection(id: string, top: number, height: number) {
  const el = document.createElement("div");
  el.setAttribute("id", id);
  Object.defineProperty(el, "offsetTop", { get: () => top });
  Object.defineProperty(el, "offsetHeight", { get: () => height });
  // stub smooth scroll
  (el as any).scrollIntoView = runner?.fn ? runner.fn() : (() => {});
  document.body.appendChild(el);
  return el;
}

afterEach(() => {
  // restore mocks/spies between tests
  if (runner?.restoreAllMocks) runner.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("Navbar", () => {
  test("renders brand and main navigation buttons", () => {
    renderWithRoute("/");
    // brand text
    expect(screen.getByText("Al Arabia Carpets")).toBeInTheDocument();
    // brand image alt (as coded)
    expect(screen.getByAltText("Al Arabia Qarpets Logo")).toBeInTheDocument();

    // desktop nav buttons
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contact" })).toBeInTheDocument();

    // external links
    expect(screen.getByRole("link", { name: "All Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  test("desktop: on home page clicking a section button scrolls and marks it active", async () => {
    // create sections to scroll into
    createSection("home", 0, 200);
    const productsEl = createSection("products", 220, 200);
    createSection("contact", 500, 300);

    renderWithRoute("/");

    const productsBtn = screen.getByRole("button", { name: "Products" });
    fireEvent.click(productsBtn);

    // scrollIntoView called with smooth behavior
    const scrollSpy = (productsEl as any).scrollIntoView;
    if (scrollSpy && "mock" in scrollSpy) {
      expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
    }

    // products button should be highlighted as active on home page
    await waitFor(() => {
      expect(productsBtn).toHaveClass("bg-white/20");
      expect(productsBtn).toHaveClass("text-white");
    });
  });

  test("route-based active styling: All Products and About links highlight on their routes", () => {
    // /products route
    renderWithRoute("/products");
    const allProducts = screen.getByRole("link", { name: "All Products" });
    expect(allProducts).toHaveClass("bg-white/20");
    expect(allProducts).toHaveClass("text-white");

    // Rerender on /about
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Navbar />
      </MemoryRouter>
    );
    const about = screen.getByRole("link", { name: "About" });
    expect(about).toHaveClass("bg-white/20");
    expect(about).toHaveClass("text-white");
  });

  test("non-home page: clicking a section button navigates to home with hash", () => {
    // override location to capture assignment
    const originalLocation = window.location;
    Object.defineProperty(window, "location", { value: { href: "http://localhost/about" }, writable: true });

    try {
      renderWithRoute("/about");
      const contactBtn = screen.getByRole("button", { name: "Contact" });
      fireEvent.click(contactBtn);
      expect(window.location.href).toBe("/#contact");
    } finally {
      // restore
      Object.defineProperty(window, "location", { value: originalLocation, writable: true });
    }
  });

  test("mobile menu: toggles open/close and closes when a mobile link is clicked", () => {
    renderWithRoute("/");

    const toggle = screen.getByLabelText("Toggle menu");
    const beforeCount = screen.getAllByRole("button", { name: "Products" }).length;

    // open mobile menu
    fireEvent.click(toggle);
    const afterOpenCount = screen.getAllByRole("button", { name: "Products" }).length;
    expect(afterOpenCount).toBeGreaterThan(beforeCount);

    // Click the mobile 'About' link (choose the last one which belongs to mobile menu)
    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    fireEvent.click(aboutLinks[aboutLinks.length - 1]);

    // Menu should close (count returns to baseline)
    const afterCloseCount = screen.getAllByRole("button", { name: "Products" }).length;
    expect(afterCloseCount).toBe(beforeCount);
  });

  test("adds scroll listener with passive:true on home and removes it on unmount", () => {
    const addSpy = runner?.spyOn ? runner.spyOn(window, "addEventListener") : null;
    const removeSpy = runner?.spyOn ? runner.spyOn(window, "removeEventListener") : null;

    const { unmount } = renderWithRoute("/");
    if (addSpy) {
      const calls = (addSpy as any).mock.calls.filter((c: any[]) => c[0] === "scroll");
      expect(calls.length).toBeGreaterThan(0);
      // verify passive option
      const optionsArg = calls[0][2];
      if (typeof optionsArg === "object" && optionsArg !== null) {
        expect((optionsArg as any).passive).toBe(true);
      }
    }

    unmount();

    if (removeSpy) {
      const removeCalls = (removeSpy as any).mock.calls.filter((c: any[]) => c[0] === "scroll");
      expect(removeCalls.length).toBeGreaterThan(0);
    }
  });

  test("scrolling updates active section based on current position (throttled handler)", async () => {
    // sections laid out so that currentPos=scrollY+100 lands within 'products'
    createSection("home", 0, 120);
    createSection("products", 130, 260);
    createSection("contact", 420, 260);

    renderWithRoute("/");

    // Set scroll position such that currentPos=250 (within products range 130..390)
    Object.defineProperty(window, "scrollY", { value: 150, writable: true });

    // Dispatch a scroll event
    window.dispatchEvent(new Event("scroll"));

    const productsBtn = screen.getByRole("button", { name: "Products" });

    // Wait for active class to be applied (effect + throttle)
    await waitFor(() => {
      expect(productsBtn).toHaveClass("bg-white/20");
      expect(productsBtn).toHaveClass("text-white");
    });
  });
});