import { Task } from '../models/task.model.js';
import { Project } from '../models/project.model.js';


// Create Task
export const createTask = async (req, res) => {
  const { title, description, status, projectId } = req.body;

  try {
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    const task = new Task({
      title,
      description,
      status,
      project: projectId,
    });

    await task.save();

    // Link the task to the project
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json({ message: 'Task Created Successfully', task });
  } catch (error) {
     console.error("Task creation failed:", error);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};


// Get All Tasks for a Project
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json({message:'All Tasks ',tasks});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Get Single Task
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  // console.log("Incoming PUT request");
  // console.log("Task ID:", req.params.id);
  // console.log("Body:", req.body);  

  const { title, description, status, completedAt } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.completedAt = status === 'Completed' ? new Date() : null;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Update error:", error); 
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};


