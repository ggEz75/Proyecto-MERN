CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    tittle VARCHAR(255) UNIQUE NOT NULL,
    description TEXT 
);