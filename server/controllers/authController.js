const User = require('../models/user');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email, password })
        .then(user => {
            if (!user) {
                throw createError(401, 'الرجاء التحقق من اسم المستخدم وكلمة المرور');
            }
            let data = {
                id: user._id,
                name: user.name,
                email: user.email
            };
            let token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ token: token, _id: user._id });
        })
        .catch(next);

}

exports.register = (req, res, next) => {

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    User.create(data)
        .then(user => {
            let token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);
            res.json({ token: token, _id: user._id });
        })
        .catch(next);

};