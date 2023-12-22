import io from 'socket.io-client';

const IS_PROD = process.env.NODE_ENV === "production";

const SERVER_HOST = IS_PROD ? "https://damp-woodland-03887-8c2ffd4fa0f9.herokuapp.com/" : 'http://localhost:3001'

const socket = io(SERVER_HOST, {
    withCredentials: true,
});

export default socket;