import { Response } from 'express'
import { ObjectSchema } from 'joi'

import { TractableError } from '@models/errors'

export class BaseController {
	static joiValidator<T>(
		schema: ObjectSchema<T>,
		ObjectToValidate: T
	): { field: string; message: string } | null {
		const { error } = schema.validate(ObjectToValidate)

		if (error) {
			const field = error.details[0].context.key
			const message = error.details[0].message

			return { field, message }
		}

		return null
	}

	static getUserId(res: Response) {
		return res.locals.userId
	}

	static getRequestIp(res: Response) {
		return res.socket.remoteAddress
	}

	static handleError(res: Response, error: any) {
		console.error(
			new Date().toUTCString(),
			BaseController.getRequestIp(res),
			error
		)

		if (error.name === 'TractableError')
			return BaseController.tractableError(res, error as TractableError)

		return BaseController.internalError(res, error as Error)
	}

	private static tractableError(
		res: Response,
		{ status, fields, message }: TractableError
	) {
		return res.status(status).json({ error: { fields, message } })
	}

	private static internalError(res: Response, error: Error) {
		if (process.env.NODE_ENV === 'production') return res.sendStatus(500)

		return res.status(500).json({
			error: {
				message: error.message,
				stack: error.stack
			}
		})
	}
}
