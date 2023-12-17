import './Chat.css'
import {
    Container
} from 'react-bootstrap'
import { useStoreContext } from '../utils/GlobalState';

function Chat() {

    const [state] = useStoreContext(); 
    console.log(state)

    return (
        <div>
            <Container className="container-chat" >
                {state.messages ? state.messages.map((message) => (
                    <p>{message}</p>
                    )) : <p>Hello World!</p>}
            </Container>
        </div>
    )
}

export default Chat;