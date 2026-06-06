"use client";
// ============================================================
// Navbar — context-aware navigation
// ============================================================
// When logged OUT:  Logo → /, show "Beranda", "Login", "Daftar"
// When logged IN:   Logo → /dashboard, show "Dashboard", "Cek Gejala", "Riwayat", "Logout"
// Active route is highlighted with blue bg + bottom bar (desktop) / left border (mobile)
// ============================================================
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    setMobileOpen(false);
    await logout();
    router.push("/");
  }

  // Logo navigates to dashboard when logged in, landing when not
  const logoHref = user ? "/dashboard" : "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={logoHref}
          className="flex items-center gap-2 text-lg font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          <span className="text-2xl">🩺</span>
          <span>ISPA Care Family</span>
        </Link>

        {/* ======== Desktop nav ======== */}
        <div className="hidden items-center gap-1 md:flex">
          {user ? (
            <>
              {/* Logged-in links */}
              <NavLink href="/dashboard" active={pathname === "/dashboard"}>
                Dashboard
              </NavLink>
              <NavLink href="/cek-gejala" active={pathname === "/cek-gejala"}>
                Cek Gejala
              </NavLink>
              <NavLink href="/riwayat" active={pathname === "/riwayat"}>
                Riwayat
              </NavLink>
              <NavLink href="/edukasi" active={pathname === "/edukasi"}>
                Edukasi
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Logged-out links */}
              <NavLink href="/" active={pathname === "/"}>
                Beranda
              </NavLink>
              <Link
                href="/login"
                className={`ml-1 rounded-xl px-5 py-2 text-sm font-medium transition-all ${
                  pathname === "/login"
                    ? "bg-blue-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className={`rounded-xl px-5 py-2 text-sm font-medium shadow-sm transition-all hover:shadow-md ${
                  pathname === "/register"
                    ? "bg-blue-700 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Daftar
              </Link>
            </>
          )}
        </div>

        {/* ======== Mobile hamburger ======== */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-700 transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* ======== Mobile menu ======== */}
      {mobileOpen && (
        <div className="border-t border-blue-50 bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {user ? (
              <>
                <MobileLink
                  href="/dashboard"
                  active={pathname === "/dashboard"}
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </MobileLink>
                <MobileLink
                  href="/cek-gejala"
                  active={pathname === "/cek-gejala"}
                  onClick={() => setMobileOpen(false)}
                >
                  Cek Gejala
                </MobileLink>
                <MobileLink
                  href="/riwayat"
                  active={pathname === "/riwayat"}
                  onClick={() => setMobileOpen(false)}
                >
                  Riwayat
                </MobileLink>
                <MobileLink
                  href="/edukasi"
                  active={pathname === "/edukasi"}
                  onClick={() => setMobileOpen(false)}
                >
                  Edukasi
                </MobileLink>
                <button
                  onClick={handleLogout}
                  className="mt-1 rounded-xl bg-red-50 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileLink
                  href="/"
                  active={pathname === "/"}
                  onClick={() => setMobileOpen(false)}
                >
                  Beranda
                </MobileLink>
                <MobileLink
                  href="/login"
                  active={pathname === "/login"}
                  onClick={() => setMobileOpen(false)}
                >
                  Masuk
                </MobileLink>
                <MobileLink
                  href="/register"
                  active={pathname === "/register"}
                  onClick={() => setMobileOpen(false)}
                >
                  Daftar
                </MobileLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// ---- Sub-components ----

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-700"
          : "text-slate-600 hover:bg-blue-50/60 hover:text-blue-700"
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-600" />
      )}
    </Link>
  );
}

function MobileLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "border-l-4 border-blue-600 bg-blue-50 pl-3 text-blue-700"
          : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
      }`}
    >
      {children}
    </Link>
  );
}
