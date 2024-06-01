const mongoose = require("mongoose")
const Schema = mongoose.Schema;
exports.STRING_TYPE = {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
}
exports.FOREIGN_KEY = {
    type:  Schema.Types.ObjectId,
    required: true,
}