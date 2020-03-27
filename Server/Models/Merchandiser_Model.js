const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchandiserSChema = new Schema({
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

    stationCode:{
        type: String,
        required: true,
        trim: true
    }
});
mongoose.model('merchandisers', MerchandiserSchema);