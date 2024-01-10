import { 
    Container,
    Form,
    Button 
} from 'react-bootstrap';

function HomePage() {

    const [ chatRoom, setChatRoom ] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault();

        const { value } = e.target;
        setChatRoom(value)
    }

    return (
        <div>
            <Container>
                <Form>
                    <Form.Group>

                        <Form.Control>
                            name="chat-room"
                            value={chatRoom}
                            onChange{(e) => handleInputChange(e)}
                            type="text"
                            placeholder="Create or Find a Chat Room..."
                        </Form.Control>
                    </Form.Group>
                    <Button
                        onClick={console.log('submitted')}
                    >
                        Send 
                    </Button>
                </Form>
            </Container>
            <p>Is this thing on?</p>
        </div>
    )
}

export default HomePage;