import type { User } from "../../../../Shared/User"
import { useTasks } from "../../hooks/useTasks"
import TaskCard from "../TaskCard/TaskCard";
import "../Home/Home.scss";

interface CompletedTasksProps {
  dbUser: User | null
  refreshKey: number
}

export default function CompletedTasks({ dbUser, refreshKey }: CompletedTasksProps) {
  const { tasks, toggleStatus } = useTasks({ dbUser, refreshKey })
  const completedTasks = tasks.filter((task) => task.status === 'complete')

  return (
    <div className="home">
      <h1 className="home__title">Completed</h1>
      <div className="home__list">
        {completedTasks.map((item) => {
          return <TaskCard key={item.id} task={item} onToggleStatus={toggleStatus} />
        })}
      </div>
    </div>
  )
}
