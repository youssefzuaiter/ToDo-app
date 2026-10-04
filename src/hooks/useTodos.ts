import { useEffect, useState } from 'react'
import type { Todo, TodoInput } from '../interfaces/Todo'

const STORAGE_KEY = 'todo-app.todos'

// Read saved todos once on startup. Bad or missing data falls back to [].
function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

/**
 * All CRUD logic lives here so the components only deal with UI.
 * Every change is written back to LocalStorage automatically.
 */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // Storage can be full or blocked (private mode); the app still works in memory.
    }
  }, [todos])

  // CREATE
  const addTodo = (input: TodoInput) => {
    const now = Date.now()
    const todo: Todo = {
      id: crypto.randomUUID(),
      ...input,
      completed: false,
      createdAt: now,
      updatedAt: now,
    }
    setTodos((prev) => [todo, ...prev])
  }

  // UPDATE (edit fields)
  const updateTodo = (id: string, changes: Partial<TodoInput>) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes, updatedAt: Date.now() } : t)),
    )
  }

  // UPDATE (toggle done / not done)
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t,
      ),
    )
  }

  // DELETE
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  return { todos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted }
}
