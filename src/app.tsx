import React from 'react'
import theme from './theme'
import ReactDOM from 'react-dom'
import apolloClient from './graphql/client'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import HarbourHome from './pages/HarbourHome'
import HarbourChannel from './pages/HarbourChannel'
import PrivateRoute from './components/PrivateRoute'

function Main() {
  return (
    <ApolloProvider client={apolloClient}>
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
              path='/harbours/:harbourId'
              element={
                <PrivateRoute>
                  <HarbourHome />
                </PrivateRoute>
              }
            />
            <Route
              path='/harbours/:harbourId/channels/:channelId'
              element={
                <PrivateRoute>
                  <HarbourChannel />
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
    </ApolloProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
