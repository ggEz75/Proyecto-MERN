import Router from "express-promise-router";
import { signOut, sign, signUp, profile, } from "../controllers/auth.controller.js";

const router = Router();


// rutas para el inicio y registro de los usuarios

router.post('/signin', sign );

router.post('/signup', signUp);

router.post('/signout', signOut);

router.get('/profile', profile);

export default router;