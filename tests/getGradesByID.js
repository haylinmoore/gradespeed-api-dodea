require('dotenv').config()
var gradespeed = require("../app.js");

gradespeed.getGradesByID(process.env.USERNAME, process.env.PASSWORD, process.env.SCHOOLID, process.env.CLASSID, function(grades) {
    console.log(JSON.stringify(grades))
});
