import { NavLink, Outlet } from "react-router-dom";

const links = [
  ["/", "Dashboard"],
  ["/onboarding", "Onboarding"],
  ["/roadmap", "Roadmap"],
  ["/resources", "Resources"],
  ["/resume", "Resume"],
  ["/readiness", "Job Readiness"],
  ["/premium", "Premium"],
  ["/recruiter", "Recruiter"]
];

type LayoutProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4V2m0 20v-2m8-8h2M2 12h2m12.95 4.95 1.41 1.41M3.64 3.64l1.41 1.41m11.9-1.41-1.41 1.41M5.05 16.95l-1.41 1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 14.2A8.5 8.5 0 1 1 9.8 4 6.8 6.8 0 0 0 20 14.2Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function Layout({ theme, onToggleTheme }: LayoutProps) {
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-head">
          <div>
            <p className="eyebrow">AI Career OS</p>
            <h1>MyJobMate</h1>
            <p className="muted">Roadmaps, progress, premium tools, and hiring pathways in one place.</p>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} mode`}
            title={`Switch to ${nextTheme} mode`}
          >
            <span className="theme-toggle-icon">{theme === "light" ? <MoonIcon /> : <SunIcon />}</span>
          </button>
        </div>
        <nav className="nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
