import jwt from "jsonwebtoken";


export const isAuth = (req, res, next) => {
    const token = req.cookies.token  // el modulo cookie-parser convierte la cabesera a una cookie, ya que express no puede acceder a la cookie como tal

    if (!token) {
        return res.status(401).json({
            message: 'NO estas autorizado!!'
        })
    }

    // Decodificar el dato del usuario para extraer su id
    jwt.verify(token, "xyz123", (err, decoded) => {

        if (err)
            return res.status(401).json({
                message: "No estas autorizado!",
            });

            req.user_id = decoded.id;
            next();
    });
};

