import { useEffect, useState } from "react"
import type { Task } from "../../../../Shared/Task"
import type { User } from "../../../../Shared/User"
import { useAuthFetch } from "../../hooks/useAuthFetch"
import TaskCard from "../TaskCard/TaskCard";
import "./Home.scss";
import { Chip } from "@mui/material";

interface HomeProps {
  dbUser: User | null
  refreshKey: number
}

export default function Home({ dbUser, refreshKey }: HomeProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const authFetch = useAuthFetch()

  useEffect(() => {
    if (!dbUser) return

    authFetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then(setTasks)
      .catch((err) => console.error('Failed to fetch tasks', err))
  }, [dbUser, refreshKey, authFetch]);

  return (
    <div className="home">
      <h1 className="home__title">Home</h1>
      <div style={{ marginBottom: '24px' }}>
        <Chip label="Completed" variant='outlined' onClick={() => alert('test')} />
      </div>

      <div className="home__list">
        {tasks.map((item) => {
          return <TaskCard key={item.id} task={item} />
        })}
      </div>
    </div>
  )
}
