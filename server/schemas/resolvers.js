const { Chat } = require('../models');

const resolvers = {
    Query: {
        chat: async(parent, args) => {
            return await Chat.find();
        }
    },
    Mutation: {
        createChat: async(parent, args) => {
            const chat = await Chat.create({
                room: args.room
            });

            return chat
        },
        updateChat: async(parent, args) => {
            const chat = await Chat.findOneAndUpdate(
                { room: args.room },
                { $addToSet: { messages: args.message }}
            )
            
            return chat
        }
    }
}

module.exports = resolvers;