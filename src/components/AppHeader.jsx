import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { clearSession, getCurrentUser } from "../lib/session";

export default function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/template-select", label: "Templates" },
    ...(user ? [{ to: "/dashboard", label: "My CVs" }] : []),
  ];

  const handleLogout = () => {
    clearSession();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="surface-panel sticky top-4 z-50 rounded-[32px] px-5 py-4 md:px-7">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={handleLinkClick}
        >
          <img
            src="https://i.ibb.co/PszMTvCF/a78792e3-1160-48a0-821f-7a1b9e928ed4.png"
            alt="AI CV Builder"
            className="w-[180px] md:w-[210px]"
          />
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                location.pathname === item.to
                  ? "brand-button"
                  : "secondary-button"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <div className="hidden rounded-full border border-black/10 bg-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--app-muted)] xl:block">
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="secondary-button rounded-full px-4 py-2 text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              state={{ redirectTo: location.pathname }}
              className="brand-button rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Login / Sign up
            </Link>
          )}
        </div>

        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="secondary-button flex h-12 w-12 items-center justify-center rounded-2xl"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-[calc(100%+0.9rem)] z-50 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-[28px] border border-white/45 bg-[rgba(255,250,243,0.72)] p-4 shadow-[0_28px_70px_rgba(36,31,26,0.18)] backdrop-blur-[18px] supports-[backdrop-filter]:bg-[rgba(255,250,243,0.9)]">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={handleLinkClick}
                    className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                      location.pathname === item.to
                        ? "brand-button"
                        : "border border-white/40 bg-white/70 text-[var(--app-ink)] backdrop-blur-md hover:bg-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 border-t border-white/30 pt-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/40 bg-white/65 px-4 py-3 text-sm text-[var(--app-muted)] backdrop-blur-md">
                      {user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--app-ink)] backdrop-blur-md transition-all hover:bg-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    state={{ redirectTo: location.pathname }}
                    onClick={handleLinkClick}
                    className="brand-button block rounded-2xl px-4 py-3 text-center text-sm font-semibold"
                  >
                    Login / Sign up
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
