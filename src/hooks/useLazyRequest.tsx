import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'

export default function useLazyRequest(options?: AxiosRequestConfig): any {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [overides, setOverides] = useState({})
  const [loading, setLoading] = useState(false)

  async function executeRequest(inputOverides) {
    try {
      setOverides(inputOverides)
      axios.defaults.headers.common = {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }

      const res = await axios({
        ...options,
        ...inputOverides,
      })
      setData(res.data)
    } catch (error) {
      setData(null)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // async function fetchMore(beforeId: string) {
  //   try {

  //   } catch() {

  //   } finally {

  //   }
  //   const res = await axios({
  //     ...options,
  //     ...overides,
  //   })

  // }

  return [executeRequest, { data, loading, error }]
}
