export const typeDefs = `
    type Movie {
        id: ID,
        title: String,
        year: Int,
        director: String,
    }

    type User {
        id: ID,
        name: String,
        email: String,
        password: String,
    }

    input MovieInput{ 
        title: String!,
        year: Int!,
        director: String!
    }

    input UserInput{
        name: String!,
        email: String!
        password: String!
    }

    input LoginInput{
        email: String!,
        password: String!
    }

    type Query {
        movies: [Movie]
        movie(id: ID!): [Movie]
        users: [User]
        user(id: ID!): [User]
    }

    type Mutation {
        createMovie(input: MovieInput): Movie
        updateMovie(id: ID!, input: MovieInput): Movie
        deleteMovie(id: ID!): Boolean

        createUser(input: UserInput): User
        updateUser(id: ID!, input: UserInput): User
        deleteUser(id: ID!): Boolean

        login(input: LoginInput): Boolean

    }
`