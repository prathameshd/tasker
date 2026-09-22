import { Router } from 'express'
import { prisma } from '../prisma.js'
import { Prisma } from '../generated/prisma/client.js'

const router = Router()

router.get('/', async (_req, res) => {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(tasks)
})

router.post('/', async (req, res) => {
  const { name, description, dueDate, Tag } = req.body

  const task = await prisma.task.create({
    data: { name, description, dueDate: new Date(dueDate), Tag: Tag ?? [] },
  })
  res.status(201).json(task)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, description, dueDate, Tag } = req.body

  try {
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
        ...(Tag !== undefined && { Tag }),
      },
    })
    res.json(task)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: 'Task not found' })
      return
    }
    throw err
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await prisma.task.delete({ where: { id } })
    res.status(204).send()
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: 'Task not found' })
      return
    }
    throw err
  }
})

export default router
