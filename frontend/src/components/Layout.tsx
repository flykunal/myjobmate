import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const links = [
  ["/", "Dashboard"],
  ["/onboarding", "Onboarding"],
  ["/roadmap", "Roadmap"],
  ["/resources", "Resources"],
  ["/resume", "Resume"],
  ["/readiness", "Job Readiness"],
  ["/premium", "Premium"],
  ["/recruiter", "Recruiter"]
] as const;

const topNavLinks = [
  ["/", "Dashboard"],
  ["/roadmap", "Roadmap"],
  ["/resources", "Resources"],
  ["/resume", "Resume"]
] as const;
const footerMetaLinks = ["Jobs", "Bug Bounty", "Students", "Terms", "Privacy Policy", "India"];
const footerCompanyLinks = ["About MyJobMate", "Updates", "Partnerships", "For Colleges", "Work With Us"];
const footerGuideLinks = ["Career roadmaps", "Resume improvement", "Interview readiness", "Skill gap analysis", "Portfolio guidance"];
const footerAdviceLinks = ["Students", "Career switchers", "Working professionals", "Role planning", "Browse roadmap tracks"];
const footerSupportLinks = ["Contact us", "FAQ", "Terms of Service", "Privacy Policy", "Cookie Policy"];
const socialLinks = [
  { label: "X", key: "x" },
  { label: "Instagram", key: "instagram" },
  { label: "Facebook", key: "facebook" },
  { label: "LinkedIn", key: "linkedin" },
  { label: "YouTube", key: "youtube" }
] as const;
const searchTargets = [
  { label: "Onboarding", path: "/onboarding" },
  { label: "Roadmap", path: "/roadmap" },
  { label: "Resources", path: "/resources" },
  { label: "Resume", path: "/resume" },
  { label: "Job Readiness", path: "/readiness" },
  { label: "Premium", path: "/premium" }
] as const;

type LayoutProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m12.95 4.95 1.41 1.41M3.64 3.64l1.41 1.41m11.9-1.41-1.41 1.41M5.05 16.95l-1.41 1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4 6.8 6.8 0 0 0 20 14.2Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4l14 16M19 4 5 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 20v-7h2.4l.4-3h-2.8V8.2c0-.9.3-1.6 1.6-1.6H16V4.1c-.3 0-.9-.1-1.8-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2v7h3.5Z" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5.5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm5 0h2.9v1.3h.1c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8V19h-3v-4.1c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H10v-9Z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7.5h16v9H4v-9Zm3 2.5 5 3 5-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
  }
}

function MJMLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "mjm-logo compact" : "mjm-logo"} aria-hidden="true">
      <svg viewBox="0 0 96 96" role="presentation">
        <defs>
          <linearGradient id="mjmFrame" x1="10" y1="10" x2="86" y2="86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#63B3FF" />
            <stop offset="1" stopColor="#8DE9D2" />
          </linearGradient>
          <linearGradient id="mjmFill" x1="18" y1="16" x2="78" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#173B5C" />
            <stop offset="1" stopColor="#0B1A2D" />
          </linearGradient>
        </defs>
        <rect x="7" y="7" width="82" height="82" rx="26" fill="url(#mjmFrame)" />
        <rect x="13" y="13" width="70" height="70" rx="22" fill="url(#mjmFill)" />
        <path d="M20 64V32h8l8 14 8-14h8v32h-7V44l-8 13-8-13v20h-9Z" fill="#F8FAFC" />
        <path d="M52 64V32h8l8 14 8-14h1v32h-7V44l-7 13h-4l-7-13v20h-7Z" fill="#8DE9D2" />
        <circle cx="72" cy="24" r="5" fill="#F6D28B" />
      </svg>
      <span>MJM</span>
    </div>
  );
}

function FooterLinkGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="site-footer-column">
      <h4>{title}</h4>
      <div className="site-footer-link-list">
        {items.map((item) => (
          <a key={item} href="#">{item}</a>
        ))}
      </div>
    </div>
  );
}

export function Layout({ theme, onToggleTheme }: LayoutProps) {
  const nextTheme = theme === "light" ? "dark" : "light";
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 24) {
        setNavbarHidden(false);
      } else if (currentScrollY > lastScrollY + 8 && !sidebarOpen) {
        setNavbarHidden(true);
      } else if (currentScrollY < lastScrollY - 8) {
        setNavbarHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) {
      return;
    }
