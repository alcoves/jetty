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
import Harbor from './pages/Harbor'
import Register from './pages/Register'
import Layout from './components/Layout'
import HarborHome from './components/Harbor/Home'
import HarborChannel from './components/Harbor/Channel'

function Main(): JSX.Element {
  return (
    <SocketContext.Provider value={socket}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <HashRouter>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='' element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/harbors/:harborId' element={<Harbor />}>
                  <Route path='' element={<HarborHome />} />
                  <Route path='channels/:channelId' element={<HarborChannel />} />
                </Route>
              </Route>
            </Routes>
          </HashRouter>
        </ChakraProvider>
      </ApolloProvider>
    </SocketContext.Provider>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
