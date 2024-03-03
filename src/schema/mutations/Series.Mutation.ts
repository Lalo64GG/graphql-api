import pool from "../../config/config";
import { notifyEvent } from "../../utils/notifyDiscord";

export const createSerie =  async(_parent: any, {input}: any) => {
    try {
        const createQuery = 'INSERT INTO series (title, year, director, img) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(createQuery,[input.title, input.year, input.director, input.img]);
        if ('insertId' in result) {
            const [insertedRow] = await pool.execute('SELECT * FROM series WHERE id = ?', [result.insertId]);

            notifyEvent(1);
            if ('length' in insertedRow && insertedRow.length !== 1) {
                throw new Error('Error al obtener los detalles de la película recién insertada');
            }

            console.log(insertedRow);
            return {
                ...input,
                id: result.insertId 
            };
        }
     } catch (error) {
        console.error("Error al insertar la serie");
        throw new Error("Error al insertar la serie");
    }
}