const express = require('express');
const router = express.Router();
const create=require('../Controller/signupController')
router.post('/',create.signup);

module.exports=router;