let mysql = require('mysql');
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
let user = require("../models/userModel");
const { response, request } = require('express');
const { Types } = require('mongoose');
const { use } = require('../routes/routes');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Store_Db'
});

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.login = (req, res) => {
    let username = req.body.Login_user;
    let password = req.body.Login_pass;
    let temp = 1;
    if (username && password) {
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                //res.send('Username and/or Password!');

                console.log(results);
                connection.query('SELECT * FROM user WHERE username = ? AND email = ?', [username, 'Admin@email.com'], function(error, results2, fields) {
                    if (results2.length > 0) {
                        console.log('Admin');
                        res.render('Admin');
                    } else {
                        console.log('user2');
                        res.render('User');
                    }
                });
            } else {
                res.render('Login', {
                    message_alert: 'UserName or Password are incorect'
                })
            }
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
}