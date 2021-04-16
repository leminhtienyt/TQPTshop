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

exports.mobie_login = async(req, res) => {
    let username = req.body.Username;
    let password = req.body.Password;
    await connection.query('SELECT Ma_KH FROM nhanvien WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length = 0) {
            res.send('Fail')
        } else {
            res.send(results[0].Ma_KH)
        }
    });
}

exports.mobie_getSP_Loai = async(req, res) => {
    let loai = req.body.ID_Loai;
    await connection.query('SELECT * FROM sanpham WHERE ID_Loai = ?', [], function(error, results, fields) {
        if (results.length = 0) {
            // res.send('Fail')
        } else {
            res.send(results)
        }
    });
}

exports.mobie_getSP_Ten = async(req, res) => {
    let loai = req.body.ID_Loai;
    await connection.query('SELECT * FROM sanpham WHERE TenSP = ?', [], function(error, results, fields) {
        if (results.length = 0) {
            // res.send('Fail')
        } else {
            res.send(results)
        }
    });
}

exports.mobie_getSP_Ma = async(req, res) => {
    let loai = req.body.Ma_sanpham;
    await connection.query('SELECT * FROM sanpham WHERE Ma_sanpham = ?', [], function(error, results, fields) {
        if (results.length = 0) {
            // res.send('Fail')
        } else {
            res.send(results)
        }
    });
}