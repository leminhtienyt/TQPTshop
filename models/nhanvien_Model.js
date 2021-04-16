const mogoose = require('mongoose');
const Schema = mogoose.Schema;


const Nhanvien = new Schema({
    ID_Nhanvien: Number,
    Chucvu: String,
    Luong: String,
    Tinhtrang: String,
    Ngayvaolam: Date,
    TenNV: String,
    Ngaysinh: Date,
    SDT: String,
    Email: String,
    Diachi: String,
    MangXahoi: String,
    Quoctich: String,
    Gioitinh: String,
    CMND: String,
    Anh_Daidien: String,
    UserName: String,
    PassWord: String
});



module.exports = mogoose.model('nhanvienModel', Nhanvien);