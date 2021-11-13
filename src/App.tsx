import React from 'react'
import Layout from './components/Layout'
import Home from './components/Home'
import VideoRoom from './components/VideoRoom'
import { Route, Routes } from 'react-router-dom'
import Settings from './components/Settings'

export default function App() {
  return (
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
  )
}
