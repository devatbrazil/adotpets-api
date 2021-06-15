import { UserEntity } from '@entities/user-entity'
import knex from '@database/connection'

export class UserRepository {
	static create = (userEntity: UserEntity) =>
		knex<UserEntity>('users').insert(userEntity)

	static existsUsername = async (username: string) =>
		!!(await knex<UserEntity>('users').where({ username }))?.length

	static existsEmail = async (email: string) =>
		!!(await knex<UserEntity>('users').where({ email }))?.length

	static existsId = async (id: string) =>
		!!(await knex<UserEntity>('users').where({ id }))?.length

	static findByEmail = (email: string) =>
		knex<UserEntity>('users').where({ email }).first()

	static updateRefreshTokenById = (id: string, refreshToken: string) =>
		knex<UserEntity>('users').where({ id }).update({ refreshToken })

	static updateIpById = (id: string, ip: string) =>
		knex<UserEntity>('users').where({ id }).update({ ip })

	static updateLastSessionById = (id: string) =>
		knex<UserEntity>('users')
			.where({ id })
			.update('lastSessionAt', new Date().getTime())

	static deleteUser = (id: string) =>
		knex<UserEntity>('users').where({ id }).delete()
}
