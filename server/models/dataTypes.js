exports.STRING_TYPE = {
    type: String,
    required: true,
    min: 3,
    max: 30,
}
exports.FOREIGN_KEY = {
    type:  Schema.Types.ObjectId,
    required: true,
}