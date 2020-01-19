const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/basket', {
    useNewUrlParser: true
});

module.exports = mongoose;