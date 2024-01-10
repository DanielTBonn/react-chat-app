import './Chat.css'
import {
    Container
} from 'react-bootstrap'
import { useStoreContext } from '../utils/GlobalState';
import socket from '../utils/socket';
import { useEffect } from 'react';
import { UPDATE_CHAT } from '../utils/actions';
import { GET_CHAT } from '../utils/queries';
import { useQuery } from '@apollo/client';

function Chat() {

    const [state, dispatch] = useStoreContext(); 
    console.log(state)

    const { loading, data, error } = useQuery(GET_CHAT, 
        { 
            variables: { room: state.room }}
        )

    console.log(data)
    // console.log(data.getChat)

    const myData = data?.getChat || []
    console.log(myData)

    const emitted = []


    // if (data) {

    //     const messageData = myData?.messages.map((message) => message.message)

    //     console.log("messageData", messageData)

    //     dispatch({
    //         type: UPDATE_CHAT,
    //         messages: [...state.messages, ...messageData]
    //     })
    // }


    useEffect(() => {
        console.log(" in use effect");
        console.log('isState.messages', !state.messages.length)

        if (!state.messages.length && myData.messages) {
            console.log("hello inside of if && statement");
            const messageData = myData?.messages.map((message) => message.message);

            console.log("messageData", messageData);

            dispatch({
                type: UPDATE_CHAT,
                messages: [...state.messages, ...messageData]
            });

        }


        socket.on('chat-message', function(msg) {
            console.log('in socket on')
            console.log('socket on msg', msg)
            emitted.push(msg);
            if(msg) {
                dispatch({
                    type: UPDATE_CHAT,
                    messages: [...state.messages, msg] 
                });
            }
        })
        
        console.log(emitted);
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
                {emitted.length ? emitted.map((message, index) => (
                    <p key={index} >{message}</p>
                    )) : <p>No emitted messages</p>
                    }
            </Container>
        </div>
    )
}

export default Chat;