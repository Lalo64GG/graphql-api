export const typeDefs = `
    type Webhook {
        id: ID
        id_usuario: ID
        url: String
    }

    type Event {
        id: ID
        name: String
    }

    type WebhookEvent {
        id: ID
        id_webhook: ID
        id_event: ID
    }

    type Movie {
        id: ID,
        title: String,
        year: Int,
        director: String,
    }

    type Serie {
        id: ID,
        title: String,
        year: Int,
        director: String,
        img: String
    }

    type User {
        id: ID,
        name: String,
        email: String,
        password: String,
    }

    input MovieInput { 
        title: String!,
        year: Int!,
        director: String!
    }

    input SeriesInput {
        title: String!,
        year: Int!,
        director: String!,
        img: String!
    }

    input UserInput {
        name: String!,
        email: String!,
        password: String!
    }

    input LoginInput {
        email: String!,
        password: String!
    }

    type Query {
        movies: [Movie]
        movie(id: ID!): Movie

        series(offset: Int, limit: Int): [Serie]  # Agregar offset y limit para paginación
        serie(id: ID!): Serie

        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        createMovie(input: MovieInput): Movie
        updateMovie(id: ID!, input: MovieInput): Movie
        deleteMovie(id: ID!): Boolean

        createSerie(input: SeriesInput): Serie
        updateSerie(id: ID!, input: SeriesInput): Serie
        deleteSerie(id: ID!): Boolean

        createWebhook(id_usuario: ID, url: String) : Webhook
        createEvent(name: String) : Event
        createWebhookEvent(id_webhook: ID, id_event: ID) : WebhookEvent

        createUser(input: UserInput): User
        updateUser(id: ID!, input: UserInput): User
        deleteUser(id: ID!): Boolean

        login(input: LoginInput): AuthPayload
    }

    type AuthPayload {
        token: String
    }
`;
