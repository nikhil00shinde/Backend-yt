const express = require("express");
const mongoose = require("mongoose");
const emailValidator = require("email-validator");

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
	.get(getUsers)
	.post(postUser)
	.patch(updateUser)
	.delete(deleteUser);

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
		validate: function () {
			return emailValidator.validate(this.email);
		},
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
		validate: function () {
			return this.confirmPassword === this.password;
		},
	},
});

// hooks -> iske through hum kuch kaam kar sakte pehle database mei save karne se pehle(PRE) and database ke save ke baad(POST)
//remove - explore on own

userSchema.pre("save", function () {
	this.confirmPassword = undefined;
	// undefined wali cheej save nhi hogi
});

// pre post hooks
// before save event occurs in db
// userSchema.pre("save", function () {
// 	console.log("before saving in db", this);
// });

// // after save event occurs in db
// userSchema.post("save", function (doc) {
// 	console.log("after saving in db", doc);
// });

// models
const userModel = mongoose.model("userModel", userSchema);

// (async function createUser() {
// 	let user = {
// 		name: "Sarthak",
// 		email: "abcd@gmail.com",
// 		password: "12345678",
// 		confirmPassword: "12345678",
// 	};
// 	let data = await userModel.create(user);
// 	console.log(data);
// })(); // immediately invoked function
