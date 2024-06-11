const express = require("express")
const serve = require('express-static');
const app = express()
const { dbConnection } = require("./config/db.js")
const { router } = require("./routes/productRoutes.js")
require('dotenv').config();
const PORT = process.env.PORT || 5005





app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(express.static('../public'))

app.use('/', router);

dbConnection();







app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
