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
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const ADD_THOUGHT = gql`
  mutation AddThought($input: ThoughtInput!) {
    addThought(input: $input) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: ID!, $friendId: ID!) {
    addFriend(userId: $userId, friendId: $friendId) {
      id
      username
      friends {
        id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: ID!, $friendId: ID!) {
    deleteFriend(userId: $userId, friendId: $friendId) {
      id
      username
      friends {
        id
        username
      }
    }
  }
`;
export const SAVE_MEDIA = gql`
  mutation saveMedia($input: MediaInput!) {
    saveMedia(input: $input) {
      _id
      title
      type
      posterUrl
    }
  }
`;
