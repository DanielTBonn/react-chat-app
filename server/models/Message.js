const { Schema } = require('mongoose');

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        }
    }
)

module.exports = messageSchema;