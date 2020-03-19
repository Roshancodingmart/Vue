const conn = require("../db");

const bmi = (req, res) => {
  var { name, bmi } = req.body;
  conn.client.query(
    `INSERT INTO test.bmi(name,bmi) VALUES ($1,$2)`,
    [name, bmi],
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
  bmi
};
