const typeDefs = `
    type Chat {
        _id: ID!
        room: String!
        messages: [Message]
    }

    type Message {
        _id: ID!
        message: String!
    }

    type Query {
        chat: [Chat]
        getChat(room: String!): Chat
        getChatById(_id: ID!): Chat
    }
    type Mutation {
        createChat(room: String!): Chat
        updateChat(room: String!, message: String!): Chat
        deleteChat(room: String!): Chat
    }
`

module.exports = typeDefs;