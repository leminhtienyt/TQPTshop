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

exports.EditMyInfo = async(req, res) => {
    let Anh_Daidien;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        connection.query('UPDATE nhanvien SET Ngaysinh = ?, SDT = ?, Email = ?, Diachi = ?, MangXahoi = ?, Quoctich = ?, Gioitinh = ? WHERE ID_Nhanvien = ?', [req.body.Ngaysinh, req.body.SDT, req.body.Email, req.body.Diachi, req.body.MangXahoi, req.body.Quoctich, req.body.Gioitinh, req.body.ID_Nhanvien], function(err, result) {
            if (err) throw err;
            return res.redirect('/Admin')
        });
    } else {
        let imgName = req.session.userId + makeid(20) + '.jpg';
        uploadPath = __dirname + '/../public/imgs/img/' + imgName;
        console.log(uploadPath);
        Anh_Daidien = req.files.Anh_Daidien;

        Anh_Daidien.mv(uploadPath, function(err) {
            if (err) {
                return res.redirect('/Admin');
            }
            connection.query('UPDATE nhanvien SET Ngaysinh = ?, SDT = ?, Email = ?, Diachi = ?, MangXahoi = ?, Quoctich = ?, Gioitinh = ?, Anh_Daidien = ? WHERE ID_Nhanvien = ?', [req.body.Ngaysinh, req.body.SDT, req.body.Email, req.body.Diachi, req.body.MangXahoi, req.body.Quoctich, req.body.Gioitinh, imgName, req.body.ID_Nhanvien], function(err, result) {
                if (err) throw err;
                return res.redirect('/Admin')
            });
        });
    }
}


exports.Employees = (req, res) => {
    if (!req.session.userId) {
        res.redirect('Login');
    } else {
        let chucvu = req.session.Chucvu;

        switch (chucvu) {
            case "Admin":
                connection.query('SELECT * FROM nhanvien WHERE 1 ORDER BY nhanvien . Tinhtrang ASC', function(errol, NVslist, fields) {
                    res.render('Nhanvien', { listNV: NVslist });
                });
                break;
            case "Quản lý":
                connection.query('SELECT * FROM nhanvien WHERE Chucvu = ? AND Tinhtrang = ?', ["Nhân viên", "Activated"], function(errol, NVlist, fields) {
                    res.render('Nhanvien', { listNV: NVlist });
                });
                break;
            case "Nhân viên":
                res.redirect('Admin');
                break;
        }

    };
};

exports.UpdateNV = (req, res) => {
    connection.query('UPDATE nhanvien SET Gioitinh = ?, Ngaysinh = ?, Quoctich = ?, Chucvu = ?, Luong = ?, Tinhtrang = ?, SDT = ?, Email = ?, MangXahoi = ?, Diachi = ?, CMND = ?  WHERE ID_Nhanvien = ?', [req.body.Gioitinh, req.body.Ngaysinh, req.body.Quoctich, req.body.Chucvu, req.body.Luong, req.body.Tinhtrang, req.body.SDT, req.body.Email, req.body.MangXahoi, req.body.Diachi, req.body.CMND, req.body.ID_Nhanvien], function(err, result) {
        if (err) throw err;
    });
    res.redirect('Employees')

}

exports.Nghiviec = (req, res) => {
    connection.query('UPDATE nhanvien SET Tinhtrang = ? WHERE ID_Nhanvien = ?', ["Deactivated", req.body.ID_Nhanvien], function(err, result) {
        if (err) throw err;
    });
    res.redirect('Employees')
}

exports.NewNV = (req, res) => {
    let ID_Nhanvien, UserName, PassWord, TenNV, Ngaysinh, Gioitinh, CMND, Quoctich, Chucvu, Luong, Tinhtrang, Ngayvaolam, SDT, Email, Diachi, MangXahoi, Anh_Daidien;
    ID_Nhanvien = 0;
    connection.query('SELECT ID_Nhanvien FROM nhanvien ORDER BY ID_Nhanvien DESC LIMIT 1', function(err, result) {
        ID_Nhanvien = result[0].ID_Nhanvien + 1;
        UserName = Username(ID_Nhanvien);
        PassWord = Password();
        TenNV = req.body.TenNV;
        Ngaysinh = req.body.Ngaysinh;
        Gioitinh = req.body.Gioitinh;
        CMND = req.body.CMND;
        Quoctich = req.body.Quoctich;
        Chucvu = req.body.Chucvu;
        Luong = req.body.Luong;
        Tinhtrang = 'Activated';
        Ngayvaolam = req.body.Ngayvaolam;
        SDT = req.body.SDT;
        Email = req.body.Email;
        Diachi = req.body.Diachi;
        MangXahoi = req.body.MangXahoi;
        Anh_Daidien = getAvatar(UserName);
        connection.query('INSERT INTO nhanvien (UserName, PassWord, TenNV , Ngaysinh, Gioitinh, CMND , Quoctich , Chucvu , Luong , Tinhtrang , Ngayvaolam , SDT , Email , Diachi , MangXahoi , Anh_Daidien) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [UserName, PassWord, TenNV, Ngaysinh, Gioitinh, CMND, Quoctich, Chucvu, Luong, Tinhtrang, Ngayvaolam, SDT, Email, Diachi, MangXahoi, Anh_Daidien],
            function(err, result) {
                console.log(err)
            })
        res.redirect('/Employees');
    })

    function Username(ID_Nhanvien) {
        TenNV = req.body.TenNV.trim();
        let NametempString = ' ' + TenNV;
        let finalName;
        finalName = NametempString.slice(NametempString.lastIndexOf(' ') + 1, NametempString.length);
        NametempString = NametempString.slice(0, NametempString.lastIndexOf(' '));
        for (i = 0; i < NametempString.length; i++) {
            if (NametempString[i] == ' ') {
                finalName = finalName + NametempString[i + 1];
            }
        }
        if (ID_Nhanvien < 10) {
            finalName = finalName + '00' + ID_Nhanvien;
        } else if (ID_Nhanvien < 100) {
            finalName = finalName + '0' + ID_Nhanvien;
        }
        finalName = finalName + "@QTPTshop"
        return finalName;
    }

    function Password() {
        // var result = [];
        // var charactersLength = characters.length;
        // for (var i = 0; i < length; i++) {
        //     result.push(characters.charAt(Math.floor(Math.random() *
        //         charactersLength)));
        // }

        let pass = '';
        let charac;
        let charSet1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charSet2 = 'abcdefghijklmnopqrstuvwxyz';
        let charSet3 = '0123456789';
        let charSet4 = '!@#$%^&*()_+';

        for (set1 = 0; set1 < 3; set1++) {
            charac = charSet1.charAt(Math.floor(Math.random() * charSet1.length))
            pass = pass + charac;
        }
        for (set2 = 0; set2 < 3; set2++) {
            charac = charSet2.charAt(Math.floor(Math.random() * charSet2.length))
            pass = pass + charac;
        }
        for (set3 = 0; set3 < 3; set3++) {
            charac = charSet3.charAt(Math.floor(Math.random() * charSet3.length))
            pass = pass + charac;
        }
        for (set4 = 0; set4 < 3; set4++) {
            let charac = charSet4.charAt(Math.floor(Math.random() * charSet4.length))
            pass = pass + charac;
        }

        return pass;
    }

    function getAvatar(Ten) {
        let firstChar = Ten.slice(0, 1);
        let link = firstChar + '.jpg'

        return link;
    }
}