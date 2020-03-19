const express = require('express');
const router = express.Router();
const create=require('../Controller/bmiController')
router.post('/',create.bmi);

module.exports=router;