import pool from "../../config/config";

export const login =  async (_parent: any, { input }: any ) => {
    try {
        const loginQuery = 'SELECT id FROM users WHERE email = ? AND password = ?';
        const [result] = await pool.execute(loginQuery, [input.email, input.password]);

        if (Array.isArray(result) && result.length === 0) {
            throw new Error("No se encontró ningún usuario con los datos introducidos");
        }

        console.log("usuario encontrado");
        

        return true;
    } catch (error) {
        console.error("Error al encontrar al usuario:", error);
        throw new Error("Error al encontrar al usuario");
    }
}