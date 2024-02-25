import "dotenv/config";
import { ApolloServer } from "@apollo/server"; 
import { startStandaloneServer } from "@apollo/server/standalone";
import { config } from "dotenv";
import { typeDefs } from "./graphql/schema"; 
import { resolvers } from "./graphql/resolvers";

config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Use type assertion to indicate that 'subscriptions' is recognized
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    subscriptions: {
        onConnect: (connectionParams: any, webSocket: any, context: any) => {
            console.log('Client connected!');
            // You can perform additional actions when a client connects
        },
    },
} as any); // Use type assertion here as well

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
