const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/article', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.set('useCreateIndex', true);

const DetailSchema = new mongoose.Schema({
   title: {
       type: String,
       unique: true
   },
   descriptions: String,
   classifications: String,
   tags: String,
   pic: String,
   date: String,
   content: String
})
const Detail = mongoose.model('Detail', DetailSchema, 'detail');

module.exports = { Detail };