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
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };

      db.games.push(game);

      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if(g.id === args.id) {
          return { ...g, ...args.edits}
        }

        return g;
      })

      return db.games.find((g) => g.id === args.id);
    },
    deleteReview(_, args) {
      db.reviews = db.reviews.filter((r) => r.id !== args.id);

      return db.reviews;
    },
    addReview(_, args) {
      let review = {
        ...args.review,
        id: Math.floor(Math.random() * 10000).toString()
      };

      db.reviews.push(review);

      return review;
    },
    updateReview(_, args) {
      db.reviews = db.reviews.map((r) => {
        if(r.id === args.id) {
          return {...r, ...args.edits}
        }

        return r;
      });

      return db.reviews.find((r) => r.id === args.id);
    },
    deleteAuthor(_, args) {
      db.authors = db.authors.filter((a) => a.id !== args.id);
      db.reviews = db.reviews.filter((r) => r.author_id !== args.id);

      return db.authors;
    },
    addAuthor(_, args) {
      let author = {
        ...args.author,
        id: Math.floor(Math.random() * 10000).toString()
      };

      db.authors.push(author);

      return author;
    },
    updateAuthor(_, args) {
      db.authors = db.authors.map((a) => {
        if(a.id === args.id) {
          return {...a, ...args.edits};
        }

        return a;
      })

      return db.authors.find((a) => a.id === args.id);
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
