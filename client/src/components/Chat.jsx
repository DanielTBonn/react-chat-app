import './Chat.css'
import {
    Container
} from 'react-bootstrap'
import { useStoreContext } from '../utils/GlobalState';
import socket from '../utils/socket';
import { useEffect } from 'react';
import { UPDATE_CHAT, UPDATE_ROOM } from '../utils/actions';
import { GET_CHAT } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_CHAT_BY_ID } from '../utils/queries';

function Chat() {

    const [state, dispatch] = useStoreContext(); 
    console.log(state)

    const roomId = useParams();
    
    const { loading, data, error } = useQuery(GET_CHAT_BY_ID, 
        { 
            variables: { roomId: roomId.id }
        }
    )

    
    const myData = data?.getChatById || [];
    const myRoom = myData.room;

    useEffect(() => {
        console.log('isState.messages', !state.messages.length)

        if (!state.room && myRoom) {
            dispatch({
                type: UPDATE_ROOM,
                room: myRoom
            });
        }

        if (!state.messages.length && myData.messages?.length) {
            console.log("hello inside of if && statement");
            const messageData = myData?.messages.map((message) => message.message);

            console.log("messageData", messageData);

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
                {/* { loading ? <p> No messages at this time</p> : 
                dispatch({
                    type: UPDATE_CHAT,
                    messages: [...state.messages] 
                })
                }  */}
                {state.messages ? state.messages.map((message, index) => (
                    <p key={index} >{message}</p>
                    )) : <p>Hello World!</p>
                    }
            </Container>
        </div>
    )
}

export default Chat;