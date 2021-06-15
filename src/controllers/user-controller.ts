import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'

import { BaseController } from '@controllers/base-controller'
import { JoiUserSchemas } from '@joi-schemas/user-schemas'
import { JwtService } from '@services/jwt-service'
import { PasswordService } from '@services/password-service'
import { UserRepository } from '@repositories/user-repository'
import { TractableError } from '@models/errors'
import { UserEntity } from '@entities/user-entity'

export class UserController extends BaseController {
	static async singUp(req: Request, res: Response) {
		try {
			const { name, username, email, password } = req.body

			const joiError = super.joiValidator(JoiUserSchemas.singUp, {
				name,
				username,
				email,
				password
			})
			if (joiError)
				throw new TractableError(400, joiError.field, joiError.message)

			const usernameAlreadyExists = await UserRepository.existsUsername(
				username
			)
			if (usernameAlreadyExists)
				throw new TractableError(409, 'username', 'Username já está em uso')

			const emailAlreadyExists = await UserRepository.existsEmail(email)
			if (emailAlreadyExists)
				throw new TractableError(409, 'email', 'Email já está em uso')

			const id = uuid()
			const passwordHash = await PasswordService.hash(password)

			const userEntity = new UserEntity({ name, username, email, passwordHash })
			await UserRepository.create(userEntity)

			res.status(201).json({ id })
		} catch (error) {
			super.handleError(res, error)
		}
	}

	static async singIn(req: Request, res: Response) {
		try {
			const { email, password } = req.body

			const joiError = super.joiValidator(JoiUserSchemas.singIn, {
				email,
				password
			})
			if (joiError)
				throw new TractableError(400, joiError.field, joiError.message)

			const emailExists = await UserRepository.existsEmail(email)
			if (!emailExists)
				throw new TractableError(
					422,
					['email', 'password'],
					'Email ou senha inválidos'
				)

			const { id: userId, passwordHash } = await UserRepository.findByEmail(
				email
			)
			const isValidPassword = await PasswordService.compare(
				password,
				passwordHash
			)
			if (!isValidPassword)
				throw new TractableError(
					422,
					['email', 'password'],
					'Email ou senha inválidos'
				)

			const ip = super.getRequestIp(res)
			const refreshToken = await JwtService.sign({ userId }, '7d')

			await UserRepository.updateRefreshTokenById(userId, refreshToken)
			await UserRepository.updateIpById(userId, ip)
			await UserRepository.updateLastSessionById(userId)

			res.status(201).json({ refreshToken })
		} catch (error) {
			super.handleError(res, error)
		}
	}

	// get access token

	// delete account
}
