const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: Date,
  status: { type: String, default: 'Pending' }
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tasks: [TaskSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);