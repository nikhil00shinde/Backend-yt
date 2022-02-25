const express = require("express");

const app = express();

// middleware func
// majorly use for post method
// jo data aa raha hain frontend se, request ki body ke andhar usko json mei convert kardo
app.use(express.json());
app.listen(3000);

let users = {};

// get
app.get("/user", (req, res) => {
	res.send(users);
});

// post -> to send data from frontend to backend
// frontend se jo data aata hain voh hamesha request ki body ke andhar hota hain
app.post("/user", (req, res) => {
	console.log(req.body);
	users = req.body;
	res.json({
		message: "data received successfully",
		user: req.body,
	});
});

// update -> patch
app.patch("/user", (req, res) => {
	console.log({ a: req.body });

	// update data in users object
	let dataToBeUpdated = req.body;
	for (key in dataToBeUpdated) {
		users[key] = dataToBeUpdated[key];
	}
	res.json({
		message: "data updated successfully",
	});
});

// to delete a data
app.delete("/user", (req, res) => {
	users = {};
	res.json({
		message: "data has been deleted",
	});
});
