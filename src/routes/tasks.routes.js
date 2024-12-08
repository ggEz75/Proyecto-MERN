import Router from "express-promise-router"; // para el manejar los errores de las rutas como un Promises

import { 
    createTask,
    deleteTask,
    getAllTasks, 
    getTask, 
    updateTask 
} from "../controllers/tasks.controller.js";

import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/tasks', isAuth, getAllTasks);

router.get('/tasks/:id', isAuth, getTask);
router.post('/tasks', isAuth, createTask);
router.put('/tasks/:id', isAuth, updateTask);
router.delete('/tasks/:id', isAuth, deleteTask);
// para probarlos esta la extencion "thunder client" en vscode 


export default router;
