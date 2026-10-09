import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppProvider, useApp, type TextSize } from "../lib/saathi";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted-foreground">This page does not exist.</p>
        <Link to="/" className="btn btn-primary mt-6">Go to Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-muted-foreground">Please try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn btn-primary">Try again</button>
          <a href="/" className="btn btn-outline">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SaathiGo — Every journey, with care" },
      { name: "description", content: "A senior-friendly ride-booking prototype for older adults in India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Lexend:wght@500;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </QueryClientProvider>
  );
}

function AppShell() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col">
      <Header />
      <main className="flex-1 px-4 pb-32 pt-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

function GearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
    </svg>
  );
}

function Header() {
  const { textSize, setTextSize, highContrast, setHighContrast } = useApp();
  const [open, setOpen] = useState(false);
  const sizes: { v: TextSize; label: string; name: string }[] = [
    { v: "normal", label: "A", name: "normal" },
    { v: "large", label: "A+", name: "large" },
    { v: "xlarge", label: "A++", name: "extra large" },
  ];
  const changed = textSize !== "normal" || highContrast;
  return (
    <header className="bg-primary px-4 pb-4 pt-3 text-primary-foreground">
      <p className="mb-2 inline-block rounded-full bg-warning px-3 py-0.5 text-sm font-bold text-warning-foreground">
        Student Prototype — Demonstration Only
      </p>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <Link to="/" className="shrink-0 rounded-lg" aria-label="SaathiGo home">
          <span className="block font-display text-2xl font-bold">Saathi<span className="text-accent">Go</span></span>
          <span className="block text-sm opacity-90">Every journey, with care.</span>
        </Link>
        <button
          className="btn relative ml-auto shrink-0 gap-1.5 whitespace-nowrap border-primary-foreground bg-transparent px-3 text-primary-foreground"
          aria-expanded={open}
          aria-controls="a11y-panel"
          aria-label="Comfort settings: text size and contrast"
          onClick={() => setOpen(!open)}
        >
          <GearIcon />
          <span>Settings</span>
          {changed && (
            <span
              aria-hidden="true"
              className="absolute right-1 top-1 h-3 w-3 rounded-full bg-accent ring-2 ring-primary"
            />
          )}
        </button>
      </div>
      {open && (
        <div id="a11y-panel" className="card mt-3 p-4 text-card-foreground">
          <h2 className="mb-3 font-display text-lg font-bold">Comfort settings</h2>
          <fieldset>
            <legend className="mb-2 font-bold">Text size</legend>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.v}
                  aria-pressed={textSize === s.v}
                  aria-label={`Text size ${s.name}`}
                  onClick={() => setTextSize(s.v)}
                  className={`btn ${textSize === s.v ? "btn-primary" : "btn-outline"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            role="switch"
            aria-checked={highContrast}
            onClick={() => setHighContrast(!highContrast)}
            className={`btn mt-3 w-full ${highContrast ? "btn-primary" : "btn-outline"}`}
          >
            High contrast: {highContrast ? "On" : "Off"}
          </button>
          <button onClick={() => setOpen(false)} className="btn btn-outline mt-3 w-full">
            Done
          </button>
        </div>
      )}
    </header>
  );
}

function BottomNav() {
  const items = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/rides", label: "My Rides", icon: "🚗" },
    { to: "/help", label: "Help", icon: "🛟" },
  ] as const;
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-10 border-t-2 bg-card">
      <ul className="mx-auto grid max-w-xl grid-cols-3">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              activeOptions={{ exact: true }}
              className="flex min-h-[4.5rem] flex-col items-center justify-center font-bold text-muted-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground", "aria-current": "page" }}
            >
              <span aria-hidden="true" className="text-2xl">{i.icon}</span>
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
