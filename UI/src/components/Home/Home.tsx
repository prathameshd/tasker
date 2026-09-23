import { useState } from "react"
import Button from "@mui/material/Button"
import type { Task } from "../../../../Shared/Task"
import type { User } from "../../../../Shared/User"
import { useTasks } from "../../hooks/useTasks"
import TaskCard from "../TaskCard/TaskCard";
import NewTaskCard from "../TaskCard/NewTaskCard";
import "./Home.scss";
import { PlusIcon } from "@phosphor-icons/react"

interface HomeProps {
  dbUser: User | null
  refreshKey: number
}

function tomorrowDateString() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function Home({ dbUser, refreshKey }: HomeProps) {
  const { tasks, toggleStatus, addTask } = useTasks({ dbUser, refreshKey })
  const [isAdding, setIsAdding] = useState(false)
  const pendingTasks = tasks.filter((task: Task) => task.status !== 'complete')

  const handleQuickAdd = (name: string) => {
    addTask({ name, description: '', dueDate: tomorrowDateString() })
      .then(() => setIsAdding(false))
      .catch((err) => console.error('Failed to add task', err))
  }

  return (
    <div className="home">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 className="home__title">Tasks</h1>
        <Button variant="text" size="small" onClick={() => setIsAdding(true)} disabled={isAdding}>
          <PlusIcon size={20} />
        </Button>
      </div>
      <div className="home__list">
        {isAdding && <NewTaskCard onSave={handleQuickAdd} onDiscard={() => setIsAdding(false)} />}
        {pendingTasks.map((item) => {
          return <TaskCard key={item.id} task={item} onToggleStatus={toggleStatus} />
        })}
      </div>
    </div>
  )
}
