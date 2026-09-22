import { CardContent, Typography, CardActions, Button, Checkbox, FormControlLabel } from "@mui/material";
import type { Task } from "../../../../Shared/Task";

interface TaskCardProps {
  task: Task
  onToggleStatus: (task: Task) => void
}

export default function TaskCard({ task, onToggleStatus }: TaskCardProps) {
  return (
    <div style={{ border: '1px solid #efefef' }}>
      <CardContent>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div">
            {task.name}
          </Typography>
          <Checkbox checked={task.status === 'complete'} onChange={() => onToggleStatus(task)} />
        </div>
        <div style={{ display: 'flex' }}>

          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{task.Tag.join(', ')}</Typography>
          <Typography variant="body2">{task.description}</Typography>
        </div>
      </CardContent>

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </div>
  )
}
