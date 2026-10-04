interface HeaderProps {
  total: number
  completed: number
}

export default function Header({ total, completed }: HeaderProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">TODO App</h1>
      <p className="mt-1 text-sm text-slate-500">
        {completed} of {total} tasks done
      </p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  )
}
