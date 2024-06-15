const express = require("express")
const serve = require('express-static');
const app = express()
const session = require('express-session')
const { dbConnection } = require("./config/db.js")
const { router } = require("./routes/productRoutes.js");
const { routerUser } = require("./routes/userRoutes.js");
const hashedSecret = require("./middlewares/auth.js")


require('dotenv').config();
const PORT = process.env.PORT || 5005



app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(express.static('../public'))

// app.use(
//     session({
//         secret: hashedSecret,
//         resave: false,
//         saveUninitialized: true,
//         cookie: { secure: false },
//     })
// );


app.use('/', router, routerUser);

dbConnection();



app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
