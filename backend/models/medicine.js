const mongoose = require('mongoose');
const medicineSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    address: {
        type :String,
        required :true
    }

});

const Medicine = mongoose.model('medicine', medicineSchema);
module.exports = Medicine;