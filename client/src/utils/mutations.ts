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

export const ADD_FRIEND = gql`
  mutation AddFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      username
      friends {
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

export const REMOVE_MEDIA = gql`
  mutation removeMedia($mediaId: ID!) {
    removeMedia(mediaId: $mediaId) {
      _id
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation AddReaction(
    $mediaId: ID!
    $comment: String!
    $season: Int
    $episode: Int
    $rating: Int
  ) {
    addReaction(
      mediaId: $mediaId
      comment: $comment
      season: $season
      episode: $episode
      rating: $rating
    ) {
      _id
      comment
      season
      episode
      rating
      createdAt
    }
  }
`;
