const mongoose = require("mongoose");
const { FOREIGN_KEY } = require("./dataTypes");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    senderId: FOREIGN_KEY,
    destinationId: FOREIGN_KEY,
    status: {
        type: String,
        enum: ['pending','accepted', 'rejected'],
    }
})

const Request = mongoose.model("user", userSchema)
module.exports = Request;
