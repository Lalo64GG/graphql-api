import pool from "../../config/config";

export const handleMovieWebhookData = async (data: any) => {
    try {
        console.log('Datos de película recibidos del webhook:', data);

        const insertQuery = 'INSERT INTO movies (title, director, year, img) VALUES (?, ?, ?, ?)';
        await pool.execute(insertQuery, [data.title, data.director, data.year, data.img]);

        return 'Datos de película del webhook procesados correctamente';
    } catch (error) {
        console.error('Error al procesar datos de película del webhook:', error);
        throw new Error('Ocurrió un error al procesar los datos de película del webhook');
    }
};

export const handleUserWebhookData = async (data: any) => {
    try {
        console.log('Datos de usuario recibidos del webhook:', data);

        const insertQuery = 'INSERT INTO users (username, email) VALUES (?, ?)';
        await pool.execute(insertQuery, [data.username, data.email]);

        return 'Datos de usuario del webhook procesados correctamente';
    } catch (error) {
        console.error('Error al procesar datos de usuario del webhook:', error);
        throw new Error('Ocurrió un error al procesar los datos de usuario del webhook');
    }
};


