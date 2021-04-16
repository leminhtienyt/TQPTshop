const mogoose = require('mongoose');
const Schema = mogoose.Schema;


const User = new Schema({
    id: String,
    userbane: String,
    password: String,
    email: String
});



module.exports = mogoose.model('userModel', User);