import { Router } from "express";

const router = Router();


// rutas para el inicio y registro de los usuarios

router.post('/signin', (req, res) => res.send('ingresando'));

router.post('/signup', (req, res) => res.send('Registrando'));

router.post('/signout', (req, res) => res.send('cerrando sesion'));

router.get('/profile', (req, res) => res.send('Perfil del usuario'));

export default router;