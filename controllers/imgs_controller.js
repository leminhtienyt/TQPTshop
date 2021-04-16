let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
const path = require('path');
let Nhanvien = require("../models/nhanvien_Model");
const { response, request } = require('express');
const { Types } = require('mongoose');

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mysql = require('mysql');
const router = require('../routes/routes');
const { fields } = require('../public/js/js/uploadMiddleware');
const { filename } = require('../public/js/js/resize');
const { readFile } = require('fs');
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

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

exports.UploadImgNew = (req, res) => {
    let Anh_Daidien;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(300).send("errol");
    }

    Anh_Daidien = req.files.Anh_Daidien;

    let imgName = req.session.userId + makeid(20) + '.jpg';
    uploadPath = __dirname + '/../public/imgs/img/' + imgName;

    Anh_Daidien.mv(uploadPath, function(err) {
        if (err) {
            return res.redirect('/Admin');
        }

        connection.query('UPDATE nhanvien SET Anh_Daidien = ? WHERE ID_Nhanvien = ?', [imgName, req.session.userId], function(err, result) {
            if (err) throw err;
        });
        res.redirect('/Admin')
    });
};