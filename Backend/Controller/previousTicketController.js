const conn = require("../db");

const previousTicket = (req, res) => {
  var { mail } = req.body;
  
  conn.client.query(
    `SELECT * FROM test.ticket WHERE email=$1`,[mail],
        (error, resp) => {
          console.log("resp",resp)
      if (resp.rowCount > 0) {
        res.send(resp.rows);
      } 
      else{
          res.send("not found")
      }
    }
  );
};
module.exports = {
  previousTicket
};
