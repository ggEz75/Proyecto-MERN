import Router from "express-promise-router";
import { signOut, sign, signUp, profile, } from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js"; // agregar la proteccion de las rutas

const router = Router();


// rutas para el inicio y registro de los usuarios

router.post('/signin', sign );

router.post('/signup', signUp);

router.post('/signout', signOut);

router.get('/profile', isAuth, profile);

export default router;