const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.listen(3000);
app.use(express.json());

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
	.get(getUser)
	.post(postUser)
	.patch(updateUser)
	.delete(deleteUser);

userRouter.route("/:id").get(getUserById);

function getUser(req, res) {
	console.log(req.query);
	res.send(users);
}

function postUser(req, res) {
	users = req.body;
	res.json({
		message: "data received successfully",
		user: req.body,
	});
}

function updateUser(req, res) {
	let dataToBeUpdated = req.body;

	for (key in dataToBeUpdated) {
		users[key] = dataToBeUpdated[key];
	}
	res.json({
		message: "data updated successfully",
		users,
	});
}

function deleteUser(req, res) {
	users = {};
	res.json({
		message: "data has been deleted",
	});
}

function postSignUp(req, res) {
	let obj = req.body;
	res.json({
		message: "user signed up",
		data: obj,
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

const db_link = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.2dm8j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
	.connect(db_link)
	.then(function (db) {
		// console.log(db);
		console.log("db connected");
	})
	.catch(function (err) {
		console.log(err);
	});

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
	},
	confirmPassword: {
		type: String,
		required: true,
		minLength: 8,
	},
});

// models
const userModel = mongoose.model("userModel", userSchema);

(async function createUser() {
	let user = {
		name: "Sarthak",
		email: "abcd@gmail.com",
		password: "12345678",
		confirmPassword: "12345678",
	};
	let data = await userModel.create(user);
	console.log(data);
})(); // immediately invoked function
