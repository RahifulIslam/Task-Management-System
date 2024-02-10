const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  dueDate: {
    type: Date
  },

  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },

  status: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Completed'],
    default: 'To-Do'
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const validateTask = task => {
    const schema = Joi.object({
        title: Joi.string().max(50),
        description: Joi.string().max(255),
        dueDate: Joi.date(),
        priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
        status: Joi.string().valid('To-Do', 'In Progress', 'Completed').default('To-Do'),
        category: Joi.string().alphanum(),
        assignedTo: Joi.array().items(Joi.string().alphanum()).default([]),
    });

    return schema.validate(task);
};

module.exports.Task = mongoose.model('Task', taskSchema);
module.exports.validate = validateTask;



