import './Message.css'
import { useState, useEffect } from 'react';
import { 
    Container, 
    Form, 
    Button 
    } from 'react-bootstrap';

import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CHAT } from '../utils/actions';

function Message() {

    const [ message, setMessage ] = useState('')

    const [state, dispatch] = useStoreContext();

    const handleInputChange = (e) => {
        e.preventDefault();

        const { value } = e.target;
        setMessage(value)
    }

    const sendToChat = () => {
        if(message) {
            dispatch({
                type: UPDATE_CHAT,
                messages: [...state.messages, message] 
            })
        }
    }

    return (
        <Container className="container-message">
                <Form>
                    <Form.Control
                        as="textarea"
                        name="message"
                        value={message}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        rows="3"
                        cols="100"
                        size="lg"
                        placeholder="Leave a message..."
                        />
                    <Button
                        onClick={sendToChat}
                    >
                        Send
                    </Button>
                </Form>
        </Container>
        
    )

}

export default Message;