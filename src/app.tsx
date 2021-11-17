import theme from './theme'
import ReactDOM from 'react-dom'
import React, { useMemo } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { socket, SocketContext } from './contexts/socket'

import Home from './components/Home'
import Room from './components/Room'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import PrivateRoute from './components/PrivateRoute'

function Main() {
  const value = useMemo(() => ({ socket }), [socket])
  return (
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
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
