import './App.css';
// import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Chat from './components/Chat';


function App() {

    const renderPage = () => {
        return null
    }

    return (
        <div>
            <Header />
            <Chat />
        </div>
    )
}

export default App;