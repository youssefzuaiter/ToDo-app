import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import Header from '../components/Header'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'
import type { Filter } from '../interfaces/Todo'

export default function HomePage() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  // Derived list: filter by status, then by search text.
  const visibleTodos = useMemo(() => {
    const query = search.trim().toLowerCase()
    return todos
      .filter((t) =>
        filter === 'active' ? !t.completed : filter === 'completed' ? t.completed : true,
      )
      .filter(
        (t) =>
          !query ||
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query),
      )
  }, [todos, filter, search])

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Header total={todos.length} completed={completedCount} />
      <TodoForm onSubmit={addTodo} />
      <FilterBar filter={filter} onChange={setFilter} search={search} onSearch={setSearch} />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="mt-4 text-sm text-slate-500 hover:text-red-600"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </main>
  )
}
