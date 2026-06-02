import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLink = (path, label) => {
    const active = location.pathname === path;
    return (
      <Link
        to={path}
        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
          active
            ? 'bg-accent-50 text-accent-700'
            : 'text-ink-muted hover:bg-stone-100 hover:text-ink'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600 text-sm font-bold text-white shadow-sm">
            T
          </div>
          <span className="text-lg font-semibold tracking-tight text-ink">Task Manager</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navLink('/dashboard', 'Dashboard')}
          {isAdmin && navLink('/admin', 'Admin')}

          <div className="ml-2 hidden items-center gap-3 border-l border-stone-200 pl-4 sm:flex">
            <div className="text-right">
              <p className="text-sm font-medium text-ink">{user?.name}</p>
              <p className="text-xs text-ink-faint">{user?.role}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-sm font-semibold text-accent-700">
              {user?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
          </div>

          <button type="button" onClick={handleLogout} className="btn-secondary ml-1 !py-2 !px-4">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
