const deleteUser = require('./controller/deleteUser');
const Users = require('./controller/displayU_p');
const search_a = require('./controller/getSE_a');
const search_a_30 = require('./controller/getStart(a)_30');
const { signup, signin } = require('./controller/registration');
const updateUser = require('./controller/updateUser');

const router = require ('express').Router();

router.post('/signup' ,signup)

router.post('/signin' , signin)

router.put('/user/:id' , updateUser)

router.delete('/user/:id' , deleteUser)

router.get('/user' , Users)

router.get('/userStart_a' , search_a_30)

router.get('/search_a' , search_a)

module.exports = router