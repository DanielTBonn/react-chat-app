const { Chat, Message } = require('../models');

const resolvers = {
    Query: {
        chat: async(parent, args) => {
            return await Chat.find().populate('messages');
        },
        getChat: async (parent, args) => {
            return await Chat.findOne({
                room: args.room
            })
            .populate('messages')
        },
        getChatById: async (parent, args) => {
            console.log(args._id)

            return await Chat.findById({
                _id: args._id
            })
            .populate('messages')


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

            const message = await Message.create({
                username: args.username || 'Anonymous',
                message: args.message
            })

            const chat = await Chat.findOneAndUpdate(
                { room: args.room },
                { $addToSet: { messages: message }}
            )
            .populate('messages')
            
            return chat
        },
        deleteChat: async(parent, args) => {
            return await Chat.findOneAndDelete(
                {room: args.room}
            )
            .populate('messages')
        }
    }
}

module.exports = resolvers;