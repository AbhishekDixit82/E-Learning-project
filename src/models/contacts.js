const mongoose = require("mongoose");

const techvectorvolume = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true,
    }
})

const Contact = new mongoose.model("Contact", techvectorvolume);
module.exports = Contact;