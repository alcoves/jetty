import React from "react";
import VoiceChat from './components/VoiceChat'

// import { Box } from '@chakra-ui/react';
import { Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      Here it is
      <VoiceChat/>
      {/* <TitleBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Content>
          <Route exact path="/" component={Home} />
          <Route exact path="/settings" component={Settings} />
        </Content>
      </div> */}
    </div>
  );
}