const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({

    firstName: {
        type: String,
        required:true
    },

    lastName: {
        type: String,
        required:true
    },

    phone: {
        type: String,
        required:true
    },

    email: {
        type: String,
        required:true
    },

    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },

})


module.exports = mongoose.model('Customer', CustomerSchema)