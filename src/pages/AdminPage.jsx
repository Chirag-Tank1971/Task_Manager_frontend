import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import api, { getErrorMessage } from '../services/api';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, tasksRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/tasks'),
      ]);
      setUsers(usersRes.data.data);
      setTasks(tasksRes.data.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user and all their tasks?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('User deleted');
      loadData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <Navbar />
        <LoadingSpinner label="Loading admin data..." />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Admin</h1>
          <p className="mt-1 text-ink-muted">Manage users and monitor all tasks across the system.</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <StatCard label="Total users" value={users.length} accent="primary" />
          <StatCard label="Total tasks" value={tasks.length} />
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-ink">Users</h2>
          <div className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50/80">
                    <th className="px-5 py-3.5 font-medium text-ink-muted">ID</th>
                    <th className="px-5 py-3.5 font-medium text-ink-muted">Name</th>
                    <th className="px-5 py-3.5 font-medium text-ink-muted">Email</th>
                    <th className="px-5 py-3.5 font-medium text-ink-muted">Role</th>
                    <th className="px-5 py-3.5 font-medium text-ink-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {users.map((u) => (
                    <tr key={u.id} className="transition hover:bg-stone-50/50">
                      <td className="px-5 py-4 text-ink-faint">#{u.id}</td>
                      <td className="px-5 py-4 font-medium text-ink">{u.name}</td>
                      <td className="px-5 py-4 text-ink-muted">{u.email}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            u.role === 'Admin'
                              ? 'bg-accent-50 text-accent-700'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {u.role !== 'Admin' ? (
                          <button type="button" onClick={() => handleDeleteUser(u.id)} className="btn-danger">
                            Delete
                          </button>
                        ) : (
                          <span className="text-xs text-ink-faint">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">All tasks</h2>
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="card px-6 py-12 text-center text-ink-muted">No tasks in the system.</div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="card p-5 transition hover:shadow-lift">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-ink">{task.title}</h3>
                      {task.description && (
                        <p className="mt-1 text-sm text-ink-muted">{task.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="rounded-full bg-stone-100 px-2.5 py-1 font-medium text-stone-600">
                        {task.status === 'InProgress' ? 'In Progress' : task.status}
                      </span>
                      <span className="rounded-full bg-orange-50 px-2.5 py-1 font-medium text-orange-700">
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  {task.user && (
                    <p className="mt-3 border-t border-stone-100 pt-3 text-sm text-ink-faint">
                      Owner: <span className="text-ink-muted">{task.user.name}</span> · {task.user.email}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
