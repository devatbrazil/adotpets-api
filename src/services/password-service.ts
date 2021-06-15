import { hash, compare } from 'bcryptjs'

export class PasswordService {
	public static hash = (pass: string): Promise<string> => hash(pass, 10)

	public static compare = (
		password: string,
		passwordHash: string
	): Promise<boolean> => compare(password, passwordHash)
}
