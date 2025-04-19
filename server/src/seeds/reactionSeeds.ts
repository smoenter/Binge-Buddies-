import { User, Media, Reaction } from '../models/index.js';

export const seedReactions = async (): Promise<void> => {
  try {
    const users = await User.find({});
    const mediaItems = await Media.find({});

    if (users.length === 0 || mediaItems.length === 0) {
      console.warn('No users or media found — skipping reaction seeds.');
      return;
    }

    const reactionData = [
      {
        user: users[0]._id,
        media: mediaItems[0]._id,
        comment: 'Absolutely loved this one — mind-blowing!',
        rating: 5,
        season: null,
        episode: null,
      },
      {
        user: users[1]._id,
        media: mediaItems[1]._id,
        comment: 'Season 3 was a little slow but still solid.',
        rating: 4,
        season: 3,
        episode: 6,
      },
      {
        user: users[0]._id,
        media: mediaItems[2]._id,
        comment: 'Classic comfort show — always delivers!',
        rating: 5,
        season: 5,
        episode: 14,
      },
    ];

    await Reaction.insertMany(reactionData);
    console.log('Reactions seeded successfully.');
  } catch (err) {
    console.error('Error seeding reactions:', err);
  }
};
