const express = require('express');
const router = express.Router();
const create=require('../Controller/getTicketController')
router.post('/',create.getTicket);

module.exports=router;