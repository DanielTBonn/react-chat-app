const express = require('express');
// const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const http = require('http');

const socketIo = require('socket.io');
// const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3001;
const IS_PROD = process.env.NODE_ENV === "production";

const ORIGIN = IS_PROD ? 'website' : 'http://localhost:3000'

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ORIGIN,
        // allowedHeaders: ["Access-Control-Allow-Origin"],
        methods: ["GET", "POST"],
        credentials: true

    }
})


const startServer = async () => {



    // app.use(express.static(path.join(__dirname, '../client/dist')));
    
    // app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    // });

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
    
    // db.once('open', () => {
        
        
        // });
    server.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
}

startServer();