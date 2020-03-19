const express = require('express');
const router = express.Router();
const create=require('../Controller/ageController')
router.post('/',create.age);

module.exports=router;