const express = require("express");
const cookieParser = require("cookie-parser");
const userModel = require("./models/userModel");
const app = express();

app.listen(3000);
app.use(express.json());
app.use(cookieParser()); //access cookie in req/res object/or anymwhere in app

let users = {
	0: {
		id: 1,
		name: "nikhil",
	},
	1: {
		id: 2,
		name: "madara",
	},
	2: {
		id: 3,
		name: "pain",
	},
};

const authRouter = express.Router();
const userRouter = express.Router();

app.use("/auth", authRouter);
app.use("/user", userRouter);

authRouter
	.route("/signup")
	.get(middleware1, getSignUp, middleware2)
	.post(postSignUp);

userRouter
	.route("/")
	.get(getUsers)
	.post(postUser)
	.patch(updateUser)
	.delete(deleteUser);

userRouter.route("/getCookies").get(getCookies);
userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUserById);

async function getUsers(req, res) {
	// console.log(req.query);
	// Read document
	// let allUsers = await userModel.find();
	let user = await userModel.findOne({ name: "Sarthak" });
	res.json({
		message: "list of all users",
		data: user,
	});
}

function postUser(req, res) {
	users = req.body;
	res.json({
		message: "data received successfully",
		user: req.body,
	});
}

async function updateUser(req, res) {
	// Update
	let dataToBeUpdated = req.body;
	let user = await userModel.findOneAndUpdate(
		{ email: "abcd@gmail.com" },
		dataToBeUpdated
	);
	// for (key in dataToBeUpdated) {
	// 	users[key] = dataToBeUpdated[key];
	// }
	res.json({
		message: "data updated successfully",
		data: user,
	});
}

async function deleteUser(req, res) {
	// users = {};
	let dataToBeDeleted = req.body;
	let user = await userModel.findOneAndDelete(dataToBeDeleted);
	res.json({
		message: "data has been deleted",
		data: user,
	});
}

async function postSignUp(req, res) {
	// Create document in Database
	let dataObj = req.body;
	let user = await userModel.create(dataObj);
	res.json({
		message: "user signed up",
		data: user,
	});
}

function getUserById(req, res) {
	res.send({ message: "user id received", data: users[req.params.id] });
}

function middleware1(req, res, next) {
	console.log("middleware1 encountered");
	next();
}
function getSignUp(req, res, next) {
	console.log("getSignUp called");
	next();
}

function middleware2(req, res, next) {
	console.log("middleware2 encountered");
	res.sendFile("D:/Old pc data/d/web-d/8.Backend/Express/SignUp/index.html");
}

// cookies
function setCookies(req, res) {
	// res.setHeader("Set-Cookie", "isLoggedIn=true");
	res.cookie("isLoggedIn", false, {
		maxAge: 1000 * 60 * 60 * 24,
		secure: true,
		httpOnly: true,
	});
	res.cookie("isPrimeMember", true);
	res.send("cookie has been set");
}

function getCookies(req, res) {
	let cookies = req.cookies;
	console.log(cookies);
	res.send("cookies recieved");
}
