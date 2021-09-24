const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/countries', require('./routes/v1/countries'));

module.exports = app;
