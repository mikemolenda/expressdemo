const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

// Setup Pug view engine
// Tells render to look in 'views' directory for .pug view files (see app.get(), below)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setup Express body parser middleware
// (parses HTTP request body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path (HTML site root)
app.use(express.static(path.join(__dirname, 'public')));

// Respond to GET requests for root
app.get('/', (req, res) => {
    console.log('GET /');
    res.render('index', {title: 'Welcome'});    // Pass parameters as second argument object
});

// Respond to GET requests for about
app.get('/about', (req, res) => {
    console.log('GET /about');
    res.render('about', {title: 'About'});
});

app.listen(port);
console.log(`Server running on port ${port}`);