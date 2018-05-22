var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var villageSchema = new Schema({
    name: String,
    summary_text: String,
    published_date: { type: Date, default: Date.now  },
    latitude: Number,
    longitude: Number,
    link: String
});*/

var parcelSchema = new Schema({
    artisan_id: String,
    user_id: String,
    destination: String,
    issued_date: { type: Date, default: Date.now  },
    parcel_image: String,
    link: String
});

module.exports = mongoose.model('village', villageSchema);