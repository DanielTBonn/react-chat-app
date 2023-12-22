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

        socket.on('connect_error', ()=>{
            setTimeout(()=> socket.connect(), 5000)
          });
        //  socket.on('time', (data)=>setTime(data))
         socket.on('disconnect',()=>setTime('server disconnected'));

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