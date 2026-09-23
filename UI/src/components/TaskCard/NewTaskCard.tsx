import { useState } from "react"
import type { FocusEvent } from "react"
import { CardContent, TextField, Button, Box } from "@mui/material"
import { XIcon } from "@phosphor-icons/react"

interface NewTaskCardProps {
  onSave: (name: string) => void
  onDiscard: () => void
}

export default function NewTaskCard({ onSave, onDiscard }: NewTaskCardProps) {
  const [name, setName] = useState('')

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocusTarget = event.relatedTarget as Node | null
    if (nextFocusTarget && event.currentTarget.contains(nextFocusTarget)) return

    const trimmed = name.trim()
    if (trimmed) {
      onSave(trimmed)
    } else {
      onDiscard()
    }
  }

  return (
    <div style={{ border: '1px solid #efefef' }} onBlur={handleBlur}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            autoFocus
            fullWidth
            variant="standard"
            placeholder="Task name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button onClick={onDiscard}>
            <XIcon size={20} />
          </Button>
        </Box>
      </CardContent>
    </div>
  )
}
