import './Chat.css'
import {
    Container
} from 'react-bootstrap'
import { useStoreContext } from '../utils/GlobalState';
import socket from '../utils/socket';
import { useEffect } from 'react';
import { UPDATE_CHAT, UPDATE_ROOM } from '../utils/actions';
import { GET_CHAT_BY_ID } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

function Chat() {

    const [state, dispatch] = useStoreContext(); 
    console.log(state)

    const roomId = useParams();
    
    const { data } = useQuery(GET_CHAT_BY_ID, 
        { 
            variables: { roomId: roomId.id }
        }
    )

    const myData = data?.getChatById || [];
    const myRoom = myData.room;
    console.log(myData)

    useEffect(() => {

        if (!state.room && myRoom) {
            dispatch({
                type: UPDATE_ROOM,
                room: myRoom
            });
        }


        if (!state.messages.length && myData.messages?.length) {
            const messageData = myData?.messages.map((message) => message.username + ': '+  message.message);

            dispatch({
                type: UPDATE_CHAT,
                messages: [...state.messages, ...messageData]
            });
        }

        socket.on('chat-message', function(msg) {
            if(msg) {
                dispatch({
                    type: UPDATE_CHAT,
                    messages: [...state.messages, msg] 
                });
            }
        })
        
    }, [state, data])

    return (
        <div>
            <Container className="container-chat" >
                {state.messages ? state.messages.map((message, index) => (
                    <p key={index} >{message}</p>
                    )) : <p>Hello World!</p>
                    }
            </Container>
        </div>
    )
}

export default Chat;