import React from 'react'
import socketio from 'socket.io-client'

export const socket = socketio('http://foghorn-api.bken.io:3200')
export const SocketContext = React.createContext(socket)
