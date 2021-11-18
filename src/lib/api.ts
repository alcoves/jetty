import axios from 'axios'
import jwt from 'jwt-decode'

const API_URL = 'https://api.bken.io'

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    })

    const user = jwt(response.data?.token)
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export async function register(email: string, username: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      username,
      password,
    })
    const user = jwt(response.data?.token)
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
