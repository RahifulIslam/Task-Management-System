const {User, validate} = require('../models/userModel');
const _= require('lodash');
const bcrypt = require('bcrypt');

const Registration = async(req, res)=> {
    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let user = {};
    user = await User.findOne({ email: req.body.email});
    if(user) res.status(400).send("User already registered");
    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try{
        const result = await user.save();
        res.status(201).json({
            message: "Registration Successful!",
            user: _.pick(result, ["_id", "name", "email"])
        });

    } catch(err){
        return res.status(500).send("Something failed!")
    }
}

module.exports = {
    Registration,

}