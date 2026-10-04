import type { Filter } from '../interfaces/Todo'

interface FilterBarProps {
  filter: Filter
  onChange: (filter: Filter) => void
  search: string
  onSearch: (value: string) => void
}

const FILTERS: Filter[] = ['all', 'active', 'completed']

export default function FilterBar({ filter, onChange, search, onSearch }: FilterBarProps) {
  return (
    <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`rounded-full px-3 py-1 text-sm capitalize ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <input
        type="search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks"
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
      />
    </div>
  )
}
