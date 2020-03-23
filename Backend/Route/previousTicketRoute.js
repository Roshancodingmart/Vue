const express = require('express');
const router = express.Router();
const create=require('../Controller/previousTicketController')
router.post('/',create.previousTicket);

module.exports=router;