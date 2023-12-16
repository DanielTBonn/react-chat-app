import './Message.css'
import { useState, useEffect } from 'react';
import { 
    Container, 
    Col, 
    Form, 
    Button, 
    Row } from 'react-bootstrap';


function Message() {

    const [ message, setMessage ] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault();

        const { value } = e.target;
        setMessage(value)
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
                </Form>
        </Container>
        
    )

}

export default Message;