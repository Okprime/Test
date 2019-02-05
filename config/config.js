const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/Test', {useNewUrlParser: true})
    .then((data) => {
        console.log('MongoDB was connected succesfully');
    })
    .catch((err) => {
        console.log('Unable to connect mongo', err);
    })



module.exports = {mongoose};