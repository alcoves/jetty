import theme from './theme'
import ReactDOM from 'react-dom'
import React, { useMemo } from 'react'
import apolloClient from './graphql/client'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { socket, SocketContext } from './contexts/socket'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Room from './components/Room'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import PrivateRoute from './components/PrivateRoute'
import Harbour from './components/Harbours/Harbour'

function Main() {
  const value = useMemo(() => ({ socket }), [socket])
  return (
    <ApolloProvider client={apolloClient}>
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
                path='/harbours/:harbourId'
                element={
                  <PrivateRoute>
                    <Harbour />
                  </PrivateRoute>
                }
              />
              <Route
                path='/harbours/:harbourId/channels/:channelId'
                element={
                  <PrivateRoute>
                    <Harbour />
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