const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen]);

  const searchMatches = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [] as Array<typeof searchTargets[number]>;
    return searchTargets.filter((item) => item.label.toLowerCase().includes(term));
  }, [searchTerm]);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    const targetMatch = searchTargets.find((item) => item.label.toLowerCase().includes(term));
    const linkMatch = links.find(([, label]) => label.toLowerCase().includes(term));
    const nextPath = targetMatch?.path ?? linkMatch?.[0];

    if (nextPath) {
      navigate(nextPath);
      setSearchTerm("");
    }
  }

  return (
    <div className="app-frame">
      <header className={navbarHidden ? "global-navbar is-hidden" : "global-navbar"}>
        <div className="global-navbar-inner simplified">
          <div className="global-navbar-brand-wrap">
            <button type="button" className="menu-toggle" onClick={() => setSidebarOpen((current) => !current)} aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}>
              <MenuIcon />
            </button>
            <div className="global-navbar-brand" onClick={() => navigate("/")} role="button" tabIndex={0}>
              <MJMLogo compact />
              <div>
                <p className="eyebrow">AI Career OS</p>
                <strong>MyJobMate</strong>
              </div>
            </div>
          </div>

          <nav className="global-navbar-links simplified">
            {topNavLinks.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "global-nav-link active" : "global-nav-link")}>
                {label}
              </NavLink>
            ))}
          </nav>

          <form className="global-navbar-search simplified" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search pages"
              aria-label="Search workspace"
            />
            {searchMatches.length > 0 ? (
              <div className="top-search-results">
                {searchMatches.map((item) => (
                  <button key={item.path} type="button" className="top-search-result" onClick={() => { navigate(item.path); setSearchTerm(""); }}>
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
          </form>

          <div className="global-navbar-actions simplified">
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
        </div>
      </header>

      <div className={sidebarOpen ? "drawer-layer show" : "drawer-layer"}>
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        <aside className={sidebarOpen ? "sidebar sidebar-drawer open" : "sidebar sidebar-drawer"} onClick={(event) => event.stopPropagation()}>
          <nav className="nav">
            {links.map(([to, label]) => {
              const isActive = location.pathname === to;

              return (
                <button
                  key={to}
                  type="button"
                  className={isActive ? "nav-link active nav-link-button" : "nav-link nav-link-button"}
                  onClick={() => {
                    navigate(to);
                    setSidebarOpen(false);
                  }}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </aside>
      </div>

      <div className="shell shell-with-topnav shell-drawer-layout">
        <main className="content content-shell content-full">
          <Outlet />
        </main>
      </div>

      <footer className="site-footer site-footer-fullwidth footer-modern">
        <div className="site-footer-inner">
          <div className="site-footer-hero-row">
            <div className="site-footer-brand-column modern">
              <div className="site-footer-brand-lockup modern">
                <MJMLogo />
                <div className="site-footer-brand-copy modern">
                  <p className="eyebrow">MyJobMate</p>
                  <h3>Career structure, tracking, and trust for ambitious learners.</h3>
                  <p className="muted">Made for students and professionals building verified career momentum over time.</p>
                </div>
              </div>
            </div>

            <div className="site-footer-side-meta">
              <div className="site-footer-brand-badge modern">
                <span className="eyebrow">Trusted by</span>
                <strong>1,455,904+ Students</strong>
              </div>
              <div className="footer-social-grid modern">
                {socialLinks.map((item) => (
                  <a key={item.key} href="#" aria-label={item.label} title={item.label} className="footer-social-icon-link">
                    <SocialIcon platform={item.key} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="site-footer-mega-grid modern">
            <FooterLinkGroup title="Our Company" items={footerCompanyLinks} />
            <FooterLinkGroup title="Career Guides" items={footerGuideLinks} />
            <FooterLinkGroup title="Career Advice" items={footerAdviceLinks} />
            <FooterLinkGroup title="Support" items={footerSupportLinks} />
          </div>

          <div className="site-footer-contact-strip modern">
            <div>
              <span className="site-footer-contact-label">Contact Us</span>
              <a href="mailto:support@myjobmate.com">support@myjobmate.com</a>
            </div>
            <div>
              <span className="site-footer-contact-label">Phone</span>
              <a href="tel:+918448440710">+91-8448440710</a>
            </div>
            <div>
              <span className="site-footer-contact-label">WhatsApp</span>
              <span>Text us on WhatsApp</span>
            </div>
          </div>

          <div className="site-footer-bottom modern">
            <span>Copyright © 2026 MyJobMate Help Center</span>
            <div className="footer-link-row">
              {footerMetaLinks.map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
            <span>Made with care for you by MyJobMate</span>
          </div>
        </div>
      </footer>
    </div>
  );
}



