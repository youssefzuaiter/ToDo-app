// Shape of a single TODO item stored in LocalStorage.
export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: string
  title: string
  description: string
  priority: Priority
  completed: boolean
  createdAt: number
  updatedAt: number
}

// Data the form collects (id and timestamps are generated automatically).
export interface TodoInput {
  title: string
  description: string
  priority: Priority
}

export type Filter = 'all' | 'active' | 'completed'
