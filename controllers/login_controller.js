// let express = require('express');
// let session = require('express-session');
// let bodyParser = require('body-parser');
// let path = require('path');
// let Nhanvien = require("../models/nhanvien_Model");
// const { response, request, text } = require('express');

const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Store_Db'
});
connection.connect(function(err) {
    if (err) {
        console.log('Err: ' + err.stack);
        return;
    }
});

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/Admin')
        }

        res.clearCookie('TQPTshop');
        return res.redirect('/Admin')
    })
}

exports.Daskboard = (req, res) => {
    let userID = req.session.userId;
    connection.query('SELECT * FROM nhanvien WHERE ID_Nhanvien = ?', [userID], function(error, results, fields) {
        if (results.length > 0) {
            req.session.userId = results[0].ID_Nhanvien;
            res.render('Admin', { personalInfo: results });
        } else {
            res.render('Admin');
        }
    });
}
exports.login = (req, res) => {
    let username = req.body.Login_user;
    let password = req.body.Login_pass;
    if (username && password) {
        connection.query('SELECT * FROM nhanvien WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results[0].Tinhtrang == "Activated") {
                if (results.length > 0) {
                    req.session.userId = results[0].ID_Nhanvien;
                    req.session.Chucvu = results[0].Chucvu;
                    res.render('Admin', { personalInfo: results });
                } else {
                    res.render('Login', {
                        message_alert: 'UserName or Password are incorect'
                    })
                }
            } else {
                res.render('Login', {
                    message_alert: 'Bạn đã nghĩ việc'
                })
            }

        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
}