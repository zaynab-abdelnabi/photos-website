const User = require('../models/user');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return next(createError(400, 'الرجاء إدخال البريد الإلكتروني'));
    }
    if (!password) {
        return next(createError(400, 'الرجاء إدخال كلمة المرور'));
    }
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

    let data = { name, email, password, confirmPass } = req.body;
    if (!name || !email || !password || !confirmPass) {
        return next(createError(400, 'الرجاء إدخال جميع الحقول'));
    }
    if (password !== confirmPass){
        return next(createError(400, 'كلمات المرور غير متطابقة'))
    }
    User.findOne({ email })
        .then(user => {
            if (user) throw createError(422, 'البريد الألكتروني مسجل مسبقاً');
            return User.create(data)
        })
        .then(user => {
            let token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);
            res.json({ token: token, _id: user._id });
        })
        .catch(next);

};