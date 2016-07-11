const Joi = require('joi');

module.exports = {
	postTask: {
		body: {
			title: Joi.string().required(),
			priority: Joi.number().integer().min(1).max(3).required(),
			completed: Joi.boolean().required(),
			completed_at: Joi.date().timestamp(),
			due_at: Joi.date().timestamp()
		}
	},
	putTask: {
		body: {
			title: Joi.string(),
			priority: Joi.number().integer().min(1).max(3),
			completed: Joi.boolean(),
			completed_at: Joi.date().timestamp(),
			due_at: Joi.date().timestamp()
		}
	}
}