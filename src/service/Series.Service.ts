import pool from "../config/config";

export const getSeries = async (_parent: any, { offset, limit }: any) => {
    try {
        const offsetValue = offset || 0;
        const limitValue = limit || 10; 

        const selectQuery = 'SELECT * FROM series LIMIT ?, ?';
        const [rows] = await pool.execute(selectQuery, [offsetValue, limitValue]);

        return rows;
    } catch (error) {
        console.error("Error al obtener las series paginadas");
        throw new Error("Error al obtener las series paginadas");
    }
}
