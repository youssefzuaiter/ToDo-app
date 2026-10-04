import { useState } from 'react'
import type { Priority, Todo, TodoInput } from '../interfaces/Todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, changes: Partial<TodoInput>) => void
  onDelete: (id: string) => void
}

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
}

// One row in the list. Handles the "Update" (inline edit) and "Delete" operations.
export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [priority, setPriority] = useState<Priority>(todo.priority)

  const startEdit = () => {
    setTitle(todo.title)
    setDescription(todo.description)
    setPriority(todo.priority)
    setIsEditing(true)
  }

  const save = () => {
    if (!title.trim()) return
    onUpdate(todo.id, { title: title.trim(), description: description.trim(), priority })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${todo.title}"?`)) onDelete(todo.id)
  }

  if (isEditing) {
    return (
      <li className="space-y-2 rounded-xl border-2 border-indigo-300 bg-white p-4 shadow-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && save()}
          aria-label="Edit title"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Edit description"
          rows={2}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            aria-label="Edit priority"
            className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={save}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="rounded-lg bg-slate-200 px-3 py-1.5 text-sm hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </li>
    )
  }

  return (
    <li className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.title}" as done`}
        className="mt-1 h-5 w-5 cursor-pointer accent-indigo-600"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`font-medium break-words ${
              todo.completed ? 'text-slate-400 line-through' : 'text-slate-900'
            }`}
          >
            {todo.title}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${PRIORITY_STYLES[todo.priority]}`}>
            {todo.priority}
          </span>
        </div>
        {todo.description && (
          <p className="mt-1 text-sm break-words text-slate-500">{todo.description}</p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          {new Date(todo.updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          onClick={startEdit}
          className="rounded-lg px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  )
}
