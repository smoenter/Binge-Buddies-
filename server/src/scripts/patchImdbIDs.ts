// One-time maintenance script to patch broken imdbID entries
// Run manually with: npx tsx server/scripts/patchImdbIDs.ts




// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Media from './models/Media.js'; 

// dotenv.config();

// async function runPatch() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bingebuddies');
//     console.log("✅ Connected to DB");

//     // Find broken media: missing imdbID
//     const brokenMedia = await Media.find({
//       $or: [{ imdbID: null }, { imdbID: { $exists: false } }, { imdbID: "" }]
//     });

//     if (brokenMedia.length === 0) {
//       console.log("🎉 No broken media entries found.");
//       return;
//     }

//     console.log(`🔍 Found ${brokenMedia.length} broken entries.`);

//     for (const media of brokenMedia) {
//       // Delete the broken record
//       await Media.deleteOne({ _id: media._id });
//       console.log(`🗑️ Removed media with _id: ${media._id} (missing imdbID)`);
//     }

//     console.log("✅ Cleanup complete.");
//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Error:", err);
//     process.exit(1);
//   }
// }

// runPatch();

