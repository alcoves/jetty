import React from 'react'
import { io } from 'socket.io-client'

// 'http://foghorn-api.bken.io:3200'
export const socket = io('http://foghorn-api.bken.io:3200')
export const SocketContext = React.createContext({ socket })
