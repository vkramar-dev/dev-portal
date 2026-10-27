import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useColorScheme } from "@mui/material/styles";
import { loginBody, logoutBody, searchUnavailable } from "../content";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/articles", label: "Articles", end: false },
  { to: "/notes", label: "Notes", end: true },
  { to: "/common-pitfalls", label: "Common Pitfalls", end: true },
  { to: "/guidelines", label: "Guidelines", end: true },
  { to: "/quiz", label: "Quiz", end: true },
  { to: "/videos", label: "Videos", end: true },
  { to: "/events", label: "Events", end: true },
  { to: "/about", label: "About", end: true },
] as const;

function NoticeDialog({
  open,
  title,
  titleId,
  message,
  onClose,
}: {
  open: boolean;
  title: string;
  titleId: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
            boxShadow: "none",
            backgroundImage: "none",
            border: "1px solid",
            borderColor: "divider",
            maxWidth: 440,
          },
        },
      }}
    >
      <DialogTitle id={titleId} sx={{ fontWeight: 600, fontSize: 20 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <p className="dialog-copy">{message}</p>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <button type="button" className="mono-btn" onClick={onClose}>
          CLOSE
        </button>
      </DialogActions>
    </Dialog>
  );
}

function ThemeSwitch() {
  const { mode, setMode } = useColorScheme();
  const dark = mode === "dark";
  const nextMode = dark ? "light" : "dark";

  return (
    <button
      type="button"
      className="mono-btn mode-btn"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        setMode(nextMode);
      }}
    >
      {dark ? "LT" : "DK"}
    </button>
  );
}

export default function SiteHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1120px)");
    const onChange = () => {
      if (media.matches) {
        setMenuOpen(false);
      }
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchMessage(searchUnavailable);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <Link className="brand" to="/">
          <span className="brand-name">Programming in Depth</span>
          <span className="brand-mark">— PinD —</span>
        </Link>
        <button
          type="button"
          className="mono-btn menu-btn"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            setMenuOpen((open) => !open);
          }}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      <div className="header-tools">
        <form className="search-form" role="search" onSubmit={onSearch}>
          <div className="search-field">
            <span className="search-prefix" aria-hidden="true">
              QRY
            </span>
            <input
              type="search"
              name="q"
              value={query}
              aria-label="Search"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </div>
        </form>
        <ThemeSwitch />
        <button
          type="button"
          className="mono-btn"
          onClick={() => {
            setLogoutOpen(false);
            setLoginOpen(true);
          }}
        >
          LOG IN
        </button>
        <button
          type="button"
          className="mono-btn"
          onClick={() => {
            setLoginOpen(false);
            setLogoutOpen(true);
          }}
        >
          LOG OUT
        </button>
      </div>

      <nav className="nav-strip" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <nav
        id="site-menu"
        className={menuOpen ? "site-menu is-open" : "site-menu"}
        aria-label="Sections"
        hidden={!menuOpen}
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <p className={searchMessage ? "header-status" : "header-status is-empty"} role="status">
        {searchMessage}
      </p>

      <NoticeDialog
        open={loginOpen}
        title="Log in"
        titleId="login-title"
        message={loginBody}
        onClose={() => {
          setLoginOpen(false);
        }}
      />
      <NoticeDialog
        open={logoutOpen}
        title="Log out"
        titleId="logout-title"
        message={logoutBody}
        onClose={() => {
          setLogoutOpen(false);
        }}
      />
    </header>
  );
}
