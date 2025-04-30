import { User, Media, Reaction } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import { fetchMedia, mediaTypeType } from '../utils/apiFetchers.js';
import { sendInviteEmail } from '../utils/inviteSender.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      return await User.findById(context.user._id)
        .populate('savedMedia')
        .populate('friends');
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

    friends: async (_parent: any, _args: any, _context: any ) => {
      // if (!context.user) throw new AuthenticationError('Not logged in');
      return await User.find({  })
        // .populate('user', 'username')
        // .sort({ createdAt: -1 });
    }
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

    media: async (_parent: any, { title, type }: { title: string; type: mediaTypeType }) => {
      const data = await fetchMedia(title, type);
      // console.log(data);
      return data.Search;
    },

    saveMedia: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      let media = await Media.findOne({ title: input.title });

      if (!media) {
        media = await Media.create(input);
      }

      await Media.findByIdAndUpdate(media._id, {
        $addToSet: { savedBy: context.user._id },
      });

      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: { savedMedia: media._id },
      });

      return media;
    },

    removeMedia: async (_parent: any, { mediaId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      await User.findByIdAndUpdate(context.user._id, {
        $pull: { savedMedia: mediaId },
      });

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

    inviteFriend: async (_parent: any, { email }: { email: string }, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      const fromUsername = context.user.username;
      await sendInviteEmail(email, fromUsername);

      return { message: `Invite sent to ${email}` };
    },
  },
};

export default resolvers;

