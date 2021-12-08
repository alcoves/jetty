import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'

export default function useLazyRequest(url, options?: AxiosRequestConfig): any {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function executeRequest(requestData) {
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }

      const requestOptions = {
        url,
        ...options,
      }

      if (requestData) requestOptions.data = requestData
      const res = await axios(requestOptions)
      setData(res.data)
    } catch (error) {
      setData(null)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return [executeRequest, { data, loading, error }]
}
