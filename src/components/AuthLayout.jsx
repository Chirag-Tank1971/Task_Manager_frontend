import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-gradient flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between border-r border-stone-200/60 bg-white/40 p-12 lg:flex">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-600 text-lg font-bold text-white shadow-sm">
            T
          </div>
          <h2 className="mt-10 text-3xl font-semibold tracking-tight text-ink">
            Organize work,
            <br />
            <span className="text-accent-600">ship faster.</span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-muted">
            A clean task workspace with secure login, role-based access, and real-time
            updates from your API.
          </p>
        </div>
        <p className="text-sm text-ink-faint">Task Manager · Internship project</p>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/login" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">
                T
              </div>
              <span className="text-lg font-semibold text-ink">Task Manager</span>
            </Link>
          </div>

          <div className="card-elevated p-8 sm:p-10">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>}
            <div className="mt-8">{children}</div>
          </div>

          {footer && <div className="mt-6 text-center text-sm text-ink-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
