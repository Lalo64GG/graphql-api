import pool from "../../config/config";

export const users =  async () => {
    const [ result ] = await pool.execute('SELECT * FROM users')
    return result;
}

export const user =  async (_parent: any, { id }: any) => {
    try{
    const [ result ] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    if (Array.isArray(result) && result.length > 0) {
        return result[0]; 
    } else {
        throw new Error("No existe el usuario con el id: " + id);
    }
    } catch(error){
        console.error("Error al obtener la película:", error);
        throw new Error("Error al obtener la película");
    }
} 