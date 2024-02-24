import "dotenv/config";
import { ApolloServer } from "@apollo/server"; 
import { startStandaloneServer} from "@apollo/server/standalone";
import { config } from "dotenv";
import pool from "./config/config";
import { typeDefs } from "./graphql/schema"; 
import { resolvers } from "./graphql/resolvers";

config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const PORT = parseInt(process.env.PORT || "4000");

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: {
            port: PORT
        }
    });
    console.log(`Servidor corriendo en el pueto: ${url}`);
})();

console.log("OK!");
