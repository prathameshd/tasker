import { useEffect, useState } from "react"
import type { Task } from "../../../../Shared/Task"
import TaskCard from "../TaskCard/TaskCard";
import "./Home.scss";

const mockTasks: Task[] = [
  { id: "1", name: "Buy groceries", description: "Milk, eggs, bread", dueDate: "2026-09-22", createdAt: "2026-09-20", Tag: ["personal"] },
  { id: "2", name: "Finish report", description: "Q3 summary for manager", dueDate: "2026-09-23", createdAt: "2026-09-20", Tag: ["work", "urgent"] },
  { id: "3", name: "Book dentist appointment", description: "Annual checkup", dueDate: "2026-09-25", createdAt: "2026-09-20", Tag: ["health"] },
  { id: "4", name: "Renew car insurance", description: "Policy expires end of month", dueDate: "2026-09-28", createdAt: "2026-09-20", Tag: ["personal", "finance"] },
  { id: "5", name: "Plan weekend trip", description: "Look into cabins upstate", dueDate: "2026-09-27", createdAt: "2026-09-20", Tag: ["personal"] },
]

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">Home</h1>
      <div className="home__list">
        {tasks.map((item) => {
          return <TaskCard key={item.id} task={item} />
        })}
      </div>
    </div>
  )
}
