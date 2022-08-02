const mongoose = require('mongoose');

// connection URL
const url = 'mongodb+srv://danang:7bnTd8t21MrTuTZr@cluster0.4juse.mongodb.net/note?retryWrites=true&w=majority';

mongoose.connect(url).catch(err => console.log(err));