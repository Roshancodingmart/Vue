const conn = require("../db");


const age = (req, res) => {
  var {name,age} = req.body;
  conn.client.query(`INSERT INTO test.age(name,age) VALUES ($1,$2)`,[name,age],(error,resp)=>{
      res.send({msg:"Added Successful"})
  })
};
module.exports = {
  age
};
