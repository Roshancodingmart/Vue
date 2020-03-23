const conn = require("../db");

const signin = (req, res) => {
  var {mail,pass}=req.body;
  conn.client.query(`SELECT * FROM test.user WHERE email=$1 AND password=$2`,[mail,pass],(error,resp)=>{
    if(resp.rowCount>0){
      res.send({msg:"Signin Complete",name:resp.rows[0].name,mail:resp.rows[0].email})
    }
    else{
      res.send({msg:"Signin Failed"})
    }
  })
};
module.exports = {
  signin
};
