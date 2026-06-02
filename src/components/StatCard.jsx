import { useCountUp } from '../hooks/useCountUp';

const icons = {
  total: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  completed: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  pending: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  account: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
};

const accents = {
  default: {
    card: 'from-stone-50 to-white',
    icon: 'bg-stone-100 text-stone-600',
  },
  primary: {
    card: 'from-accent-50/90 to-white',
    icon: 'bg-accent-100 text-accent-600',
  },
  success: {
    card: 'from-emerald-50/90 to-white',
    icon: 'bg-emerald-100 text-emerald-600',
  },
};

export default function StatCard({ label, value, sub, accent = 'default', icon = 'total', delay = 0, animate = true }) {
  const styles = accents[accent];
  const numericValue = typeof value === 'number' ? value : null;
  const animatedNum = useCountUp(animate && numericValue !== null ? numericValue : 0);
  const displayValue = numericValue !== null && animate ? animatedNum : value;

  return (
    <div
      className={`card group bg-gradient-to-br p-5 opacity-0 animate-fade-in-up transition duration-300 hover:-translate-y-1 hover:shadow-lift ${styles.card}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">{label}</p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition group-hover:scale-110 ${styles.icon}`}
        >
          {icons[icon] || icons.total}
        </div>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-ink tabular-nums">{displayValue}</p>
      {sub && <p className="mt-1 truncate text-sm text-ink-muted">{sub}</p>}
    </div>
  );
}
