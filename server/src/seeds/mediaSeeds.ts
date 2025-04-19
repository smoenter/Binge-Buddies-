import { Media } from '../models/index.js';

export const seedMedia = async (): Promise<void> => {
  try {
    const mediaData = [
      {
        title: 'Inception',
        type: 'movie',
        genre: ['Sci-Fi', 'Thriller'],
        description: 'A skilled thief is offered a chance to erase his criminal history by infiltrating dreams.',
        trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        posterUrl: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
      },
      {
        title: 'Stranger Things',
        type: 'tv',
        genre: ['Sci-Fi', 'Horror', 'Drama'],
        description: 'A group of young friends witness supernatural forces and secret government exploits in their town.',
        trailerUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
        posterUrl: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
      },
      {
        title: 'The Office',
        type: 'tv',
        genre: ['Comedy'],
        description: 'A mockumentary sitcom that depicts the everyday work lives of office employees at Dunder Mifflin.',
        trailerUrl: 'https://www.youtube.com/watch?v=Vmb1tqYqyII',
        posterUrl: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
      },
    ];

    await Media.insertMany(mediaData);
    console.log('Media seeded successfully.');
  } catch (err) {
    console.error('Error seeding media:', err);
  }
};

