# Dodea Gradespeed API

A dodea gradespeed API built and maintained in my freetime between homework and school, so it might not always work.


Currently only supports getting your grade in each class. I will add getting the grade on each assignment soon :tm:


## Example

`npm install gradespeed-api-dodea`

```
var gradespeed = require("gradespeed-api-dodea");

gradespeed.getBaseGrades(USERNAME, PASSWORD, SCHOOLID, function(grades) {
    console.log(JSON.stringify(grades))
});

```


### How to get school id?

Go to https://dodea.gradespeed.net/pc/studentlogin.aspx, open Developer Tools, go to the networking tab. Then just login. Once you login you should see a request to StudentLogin.aspx with the Status of 302. Just click that and scroll to the bottom your should see `SchoolID: *NUMBER*` that number is your schoolID