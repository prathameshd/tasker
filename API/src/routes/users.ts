import { Router } from 'express'
import { prisma } from '../prisma.js'
import { checkJwt } from '../middleware/auth.js'

const router = Router()

router.use(checkJwt)

router.post('/login', async (req, res) => {
  const sub = req.auth!.payload.sub!
  const { name, email } = req.body

  const user = await prisma.user.upsert({
    where: { id: sub },
    update: { name, email },
    create: { id: sub, name, email },
  })
  res.json(user)
})

export default router
