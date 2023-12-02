import {Router} from 'express';
import { createTask, deleteTask, getTask, getTasks, toggleTasks, updateTasks } from '../controllers/tasks.controller.js';

const router = Router();
router.get('/tasks',getTasks);
router.get('/tasks/:id',getTask);
router.post('/tasks',createTask);
router.patch('/tasks/:id',updateTasks);
router.patch('/tasks/:id/toggle',toggleTasks);
router.delete('/tasks/:id',deleteTask);

export default router;
