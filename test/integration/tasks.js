process.env.NODE_ENV = 'testing'

const supertest = require('supertest'),
			app = require('../../app.js'),
			Task = require('../../models/task'),
			assert = require('assert')

describe('integration tests', function() {
	beforeEach(function(done) {
		Task.remove({}, function(err) {
			if (err) return done(err)
			done()
		})
	})
	
	it('should get posted task', function(done) {
		const task = { title: 'TEST', priority: 1, completed: false, due_at: '1467855439' }
		supertest(app)
			.post('/tasks')
			.send(task)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err)
				assert.equal(res.body.success, true)
				assert.equal(typeof res.body.results, 'string')
				
				const newId = res.body.results
				supertest(app)
					.get('/tasks')
					.expect(200)
					.end(function(err, res) {
						if (err) return done(err)
							
						assert.equal(res.body.results.length, 1)
						assert.equal(task.title, res.body.results[0].title)
						assert.equal(task.priority, res.body.results[0].priority)
						assert.equal(task.completed, res.body.results[0].completed)
						assert.equal(task.due_at, res.body.results[0].due_at)
						done()
					})
			})
	})
	
	it('should update existing task', function(done) {
		const task = { title: 'TEST', priority: 1, completed: false, due_at: '1467855439' }
		supertest(app)
			.post('/tasks')
			.send(task)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err)
				assert.equal(res.body.success, true)
				assert.equal(typeof res.body.results, 'string')
				
				const newId = res.body.results
				const update = { completed: true, title: 'new test' }
				supertest(app)
					.put('/tasks/' + newId)
					.send(update)
					.expect(200)
					.end(function(err, res) {
						if (err) return done(err)
						
						supertest(app)
							.get('/tasks')
							.expect(200)
							.end(function(err, res) {
								if (err) return done(err)
									
								assert.equal(res.body.results.length, 1)
								assert.equal(update.title, res.body.results[0].title)
								assert.equal(task.priority, res.body.results[0].priority)
								assert.equal(update.completed, res.body.results[0].completed)
								assert.equal(task.due_at, res.body.results[0].due_at)
								done()
							})
					})
			})
	})
})

describe('one test', function() {
    before(function(done) {
        Task.remove({}, function(err) {
            if (err) return done(err);
            done();
        });
    });

    var testObj = {
        "title" : "Test for titlessssssssssss",
        "priority" : "1",
        "completed": "false"
    };

    it('should post data with testObj', function(done) {
        supertest(app).post('/tasks')
            .send(testObj)
            .expect(200)
            .expect(function(res) {

                supertest(app)
                    .delete('/tasks/' + res.body.results)
                    .expect(200)
                    .expect(function(res) {
                        supertest(app)
                        .get('/tasks')
                        .expect(200)
                        .end(function(err,res) {
                            if (err) return done(err);

                            assert.equal(res.body.success, false);
                            assert.equal(res.body.results, []);
                            done();
                        })
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.success, true);
                        done();
                    });

            }).end(done);
            
    });
});
