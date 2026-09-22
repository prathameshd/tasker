import { Router } from 'express'
import { prisma } from '../prisma.js'
import { checkJwt } from '../middleware/auth.js'

const router = Router()

router.use(checkJwt)

router.get('/', async (req, res) => {
  const userId = req.auth!.payload.sub!

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
  res.json(tasks)
})

router.post('/', async (req, res) => {
  const userId = req.auth!.payload.sub!
  const { name, description, dueDate, Tag } = req.body

  const task = await prisma.task.create({
    data: { name, description, dueDate: new Date(dueDate), Tag: Tag ?? [], userId },
  })
  res.status(201).json(task)
})

router.put('/:id', async (req, res) => {
  const userId = req.auth!.payload.sub!
  const { id } = req.params
  const { name, description, dueDate, Tag } = req.body

  const result = await prisma.task.updateMany({
    where: { id, userId },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
      ...(Tag !== undefined && { Tag }),
    },
  })

  if (result.count === 0) {
    res.status(404).json({ error: 'Task not found' })
    return
  }

  const task = await prisma.task.findFirst({ where: { id, userId } })
  res.json(task)
})

router.delete('/:id', async (req, res) => {
  const userId = req.auth!.payload.sub!
  const { id } = req.params

  const result = await prisma.task.deleteMany({ where: { id, userId } })

  if (result.count === 0) {
    res.status(404).json({ error: 'Task not found' })
    return
  }

  res.status(204).send()
})

export default router
