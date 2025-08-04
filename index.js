import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from "@apollo/server/standalone";

// db
import db from './_db.js';

// types
import {typeDefs} from './schema.js';

const resolvers = {
  Query: {
      games() {
          return db.games;
      },
      game(_, args) {
          return db.games.find((game) => game.id === args.id);
      },
      authors() {
          return db.authors;
      },
      author(_, args) {
        return db.authors.find((author) => author.id === args.id);
      },
      reviews() {
          return db.reviews;
      },
      review(_, args) {
          return db.reviews.find((review) => review.id === args.id);
      }
  },
    Game: {
      reviews(parent) {
          return db.reviews.filter((r) => r.game_id === parent.id);
      }
    },
    Author: {
      reviews(parent) {
          return db.reviews.filter((r) => r.author_id === parent.id);
      }
    },
    Review: {
      game(parent) {
          return db.games.find((g) => g.id === parent.game_id);
      },
        author(parent) {
          return db.authors.find((a) => a.id === parent.author_id);
        }
    },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      db.reviews = db.reviews.filter((r) => r.game_id !== args.id);

      return db.games;
    },
    deleteReview(_, args) {
      db.reviews = db.reviews.filter((r) => r.id !== args.id);

      return db.reviews;
    },
    deleteAuthor(_, args) {
      db.authors = db.authors.filter((a) => a.id !== args.id);
      db.reviews = db.reviews.filter((r) => r.author_id !== args.id);

      return db.authors;
    }
  }
};

// server setup
const server = new ApolloServer({
    // typeDefs
    typeDefs,
    // resolvers
    resolvers
});

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log('Server study at port', 4000)
