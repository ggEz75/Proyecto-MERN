import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/tasks.controller.js";

const router = Router();

router.get('/task', getAllTasks);

router.get('/task/:id', getTask);
router.post('/task', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);
// para probarlos esta la extencion "thunder client" en vscode 


export default router;
