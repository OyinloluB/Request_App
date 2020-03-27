const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistributorSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true 
    },
    location:{
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('distributors', DistributorSchema);