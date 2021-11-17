import React from 'react'
import { io } from 'socket.io-client'

export const socket = io('http://foghorn-api.bken.io:3200')
export const SocketContext = React.createContext({ socket })
