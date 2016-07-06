const express = require('express'),
      Task = require('../models/task'),
      router = express.Router();

router.get('/tasks', function(req, res) {

    // returns all the tasks from the Database
    Task.find({}).lean().exec(function(err, results) {

        if (err) {
            return res.json({ success: false, error: err });
        }

        return res.json({ success: true, results: results });

    });

});

router.put('/tasks/:id', function(req, res) {

    Task.findByIdAndUpdate(req.params.id, req.body, {}, function(err) {
        if (err) {
            return res.json({ success: false, error: err });
        }

        return res.json({ success: true, results: true });
    })
});

router.post('/tasks', function(req, res) {
	
	const task = new Task();
	task.title = req.body.title;
	task.priority = req.body.priority;
	task.completed = req.body.completed;
	if (req.body.completed_at) task.completed_at = req.body.completed_at;
	if (req.body.due_at) task.due_at = req.body.due_at;
	
	task.save(function(err) {
		if (err) return res.json({ success: false, error: { id: 1, message: "Error" } });
			
		return res.json({ success: true, results: task.id });
	});
})

router.delete('/tasks/:taskid', function(req, res) {
	Task.findByIdAndRemove(req.params.taskid, function(err, a, b) {
		if (err) return res.json({ success: false, error: { id: 2, message: "Error" } })
		
		return res.json({ success: true })
	});
});

module.exports = router;

