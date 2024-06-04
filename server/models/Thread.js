const mongoose = require("mongoose");
const { FOREIGN_KEY, STRING_TYPE } = require("./dataTypes");
const Schema = mongoose.Schema;
const threadSchema = new Schema({
    creatorId: {
        ...FOREIGN_KEY,
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['post', 'comment'],
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'user',
    }],
    content: {
        ...STRING_TYPE,
        maxLength: 400,
    },
    threads: [
        [{
            ...FOREIGN_KEY,
            ref: 'thread'
        }]
    ],
    createdAt: {
        type: Date,
        required: true,
    }
})
const Thread = mongoose.model("thread", threadSchema)
module.exports = Thread