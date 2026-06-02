import { useState } from 'react';

const emptyForm = { title: '', description: '', priority: 'Medium' };

export default function TaskForm({ onSubmit, initial = null, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description || '',
          priority: initial.priority,
          status: initial.status,
        }
      : emptyForm
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!initial) setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-elevated space-y-5 p-6 opacity-0 animate-fade-in-up transition-shadow duration-300 hover:shadow-glow"
      style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="What needs to be done?"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          maxLength={500}
          className="input-field resize-none"
          placeholder="Optional details..."
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} className="select-field w-full">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        {initial && (
          <div className="animate-fade-in">
            <label className="mb-1.5 block text-sm font-medium text-ink">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="select-field w-full">
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3 pt-1">
        <button type="submit" className="btn-primary transition active:scale-[0.98]">
          {initial ? 'Save changes' : 'Add task'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary active:scale-[0.98]">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
