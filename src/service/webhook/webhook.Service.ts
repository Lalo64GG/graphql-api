import pool from "../../config/config";

export const getMovies = async () => {
    const [result] = await pool.execute('SELECT * FROM movies');
    return result;
};

export const getUsers = async () => {
    const [result] = await pool.execute('SELECT * FROM users');
    return result;
};
