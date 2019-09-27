const requests = require("request");
const cheerio = require("cheerio");

exports.getBaseGrades = function(username, password, schoolid) {
	return new Promise((resolve, reject) => {
		// Testing
		let request = requests.defaults({ jar: true });
		let formData = {
			AuthType: "Student",
			FormType: "Login",
			DistrictID: "3000010",
			SchoolID: schoolid,
			Username: username,
			Password: password,
			cmdLogOn: "Sign+In"
		};

		request.post(
			{
				url: "https://dodea.gradespeed.net/pc/StudentLogin.aspx",
				form: formData
			},
			function(err, httpResponse, body) {
				if (err) {
					throw err;
				}

				if (httpResponse.statusCode === 200) {
					reject(["Error, Username/Password/SchoolID incorrect"]);
					return;
				}

				request("https://dodea.gradespeed.net/pc/ParentStudentGrades.aspx", function(error, response, body) {
					let $ = cheerio.load(body);

					let grades = [];

					$(".DataRow, .DataRowAlt").each(function() {
						let classData = [];
						$(this)
							.find("th, td")
							.each(function() {
								classData.push($(this).text());
							});
						grades.push(classData);
					});

					resolve(grades);
				});
			}
		);
	});
};

exports.getGradesByID = function(username, password, schoolid, id) {
	return new Promise((resolve, reject) => {
		let request = requests.defaults({ jar: true });
		let formData = {
			AuthType: "Student",
			FormType: "Login",
			DistrictID: "3000010",
			SchoolID: schoolid,
			Username: username,
			Password: password,
			cmdLogOn: "Sign+In"
		};

		request.post(
			{
				url: "https://dodea.gradespeed.net/pc/StudentLogin.aspx",
				form: formData
			},
			function(err, httpResponse, body) {
				if (err) {
					throw err;
				}

				if (httpResponse.statusCode === 200) {
					reject(["Error, Username/Password/SchoolID incorrect"]);
					return;
				}

				request("https://dodea.gradespeed.net/pc/ParentStudentGrades.aspx?data=" + id, function(error, response, body) {
					let $ = cheerio.load(body);

					let grades = [];

					$(".ClassName")
						.nextAll(".DataTable")
						.each(function() {
							var id = grades.length;
							grades[id] = [];

							grades[id].push([
								$(this)
									.prev()
									.prev()
									.text()
							]);

							$(this)
								.find("tr")
								.each(function() {
									var iId = grades[id].length;
									grades[id][iId] = [];
									$(this)
										.find("td")
										.each(function() {
											grades[id][iId].push($(this).text());
										});
								});
						});

					resolve(grades);
				});
			}
		);
	});
};

exports.getAllIDs = function(username, password, schoolid) {
	return new Promise((resolve, reject) => {
		let request = requests.defaults({ jar: true });
		let formData = {
			AuthType: "Student",
			FormType: "Login",
			DistrictID: "3000010",
			SchoolID: schoolid,
			Username: username,
			Password: password,
			cmdLogOn: "Sign+In"
		};

		request.post(
			{
				url: "https://dodea.gradespeed.net/pc/StudentLogin.aspx",
				form: formData
			},
			function(err, httpResponse, body) {
				if (err) {
					throw err;
				}

				if (httpResponse.statusCode === 200) {
					reject(["Error, Username/Password/SchoolID incorrect"]);
					return;
				}

				request("https://dodea.gradespeed.net/pc/ParentStudentGrades.aspx", function(error, response, body) {
					let $ = cheerio.load(body);

					let grades = [];

					$(".DataRow, .DataRowAlt").each(function() {
						let classData = [];
						$(this)
							.find("th, td")
							.each(function() {
								var url = $(this)
									.find("a.Grade")
									.attr("href");
								if (url != undefined) {
									classData.push([url, $(this).text()]);
								} else {
									classData.push([$(this).text()]);
								}
							});
						grades.push(classData);
					});

					resolve(grades);
				});
			}
		);
	});
};
