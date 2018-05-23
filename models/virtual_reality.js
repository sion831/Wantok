var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vrSchema = new Schema({
    community_id: String,
    scene_name:String,
    image_file: String,
    thumb_file: String
});

module.exports = mongoose.model('vrItem', vrSchema);