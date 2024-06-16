
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { user } = require("../models/Users.js");
const { hashedSecret } = require('../routes/userRoutes.js');



require('dotenv').config();
// const hashedSecret = bcrypt.hash(userFind.password, 10)


function generateToken(user) {


    return jwt.sign({ id: user[0]._id }, `'${hashedSecret}'`, {
        expiresIn: '1h',
    });


}


function verifyToken(req, res, next) {
    const token = req.session.token;
    console.log(req.session)


    if (!token) {
        return res.status(401).json({ mensaje: 'token no generado' });

    } else {

        jwt.verify(token, `'${hashedSecret}'`, (err, decoded) => {
            if (err) {
                return res.status(401).json({ mensaje: 'token inválido' });
            }

            return req.session.payLoadVerify = decoded


            next();
        })

        console.log(req.session.payLoadVerify)
        next()
    }
}

















module.exports = {
    generateToken, verifyToken
};




