import { gql } from '@apollo/client';

// Query to get logged-in user’s info
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedMedia{
        _id
        title
        type
        posterUrl
        imdbID
      }
      friends {
        _id
        username
      }
    }
  }
`;

// Query for fetching media results from OMDB
export const QUERY_MEDIA = gql`
  query Media($title: String!, $type: String!) {
    media(title: $title, type: $type) {
      Title
      Year
      imdbID
      Type
      Poster
    }
  }
`;

export const QUERY_MEDIA_DETAILS = gql`
  query MediaDetails($imdbID: String!) {
    mediaDetails(imdbID: $imdbID) {
      Title
      Year
      imdbID
      Type
      Poster
      Plot
      TrailerLink
    }
  }
`;


// Query for user by username
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

// Query for all thoughts
export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

// Query for single thought by ID
export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// Query for friends list
export const QUERY_FRIENDS = gql`
  query getFriends {
    friends {
      username
      _id
    }
  }
`;


export const QUERY_USER_FRIENDS = gql`
  query GetUserFriends($userId: ID!) {
    user(userId: $userId) {
      friends {
        _id
        username
      }
    }
  }
`;

//Query for Reactions
export const GET_REACTIONS = gql`
query Reactions {
  reactions {
    _id
    media {
      title
    }
    user {
      username
    }
    comment
    season
    episode
    rating
    createdAt
    comments {
      commentText
      createdAt
      _id
      user {
        username
      }
    }
  }
}
`;

export const GET_MY_REACTIONS = gql`
  query Reactions {
    reactions {
      _id
      comment
      season
      episode
      rating
      createdAt
      user {
        _id
        username
      }
      media {
        _id
        title
        type
        posterUrl
      }
      comments {
        _id
        commentText
        createdAt
        user {
          _id
          username
        }
      }
    }
  }
`;

export const GET_FRIENDS_REACTIONS = gql`
  query FriendsReactions {
    friendsReactions {
      _id
      comment
      season
      episode
      rating
      createdAt
      user {
        _id
        username
      }
      media {
        _id
        title
        type
        posterUrl
      }
      comments {
        _id
        commentText
        createdAt
        user {
          _id
          username
        }
      }
    }
  }
`;

