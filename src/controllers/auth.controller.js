import {pool} from '../db.js'
import bcrypt from 'bcrypt'
import { createAccessToke } from '../libs/jwt.js';

export const sign = (req, res) => res.send('ingresando');

export const signUp = async (req, res) => {
    const { name, email, password} = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10) // el numero ejecuta el numero de veces el algoritmo, es recomendable usar de 10 a 15

        const result = await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [name, email, hashedPassword]
        );
        
        const token = await createAccessToke({id: result.rows[0].id}) // jwt
        
        //         TOKEN en COOKIE
        res.cookie('token', token, {
            httpOly: true,
            // secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 // 1 dia
        }); // mandamos el token de la sesion iniciada 

        
        return res.json(result.rows[0])

    } catch (error) {
        if (error.code === "23505"){
            return res.status(400).json({
                message: "El correo ya esta registrado"
            });
        }
    }
};

export const signOut = (req, res) => res.send('cerrando sesion');

export const profile = (req, res) => res.send('Perfil del usuario');

