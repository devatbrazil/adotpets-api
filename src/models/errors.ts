export class TractableError extends Error {
	public fields: string[]

	constructor(
		public status: number,
		fieldOrFields: string | string[],
		message: string
	) {
		super(message)
		this.name = 'TractableError'
		this.status = status
		this.fields = Array.isArray(fieldOrFields) ? fieldOrFields : [fieldOrFields]
		this.message = message
	}
}
