import Message from '../components/Message';
import Chat from '../components/Chat';
import { useEffect } from 'react';
import socket from '../utils/socket';

function ChatRoom() {

    useEffect(() => {
        socket.on('connect', () => console.log(socket.id))
        // console.log(socket)

    }, [socket])
    return (
        <div>
            <Chat />
            <Message />
        </div>
    )
}

export default ChatRoom;