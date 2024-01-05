import './App.css';
import { useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
import socket from './utils/socket';

import {
    ApolloClient, 
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';


import { StoreProvider } from './utils/GlobalState';

import Header from './components/Header';
import Message from './components/Message';

import ChatRoom from './pages/ChatRoom';

const httpLink = createHttpLink({
    uri: '/graphql',
});


const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: httpLink,
    cache: new InMemoryCache(),
});

function App() {

    useEffect(() => {
        socket.on('connect', () => console.log(socket.id))
        // console.log(socket)

    }, [socket])

    return (
        <div>
            <ApolloProvider client={client}>
                <StoreProvider>
                    <Header />
                    <ChatRoom />
                </StoreProvider>
            </ApolloProvider>
        </div>
    )
}

export default App;