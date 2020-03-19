const conn = require("../db");

const getTicket = (req, res) => {
  var { movie_id,theater,show,date } = req.body;
  console.log(movie_id,theater,show,date)
  conn.client.query(
    `SELECT seat FROM test.ticket WHERE movie=$1 AND theater=$2 AND show=$3 AND date=$4`,[movie_id,theater,show,date],
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
  getTicket
};
