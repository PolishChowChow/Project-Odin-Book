const mongoose = require("mongoose");
const { STRING_TYPE } = require("./dataTypes");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: STRING_TYPE,
    last_name: STRING_TYPE,
    email: { 
        ...STRING_TYPE,
        maxLength: 50,
        unique: true,
    },
    username: {
        ...STRING_TYPE,
        maxLength: 50,
    },
    password: {
        ...STRING_TYPE,
        maxLength: 300,
        required: false,
    },
    authType: {
        type: String,
        enum: ["locale","google","facebook"],
    },
    authId: {
        type: String,
        required: false,
    },
    imagePath: {
        type: String,
        required: false
    }
})

const User = mongoose.model("user", userSchema)
module.exports = User;
