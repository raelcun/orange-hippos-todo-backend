process.env.NODE_ENV = 'testing'

const supertest = require('supertest'),
			app = require('../../app.js')

describe('integration tests', function() {
	it('should get posted data', function(done) {
		supertest(app).get('/tasks').expect(200).end(done)
	})
})

// exports.should_get_posted_data = function(done) {
// 	supertest(app)
// }