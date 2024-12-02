import { pool } from "../db.js";

export const getAllTasks = async (req, res, next) => {

    const result = await pool.query('SELECT * FROM tasks'); // consulta a la tabla
    console.log(result);
    return res.json(result.rows);

};

// Obtener una tarea especifica 
export const getTask = async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);

    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "No esiste una tarea con ese id",
        })
    }
    return res.json(result.rows[0]);
}

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


// Eliminar una tera unica
export const deleteTask = async (req, res) => {

    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id])
    console.log(result)

    if(result.rowCount === 0){
        return res.status(404).json({
            message: "No existe esa tarea"
        })
    }

    return res.sendStatus(204);

}
