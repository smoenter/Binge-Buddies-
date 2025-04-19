import { User, Media, Reaction } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete all media
    await Media.deleteMany({});
    console.log('Media collection cleaned.');

    // Delete all reactions
    await Reaction.deleteMany({});
    console.log('Reaction collection cleaned.');

    // Delete all users
    await User.deleteMany({});
    console.log('User collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;

