import cookies from 'js-cookie'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ? 'https://pier.bken.io' : 'http://localhost:4000',
})

const token = cookies.get('token')

const wsLink = new WebSocketLink({
  uri: process.env.NODE_ENV === 'production' ? 'wss://pier.bken.io' : 'ws://localhost:4000',
  options: {
    reconnect: true,
  },
  connectionParams: {
    authToken: token ? `Bearer ${token}` : '',
  },
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export default client
