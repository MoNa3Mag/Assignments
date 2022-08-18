const auth = require("../../middlwear/auth");
const addProduct = require("./controller/addProduct");
const deleteProduct = require("./controller/deleteProduct");
const { displayProduct, productUser } = require("./controller/display");
const updatProduct = require("./controller/updatProduct");

const router = require ("express").Router();




router.post("/product" , addProduct)

router.patch("/product/:id" , updatProduct)

router.delete("/product/:id" , deleteProduct)

router.get("/product" , displayProduct)

router.get("/productUser" , auth() , productUser)


module.exports = router;