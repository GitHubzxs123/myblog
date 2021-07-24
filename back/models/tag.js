const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/article', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.set('useCreateIndex', true);

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})

const Tag = mongoose.model('Tag', tagSchema, 'tag');

module.exports = { Tag };