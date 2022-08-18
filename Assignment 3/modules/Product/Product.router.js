const addProduct = require('./controller/addProduct');
const deleteProduct = require('./controller/deleteProduct');
const { product } = require('./controller/displayProduct');
const getPrice = require('./controller/getPrice');
const updateProduct = require('./controller/updateProduct');

const router = require('express').Router();



router.post('/product' , addProduct)

router.get('/product' , product)

router.put('/product/:id' , updateProduct)

router.delete('/product/:id' , deleteProduct)

router.get('/getPrice' , getPrice)

module.exports = router