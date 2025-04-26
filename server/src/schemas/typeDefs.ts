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

  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input MediaInput {
    title: String!
    type: String!
    genre: [String]
    description: String
    posterUrl: String
    trailerUrl: String
  }

  type Query {
    me: User
    media(title: String!, type: String!): [MediaCard]
    savedMedia: [Media]
    reactions(mediaId: ID!): [Reaction]
  }

  type InviteResponse {
  message: String
}

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveMedia(input: MediaInput!): Media
    removeMedia(mediaId: ID!): Media
    addReaction(mediaId: ID!, comment: String!, season: Int, episode: Int, rating: Int): Reaction
    removeReaction(reactionId: ID!): Reaction
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    inviteFriend(email: String!): InviteResponse
  }
`;

export default typeDefs;

