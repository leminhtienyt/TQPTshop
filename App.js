const express = require('express');
const app = express();

app.listen(process.env.PORT || 6698, () => {
    console.log('port 6698');
});

const expressHds = require('express-handlebars');

app.engine(
    '.hbs',
    expressHds({
        defaultLayout: '',
    })
);
app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/imgs', express.static('public/imgs'));
app.use(express.static('uploads'));

const router = require('./routes/routes');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let session = require('express-session');

app.use(session({
    name: 'TQPTshop',
    resave: false,
    saveUninitialized: false,
    secret: 'none',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,
        sameSite: true,
    }
}));

const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
app.use(fileUpload({}));

app.use(router);