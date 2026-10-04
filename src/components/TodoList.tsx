import type { Todo, TodoInput } from '../interfaces/Todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, changes: Partial<TodoInput>) => void
  onDelete: (id: string) => void
}

// The "List" operation: renders every todo that passes the current filter.
export default function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-slate-400 shadow-sm">
        No tasks here yet.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
