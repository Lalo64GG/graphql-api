import { createUser, updateUser, deleteUser } from "../schema/mutations/User.Mutation";
import { createMovie, updateMovie, deleteMovie } from "../schema/mutations/Movies.Mutation";
import { createSerie } from "../schema/mutations/Series.Mutation";
import { login } from "../schema/mutations/Login.Mutation";
import { movies, movie } from "../schema/query/Movies.Query";
import { users, user } from "../schema/query/User.Query";
import { series, serie } from "../schema/query/Series.Query";

import { createWebhook } from "../schema/mutations/webhook/createWebhook";
import { createEvent } from "../schema/mutations/webhook/createEvent";
import { createWebhookEvent } from "../schema/mutations/webhook/createWebhookEvent";


export const resolvers = {
    Query: {
         
        series,
        serie
    },
    Mutation: {

        //? Mutaciones de movies
        createMovie,
        updateMovie,
        deleteMovie,
       
        //? Mutaciones de Series
         createSerie ,

         //mutaciones webhook
         createWebhook,
         createEvent,
         createWebhookEvent,
        

    
        
        //? Mutaciones de users
       
        createUser,
        updateUser,
        deleteUser,
       login

        
    }
}