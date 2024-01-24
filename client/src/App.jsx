import './App.css';
// import { Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import {
    ApolloClient, 
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';


import { StoreProvider } from './utils/GlobalState';

import Header from './components/Header';


const httpLink = createHttpLink({
    uri: '/graphql',
});


const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: httpLink,
    cache: new InMemoryCache(),
});

function App() {


    return (
        <div className="diagonal-split-background">
            <ApolloProvider client={client}>
                <StoreProvider>
                    <Header />
                    <Outlet />
                </StoreProvider>
            </ApolloProvider>
        </div>
    )
}

export default App;