import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  updateProject,
} from '../controllers/project.controller.js';
// import { protect } from '../middlewares/authMiddleware.js';

import { Authenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', Authenticated, createProject);
router.get('/all', Authenticated, getProjects);
router.get('/:id', Authenticated, getProjectById);
router.put('/:id', Authenticated, updateProject);
router.delete('/:id',Authenticated,deleteProject)

export default router;
