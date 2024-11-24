import { Router } from "express";

const router = Router();

router.get('/task', (req, res) => res.send('Obteniendo tareas'));

router.get('/task/:id', (req, res) => res.send('Obteniendo tarea unica'));
router.post('/task', (req, res) => res.send('Creando una tareas'));
router.put('/task/:id', (req, res) => res.send('Actualizando tarea unica'));
router.delete('/task/:id', (req, res) => res.send('eliminando tarea'));
// para probarlos esta la extencion "thunder client" en vscode 


export default router;
