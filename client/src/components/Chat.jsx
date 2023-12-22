import './Chat.css'
import {
    Container
} from 'react-bootstrap'
import { useStoreContext } from '../utils/GlobalState';
import socket from '../utils/socket';
import { useEffect } from 'react';
import { UPDATE_CHAT } from '../utils/actions';

function Chat() {

    const [state, dispatch] = useStoreContext(); 
    console.log(state)

    const emitted = []

    useEffect(() => {
        console.log(" in use effect")

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
    }, [state, emitted])



    return (
        <div>
            <Container className="container-chat" >
                {state.messages ? state.messages.map((message) => (
                    <p key={message} >{message}</p>
                    )) : <p>Hello World!</p>
                    }
                {emitted.length ? emitted.map((message) => (
                    <p key={message} >{message}</p>
                    )) : <p>No emitted messages</p>
                    }
            </Container>
        </div>
    )
}

export default Chat;