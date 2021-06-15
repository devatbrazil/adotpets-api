import { Router } from 'express'

import { UserController } from '@controllers/user-controller'

export const userRouter = Router()

userRouter.post('/sing-in', UserController.singIn)
userRouter.post('/sing-up', UserController.singUp)
