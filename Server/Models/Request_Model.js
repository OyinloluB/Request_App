const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    value:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('requests', RequestSchema);