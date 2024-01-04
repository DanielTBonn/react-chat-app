const { Schema, model } = require('mongoose');
const messageSchema = require('./Message')

const chatSchema = new Schema(
    {
        room: {
            type: String,
            required: true,
            unique: true
        },
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message"
            }
        ]
    }
)

const Chat = model("Chat", chatSchema);

module.exports = Chat;