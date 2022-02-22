// server creation

// 1. http module

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	// req object contain the data that browser has provided
	// response object -> jo bhi hamara server response back dega browser ko, hum isko es object ko use karke response bhejte hain

	console.log("request has been made from browser to server");

	// REQUEST OBJECT KE BARE MEI
	// console.log(req.method);
	// console.log(req.url);

	// AGAR HUMHE DATA BEJNA HAIN SERVER SE BROWSER KO

	// SENDING TEXT TO BROWSER
	// res.setHeader("Content-Type", "text/plain");
	// res.write("Hello World ! 😊");
	// res.end();

	// SENDING HTML (few code) TO BROWSER
	// res.setHeader("Content-Type", "text/html");
	// res.write("<h1>Hello Nikhil! How are you? :)</h1>");
	// res.write("<h2>Hello How was your day :(</h2>");
	// res.end();

	// IF WE WANT TO SEND WHOLE HTML FILE
	// res.setHeader("Content-Type", "text/html");
	// fs.readFile("./views/index.html", (err, fileData) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		// res.write(fileData);
	// 		res.end(fileData);
	// 	}
	// });

	// ROUTING IN SERVER THROUGH NODEJS
	let path = "./views";
	switch (req.url) {
		case "/":
			path += "/index.html";
			res.statusCode = 200;
			break;
		case "/about":
			path += "/about.html";
			res.statusCode = 200;
			break;
		case "/about-me":
			// Redirect karna hain page ko from about-me to about permanently
			// jo url likhenge browser pe "/about-me" route ke sath woh change to "/about" route
			res.setHeader("Location", "/about");
			res.statusCode = 301;
			res.end();
			break;
		default:
			path += "/404.html";
			res.statusCode = 404;
			break;
	}

	res.setHeader("Content-Type", "text/html");
	fs.readFile(path, (err, fileData) => {
		if (err) {
			console.log(err);
		} else {
			res.end(fileData);
		}
	});
});

// port number, host, callback func
server.listen(3000, "localhost", () => {
	console.log("server is listening on port 3000");
});
