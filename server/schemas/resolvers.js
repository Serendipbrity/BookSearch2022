// Responses

const { User, Book } = require('../models');

const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // all books
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ createdAt: -1 });
        },
        book: async (parent, { _id }) => {
            return Book.findOne({ _id });
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('books')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('books')
        },
        me: async (parent, args) => {
            const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books')
            
            return userData;
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parents, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        addBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ ...args, username: context.user.username });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // addToSet prevents duplicate entries
                    { $addToSet: { books: bookId } },
                    // return new updated document instead of old one
                    { new: true }
                ).populate('books');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    }
}

module.exports = resolvers;