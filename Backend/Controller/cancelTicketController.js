const conn = require("../db");

const cancelTicket = (req, res) => {
  var { seat,movie,theater,show,date,user } = req.body;
  console.log(seat,movie,theater,show,date,user)
  conn.client.query(`DELETE FROM test.ticket WHERE seat=$1 AND movie=$2 AND theater=$3 AND show=$4 AND date=$5 AND email=$6`,[seat,movie,theater,show,date,user],(error,resp)=>{
      if(resp.rowCount>0){
          console.log(resp.rows)
          res.send("Cancellation Successful")
      }
  });
};
module.exports = {
  cancelTicket
};
