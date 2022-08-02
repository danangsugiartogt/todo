const express = require('express');
const { truncate } = require('fs');
const noteController = require('./noteController');
const app = express();

require('../utils/db');

const port = 5000;
const host = 'localhost';

app.use(express.json());

app.use('/notes', noteController);

app.listen(port, host, () => {
    console.log(`listening on port ${port} ...`);
});