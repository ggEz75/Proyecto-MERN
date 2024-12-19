import express from 'express'; 
import morgan from 'morgan'; // para poder ver las peticiones por consola
import cookieParser from 'cookie-parser';
import cors from 'cors'; // permite el acceso de dominios

import taskaRoutes from './routes/tasks.routes.js';
import authRoutes from "./routes/auth.routes.js";

const app = express();

//            MIDDLEWARE

app.use(cors({
    origin: 'http://localhost:5173', // Solo permite a esta direccion pedir datos
    credentials: true // Esto permite enviar las peticiones con una cookie establecida 
})); // al aplicarlo de esta forma esta permitiendo la entrada de datos
app.use(morgan('dev')); // ahora en la terminal se podra ver tambien las peticiones y/o errores
app.use(cookieParser()); // permite convertir los headers en cookies
app.use(express.json()) // para transformar datos json en obj js
app.use(express.urlencoded({extended: false})); // para formularios html


//            ROUTES 
app.get('/', (req, res) => res.json({message: "wellcome to my API"}));
// descargar la extencion de JSON viewer en chrome "y ponerlo en oscuro🙏"

// # NOTA: colocar "api" en el llamado de las rutas nos aseguran que no coincidan con las rutas de front

app.use("/api", taskaRoutes); // es importante no ponerlo debajo del manejador de errores como tambien no ponerlo sobre los middleware
app.use("/api", authRoutes);


//          ERROR HANDER
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    })

}) // para tener un mensaje personalizado en caso de que ocurra un error

export default app;
