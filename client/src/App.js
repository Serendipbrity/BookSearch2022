import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignupForm';
import { setContext } from '@apollo/client/link/context';


// establish new link
const httpLink = createHttpLink({
  uri: '/graphql',
});

// create middleware to retrieve token and combine with existing httpLink
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//  create connection to API endpoint
const client = new ApolloClient({
   // combine the authLink and httpLink objects so that every request retrieves the token and sets the request headers before making the request to the API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
          <Switch>
          <Route path="/login" element={<LoginForm />} />
              <Route path="/SignUpForm" element={<SignUpForm />} />
            {/* <Routes> */}
            {/* ----not in component. these are in pages -----*/}
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
              {/* </Routes> */}
        </Switch>
      </>
      </Router>
      </ApolloProvider>
  );
}

export default App;