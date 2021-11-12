import React from "react"
import Layout from './components/Layout'
import VoiceChat from './components/VoiceChat'

import { Box } from '@chakra-ui/react'
import { Route } from "react-router-dom"

export default function App() {
  return (
    <Layout>
      <VoiceChat/>
    </Layout>
  )
}

{/* <TitleBar />
<div style={{ display: "flex", flexDirection: "row" }}>
  <Sidebar />
  <Content>
    <Route exact path="/" component={Home} />
    <Route exact path="/settings" component={Settings} />
  </Content>
</div> */}