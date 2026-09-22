import { useCallback, useEffect, useState } from 'react'
import { useAuthFetch } from './useAuthFetch'
import type { Task } from '../../../Shared/Task'
import type { User } from '../../../Shared/User'

interface UseTasksOptions {
  dbUser: User | null
  refreshKey: number
}

export function useTasks({ dbUser, refreshKey }: UseTasksOptions) {
  const [tasks, setTasks] = useState<Task[]>([])
  const authFetch = useAuthFetch()

  useEffect(() => {
    if (!dbUser) return

    authFetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then(setTasks)
      .catch((err) => console.error('Failed to fetch tasks', err))
  }, [dbUser, refreshKey, authFetch])

  const toggleStatus = useCallback(
    (task: Task) => {
      const status = task.status === 'complete' ? 'pending' : 'complete'

      authFetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
        .then((res) => res.json())
        .then((updated: Task) => setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t))))
        .catch((err) => console.error('Failed to update task', err))
    },
    [authFetch],
  )

  return { tasks, toggleStatus }
}
