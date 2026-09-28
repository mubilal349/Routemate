import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../common/Logo";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#destinations"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            Destinations
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            About
          </a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 dark:border-white/10 dark:bg-slate-950 lg:hidden">
          <nav className="flex flex-col gap-2">
            <a
              href="#features"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              How It Works
            </a>

            <a
              href="#destinations"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Destinations
            </a>

            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
