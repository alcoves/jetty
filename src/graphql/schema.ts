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
