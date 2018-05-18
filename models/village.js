var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var villageSchema = new Schema({
    name: String,
    summary_text: String,
    published_date: { type: Date, default: Date.now  },
    link: String
});

module.exports = mongoose.model('village', villageSchema);