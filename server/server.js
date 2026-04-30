const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/Project');

const app = express();
app.use(cors());
app.use(express.json());

// Update this with your MongoDB connection string
mongoose.connect('mongodb://127.0.0.1:27017/pm_tool')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.post('/api/projects', async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
});

app.post('/api/projects/:id/tasks', async (req, res) => {
    const project = await Project.findById(req.params.id);
    project.tasks.push(req.body);
    await project.save();
    res.json(project);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));