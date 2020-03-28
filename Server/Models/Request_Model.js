const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    merchandiser: {
        type:  Schema.Types.ObjectId,
        ref: 'Merchandiser'
    },

    brand: {
        type: String,
        required: true,
        trim: true
    },
    sku:{
        type: String,
        required: true  
    },
    volume:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['Sent', 'Pending', 'In Delivery', 'Delivered']
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamp: true
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;