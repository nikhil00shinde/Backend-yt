const express = require("express");

const app = express();

app.listen(3000);
app.use(express.json()); //global middleware

const authRouter = express.Router();

app.use("/auth", authRouter);

authRouter
	.route("/signup")
	.get(middleware1, getSignUp, middleware2) //path specific middleware
	.post(postSignUp);

function middleware1(req, res, next) {
	console.log("middleware1 encountered");
	next();
}
function middleware2(req, res, next) {
	console.log("middleware2 encountered");
	console.log("middleware2 ended req/res cycle");
	res.sendFile("./index.html", { root: __dirname });
}

function getSignUp(req, res, next) {
	console.log("🚀 ~ file: getSignUp called");
	// res.sendFile("./index.html", { root: __dirname });
	next();
}

function postSignUp(req, res) {
	let obj = req.body;
	console.log("🚀 ~ file: signup.js ~ line 20 ~ postSignUp ~ obj", obj);
	res.json({
		message: "user signed up",
		data: obj,
	});
}
