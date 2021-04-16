let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
let Nhanvien = require("../models/nhanvien_Model");
const { response, request, text } = require('express');

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
exports.GetProducts = async(req, res) => {
    // if(req.query.)
    await connection.query('SELECT *, loai_sp.Ten_Loai FROM sanpham, loai_sp WHERE sanpham.ID_Loai = loai_sp.ID_Loai ', function(errol, SPList, fields) {
        res.render('Products', { listSP: SPList });
    });

}

function getLoai() {
    connection.query('SELECT * loai_sp WHERE 1', function(errol, Loai, fields) {
        return Loai;
    })
}

exports.UpdateSP = (req, res) => {}