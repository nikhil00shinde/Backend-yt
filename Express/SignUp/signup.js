const express = require("express");

const app = express();

app.listen(3000);
app.use(express.json());

const authRouter = express.Router();

app.use("/auth", authRouter);

authRouter.route("/signup").get(getSignUp).post(postSignUp);

function getSignUp(req, res) {
	res.sendFile("./index.html", { root: __dirname });
}

function postSignUp(req, res) {
	let obj = req.body;
	console.log("🚀 ~ file: signup.js ~ line 20 ~ postSignUp ~ obj", obj);
	res.json({
		message: "user signed up",
		data: obj,
	});
}
