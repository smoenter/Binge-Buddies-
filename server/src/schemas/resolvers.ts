import { User, Media, Reaction } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      return await User.findById(context.user._id)
        .populate('savedMedia')
        .populate('friends');
    },

    media: async (_parent: any, { title }: { title: string }) => {
      return await Media.findOne({ title });
    },

    savedMedia: async (_parent: any, _args: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return await Media.find({ savedBy: context.user._id });
    },

    reactions: async (_parent: any, { mediaId }: { mediaId: string }) => {
      return await Reaction.find({ media: mediaId })
        .populate('user', 'username')
        .sort({ createdAt: -1 });
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: any) => {
      const user = await User.create(input);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveMedia: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      // Check if media already exists
      let media = await Media.findOne({ title: input.title });

      if (!media) {
        media = await Media.create(input);
      }

      // Update media to include current user
      await Media.findByIdAndUpdate(media._id, {
        $addToSet: { savedBy: context.user._id },
      });

      // Update user to include saved media
      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: { savedMedia: media._id },
      });

      return media;
    },

    removeMedia: async (_parent: any, { mediaId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      // Remove from user's saved list
      await User.findByIdAndUpdate(context.user._id, {
        $pull: { savedMedia: mediaId },
      });

      // Remove user from media's savedBy list
      await Media.findByIdAndUpdate(mediaId, {
        $pull: { savedBy: context.user._id },
      });

      return await Media.findById(mediaId);
    },

    addReaction: async (_parent: any, { mediaId, comment, season, episode, rating }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      return await Reaction.create({
        user: context.user._id,
        media: mediaId,
        comment,
        season,
        episode,
        rating,
      });
    },

    removeReaction: async (_parent: any, { reactionId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      const reaction = await Reaction.findById(reactionId);

      if (!reaction || reaction.user.toString() !== context.user._id) {
        throw new AuthenticationError('Not authorized to delete this reaction');
      }

      await Reaction.findByIdAndDelete(reactionId);
      return reaction;
    },

    addFriend: async (_parent: any, { friendId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      return await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { friends: friendId } },
        { new: true }
      ).populate('friends');
    },

    removeFriend: async (_parent: any, { friendId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { friends: friendId } },
        { new: true }
      ).populate('friends');
    },
  },
};

export default resolvers;

