"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var PORT = 80;
app.get('/', function (req, res) {
    res.send("Hello world!");
});
app.listen(PORT, function () {
    console.log("Server is running at https://localhost:" + PORT);
});
