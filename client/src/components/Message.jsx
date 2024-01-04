import './Message.css'
import { useState, useEffect } from 'react';
import { 
    Container, 
    Form, 
    Button 
    } from 'react-bootstrap';

import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CHAT } from '../utils/actions';

import socket from '../utils/socket';

function Message() {

    const [ message, setMessage ] = useState('')

    const [state, dispatch] = useStoreContext();

    const handleInputChange = (e) => {
        e.preventDefault();

        const { value } = e.target;
        setMessage(value)
    }

    const sendToChat = (e) => {
        e.preventDefault();

        if(message) {
            dispatch({
                type: UPDATE_CHAT,
                messages: [...state.messages, message] 
            });

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
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            name="message"
                            value={message}
                            onChange={(e) => handleInputChange(e)}
                            onKeyDown={onEnterPress}
                            type="text"
                            rows={3}
                            cols={100}
                            size="lg"
                            placeholder="Leave a message..."
                            />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={sendToChat}
                    >
                        Send
                    </Button>
                </Form>
        </Container>
        
    )

}

export default Message;