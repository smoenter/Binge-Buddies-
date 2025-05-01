import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MEDIA = gql`
  mutation saveMedia($imdbID: String!) {
    saveMedia(imdbID: $imdbID) {
      _id
      title
      type
      posterUrl
      imdbID
    }
  }
`;

