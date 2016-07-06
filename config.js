const config = {
	env: process.env.NODE_ENV || 'development',
	
	server: {
		port: 3000
	},
	
	mongo: {
		connectionURI: 'mongodb://localhost:27017/todo-api'
	}
}

if (config.env === 'testing') {
	config.mongo.connectionURI = 'mongodb://localhost:27017/todo-api-test'
}

module.exports = config