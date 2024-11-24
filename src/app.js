import express from 'express';
import morgan from 'morgan'; // para poder ver las peticiones por consola

const app = express();
app.use(morgan('dev')); // ahora en la terminal se podra ver tambien las peticiones y/o errores
app.use(express.json()) // para transformar datos json en obj js
app.use(express.urlencoded({extended: false})); // para formularios html

app.get('/', (req, res) => res.json({message: "wellcome tomy API"}));
// descargar la extencion de JSON viewer en chrome "y ponerlo en oscuro🙏"

app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    })

}) // para tener un mensaje personalizado en caso de que ocurra un error

export default app;
