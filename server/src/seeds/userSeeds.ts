import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export const seedUsers = async (): Promise<void> => {
  try {
    const rawUsers = [
      {
        username: 'movieBuff01',
        email: 'buff01@example.com',
        password: 'password',
      },
      {
        username: 'tvJunkie88',
        email: 'junkie88@example.com',
        password: 'password',
      },
    ];

    const saltRounds = 10;

    // Hash passwords before insertion
    const hashedUsers = await Promise.all(
      rawUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, saltRounds),
      }))
    );

    await User.insertMany(hashedUsers);
    console.log('Users seeded successfully.');
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};

