import express from 'express';
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { Authenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add', Authenticated, createTask);
router.get('/project/:projectId', Authenticated, getTasksByProject);
router.get('/:id', Authenticated, getTaskById);
router.put('/:id', Authenticated,updateTask);
router.delete('/:id', Authenticated,deleteTask);

export default router;
