const mongoose = require('mongoose');

mongoose
    .connect('mongodb://189.218.22.194:27017/moviesDB', {useNewUrlParser:true, useUnifiedTopology:true})
    .catch(e => {   
        console.log('Connection error', e.message);
    })

const db = mongoose.connection;
module.exports = db;