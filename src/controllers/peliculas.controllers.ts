import pool from "../config/config";

export const getMovie = () => async () =>{
    const [rows] = await pool.execute('SELECT * FROM movies')
}

export const createMovie = () => async () =>{
    const [result] = await pool.execute('INSERT INTO movies (title, year, director) VALUES(?, ?, ?)', [])
}