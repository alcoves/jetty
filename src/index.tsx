import "./index.css"
import App from "./App"
import React from "react"
import theme from './theme'
import ReactDOM from "react-dom"

import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'

function Main() {
  return (
  <ChakraProvider theme={theme}>
    <BrowserRouter >
      <App />
    </BrowserRouter >
  </ChakraProvider>
  )
}

ReactDOM.render(<Main/>, document.getElementById("root"))