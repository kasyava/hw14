const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    artist:{
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    year: Number,
    cover: String
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;