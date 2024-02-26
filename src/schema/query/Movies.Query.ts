import pool from "../../config/config";

export const movies = async () =>{
    const [result] = await pool.execute('SELECT * FROM movies')
    console.log({ result });
    
    return result;
}

export const movie =  async (_parent: any,  {id}: any ) => {
    try {
        const [result] = await pool.execute('SELECT * FROM movies WHERE id = ?', [id]);

        if (Array.isArray(result) && result.length > 0) {
            return result[0]; 
        } else {
            throw new Error("No existe la pelicula con el id: " + id);
        }
    } catch (error) {
        console.error("Error al obtener la película:", error);
        throw new Error("Error al obtener la película");
    }
}