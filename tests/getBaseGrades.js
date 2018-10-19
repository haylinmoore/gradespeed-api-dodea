var gradespeed = require("../app.js");

gradespeed.getBaseGrades(process.env.USERNAME, process.env.PASSWORD, process.env.SCHOOLID, function(grades) {
    console.log(JSON.stringify(grades))
});
