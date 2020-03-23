const express = require('express');
const router = express.Router();
const create=require('../Controller/signinController')
router.post('/',create.signin);

module.exports=router;