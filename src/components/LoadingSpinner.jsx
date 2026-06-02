export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-200 border-t-accent-600" />
      <p className="text-sm text-ink-muted">{label}</p>
    </div>
  );
}
