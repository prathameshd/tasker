import { useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import { useAuthFetch } from "../../hooks/useAuthFetch"

export default function Tools() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const authFetch = useAuthFetch()

  const handleSubmit = () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)

    authFetch(`${import.meta.env.VITE_API_URL}/tools/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.response ?? ""))
      .catch((err) => {
        console.error("Failed to query tools API", err)
        setError("Failed to reach the API. Is the server running and is Ollama up at localhost:11434?")
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
      <Typography variant="h4" component="h1">
        Tools
      </Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
        <TextField
          fullWidth
          label="Prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          multiline
          minRows={2}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading || !prompt.trim()}>
          Submit
        </Button>
      </Box>

      {isLoading && <CircularProgress size={24} />}
      {error && <Typography color="error">{error}</Typography>}
      {response && (
        <Typography component="pre" sx={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
          {response}
        </Typography>
      )}
    </Box>
  )
}
