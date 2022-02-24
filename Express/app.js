const express = require("express");
const app = express();

app.listen(3000);

app.get("/", (req, res) => {
	res.sendFile("/Old pc data/d/web-d/8.Backend/Express/views/index.html");
});

app.get("/about", (req, res) => {
	res.sendFile("./views/about.html", { root: __dirname });
});

// redirect
app.get("/about-us", (req, res) => {
	res.redirect("/about");
});

// 404 page
app.use((req, res) => {
	// server pe request  aayegi na toh ae function chalega hi chalega
	// ae function har baar chalega agar koi isey route nahi mila toh
	// esliye hum isko last mei likhte hain
	res.status(404).sendFile("./views/404.html", { root: __dirname });
});
