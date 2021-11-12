import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

import { HashRouter } from "react-router-dom";
// import { ChakraProvider } from '@chakra-ui/react';

function Main () {
  return (
  // <ChakraProvider>
    <HashRouter>
      <App />
    </HashRouter>
  // </ChakraProvider>
  )
}

ReactDOM.render( <Main/>, document.getElementById("root") );