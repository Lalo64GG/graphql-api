import pool from "../../config/config";

export const createUser =  async (_parent: any, { input }: any) => {
    try {
        const createQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await pool.execute(createQuery, [input.name, input.email, input.password]);
        if ('affectedRows' in result && result.affectedRows !== 1) {
            throw new Error('Error al insertar el usuario');
        }

        // Devuelve más información en la respuesta si es necesario
        return {
            id: 'insertId' in result ? result.insertId : undefined, // Puedes incluir el ID del usuario recién creado
            ...input
        };
    } catch (error) {
        console.error("Error al insertar el usuario", error);
        throw new Error("Error al insertar el usuario");
    }
}

export const updateUser =  async (_parent: any, { id, input }: any) => {
    try {
        const updateQuery = 'UPDATE users SET name =?, email =?, password =? WHERE id =?';
        const [result] = await pool.execute(updateQuery, [input.name, input.email, input.password, id]);
 // Verificamos si result es un objeto OkPacket o ResultSetHeader
 if ('affectedRows' in result && result.affectedRows > 0) {
    return {
        id,
        ...input,
    };
} else {
    throw new Error(`No se encontró ningun usuario con el ID ${id}`);
}
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        throw new Error("Hubo un problema al actualizar el usuario.");
    }
}

export const deleteUser =  async (_parent: any, { id }: any) => {
    try {
        const deleteQuery = 'DELETE FROM users WHERE id = ?';
        const [result] = await pool.execute(deleteQuery, [id]);

        // Verificamos si result es un array y si se eliminó al menos una fila
        if (Array.isArray(result) && result.length > 0 && 'affectedRows' in result[0] && result[0].affectedRows > 0) {
            return true;
        } else {
            throw new Error(`No se encontró ningún usuario con el ID ${id}`);
        }
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw new Error("Error al eliminar el usuario");
    }
}