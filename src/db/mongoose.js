const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes-api', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false

});