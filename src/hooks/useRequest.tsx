import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

export default function useRequest(url: string, options?: AxiosRequestConfig): any {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function executeRequest() {
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }

      const res = await axios({
        url,
        ...options,
      })
      setData(res.data)
    } catch (error) {
      setData(null)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    executeRequest()
  }, [])

  return { data, loading, error }
}
