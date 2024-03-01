import pool from "../../config/config";
import { notifyDiscord } from "../../utils/notifyDiscord"; 

export const getMovies = async () => {
    try {
        const [result] = await pool.execute('SELECT * FROM movies');
        await notifyDiscord('Se ha consultado la lista de películas'); // Envía una notificación a Discord
        return result;
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        throw new Error('Ocurrió un error al obtener las películas');
    }
};

export const getUsers = async () => {
    try {
        const [result] = await pool.execute('SELECT * FROM users');
        await notifyDiscord('Se ha consultado la lista de usuarios'); // Envía una notificación a Discord
        return result;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw new Error('Ocurrió un error al obtener los usuarios');
    }
};
