var Admin = require('../models/Admin');

exports.isUserLoggedIn = (req, res, next) => {
	if(req.session && req.session.userId) {
		Admin.findById(req.session.userId, (err, admin) => {
			if(err) { console.log(err); res.status(500)}
			req.admin = admin;
			res.locals.admin = admin;
			next();
		})
	} else {
		res.redirect('/users/login');
	}
}

exports.sessions = (req, res, next) => {
	if(req.session && req.session.userId) {
		Admin.findById(req.session.userId, (err, admin) => {
			req.admin = admin;
			res.locals.admin = admin;
			next();
		})
	} else {
		req.admin = null;
		res.locals.admin = null;
		next();
	}
}