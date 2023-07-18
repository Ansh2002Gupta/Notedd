const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//this is done to prevent duplicate entries into the database.
const User = mongoose.model('User', UserSchema)
// User.createIndexes()
module.exports = User