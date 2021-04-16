const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../public/js/js/uploadMiddleware');
const Resize = require('../public/js/js/resize');

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

//session
const sessController = require('../controllers/login_controller');
const backtoLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/')
    } else {
        next()
    }
}

const backtoHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/Admin')
    } else {
        next()
    }
}
const isNhanvien = (req, res, next) => {
    backtoHome;
    if (req.session.Chucvu != 'Nhân viên') {
        res.redirect('/Admin')
    } else {
        next()
    }
}
router.get('/', backtoHome, (req, res) => {
    const { userId } = req.session
    res.render('Login');
})
router.get('/Admin', backtoLogin, sessController.Daskboard);
router.post('/Login', backtoHome, sessController.login)
router.get('/Login', (req, res) => {
    res.render('Login');
})

router.get('/Logout', sessController.logout)

//Nhanvien
const NVcontroller = require('../controllers/nhanvien_controller');

router.get('/Nhanvien', isNhanvien, (req, res) => {
    res.render('Nhanvien');
});
router.post('/EditMyInfo', NVcontroller.EditMyInfo);
router.get('/Employees', NVcontroller.Employees);
router.post('/Nghiviec', NVcontroller.Nghiviec);
router.post('/UpdateNV', NVcontroller.UpdateNV);

router.get('/NewEmployee', (req, res) => {
    if (req.session.Chucvu != "Nhân viên") {
        res.render('newEmploy');
    } else {
        res.redirect("/Admin")
    }
});
router.post('/NewNV', (req, res) => {
    if (req.session.Chucvu != "Nhân viên") {
        console.log(req.session.Chucvu)
    } else {
        console.log("ko phai admin");
    }
})

//San pham
const proController = require('../controllers/products_controller');
router.get('/Products', proController.GetProducts);

router.post('/UpdateSP', proController.UpdateSP);

router.get('/AddSP', (req, res) => {
    console.log('goto Add SP')
    res.render('EditSanpham');
})

router.post('/AddNewSP', (req, res) => {
    console.log('add this:')
    console.log(req.body);
})

router.get('/EditSP', (req, res) => {
    res.render('EditSanpham', { sanpham: req.query.Id_sanpham });
    console.log("goto Edit: req.query.Id_sanpham");
})

router.get('/EditThisSP', (req, res) => {
    console.log('edit: ' + req.query)
})

//  img
const imgController = require('../controllers/imgs_controller');

router.post('/UploadImg', imgController.UploadImgNew);

//User

const userAPI = require('../controllers/userAPI')

router.get('/getuser', (req, res) => {
    console.log("mobie app")
    res.send([{ 'conheo': "Choquy1" }, { 'conheo': "Choquy2" }, { 'conheo': "Choquy3" }, { 'conheo': "Choquy4" }, { 'conheo': "Choquy5" }]);
})

module.exports = router;