import pool from "../config/config"
import { createUser, updateUser, deleteUser } from "../schema/mutations/User.Mutation";
import { createMovie, updateMovie, deleteMovie } from "../schema/mutations/Movies.Mutation";
import { login } from "../schema/mutations/Login.Mutation";

import { movies, movie } from "../schema/query/Movies.Query";
import { users, user } from "../schema/query/User.Query";
import { series, serie } from "../schema/query/Series.Query"; 
export const resolvers = {
    Query: {
       

      
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