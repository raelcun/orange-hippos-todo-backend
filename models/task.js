var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        // 1 - low priority | 2 - medium priority | 3 - Super Intense Priority
        type: Integer
    },
    completed: {
        type: Boolean,
        required: true
    },
    completed_at: {
        type: String
    },
    due_at: {
        type: String
    }

});

module.exports = mongoose.model('Task', TaskSchema);