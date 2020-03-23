const conn = require("../db");

const signup = (req, res) => {
  var {name,mail,pass} = req.body
  conn.client.query(`INSERT INTO test.user(name,email,password) VALUES($1,$2,$3)`,[name,mail,pass],(error,resp)=>{
    if(resp.rowCount>0){
      res.send("Signup Complete")
    }
    else{
      res.send("Signup Failed")
    }
  })
  
};
module.exports = {
  signup
};
