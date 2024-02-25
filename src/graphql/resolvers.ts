import pool from "../config/config"

export const resolvers = {
    Query: {
        movies: async () =>{
            const [result] = await pool.execute('SELECT * FROM movies')
            console.log({ result });
            
            return result;
        },
        movie: async (_parent: any,  {id}: any ) => {
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
        },

        users: async () => {
            const [ result ] = await pool.execute('SELECT * FROM users')
            return result;
        },
        user: async (_parent: any, { id }: any) => {
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
    },

    Mutation: {

        //? Mutaciones de movies

        createMovie: async(_parent: any, { input }: any) =>{
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
    
                console.log(insertedRow);
    
                return {
                    ...input,
                    id: result.insertId 
                };
            } else {
                throw new Error('No se pudo obtener el ID de la película recién insertada');
            }
            }
            catch (error) {
                console.error("Error al insertar la pelicula");
                throw new Error("Error al insertar la pelicula");
           }
        },

        updateMovie: async (_parent: any, { id, input }: any) => {
            try {
                const updateQuery = 'UPDATE movies SET title = ?, year = ?, director = ? WHERE id = ?';
                const [result] = await pool.execute(updateQuery, [input.title, input.year, input.director, id]);
        
                // Verificamos si result es un objeto OkPacket o ResultSetHeader
                if ('affectedRows' in result && result.affectedRows > 0) {
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
        },
        
        deleteMovie: async (_parent: any, { id }: any) => {
            try {
                const deleteQuery = 'DELETE FROM movies WHERE id = ?';
                const result = await pool.execute(deleteQuery, [id]);
        
                if (!('affectedRows' in result[0]) || result[0].affectedRows === 0) {
                    throw new Error(`No se encontró ninguna película con el ID ${id}`);
                }
        
                return true;
            } catch (error) {
                console.error("Error al eliminar la película:", error);
                throw new Error("Error al eliminar la película");
            }
        },
        
        //? Mutaciones de users

        createUser: async (_parent: any, { input }: any) => {
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
        },

        updateUser: async (_parent: any, { id, input }: any) => {
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
        },

        deleteUser: async (_parent: any, { id }: any) => {
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
        },

        login: async (_parent: any, { input }: any ) => {
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
    }
}