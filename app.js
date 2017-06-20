const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    console.log('GET /');
    res.send('<h1>Hello world!</h1>');
});

app.listen(port);
console.log(`Server running on port ${port}`);