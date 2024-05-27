const mongoose = require("mongoose");
const { STRING_TYPE } = require("./dataTypes");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: STRING_TYPE,
    last_name: STRING_TYPE,
    age: {
        type: Number,
        min: 13,
    },
    email: { 
        ...STRING_TYPE,
        max: 50,
    },
    username: {
        ...STRING_TYPE,
        unique: true,
    },
    password: {
        ...STRING_TYPE,
        max: 300,
    },
})

const User = mongoose.model("user", userSchema)
module.exports = User;
