import React from 'react'
import ReactDOM from 'react-dom'
import theme from './theme'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import VideoRoom from './components/VideoRoom'
import PrivateRoute from './components/PrivateRoute'
import VoiceRoom from './components/VoiceRoom'

function Main() {
  return (
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
                <VoiceRoom />
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
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
