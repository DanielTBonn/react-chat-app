import './App.css';
// import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Message from './components/Message';

import ChatRoom from './pages/ChatRoom';


function App() {

    const renderPage = () => {
        return null
    }

    return (
        <div>
            <Header />
            <ChatRoom />
        </div>
    )
}

export default App;