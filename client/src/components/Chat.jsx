import './Chat.css'
import { useState, useEffect } from 'react';
import { 
    Container, 
    Col, 
    Form, 
    Button, 
    Row } from 'react-bootstrap';


function Chat() {

    const [ message, setMessage ] = useState('')

    return (
        <Container>
                <Form>
                    <Form.Control
                        as="textarea"
                        name="message"
                        value={''}
                        // className="form-message"
                        onChange={() => console.log("Hello World!")}
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

export default Chat;