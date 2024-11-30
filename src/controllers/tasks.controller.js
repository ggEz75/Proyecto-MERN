import { pool } from "../db.js";

export const getAllTasks = async (req, res, next) => {

    const result = await pool.query('SELECT * FROM tasks2'); // consulta a la tabla
    console.log(result);
    return res.json(result.rows);

};

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
            return res.status(409).json({
                message: "Ya existe una tarea con ese titulo.",
            });
        }
        next(error);
    }
};

export const updateTask = (req, res) => res.send('Actualizando tarea unica');

export const deleteTask = (req, res) => res.send('eliminando tarea');

