import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import tasksRouter from './routes/tasks.js'
import usersRouter from './routes/users.js'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 4000

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/tasks', tasksRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
