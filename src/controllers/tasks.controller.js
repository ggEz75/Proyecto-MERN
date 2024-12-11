import { pool } from "../db.js";

export const getAllTasks = async (req, res, next) => {

    console.log(req.user_id) // 

    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1',[req.user_id]); // consulta a la tabla
    console.log(result);
    return res.json(result.rows);

};

//                               Obtener una tarea especifica (GET)
export const getTask = async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);

    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "No esiste una tarea con ese id",
        })
    }
    return res.json(result.rows[0]);
}

//                                   Crear una tarea (POST)

export const createTask = async (req, res, next) => {
    const { title, description, user_id } = req.body;
    console.log(title,description)
    // db insert

    try {
        //throw new Error("Error frozado");

        const result = await pool.query('INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *', [title, description, req.user_id])

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

//                        Actualizar tarea unica (PUT)
export const updateTask = async (req, res) => {
    const id = req.params.id
    const { title, description } = req.body;

    const result = await pool.query('UPDATE tasks SET title = $1, description = $2 WHERE id = $3', [title, description, id])
    console.log(result);

    if(result.rowCount === 0){
        return res.status(404).json({
            message: "No existe esa tarea"
        })
    }

    return res.json({
        message: 'Tarea Actualizada'
    })
}

//                    Eliminar una tera unica (DELETE)
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
