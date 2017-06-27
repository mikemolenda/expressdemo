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

// Routing:

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

// Respond to GET requests for contact
app.get('/contact', (req, res) => {
    console.log('GET /contact');
    res.render('contact', {title: 'Contact'});
});

// Respond to POST requests for contact
app.post('/contact', (req, res) => {
    console.log('POST /contact');

    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    console.log(`name=${name}`);
    console.log(`email=${email}`);
    console.log(`message=${message}`);

    // Send email with nodeMailer
    let transporter = nodeMailer.createTransport({
        host: 'my.smtp.host',           // TODO: Enter your SMTP host name here
        port: 465,
        secure: true,
        auth: {
            user: 'username@domain',    // TODO: Enter your email username here
            pass: 'password'            // TODO: Enter your email password here
        }
    });

    let mailOptions = {
        from: `${name} \<${email}\>`,
        to: 'username@domain',          // TODO: Enter recipient (yourself) email address here
        subject: 'Website form contact',
        text: message,
        html: `<p>${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Message sent: ${info.response}`);
        }

        res.redirect('/');
    });

});

app.listen(port);
console.log(`Server running on port ${port}`);