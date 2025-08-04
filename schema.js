export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
      addGame(game: AddGameInput!): Game
      deleteGame(id: ID!): [Game]
      addReview(review: AddReviewInput!): Review
      deleteReview(id: ID!): [Review]
      addAuthor(author: AddAuthorInput!): Author
      deleteAuthor(id: ID!): [Author]
    }
    input AddGameInput {
      title: String!
      platform: [String!]!
    }
    input AddAuthorInput {
      name: String!
      verified: Boolean!
    }
    input AddReviewInput {
      content: String!
      rating: Int!
    }
`
