import { createContext, useState, useContext } from "react";
import axios from 'axios'; // Importar axios para hacer peticiones al servidor HTTP

export const AuthContext = createContext(); // ejecutamos la funcion para crear el contexto

export const useAuth = () => {
    const context = useContext(AuthContext); // extraemos el contexto
    if (!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthProvider')
    }

    return context
}; // exportamos el hook para usar el contexto


    export function AuthProvider({children}) {
        // Estados de usuarios en la aplicación
    const [user, setUser] = useState(null); // definimos el estado de usuario
    const [isAuth, setIsAuth] = useState(false); // definimos el estado de autenticación
    const [errors, setErrors] = useState(null); // definimos el estado de errores

    const signin = async (data) => {
        const res = await axios.post('http://localhost:3000/api/signin', data, {withCredentials: true}); // Petición POST al servidor con los datos del formulario
        console.log(res.data);
        setUser(res.data); // Restablecemos los datos del usuario en el estado 
    }

    const signup = async (data) => {
        const res = await axios.post('http://localhost:3000/api/signup', data, {withCredentials: true,

        }); // Petición POST al servidor con los datos del formulario
        console.log(res.data);
        setUser(res.data); // guardamos los datos del usuario en el estado
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuth, 
            errors, 
            signup,
            signin,
            }}>
        {children}
        </AuthContext.Provider> // exportamos para saber los datos que tenga el contexto (Definimos los datos de usuario, si esta logueado o no, token, etc 👌)
    )
    }
