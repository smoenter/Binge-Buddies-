import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new Error('⚠️ JWT_SECRET_KEY is not defined in your .env file');
}

const TOKEN_EXPIRATION = '2h';

// 🔐 Sign a token with user info
export const signToken = (username: string, email: string, _id: unknown): string => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

// 🛡️ Verify token and attach user to request
export const authenticateToken = ({ req }: { req: any }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  // console.log('🪪 Raw token header:', req.headers);

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim(); // 'Bearer <token>'
    // console.log('✅ Token after split:', token);
  }

  if (!token) {
    console.log('❌ No token found');
    return req;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded.data; // ✅ must use .data because of how it's signed
    // console.log('🧠 Decoded user:', req.user);
  } catch (err) {
    console.log('❌ Invalid token:', err);
  }

  return req;
};

// ⚠️ GraphQL-formatted auth error
export class AuthenticationError extends GraphQLError {
  constructor(message = 'Not logged in') {
    super(message, {
      extensions: { code: 'UNAUTHENTICATED' },
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}
