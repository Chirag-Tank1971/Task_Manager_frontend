import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatCard from '../components/StatCard';
import DashboardSkeleton from '../components/DashboardSkeleton';
import api, { getErrorMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useConfirm } from '../hooks/useConfirm';

export default function DashboardPage() {
  const { user } = useAuth();
  const { ask, ConfirmDialog } = useConfirm();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const { data } = await api.get('/tasks', { params });
      setTasks(data.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (form) => {
    try {
      await api.post('/tasks', form);
      toast.success('Task created');
      fetchTasks();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleUpdate = async (form) => {
    try {
      await api.put(`/tasks/${editingTask.id}`, form);
      toast.success('Task updated');
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await ask({
      title: 'Delete this task?',
      message: 'This action cannot be undone. The task will be permanently removed.',
      confirmText: 'Delete task',
    });
    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleMarkComplete = async (task) => {
    try {
      await api.put(`/tasks/${task.id}`, { status: 'Completed' });
      toast.success('Marked as completed');
      fetchTasks();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <>
      <ConfirmDialog />
      <div className="page-shell dashboard-mesh relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-accent-200/30 blur-3xl animate-pulse-soft" />
      <div
        className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-violet-200/25 blur-3xl animate-pulse-soft"
        style={{ animationDelay: '1s' }}
      />

      <Navbar />

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <header className="mb-8 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-accent-600">Dashboard</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Good day, {firstName}
              </h1>
              <p className="mt-1 text-ink-muted">Track progress and manage your tasks in one place.</p>
            </div>
            <div className="card min-w-[200px] px-5 py-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-muted">Completion</span>
                <span className="font-semibold text-accent-600">{progressPercent}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-100">
                <div
                  className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-accent-500 to-violet-500 transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-ink-faint">
                {completedCount} of {tasks.length} tasks done
              </p>
            </div>
          </div>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total tasks" value={tasks.length} accent="primary" icon="total" delay={80} animate={!loading} />
          <StatCard label="Completed" value={completedCount} accent="success" icon="completed" delay={160} animate={!loading} />
          <StatCard label="Pending" value={pendingCount} icon="pending" delay={240} animate={!loading} />
          <StatCard label="Account" value={user?.role} sub={user?.email} icon="account" delay={320} animate={false} />
        </div>

        <div
          className="mb-6 flex flex-wrap items-center gap-3 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '280ms', animationFillMode: 'forwards' }}
        >
          <span className="text-sm font-medium text-ink-muted">Filters</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select-field transition hover:border-accent-300"
          >
            <option value="">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="select-field transition hover:border-accent-300"
          >
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {(statusFilter || priorityFilter) && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter('');
                setPriorityFilter('');
              }}
              className="btn-ghost text-accent-600 transition active:scale-95"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <section
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">
                {editingTask ? 'Edit task' : 'New task'}
              </h2>
              {editingTask && (
                <span className="animate-scale-in rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700 ring-1 ring-accent-200/60">
                  Editing
                </span>
              )}
            </div>
            <TaskForm
              key={editingTask?.id || 'new'}
              initial={editingTask}
              onSubmit={editingTask ? handleUpdate : handleCreate}
              onCancel={editingTask ? () => setEditingTask(null) : undefined}
            />
          </section>

          <section
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: '420ms', animationFillMode: 'forwards' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">
                Your tasks
                {!loading && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-accent-50 px-2.5 py-0.5 text-sm font-normal text-accent-700">
                    {tasks.length}
                  </span>
                )}
              </h2>
              {loading && (
                <span className="flex items-center gap-2 text-xs text-ink-faint">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
                  Syncing...
                </span>
              )}
            </div>
            {loading ? <DashboardSkeleton /> : (
              <TaskList
                key={`${statusFilter}-${priorityFilter}-${tasks.length}`}
                tasks={tasks}
                onEdit={setEditingTask}
                onDelete={handleDelete}
                onMarkComplete={handleMarkComplete}
              />
            )}
          </section>
        </div>
      </main>
    </div>
    </>
  );
}
