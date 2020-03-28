const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distributorSchema = new Schema({
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

const Distributor = mongoose.model('Distributor', distributorSchema);

module.exports = Distributor;