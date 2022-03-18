// let flag = true; //user looged on or not
function protectRoute(req, res, next) {
	if (req.cookies.isLoggedIn) {
		next();
	} else {
		return res.json({
			message: "Operation not allowed",
		});
	}
}

module.exports = protectRoute;
