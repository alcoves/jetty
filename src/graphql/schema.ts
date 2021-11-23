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
  query GetHarbour($id: String!) {
    getHarbour(id: $id) {
      id
      name
      image
      channels {
        id
        name
      }
    }
  }
`

export const GET_HARBOURS = gql`
  query GetHarbours {
    getHarbours {
      id
      name
      image
    }
  }
`

export const CREATE_HARBOUR = gql`
  mutation CreateHarbour($input: CreateHarbourInput) {
    createHarbour(input: $input) {
      id
    }
  }
`

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($input: CreateChannelInput) {
    createChannel(input: $input) {
      id
    }
  }
`

export const GET_CHANNEL_MESSAGES = gql`
  query GetChannelMessages($input: GetChannelInput!) {
    getChannelMessages(input: $input) {
      id
      content
      updatedAt
      createdAt
      user {
        id
        image
        username
      }
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
    }
  }
`

export const CHANNEL_MESSAGES_SUBSCRIPTION = gql`
  subscription ChannelMessages($channelId: String!) {
    channelMessages(channelId: $channelId) {
      id
      content
      user {
        id
        image
        username
      }
    }
  }
`
