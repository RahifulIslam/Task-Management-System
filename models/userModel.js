const mongoose = require('mongoose');
const config = require('../service.json');
const Joi = require('joi');
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

}, { timestamps: true });

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id : this._id,
        email: this.email,
        name: this.name,
    },JWT_SECRET_KEY, { expiresIn: "2m" });

    return token;

}

//

const validateUser = user => {
    const schema = Joi.object({
        name: Joi.string().max(100),
        email: Joi.string().max(255),
        password: Joi.string().max(100),
    });

    return schema.validate(user);
};

module.exports.User = mongoose.model('User', userSchema);
module.exports.validate = validateUser;

