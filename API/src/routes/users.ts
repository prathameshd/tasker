import { Router } from 'express'
import { prisma } from '../prisma.js'
import { Prisma } from '../generated/prisma/client.js'

const router = Router()

router.get('/', async (_req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

router.post('/', async (req, res) => {
  const { name, email } = req.body

  try {
    const user = await prisma.user.create({ data: { name, email } })
    res.status(201).json(user)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      res.status(409).json({ error: 'Email already in use' })
      return
    }
    throw err
  }
})

export default router
