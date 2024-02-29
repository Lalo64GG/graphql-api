import { createUser, updateUser, deleteUser } from "../schema/mutations/User.Mutation";
import { createMovie, updateMovie, deleteMovie } from "../schema/mutations/Movies.Mutation";
import { login } from "../schema/mutations/Login.Mutation";
import { movies, movie } from "../schema/query/Movies.Query";
import { users, user } from "../schema/query/User.Query";
import { series, serie } from "../schema/query/Series.Query";
import { getMovies ,getUsers} from "../service/webhook/webhook.Service";; 

export const resolvers = {
    Query: {
        movies: async () => {
            try {
                return await getMovies(); // Llama a la función de servicio para obtener películas
            } catch (error) {
                console.error('Error al obtener películas:', error);
                throw new Error('Ocurrió un error al obtener las películas');
            }
        },
        users: async () => {
            try {
                return await getUsers(); // Llama a la función de servicio para obtener usuarios
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                throw new Error('Ocurrió un error al obtener los usuarios');
            }
        },
        series,
        serie
    },
    Mutation: {

        //? Mutaciones de movies
        createMovie,
        updateMovie,
        deleteMovie,
       
        //? Mutaciones de Series

        

        createUser,
        updateUser,
        deleteUser,
        
        //? Mutaciones de users

       login

        
    }
}