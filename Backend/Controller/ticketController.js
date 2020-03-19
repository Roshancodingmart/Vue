const conn = require("../db");

const ticket = (req, res) => {
  var { seat_no,movie_id ,theater,time,date,key} = req.body;
  conn.client.query(
    `INSERT INTO test.ticket(seat,movie,theater,show,date,key) VALUES ($1,$2,$3,$4,$5,$6)`,
    [seat_no, movie_id,theater,time,date,key],
    (error, resp) => {
        if(resp.rowCount>0){
            res.send({ msg: "Added Successful" });
        }
        else{
            resp.send({msg:"Error"})
        }
    }
  );
};
module.exports = {
  ticket
};
