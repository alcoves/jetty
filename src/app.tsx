import theme from './theme'
import ReactDOM from 'react-dom'
import React, { useMemo } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { socket, SocketContext } from './contexts/socket'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Home from './components/Home'
import Room from './components/Room'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import PrivateRoute from './components/PrivateRoute'

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? 'https://pier.bken.io' : 'http://localhost:4000',
  cache: new InMemoryCache(),
})

function Main() {
  const value = useMemo(() => ({ socket }), [socket])
  return (
    <ApolloProvider client={client}>
      <SocketContext.Provider value={value}>
        <ChakraProvider theme={theme}>
          <HashRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='/'
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path='/settings'
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path='/rooms/:roomId'
                element={
                  <PrivateRoute>
                    <Room />
                  </PrivateRoute>
                }
              />
              <Route
                path='*'
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>404</p>
                  </main>
                }
              />
            </Routes>
          </HashRouter>
        </ChakraProvider>
      </SocketContext.Provider>
    </ApolloProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
