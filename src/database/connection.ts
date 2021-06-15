import knex from 'knex'

const knexConfigFile = require('../../knexfile')

const connection = knex(
	process.env.NODE_ENV === 'production'
		? knexConfigFile.production
		: knexConfigFile.development
)

export default connection
