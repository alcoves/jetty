import cookies from 'js-cookie'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ? 'https://pier.bken.io' : 'http://localhost:4000',
})

const token = cookies.get('token')

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
const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
}, authLink.concat(httpLink))

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getChannelMessages: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ['input', ['channelId']],

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            },
          },
        },
      },
    },
  }),
})

export default client
