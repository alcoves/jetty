import React from "react"
import Layout from './components/Layout'
import Home from "./components/Home"
import VideoRoom from './components/VideoRoom'
import { Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rooms/:id" element={<VideoRoom/>}/>
        <Route
          path="*"
          element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
          }
       />
      </Routes>
    </Layout>
  )
}