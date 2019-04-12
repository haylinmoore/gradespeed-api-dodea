require('dotenv').config()
var gradespeed = require("../app.js");

gradespeed.getAllIDs(process.env.USERNAME, process.env.PASSWORD, process.env.SCHOOLID, function(grades) {
    console.log(JSON.stringify(grades))
});
