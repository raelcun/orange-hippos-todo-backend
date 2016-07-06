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


module.exports = router;

