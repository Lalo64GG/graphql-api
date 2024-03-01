import pool from "../../config/config";
import { notifyDiscord } from "../../utils/notifyDiscord";

export const createMovie = async (_parent: any, { input }: any) => {
    try {
        const createQuery = 'INSERT INTO movies (title, year, director) VALUES (?, ?, ?)';
        const [result] = await pool.execute(createQuery, [input.title, input.year, input.director]);

        if ('affectedRows' in result && result.affectedRows !== 1) {
            throw new Error('Error al insertar la película');
        }

        // Obtener detalles de la fila recién insertada
        if ('insertId' in result) {
            const [insertedRow] = await pool.execute('SELECT * FROM movies WHERE id = ?', [result.insertId]);

            if ('length' in insertedRow && insertedRow.length !== 1) {
                throw new Error('Error al obtener los detalles de la película recién insertada');
            }

            await notifyDiscord(`Se ha creado una nueva película: ${input.title}`);
            
            return {
                ...input,
                id: result.insertId 
            };
        } else {
            throw new Error('No se pudo obtener el ID de la película recién insertada');
        }
    } catch (error) {
        console.error("Error al insertar la película:", error);
        throw new Error("Error al insertar la película");
    }
}

export const updateMovie = async (_parent: any, { id, input }: any) => {
    try {
        const updateQuery = 'UPDATE movies SET title = ?, year = ?, director = ? WHERE id = ?';
        const [result] = await pool.execute(updateQuery, [input.title, input.year, input.director, id]);

        // Verificamos si result es un objeto OkPacket o ResultSetHeader
        if ('affectedRows' in result && result.affectedRows > 0) {
            await notifyDiscord(`Se ha actualizado la película con ID ${id}`);
            return {
                id,
                ...input,
            };
        } else {
            throw new Error(`No se encontró ninguna película con el ID ${id}`);
        }
    } catch (error) {
        console.error("Error al actualizar la película:", error);
        throw new Error("Hubo un problema al actualizar la película.");
    }
}

export const deleteMovie = async (_parent: any, { id }: any) => {
    try {
        const deleteQuery = 'DELETE FROM movies WHERE id = ?';
        const result = await pool.execute(deleteQuery, [id]);

        if (!('affectedRows' in result[0]) || result[0].affectedRows === 0) {
            throw new Error(`No se encontró ninguna película con el ID ${id}`);
        }

        await notifyDiscord(`Se ha eliminado la película con ID ${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar la película:", error);
        throw new Error("Error al eliminar la película");
    }
}
