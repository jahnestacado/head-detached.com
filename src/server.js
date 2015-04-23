var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session  = require("express-session");
var dbConnection = require("./db/init.js");

var app = express();
app.use(cookieParser("secret"));
app.use(session());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.listen(process.env.PORT || 5000);

app.use("/blog", require("./routes/blog.js"));
app.use("/login", require("./routes/login.js"));

