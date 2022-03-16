const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");

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

function getUserById(req, res) {
	res.send({ message: "user id received", data: users[req.params.id] });
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

module.exports = userRouter;
