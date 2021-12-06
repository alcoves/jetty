import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.headers.common = {
  Authorization: `Bearer ${Cookies.get('token')}`,
}

const fetcher = url => {
  return axios.get(url).then(res => res.data)
}

export { fetcher }
