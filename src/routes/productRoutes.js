const express = require("express");
const router = express.Router();
const { product } = require("../models/Product.js");
const { formProduct, showProductUser, showProductAdmin, showProductById, showProductByIdAdmin, navHtmlUser, navHtmlAdmin, footerHtml, mainInitialHtlm, mainFinalHtlm } = require("../controllers/productController.js");



router.get('/products', async (req, res) => {

    try {


        const products = await product.find();
        const productList = showProductUser(products);

        final = navHtmlUser + mainInitialHtlm + productList + mainFinalHtlm + footerHtml
        res.send(final);

    }


    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

});





router.get('/dashboard/', async (req, res) => {
    try {
        const products = await product.find();
        const productList = showProductAdmin(products);

        final = navHtmlAdmin + mainInitialHtlm + productList + mainFinalHtlm + footerHtml
        res.send(final);






    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to link to admin dashboard" });
    }
});






router.get('/products/:id', async (req, res) => {

    try {

        const { id } = req.params;

        if (id === "Accesorios" || id === "Camisetas" || id === "Pantalones" || id === "Zapatos") {


            const productID = await product.find({ category: id })
            const productList = showProductUser(productID)

            const final = navHtmlUser + mainInitialHtlm + productList + mainFinalHtlm + footerHtml

            res.send(final)



        } else {

            const productID = await product.findById(id);

            const productList = showProductById(productID);

            const final = navHtmlUser + mainInitialHtlm + productList + mainFinalHtlm + footerHtml

            res.send(final)

        }



    } catch (error) {
        res.status(500).send({ message: "Task not found as either ID or category does not exist" })
        console.log(`${error.name}:${error.message}`)

    }

});


router.get('/dashboard/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (id === 'new') {

            res.send(formProduct('/dashboard'));

        } else {
            const productID = await product.findById(id);

            const productList = showProductByIdAdmin(productID);

            const final = navHtmlAdmin + mainInitialHtlm + productList + mainFinalHtlm + footerHtml

            res.send(final);


            console.log(productID);
        }

    } catch (error) {
        res.status(500).send({ message: "Task not found as ID does not exist" })
    }

});




router.get('/dashboard/:id/edit', async (req, res) => {


    try {

        const { id } = req.params;
        res.send(formProduct(`/dashboard/${id}`));
        console.log(req.params)

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to create EDIT product" });
    }
})


router.post('/dashboard/:id/delete', async (req, res) => {
    try {
        const { id } = req.params;
        const productIDDelete = await product.findByIdAndDelete(id);
        res.status(200).redirect(`/dashboard/`)


    } catch (error) {
        res.status(500).send({ message: `Cannot find ${id} suggested to be able to delete product` })
    }

});




router.post('/dashboard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productIDUpdate = await product.findByIdAndUpdate(id, req.body);
        res.status(200).redirect(`/dashboard/${id}`)


    } catch (error) {
        res.status(500).send({ message: `Cannot find ${id} suggested to be edited` })
    }

});




router.post('/dashboard', async (req, res) => {
    try {


        const NewProduct = await product.create(req.body);
        res.status(200).redirect("/dashboard")



    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to create a NEW product" });
        console.log(`${error.name}:${error.message}`)
    }
});


module.exports = { router }