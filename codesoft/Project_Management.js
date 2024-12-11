const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project-management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));


  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');
  
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });
  
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  module.exports = mongoose.model('User', userSchema);

  
  const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Project', projectSchema);


const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Completed'] },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  deadline: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', taskSchema);


const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { title, description, deadline, members } = req.body;
  const project = new Project({
    title,
    description,
    deadline,
    createdBy: req.user.id,
    members
  });

  try {
    await project.save();
    res.status(201).send('Project created');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.id });
  res.json(projects);
};


const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, assignedTo, projectId, deadline, priority } = req.body;
  const task = new Task({
    title,
    description,
    assignedTo,
    projectId,
    deadline,
    priority,
    createdBy: req.user.id
  });

  try {
    await task.save();
    res.status(201).send('Task created');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get tasks for a specific project
exports.getTasks = async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ projectId });
  res.json(tasks);
};


const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;


const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createTask);
router.get('/:projectId', authMiddleware, getTasks);

module.exports = router;


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
