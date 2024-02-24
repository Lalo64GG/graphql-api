import pool from "../config/config"

export const resolvers = {
    Query: {
        movies: async () =>{
            const [rows] = await pool.execute('SELECT * FROM movies')
            return rows;
        },
        movie: async (_parent: any, { id }: any) => {
            const [result] = await pool.execute('SELECT * FROM movies WHERE id = ?', [id]);
            console.log({result});
            
            return result;
        },

        users: async () => {
            const [ result ] = await pool.execute('SELECT * FROM users')
            return result;
        },
        user: async (_parent: any, { id }: any) => {
            const [ result ] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
            return result;
        }
    },

    Mutation: {

        //? Mutaciones de movies

        createMovie: async(_parent: any, { input }: any) =>{
           try {
            const createQuery = 'INSERT INTO movies (title, year, director) VALUES ( ?, ?, ?)';
            const [result ] = await pool.execute(createQuery,[input.title, input.year, input.director])
            if (result === null)
                throw new Error('Error al insertar la pelicula')

            return {
                ...input
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
        
                if (result === null) {
                    throw new Error(`No se encontró ninguna película con el ID ${id}`);
                }
        
                return {
                    id,
                    ...input,
                };
            } catch (error) {
                console.error("Error al actualizar la película:", error);
                throw new Error("Hubo un problema al actualizar la película.");
            }
        },
        
        deleteMovie: async (_parent: any, { id }: any) => {
            try {
                const deleteQuery = 'DELETE FROM movies WHERE id = ?';
                const [result] = await pool.execute(deleteQuery, [id]);
                if( result === null ) 
                    throw new Error(`No se encontró ninguna película con el ID ${id}`);
                return {
                    id,
                    message: "Pelicula eliminada correctamente"
                }
            }
            catch (error) {
                console.error("Error al eliminar el dato.");
                
            }
        },
        
        //? Mutaciones de users

        createUser: async (_parent: any, { input }: any) => {
            try {
                const createQuery = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
                const [result] = await pool.execute(createQuery, [input.name, input.email, input.password])
                if (result === null)
                    throw new Error('Error al insertar el usuario')
                return {
                 ...input
                }
            }catch ( error){
                console.error("Error al insertar el usuario", error);
                throw new Error("Error al insertar el usuario");
            }
        },

        updateUser: async (_parent: any, { id, input }: any) => {
            try {
                const updateQuery = 'UPDATE users SET name =?, email =?, password =? WHERE id =?';
                const [result] = await pool.execute(updateQuery, [input.name, input.email, input.password, id]);
        
                if (result === null) {
                    throw new Error(`No se encontró ningún usuario con el ID ${id}`);
                }
        
                return {
                    id,
                  ...input,
                };
            } catch (error) {
                console.error("Error al actualizar el usuario:", error);
                throw new Error("Hubo un problema al actualizar el usuario.");
            }
        },

        deleteUser: async (_parent: any, { id }: any) => {
            try {
                const deleteQuery = 'DELETE FROM users WHERE id =?';
                const [result] = await pool.execute(deleteQuery, [id]);
                if( result === null ) 
                    throw new Error(`No se encontró ningún usuario con el ID ${id}`);
                return {
                    id,
                    message: "Usuario eliminado correctamente"
                }
            }
            catch (error) {
                console.error("Error al eliminar el dato.");
                
            }
        },

        login: async (_parent: any, { input }: any ) => {
            try {
                const loginQuery = 'SELECT id FROM users WHERE email =? AND password =?';
                const [result] = await pool.execute(loginQuery, [input.email, input.password])
                console.log(result);
                
                if(result === null)
                    throw new Error("No se encontró ningún usuario con los datos introducidos");
                return true
            } catch (error) {
                console.error("Error al encontrar al usuario " , error);
                throw new Error("Error al encontrar al usuario");
                
            }
        }
    }
}