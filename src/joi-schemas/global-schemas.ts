import Joi from 'joi'

export const usernameStringSchema = Joi.string()
	.pattern(/^[A-z\d](?:[A-z\d]|-(?=[A-z\d]))+$/)
	.min(3)
	.max(20)
	.required()
	.error(err => {
		err[0].message =
			'Username deve ter apenas caracteres alfanuméricos, sem hífens seguidos nem começar ou terminar com hífen. Tendo no mínimo 3 e no máximo 20 caracteres'
		return err[0]
	})

export const emailStringSchema = Joi.string()
	.email({
		minDomainSegments: 2,
		tlds: { allow: false }
	})
	.required()
	.error(err => {
		err[0].message = 'Email inválido'
		return err[0]
	})

export const passwordStringSchema = Joi.string()
	.pattern(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
	)
	.required()
	.error(err => {
		err[0].message =
			'Senha deve ter no mínimo 8 e no máximo 15 caracteres, pelo menos uma letra minúscula e uma maiúscula, um número e um caractere especial'
		return err[0]
	})
