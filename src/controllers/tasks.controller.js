import { pool } from "../db.js";

export const getAllTasks = (req, res) => res.send('Obteniendo tareas');

export const getTask = (req, res) => res.send('Obteniendo tarea unica');


export const createTask = async (req, res, next) => {
    const { tittle, description } = req.body;
    console.log(tittle,description)
    // db insert

    try {
        //throw new Error("Error frozado");

        const result = await pool.query('INSERT INTO tasks (tittle, description) VALUES ($1, $2) RETURNING *', [tittle, description])

        res.json(result.rows[0]);
        
    } catch (error) {
        if (error.code === "23505") {
            return res.send("Esta tarea ya existe");
        }
        next(error);
    }
};

export const updateTask = (req, res) => res.send('Actualizando tarea unica');

export const deleteTask = (req, res) => res.send('eliminando tarea');

