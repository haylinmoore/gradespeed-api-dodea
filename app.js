const requests = require('request');
const cheerio = require('cheerio')

exports.getBaseGrades = function(username, password, schoolid, callback) {

    // Testing
    let request = requests.defaults({ jar: true })
    let formData = {
        'AuthType': 'Student',
        'FormType': 'Login',
        'DistrictID': '3000010',
        'SchoolID': schoolid,
        'Username': username,
        'Password': password,
        'cmdLogOn': 'Sign+In'
    };

    request.post({
            url: 'https://dodea.gradespeed.net/pc/StudentLogin.aspx',
            form: formData
        },
        function(err, httpResponse, body) {

            request('https://dodea.gradespeed.net/pc/ParentStudentGrades.aspx', function(error, response, body) {
                let $ = cheerio.load(body);

                let grades = []

                $(".DataRow, .DataRowAlt").each(function() {
                    let classData = [];
                    $(this).find("th, td").each(function() {
                        classData.push($(this).text())
                    });
                    grades.push(classData);
                });

                callback(grades);
            });
        }
    );

}
