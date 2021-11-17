import React from 'react'
import socketio from 'socket.io-client'

export const socket = socketio('http://localhost:5000')
export const SocketContext = React.createContext(socket)
