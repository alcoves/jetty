import cookies from 'js-cookie'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ? 'https://pier.bken.io' : 'http://localhost:4000',
})

const authLink = setContext((_, { headers }) => {
  const token = cookies.get('token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default client
