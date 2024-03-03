import pool from "../config/config";

export const getUsers = async (_parent: any, { offset = 0, limit = 10 }: any) => {
    try {
        const selectQuery = 'SELECT * FROM users LIMIT ?, ?';
        const [rows] = await pool.execute(selectQuery, [offset, limit]);

        return rows;
    } catch (error) {
        console.error("Error al obtener los usuarios paginados:", error);
        throw new Error("Error al obtener los usuarios paginados");
    }
}
