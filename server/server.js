const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const http = require('http');

const socketIo = require('socket.io');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;
const IS_PROD = process.env.NODE_ENV;

const ORIGIN = IS_PROD ? 'https://damp-woodland-03887-8c2ffd4fa0f9.herokuapp.com/' : 'http://localhost:3000'


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})





const startServer = async () => {

    await apolloServer.start();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(apolloServer))

    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: ORIGIN,
            // allowedHeaders: ["Access-Control-Allow-Origin"],
            methods: ["GET", "POST"],
            credentials: true

        }
    })

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
        
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
      }

    console.log('server starting')
    
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.join('chat-room');

        socket.on('chat-message', (msg) => {
            console.log('message: ' + msg)
            socket.broadcast.emit('chat-message', msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected')
        });
    })
    
    db.once('open', () => {
        server.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));    
    });
}

startServer();