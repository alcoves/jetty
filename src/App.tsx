import React from "react"
import Layout from './components/Layout'
import VoiceChat from './components/VoiceChat'
import UserVideo from "./components/UserVideo"

export default function App() {
  return (
    <Layout>
      <UserVideo/>
      <VoiceChat/>
    </Layout>
  )
}