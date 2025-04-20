import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

// Use the secret key from .env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in .env file');
}
const TOKEN_EXPIRATION = '2h';

// Sign the token with user info
export const signToken = (username: string, email: string, _id: unknown): string => {
  const payload = { username, email, _id };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

// Extract and verify token from request
export const authenticateToken = ({ req }: { req: any }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim(); // 'Bearer <token>'
  }

  if (!token) return req;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    console.log('Invalid token');
  }

  return req;
};

// GraphQL-formatted auth error
export class AuthenticationError extends GraphQLError {
  constructor(message = 'Could not authenticate user.') {
    super(message, {
      extensions: { code: 'UNAUTHENTICATED' },
    });

    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}

