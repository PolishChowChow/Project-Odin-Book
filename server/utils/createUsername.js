function createUsername(email){
    if(!email){
        return new Error("Undefined email provided")
    }
    if(!email.includes("@") || !email.includes(".")){
        return new Error("This is not an email")
    }
    const username = email.split("@")[0]
    return username
}
module.exports = createUsername;