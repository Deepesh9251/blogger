import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '../../../common/dist/index'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async c => {
  const body = await c.req.json()
  const { success } = signupInput.safeParse(body)
  console.log(success, body)
  if (!success) {
    c.status(411)
    return c.json({
      message: 'Inputs not correct',
    })
  }

const prisma = new PrismaClient().$extends(withAccelerate())

  try {
    const existing_user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })
    if (existing_user)
      {return c.text('user already exists ,try with another email')}
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    })

    const jwt = await sign(
      {
        id: user.id,
      },
      'NITIN_WALIA'
    )

    return c.text(jwt)
  } catch (e) {
    console.log(e)
    c.status(411)
    return c.text('error in the sigup vala part')
  }
})

userRouter.post('/signin', async c => {
  const body = await c.req.json()
  const { success } = signinInput.safeParse(body)
  // const existing_user = await prisma.user.findFirst({
  //     where: {
  //         email:body.email,
  //     },
  // });
  // if(!existing_user) return c.text("user does not exits ,try signup")

  if (!success) {
    c.status(411)
    return c.json({
      message: 'inputs not correct',
    })
  }
const prisma = new PrismaClient().$extends(withAccelerate())

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    })

    if (!user) {
      c.status(403)
      return c.json({
        message: 'USER NOT FOUND/INCORRECT CREDENTIALS',
      })
    }
    const jwt = await sign(
      {
        id: user.id,
      },
      'NITIN_WALIA'
    )
    return c.json({token: jwt})
  } catch (e) {
    console.log(e)
    c.status(411)
    return c.text('Invalid')
  }
})
