import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

import Header from './components/Header';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();
  const isTransitionPage = location.pathname === '/transition';

  return (
    <ApolloProvider client={client}>
      <div className={`d-flex flex-column min-vh-100 ${isTransitionPage ? 'transition-fullscreen' : ''}`}>
      {!isTransitionPage && <Header />}
        {/* <Header /> */}
        <div className={`app-container flex-grow-1 ${isTransitionPage ? 'p-0 m-0' : ''}`}>
          <Outlet />
        </div>

        {/* Add toaster here so it works globally */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        {!isTransitionPage && <Footer />}
      </div>
    </ApolloProvider>
  );
}

export default App;

