const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
})

module.exports = mongoose.model('usermodel', userSchema)