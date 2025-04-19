import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDB from '../config/connection.js';
import cleanDB from './cleanDB.js';

import { seedUsers } from './userSeeds.js';
import { seedMedia } from './mediaSeeds.js';
import { seedReactions } from './reactionSeeds.js';

dotenv.config();

const runSeeds = async (): Promise<void> => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('🛢️ Connected to MongoDB');

    await cleanDB();   // Clean existing collections
    console.log('🧹 Database cleaned');

    await seedUsers();     // Seed users
    await seedMedia();     // Seed movies & TV shows
    await seedReactions(); // Seed user reactions

    console.log('All seeds complete!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

runSeeds();
