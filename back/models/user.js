const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/article', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.set('useCreateIndex', true);

const UserSchema = new mongoose.Schema({
    username: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
        set(val) {
            return bcrypt.hashSync(val, 10);
        }
    }
})

const User = mongoose.model('User', UserSchema, 'user')

module.exports = { User };