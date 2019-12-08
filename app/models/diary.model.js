const mongoose = require('mongoose');

const DiarySchema = mongoose.Schema({
    title: String,
    content: String,
    user_id: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Diary', DiarySchema);