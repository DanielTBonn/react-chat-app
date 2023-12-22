import './App.css';
import { useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
import socket from './utils/socket';


import { StoreProvider } from './utils/GlobalState';

import Header from './components/Header';
import Message from './components/Message';

import ChatRoom from './pages/ChatRoom';


function App() {

    useEffect(() => {
        socket.on('connect', () => console.log(socket.id))
        // console.log(socket)

    }, [socket])

    return (
        <div>
            <StoreProvider>
                <Header />
                <ChatRoom />
            </StoreProvider>
        </div>
    )
}

export default App;