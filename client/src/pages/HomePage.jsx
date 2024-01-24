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

import './HomePage.css';

function HomePage() {

    const [ chatRoom, setChatRoom ] = useState('');

    const { data, refetch} = useQuery(GET_CHAT, 
            {
                variables: {
                     room: chatRoom
                },
    })

    const [createChatRoom, {error: createChatError, data: createChatData}] = useMutation(CREATE_DBCHAT)

    const processChatRequest = async () => {
        await refetch();
        const chatData = data?.getChat || null;
        let createdChat = null;

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
            createdChat = chatRoomCreated?.createChat;
            console.log(createdChat)
            
        }


        const chatRoomId = chatData?._id || createdChat._id 
    
        window.location.href = `/room/${chatRoomId}`
    } 

    const handleInputChange = (e) => {
        e.preventDefault();

        const { value } = e.target;
        console.log( value )
        setChatRoom(value)
    }

    return (
        <div className="info-control">
            <div className="grid-container">

                <Container className="text-container">
                    <p className="main-text">Chat About Interesting Topics</p>
                    <p className="sub-text">Talk with strangers or invite friends to join in on the discussion!</p>
                </Container>
                <Container className="forms">
                    <Form className="form-container" onSubmit={(e) => { e.preventDefault(); processChatRequest();} }>
                            <Form.Label className="label-text"> Name Yourself</Form.Label>
                                <div className="form-and-btn">
                                <Form.Group className="form-group">
                                    <Form.Control
                                        className="name-form"
                                        name="chat-room"
                                        value={chatRoom}
                                        onChange={(e) => handleInputChange(e)}
                                        type="text"
                                        placeholder="What should we call you..."
                                        >
                                    </Form.Control>
                                </Form.Group>
                                <Button
                                    className="form-button"
                                    onClick={() => processChatRequest()}
                                    >
                                    Confirm 
                                </Button>
                            </div>
                        </Form>
                        <Form className="form-container" onSubmit={(e) => { e.preventDefault(); processChatRequest();} }>
                            <Form.Label className="label-text"> Choose a Topic</Form.Label>
                                <div className="form-and-btn">
                                <Form.Group className="form-group">
                                    <Form.Control
                                        className="chat-form"
                                        name="chat-room"
                                        value={chatRoom}
                                        onChange={(e) => handleInputChange(e)}
                                        type="text"
                                        placeholder="What are you interested in..."
                                        >
                                    </Form.Control>
                                </Form.Group>
                                <Button
                                    className="form-button"
                                    onClick={() => processChatRequest()}
                                    >
                                    Chat 
                                </Button>
                            </div>
                        </Form>
                </Container>
            </div>
        </div>
    )
}

export default HomePage;