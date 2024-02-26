import pool from "../../config/config";

export const series = async () =>{
    const [result] = await pool.execute('SELECT * FROM series')
    console.log({ result });
    
    return result;
}

export const serie =  async (_parent: any,  {id}: any ) => {
    try {
        const [result] = await pool.execute('SELECT * FROM series WHERE id = ?', [id]);

        if (Array.isArray(result) && result.length > 0) {
            return result[0]; 
        } else {
            throw new Error("No existe la serie con el id: " + id);
        }
    } catch (error) {
        console.error("Error al obtener la serie:", error);
        throw new Error("Error al obtener la serie");
    }
}