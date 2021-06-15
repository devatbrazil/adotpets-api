import 'dotenv/config'
import { sign, verify } from 'jsonwebtoken'

interface CustomPayload {
	userId: string
}

export interface TokenPayload extends CustomPayload {
	iat: number
	exp: number
}

const JWT_KEY = process.env.JWT_KEY
if (!JWT_KEY) throw new Error('JWT_KEY not found')

export class JwtService {
	public static sign = (
		payloadObject: CustomPayload,
		expiresIn: string
	): Promise<string> =>
		new Promise((resolve, reject) => {
			sign(payloadObject, JWT_KEY, { expiresIn }, (err, token) => {
				if (err) reject(err)
				else resolve(token || '')
			})
		})

	public static verify = (token: string): Promise<CustomPayload> =>
		new Promise((resolve, reject) => {
			verify(token, JWT_KEY, (err, decoded: CustomPayload) => {
				if (err) reject(err)
				else resolve(decoded)
			})
		})
}
