import Joi from 'joi'

import {
	emailStringSchema,
	passwordStringSchema,
	usernameStringSchema
} from '@joi-schemas/global-schemas'

interface SingInSchema {
	email: string
	password: string
}

interface SingUpSchema extends SingInSchema {
	name: string
	username: string
}

export class JoiUserSchemas {
	static get singUp() {
		return Joi.object<SingUpSchema>({
			name: Joi.string()
				.pattern(/^([a-zA-Z\u00C0-\u00FF]+ |)+[a-zA-Z\u00C0-\u00FF]+$/)
				.min(4)
				.max(40)
				.required()
				.error(err => {
					err[0].message =
						'Nome deve conter apenas letras e espaços de um dígito. Tendo no mínimo 4 e no máximo 40 caracteres'
					return err[0]
				}),

			username: usernameStringSchema,

			email: emailStringSchema,

			password: passwordStringSchema
		})
	}

	static get singIn() {
		return Joi.object<SingInSchema>({
			email: emailStringSchema,

			password: passwordStringSchema
		})
	}
}
