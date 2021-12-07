import axios from 'axios'
import { useState } from 'react'

export default function useLazyRequest(url, options): any {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function executeRequest(data) {
    try {
      const requestOptions = {
        url,
        ...options,
      }

      if (data) requestOptions.data = data
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
