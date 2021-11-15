import React from 'react'
import ReactDOM from 'react-dom'
import theme from './theme'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import Home from './components/Home'
import Layout from './components/Layout'
import Settings from './components/Settings'
import VideoRoom from './components/VideoRoom'

function Main() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/rooms/:roomId' element={<VideoRoom />} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Layout>
      </HashRouter>
    </ChakraProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
