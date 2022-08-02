const mongoose = require('mongoose');

// connection URL
const url = 'your_mongodb_url';

mongoose.connect(url).catch(err => console.log(err));
