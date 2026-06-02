const statusStyles = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-200/60',
  InProgress: 'bg-sky-50 text-sky-700 ring-sky-200/60',
  Completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200/60',
};

const priorityStyles = {
  Low: 'bg-stone-100 text-stone-600',
  Medium: 'bg-orange-50 text-orange-700',
  High: 'bg-rose-50 text-rose-700',
};

function Badge({ children, className }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
      {children}
    </span>
  );
}

export default function TaskList({ tasks, onEdit, onDelete, onMarkComplete }) {
  if (!tasks.length) {
    return (
      <div className="card flex flex-col items-center justify-center px-6 py-16 text-center opacity-0 animate-scale-in">
        <div className="mb-4 flex h-14 w-14 animate-float items-center justify-center rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 text-2xl">
          ✓
        </div>
        <p className="font-medium text-ink">No tasks yet</p>
        <p className="mt-1 max-w-xs text-sm text-ink-muted">
          Create your first task using the form. It will show up here instantly.
        </p>
      </div>
    );
  }

  return (
    <ul className="animate-stagger space-y-3">
      {tasks.map((task, index) => (
        <li
          key={task.id}
          style={{ animationDelay: `${index * 60}ms` }}
          className="card group p-5 opacity-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-200/50 hover:shadow-lift"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-ink transition group-hover:text-accent-700">{task.title}</h3>
              {task.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{task.description}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className={statusStyles[task.status]}>
                {task.status === 'InProgress' ? 'In Progress' : task.status}
              </Badge>
              <Badge className={priorityStyles[task.priority]}>{task.priority}</Badge>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4 opacity-80 transition group-hover:opacity-100">
            {task.status !== 'Completed' && (
              <button
                type="button"
                onClick={() => onMarkComplete(task)}
                className="btn-ghost !text-emerald-700 hover:!bg-emerald-50 active:scale-95"
              >
                Mark complete
              </button>
            )}
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="btn-ghost !text-accent-600 hover:!bg-accent-50 active:scale-95"
            >
              Edit
            </button>
            <button type="button" onClick={() => onDelete(task.id)} className="btn-danger active:scale-95">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
