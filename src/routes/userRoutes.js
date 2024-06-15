const express = require("express");
const routerUser = express.Router();
const { user } = require("../models/Users.js");
const { formUser } = require("../controllers/userController.js");
const { generateToken } = require("../middlewares/auth.js")
const hashedSecret = require("../middlewares/auth.js")




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
        const user = user.find({ username: username, password: password });


        if (user) {

            // // // const token = generateToken(user);
            // // // req.session.token = token;
            // // // console.log(token);

            res.redirect('/dashboard');
        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a server problem" });
        console.log(`${error.name}:${error.message}`)
    }
});

















module.exports = { routerUser }