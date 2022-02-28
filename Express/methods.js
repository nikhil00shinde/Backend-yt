const express = require("express");

const app = express();

// middleware func
// majorly use for post method
// jo data aa raha hain frontend se, request ki body ke andhar usko json mei convert kardo
app.use(express.json());
app.listen(3000);

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

// pehle humhe mini app banana hoga
const userRouter = express.Router(); // route banane ke liye
// humhe base url set karna hoga hamare mini app ke liye
//base url,router to use
app.use("/user", userRouter); // jo route banaya uska base "/user" hain

userRouter
	.route("/") //final route
	.get(getUser)
	.post(postUser)
	.patch(updateUser)
	.delete(deleteUser);

userRouter.route("/:id").get(getUserById);

function getUser(req, res) {
	// queries -> for filtering out purpose ke use karte hain
	console.log(req.query);
	res.send(users);
}

function postUser(req, res) {
	console.log(req.body);
	users = req.body;
	res.json({
		message: "data received successfully",
		user: req.body,
	});
}

function updateUser(req, res) {
	console.log({ a: req.body });

	// update data in users object
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

function getUserById(req, res) {
	console.log(req.params.id);
	console.log(req.params);
	console.log();
	res.send({ message: "user id received", data: users[req.params.id] });
}
