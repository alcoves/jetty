import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return(
    <div>
      <Link to='/rooms/test'> Join Room </Link>
    </div>
  )
}