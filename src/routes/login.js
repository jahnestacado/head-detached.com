var express = require("express");
var dbConnection = require("./../db/init.js").dbConnection;
var loginRouter = express.Router();

function generateSessionId() {
    return new Date().getTime().toString();
}

function initUserSession(request, response) {
    request.session[request.body.username] = generateSessionId();
    response.cookie("sessionId", request.session[request.body.username]);
    response.cookie("username", request.body.username);
}

loginRouter.post('/', function(request, response) {
    dbConnection.collection("users").findOne({username: request.body.username}, function(error, result) {
        var status = 400; //Bad request
        // Intentional loose comparison for numbers as a String
        if (result.password == request.body.password) {
            initUserSession(request, response);
            status = 200; //OK
        }

        response.sendStatus(status);
    });
});

module.exports = loginRouter;