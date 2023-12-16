const express = require('express');
// const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

// const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    db.once('open', () => {
        app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`))
    });
}

startServer();