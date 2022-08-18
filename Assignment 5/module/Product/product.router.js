const auth = require("../../middlwear/auth");
const validation = require("../../middlwear/validation");
const addProduct = require("./controller/addProduct");
const deleteProduct = require("./controller/deleteProduct");
const { allProductUser, allProductYesterday} = require("./controller/display");
const updatProduct = require("./controller/updatProduct");
const { addProducts, updateProduct } = require("./Product.validation");

const router = require ("express").Router();




router.post("/product" , validation(addProducts) , auth() , addProduct)

router.patch("/product/:id" , validation(updateProduct) , auth() , updatProduct)

router.delete("/product/:id" , auth() , deleteProduct)

router.get("/productUser" , auth() , allProductUser)

router.get("/productYesterday" ,allProductYesterday)


module.exports = router;