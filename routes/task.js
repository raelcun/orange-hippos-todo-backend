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

    Task.findByIdAndUpdate(req.params.id, {req.body.field: req.body.data}, {}, function(err) {
        if (err) {
            return res.json({ success: false, error: err });
        }

        return res.json({ success: true, results: true });
    })
});


module.exports = router;

