export default function DashboardSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="card overflow-hidden p-5"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="skeleton-shimmer mb-3 h-5 w-2/3 rounded-lg" />
          <div className="skeleton-shimmer h-4 w-full rounded-lg" />
          <div className="skeleton-shimmer mt-2 h-4 w-1/2 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
