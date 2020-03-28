const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchandiserSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    location:{
        type: String,
        required: true,
        trim: true 
    },

    code:{
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});
const Merchandiser = mongoose.model('Merchandiser', merchandiserSchema);

module.exports = Merchandiser;