/* eslint-disable prettier/prettier */
import { globalExcludeFields } from 'src/@types'
import { v4 as uuid } from 'uuid'

class BaseUserEntity {
	public readonly id: string
	public readonly passwordHash: string

	public name: string
	public username: string
	public email: string
	public ip?: string
	public refreshToken?: string
	public token?: string
	public avatarUrl?: string
	public description?: string
	public createdAt: number
	public updatedAt?: number
	public lastSessionAt?: number

	constructor(props: BaseUserEntity) {
		Object.assign(this, props)
	}
}

interface UserEntityProps
	extends Omit<
	BaseUserEntity,
	globalExcludeFields
	> { }

export class UserEntity extends BaseUserEntity {
	constructor(props: UserEntityProps) {
		const id = uuid()
		const createdAt = new Date().getTime()

		super({ ...props, id, createdAt })
	}
}
