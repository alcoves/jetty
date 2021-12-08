import React from 'react'
import theme from './theme'
import ReactDOM from 'react-dom'
import apolloClient from './graphql/client'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { SocketContext, socket } from './contexts/socket'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/404'
import Harbour from './pages/Harbour'
import Register from './pages/Register'
import HarbourHome from './components/Harbour/Home'
import HarbourChannel from './components/Harbour/Channel'

function Main() {
  return (
    <SocketContext.Provider value={socket}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <HashRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/harbours/:harbourId' element={<Harbour />}>
                <Route path='' element={<HarbourHome />} />
                <Route path='channels/:channelId' element={<HarbourChannel />} />
              </Route>
            </Routes>
          </HashRouter>
        </ChakraProvider>
      </ApolloProvider>
    </SocketContext.Provider>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
