const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedMedia: [Media]
    friends: [User]
  }

  type Media {
    _id: ID!
    imdbID: String!
    title: String!
    type: String!
    genre: [String]
    description: String
    posterUrl: String
    trailerUrl: String
    savedBy: [User]
  }

  type MediaCard {
    Title: String!
    Year: String!
    imdbID: String!
    Type: String!
    Poster: String
    Plot: String
    TrailerLink: String
  }

  type Reaction {
    _id: ID!
    media: Media!
    user: User!
    comment: String!
    season: Int
    episode: Int
    rating: Int
    createdAt: String
  }

    type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  input ThoughtInput {
    thoughtText: String!
    thoughtAuthor: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type InviteResponse {
    message: String
  }

  type Query {
    me: User
    savedMedia: [Media]
    friends: [User]
    reactions(mediaId: ID!): [Reaction]
    searchFriends(username: String!): [User]
    media(title: String!, type: String!): [MediaCard]
    mediaDetails(imdbID: String!): MediaCard
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveMedia(imdbID: String!): Media
    removeMedia(mediaId: ID!): Media
    addReaction(mediaId: ID!, comment: String!, season: Int, episode: Int, rating: Int): Reaction
    removeReaction(reactionId: ID!): Reaction
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    addThought(input: ThoughtInput!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    inviteFriend(email: String!): InviteResponse
  }
`;

export default typeDefs;



