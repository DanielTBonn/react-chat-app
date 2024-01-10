import { 
    Container,
    Form,
    Button 
} from 'react-bootstrap';

import { useState } from 'react';

import { useStoreContext } from '../utils/GlobalState';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CHAT } from '../utils/queries';
import { CREATE_DBCHAT } from '../utils/mutations';

function HomePage() {

    const [ chatRoom, setChatRoom ] = useState('')
    const [ chatRoomSubmitted, setChatRoomSubmitted ] = useState()

    const { loading, data, error, refetch} = useQuery(GET_CHAT, 
            {
                variables: {
                     room: chatRoom
                },
    })


    const [createChatRoom, {error: createChatError, data: createChatData}] = useMutation(CREATE_DBCHAT)

    const processChatRequest = async (roomName) => {
        await refetch();
        const chatData = data?.getChat || null;

        if (chatData) {
            console.log(true);
            console.log(chatData)
        } else {
            console.log(chatData)
            console.log("chatRoom must be created");
            const { data: chatRoomCreated } = await createChatRoom({
                variables: {
                    room: chatRoom
                }
            })
        }

    } 

    const handleInputChange = (e) => {
        e.preventDefault();

        const { value } = e.target;
        console.log( value )
        setChatRoom(value)
    }

    return (
        <div>
            <Container>
                <Form>
                    <Form.Group>

                        <Form.Control
                            name="chat-room"
                            value={chatRoom}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            placeholder="Create or Find a Chat Room..."
                            >
                        </Form.Control>
                    </Form.Group>
                    <Button
                        onClick={(chatRoom) => processChatRequest(chatRoom)}
                    >
                        Send 
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default HomePage;