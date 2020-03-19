const express = require('express');
const router = express.Router();
const create=require('../Controller/ticketController')
router.post('/',create.ticket);

module.exports=router;