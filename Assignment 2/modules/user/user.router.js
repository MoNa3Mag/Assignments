const allUsers = require("./controller/allUsers");
const { deleteUser } = require("./controller/deleteUser");
const searchUser = require("./controller/search");
const searchAge = require("./controller/searchAge");
const searchNA = require("./controller/searchAless30");
const searchEnd_a = require("./controller/searchEnd(a)");
const searchStart_a = require("./controller/searchStart(a)");
const { signup } = require("./controller/signUp");
const updatUser = require("./controller/updatUser");

const router = require ("express").Router();


router.get('/' , allUsers)

router.post('/signup' , signup)

router.patch('/user/:id' , updatUser)

router.delete('/user/:id' , deleteUser)

router.get('/search/:name' , searchUser)

router.get('/searchStart/:name' , searchStart_a)

router.get('/searchEnd/:name' , searchEnd_a)

router.get('/searchAge/:name' , searchAge)

router.get('/searchAN/:name' , searchNA)

module.exports = router