const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/article', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.set('useCreateIndex', true);

const classificationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})

const Classification = mongoose.model('Classification', classificationSchema, 'classification');

module.exports = { Classification };