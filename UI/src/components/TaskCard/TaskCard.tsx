import { CardContent, Typography, CardActions, Button } from "@mui/material";
import type { Task } from "../../../../Shared/Task";

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div style={{ border: '1px solid #efefef' }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {task.dueDate}
        </Typography>
        <Typography variant="h5" component="div">
          {task.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{task.Tag.join(', ')}</Typography>
        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </div>
  )
}
