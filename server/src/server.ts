import dotenv from 'dotenv';
dotenv.config();

// dotenv.config({ path: './server/.env' });

import express from 'express';
import cors from 'cors';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server';// Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { fileURLToPath } from 'url';
// import axios from 'axios';
import searchRoutes from './controllers/searchRoute.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async (): Promise<void> => {
  try {
    console.log('Starting Apollo Server...');
    await server.start();
    console.log('Apollo Server started');
    await db();
    console.log('Database connection successful');

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
    }));
    console.log('CORS configuration set');

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    console.log('Body parsers configured');

    app.use('/api', searchRoutes);
    console.log('Search routes attached to /api');

    app.use('/graphql', expressMiddleware(server, {
      context: async ({ req }) => {
        console.log('Incoming request headers:', req.headers);
        const authResult = await authenticateToken({ req });
        console.log('Authentication result:', authResult);
        return authResult;
      },
    }));

    

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../client/dist')));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
      });
      
    }

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });

    return;

  } catch (error) {
    console.error('Database connection failed:', error);
    // Stop the server if DB connection fails
    process.exit(1);
  }
};

startApolloServer();