const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    services: {
        type: String,
        required: true
    },

    date: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Customer', customerSchema);