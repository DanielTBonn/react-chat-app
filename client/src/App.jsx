import './App.css';
// import { Outlet } from 'react-router-dom';

import { StoreProvider } from './utils/GlobalState';

import Header from './components/Header';
import Message from './components/Message';

import ChatRoom from './pages/ChatRoom';


function App() {

    return (
        <div>
            <StoreProvider>
                <Header />
                <ChatRoom />
            </StoreProvider>
        </div>
    )
}

export default App;