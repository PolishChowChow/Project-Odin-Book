const { Schema, model} = require("mongoose");
const { STRING_TYPE } = require("./dataTypes");

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
    authMethods: [{
        type: Schema.Types.ObjectId,
        ref: "auth"
    }],
    authId: {
        type: String,
        required: false,
    },
    imagePath: {
        type: String,
        required: false
    }
})

const User = model("user", userSchema)
module.exports = User;
