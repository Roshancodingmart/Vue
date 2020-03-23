const conn = require("../db");

const ticket = (req, res) => {
  var { seat_no,movie_id ,theater,time,date,key,id,mail} = req.body;
  conn.client.query(
    `INSERT INTO test.ticket(seat,movie,theater,show,date,key,id,email) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [seat_no, movie_id,theater,time,date,key,id,mail],
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
