import "dotenv/config";
import { ApolloServer } from "@apollo/server"; 
import { startStandaloneServer } from "@apollo/server/standalone";
import { config } from "dotenv";
import { typeDefs } from "./graphql/schema"; 
import { resolvers } from "./graphql/resolvers";
// import { notifyDiscord } from "../src/utils/notifyDiscord";


config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
}); 

const PORT = parseInt(process.env.PORT || "4000");

(async () => {
    try {
        const { url } = await startStandaloneServer(server, {
            listen: {
                port: PORT
            }
        });
        console.log(`Servidor corriendo en el puerto: ${url}`);
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
})();

console.log("OK!");
// notifyDiscord("Prueba de mensaje a Discord desde la aplicación");
