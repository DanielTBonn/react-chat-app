const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
    {
        username: {
            type: String,
        },
        message: {
            type: String,
            required: true
        },
    }
)

const Message = model("Message", messageSchema);

module.exports = Message;