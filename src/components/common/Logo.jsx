import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2"
      aria-label="RouteMate home"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white dark:bg-white dark:text-slate-900">
        R
      </span>

      <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        RouteMate
      </span>
    </Link>
  );
}

export default Logo;
