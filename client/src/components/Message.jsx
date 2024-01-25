import './Message.css'
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react/hooks';
import { 
    Container, 
    Form, 
    Button 
    } from 'react-bootstrap';

import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CHAT } from '../utils/actions';
import { UPDATE_DBCHAT } from '../utils/mutations';

import socket from '../utils/socket';

function Message() {

    const [ message, setMessage ] = useState('')

    const [state, dispatch] = useStoreContext();

    const [updateChat, { error, data }] = useMutation(UPDATE_DBCHAT)

    const handleInputChange = (e) => {
        e.preventDefault();

        const { value } = e.target;
        setMessage(value)
    }

    const userName = localStorage.getItem('username');
    console.log(userName);

    const sendToChat = async (e) => {
        e.preventDefault();

        if(message) {
            await dispatch({
                type: UPDATE_CHAT,
                messages: [...state.messages, message] 
            });

            const { data } = await updateChat({
                variables: {
                    room: state.room,
                    message: message,
                    username: userName
                }
            });

            console.log('data from update mutation', data)


            socket.emit('chat-message', message);
        }

        setMessage('')
    }

    const onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            sendToChat(e);
        }
    }

    return (
        <Container className="container-message">
                <Form >
                    <div className="message-form-container">

                    <Form.Group>
                        <Form.Control
                            className="message-form"
                            as="textarea"
                            name="message"
                            value={message}
                            onChange={(e) => handleInputChange(e)}
                            onKeyDown={onEnterPress}
                            type="text"
                            rows={5}
                            cols={110}
                            size="lg"
                            placeholder="Leave a message..."
                            />
                    </Form.Group>
                    <Button
                        className="submit-btn"
                        variant="primary"
                        type="submit"
                        onClick={sendToChat}
                        >
                        Send
                    </Button>
                </div>
                </Form>
        </Container>
        
    )

}

export default Message;