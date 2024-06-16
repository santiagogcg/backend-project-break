const express = require("express");
const routerUser = express.Router();
const { user } = require("../models/Users.js");
const { product } = require("../models/Product.js");
const { formUser } = require("../controllers/userController.js");
const { generateToken } = require("../middlewares/auth.js")
const { verifyToken } = require("../middlewares/auth.js")
const bcrypt = require('bcrypt');
const hashedSecret = require("../middlewares/auth.js");





routerUser.get('/LogIn', async (req, res) => {

    try {

        res.send(formUser('LogIn', 'Register'))


    }


    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

});

routerUser.get('/Register', async (req, res) => {

    try {

        res.send(formUser('Register', 'LogIn'))


    }


    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

});




routerUser.post('/Register', async (req, res) => {
    try {


        const NewUser = await user.create(req.body);

        res.status(200).redirect("/login")



    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to create a NEW user" });
        console.log(`${error.name}:${error.message}`)
    }
});





routerUser.post('/LogIn', async (req, res) => {
    try {
        const { username, password } = req.body;

        const userFind = await user.find({ username: username, password: password }).exec();

        console.log(userFind)





        if (userFind.length === 0) {

            res.status(401).json({ mensaje: 'Credenciales incorrectas o usuario incorrecto' });




        } else {
            const hashedSecret = bcrypt.hashSync(`'${userFind.password}'`, 10)
            console.log(hashedSecret)
            const token = generateToken(userFind);
            req.session.token = token;
            console.log(token);
            res.redirect('/verification');


        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a server problem" });
        console.log(`${error.name}:${error.message}`)
    }
});



routerUser.get('/verification', verifyToken, async (req, res) => {

    try {

        if (req.session.payLoadVerify) {

            res.redirect('/dashboard')

        } else {

            res.redirect('/login')


        }



    }

    catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a server problem" });

    }



});


routerUser.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/products');
});













module.exports = { routerUser, hashedSecret }