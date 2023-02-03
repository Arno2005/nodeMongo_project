const mongoose = require('mongoose');

//Handling unique errors
const uniqueValidator = require('mongoose-unique-validator');

//For password hash
const bcrypt = require('bcrypt');


const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email ']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password minimum length should be 6 characters'],
    },
    is_admin: {
        type: Boolean,
        default: 0,
    }
});

//Setting Unique error with custom message
userSchema.plugin(uniqueValidator, { message: 'That {PATH} is already being used.' });

//function becore user is created
//hashing password
userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
});


//statis methos for login
// userSchema.statics.login = async function(email, password){
//     const user = await this.
// }

module.exports = mongoose.model('user', userSchema);