const express = require("express");
const cookieParser = require("cookie-parser");
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

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");

app.use("/auth", authRouter);
app.use("/user", userRouter);
