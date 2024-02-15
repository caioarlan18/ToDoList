const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: {
        type: String
    }, content: {
        type: String
    }
})
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
    notes: [notesSchema]
})

module.exports = mongoose.model('usermodel', userSchema)