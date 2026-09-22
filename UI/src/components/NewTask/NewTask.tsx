import { useState } from 'react'
import type { Ref } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import type { TransitionProps } from '@mui/material/transitions'
import Stack from '@mui/material/Stack'

const Transition = function Transition(
  props: TransitionProps & { children: React.ReactElement<unknown> } & { ref?: Ref<unknown> },
) {
  const { ref, ...rest } = props
  return <Slide direction="up" ref={ref} {...rest} />
}

export interface NewTaskFields {
  name: string
  description: string
  dueDate: string
}

interface NewTaskProps {
  open: boolean
  onClose: () => void
  onSave: (task: NewTaskFields) => void
}

const emptyTask: NewTaskFields = { name: '', description: '', dueDate: '' }

export default function NewTask({ open, onClose, onSave }: NewTaskProps) {
  const [task, setTask] = useState<NewTaskFields>(emptyTask)

  const handleClose = (_event?: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') return
    setTask(emptyTask)
    onClose()
  }

  const handleSave = () => {
    onSave(task)
    setTask(emptyTask)
    onClose()
  }

  const updateField = (field: keyof NewTaskFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({ ...prev, [field]: event.target.value }))
  }

  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={handleClose}
      aria-describedby="new-task-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }} id="new-task-dialog-description">
          <TextField
            label="Name"
            value={task.name}
            onChange={updateField('name')}
            autoFocus
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={task.description}
            onChange={updateField('description')}
            fullWidth
            multiline
            minRows={3}
          />
          <TextField
            label="Due date"
            type="date"
            value={task.dueDate}
            onChange={updateField('dueDate')}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={!task.name.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
