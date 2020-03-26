const express = require('express');
const router = express.Router();
const create=require('../Controller/cancelTicketController')
router.post('/',create.cancelTicket);

module.exports=router;