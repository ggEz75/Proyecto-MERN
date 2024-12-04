import jwt from 'jsonwebtoken'

export const createAccessToke = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            "xyz123",
            {
                expiresIn: "1d", // temporizador de inicio de sesión
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};


