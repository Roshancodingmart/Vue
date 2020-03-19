const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./middleware.js");
var cors = require('cors')
var app = express()
app.use(cors())
const port = 3005;


const ageRoute = require("./Route/ageRoute");
const bmiRoute = require("./Route/bmiRoute");
const ticketRoute = require("./Route/ticketRoute");
const getTicketRoute = require("./Route/getTicketRoute");



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );
  next();
});
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.use("/age",ageRoute);
app.use("/bmi",bmiRoute);
app.use("/ticket",ticketRoute);
app.use("/getTicket",getTicketRoute);