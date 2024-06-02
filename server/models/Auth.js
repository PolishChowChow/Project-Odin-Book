const { Schema, model } = require("mongoose")
const authSchema = new Schema({
    authId: {
        type: String,
        required: true,
    },
    authType: {
        type: String,
        required: true,
        enum: ["facebook","google"]
    }
})
const Auth = model("auth", authSchema)
module.exports = Auth;