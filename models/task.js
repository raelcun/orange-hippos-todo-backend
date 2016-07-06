var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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