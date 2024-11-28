import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/tasks.controller.js";

const router = Router();

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
// para probarlos esta la extencion "thunder client" en vscode 


export default router;
