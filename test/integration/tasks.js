process.env.NODE_ENV = 'testing'

const supertest = require('supertest'),
			app = require('../../app.js')

exports.test = function(done) {
	supertest(app).get('/tasks').expect(200).end(done)
}