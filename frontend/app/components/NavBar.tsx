import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { publishedArticles, siteSections } from "../content/siteSections";

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.5 1.5m11.2 11.2 1.5 1.5M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5" />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M20 16.4A9 9 0 0 1 7.6 4a9 9 0 1 0 12.4 12.4Z" />
    </svg>
  );
}

const searchable = [
  ...siteSections.map((item) => ({
    title: item.title,
    description: item.description,
    url: `/${item.slug}`,
    kind: "Section",
  })),
  ...publishedArticles.map((item) => ({
    title: item.title,
    description: item.summary,
    url: item.url,
    kind: "Article",
  })),
];

interface NavBarProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export default function NavBar({ dark, onToggleTheme }: NavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const query = search.trim().toLocaleLowerCase();
  const results = query
    ? searchable
        .filter((item) => `${item.title} ${item.description}`.toLocaleLowerCase().includes(query))
        .slice(0, 7)
    : [];

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setAuthMessage("");
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
        searchRef.current?.blur();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  function openResult(url: string) {
    setSearch("");
    setSearchOpen(false);
    void navigate(url);
  }

  function showAuthMessage() {
    setAuthMessage("Authentication is not available yet. All published content remains public.");
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-shell header-top">
        <Link to="/" className="site-brand" aria-label="Programming in Depth — Home">
          <span className="site-brand-title">Programming in Depth</span>
          <span className="site-brand-caption">— PinD —</span>
        </Link>

        <div className="header-search-container" ref={searchContainerRef}>
          <form
            className="header-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              if (results.length) openResult(results[0].url);
              else setSearchOpen(true);
            }}
          >
            <SearchIcon />
            <label className="visually-hidden" htmlFor="pind-global-search">
              Search Programming in Depth
            </label>
            <input
              id="pind-global-search"
              type="search"
              ref={searchRef}
              autoComplete="off"
              placeholder="Search Programming in Depth..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              aria-expanded={searchOpen && !!query}
              aria-controls="pind-search-results"
            />
            <kbd className="search-shortcut" aria-hidden="true">
              Ctrl K
            </kbd>
          </form>
          {searchOpen && query && (
            <div
              id="pind-search-results"
              className="search-results"
              role="region"
              aria-label="Search results"
            >
              {results.length ? (
                results.map((result) => (
                  <button
                    key={result.url}
                    className="search-result"
                    type="button"
                    onClick={() => openResult(result.url)}
                  >
                    <span className="search-result-kind">{result.kind}</span>
                    <strong>{result.title}</strong>
                    <span className="search-result-description">{result.description}</span>
                  </button>
                ))
              ) : (
                <p className="search-empty">No matching sections or published articles.</p>
              )}
              <p className="search-hint">
                Search currently covers section descriptions and published article titles.
              </p>
            </div>
          )}
        </div>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
            title={`Switch to ${dark ? "light" : "dark"} theme`}
          >
            <ThemeIcon dark={dark} />
          </button>
          <div className="desktop-auth">
            <button type="button" className="auth-action" onClick={showAuthMessage}>
              Log in
            </button>
            <button type="button" className="auth-action signup-action" onClick={showAuthMessage}>
              Sign up
            </button>
          </div>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle navigation"
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      <nav
        style={{ marginTop: "6px" }}
        className={`site-shell header-navigation${menuOpen ? " is-open" : ""}`}
        id="main-navigation"
        aria-label="Main navigation"
      >
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          Home
        </NavLink>
        {siteSections.map((section) => (
          <NavLink
            key={section.slug}
            to={`/${section.slug}`}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            {section.title}
          </NavLink>
        ))}
        <div className="mobile-auth">
          <button type="button" onClick={showAuthMessage}>
            Log in
          </button>
          <button type="button" onClick={showAuthMessage}>
            Sign up
          </button>
        </div>
      </nav>
      {authMessage && (
        <div className="auth-notice" role="status">
          {authMessage}
          <button type="button" aria-label="Dismiss message" onClick={() => setAuthMessage("")}>
            ×
          </button>
        </div>
      )}
    </header>
  );
}
