const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

require("dotenv").config();

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

// userSchema.pre("save", async function () {
// 	let salt = await bcrypt.genSalt();
// 	let hashedString = await bcrypt.hash(this.password, salt);
// 	this.password = hashedString;
// });

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

module.exports = userModel;

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
