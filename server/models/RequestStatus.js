const mongoose = require("mongoose");
const { FOREIGN_KEY } = require("./dataTypes");
const Schema = mongoose.Schema;
const requestSchema = new Schema({
    senderId: FOREIGN_KEY,
    destinationId: FOREIGN_KEY,
    status: {
        type: String,
        enum: ['pending','accepted', 'rejected'],
    }
})

const RequestStatus = mongoose.model("request", requestSchema)
module.exports = RequestStatus;
