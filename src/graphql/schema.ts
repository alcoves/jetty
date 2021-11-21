import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Register($input: RegisterInput) {
    register(input: $input) {
      accessToken
    }
  }
`

export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      accessToken
    }
  }
`

export const GET_HARBOUR = gql`
  query GetHarbour($_id: String!) {
    getHarbour(_id: $_id) {
      _id
      name
      image
      channels {
        _id
        name
      }
    }
  }
`

export const GET_HARBOURS = gql`
  query GetHarbours {
    getHarbours {
      _id
      name
      image
    }
  }
`

export const CREATE_HARBOUR = gql`
  mutation CreateHarbour($input: CreateHarbourInput) {
    createHarbour(input: $input) {
      _id
    }
  }
`

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($input: CreateChannelInput) {
    createChannel(input: $input) {
      _id
    }
  }
`

export const GET_CHANNEL_MESSAGES = gql`
  query GetChannelMessages($channel: String!) {
    getChannelMessages(channel: $channel) {
      _id
      content
      updatedAt
      createdAt
      user {
        _id
        image
        username
      }
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      _id
    }
  }
`
