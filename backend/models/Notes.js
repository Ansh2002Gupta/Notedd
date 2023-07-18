const mongoose = require('mongoose')

const NotesSchema = new Scheme({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        default: 'General'
    },
    date: {
        type: Date,
        default: Data.now
    }
})

module.exports = mongoose.model('Notes', NotesSchema)