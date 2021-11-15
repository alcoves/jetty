import axios from 'axios'
import jwt from 'jwt-decode'
import cookies from 'js-cookie'

const API_URL = 'http://localhost:3100'

axios.defaults.withCredentials = true

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    })

    const user = jwt(response.data?.token)
    cookies.set('bken_user', JSON.stringify(user), { expires: 6 })
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
    cookies.set('bken_user', JSON.stringify(user), { expires: 6 })
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
