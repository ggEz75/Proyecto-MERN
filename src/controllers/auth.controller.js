import {pool} from '../db.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js';
import axios from 'axios'; // para las imagenes de avatares relacionando el nombre con la cuenta de github


//     LOGIN 
export const sign = async (req, res) => {
    const {email, password} = req.body; // variables de inicio de sesion 

    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]) // Buscamos el correo ingresado

    if (result.rowCount === 0) {
        return res.status(400).json({
            message: 'El correo no esta registrado'
        })
    } 

    const validPassword = await bcrypt.compare(password, result.rows[0].password) // compara las contraseñas encriptadas

    if (!validPassword) {
        return res.status(400).json({
            message: 'La contraseña es incorrecta'
        })
    } // en caso de que la contraseña sea incorrecta, no dara el token

    const token = await createAccessToken({id: result.rows[0].id})

    res.cookie('token', token, {
        httpOly: true,
        secure: true,
        sameSite: 'none', // esto nos indica que entre dominios se puedan consultar 
        maxAge: 24 * 60 * 60 * 1000 // 1 dia
    }); // mandamos el token de la sesion iniciada
    
    return res.json(result.rows[0])

};
/*

*/


export const signUp = async (req, res, next) => {
    const { name, email, password} = req.body;
    const git_avatar = await axios.get(`https://api.github.com/users/${name}`);

    try {
        const hashedPassword = await bcrypt.hash(password, 10) // el numero ejecuta el numero de veces el algoritmo, es recomendable usar de 10 a 15

        const result = await pool.query('INSERT INTO users(name, email, password, git_avatar) VALUES($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, git_avatar.data.avatar_url]
        );
        
        const token = await createAccessToken({id: result.rows[0].id}) // jwt
        
        //         TOKEN en COOKIE
        // campos permanecientes en el navegador
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

        next(error);
    }
};



export const signOut = (req, res) => {
    res.clearCookie('token') // Borra el token guardado en la cookie
    res.sendStatus(200);
};

export const profile = async (req, res) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user_id]);
    return res.json(result.rows[0])

};

