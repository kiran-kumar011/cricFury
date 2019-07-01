var Admin = require('../models/Admin');
var passport = require('passport');
var jwt = require('jsonwebtoken');

exports.main_page = (req, res, next) => {
  res.send('respond with a resource');
}

exports.get_loginPage = (req, res, next) => {
	console.log(req.session, ',.............from get request............');
	res.render('login');
}


exports.post_loginPage = (req, res, next) => {
	var { email, password } = req.body;
	Admin.findOne({email: email}, (err, admin) => {
		if(err) return res.send('invalid email id');
		if(admin) {
			admin.comparePassword(password, (err, isMatch) => {
				if(err) return res.status(500).json({success: false, message: 'server error'});
				if(isMatch) {
					req.session.userId = admin._id;
					var token = jwt.sign({email: email}, 'secretpassword');

					return res.status(200).json({
						success: true,
						token: token,
						user : {
							name: admin.name,
							id: admin._id,
							email: admin.email,
						}
					});
				} else {
					return res.json({success: false, message: 'invalid password'});
				}
			})
		} else {
			return res.json({success: false, message: 'invalid email id'})
		}
	})
}

exports.get_signUpPage = (req, res, next) => {
	res.render('signup')
}


exports.post_signUpPage = (req, res, next) => {
	var { email, password, username } = req.body;
	Admin.findOne({email: email}, (err, admin) => {
		if(err) return console.log(err);
		if(!admin) {
			var local = req.body;
			var record = new Admin();
			record.name = username;
			record.email = email;
			record.password = password;
			record.strategies.push('LOCAL');
			record.save((err, newAdmin) => {
				if(err) {
					return res.status(500).json({"message": 'db error from creating user asdasdads'});
				}
				if(newAdmin) {
					res.json(newAdmin);
				}
			})	
		}
		else {
			return res.send('email is already in use');
		}
	})
}

exports.get_logout = (req, res, next) => {
	req.session.destroy();
	console.log(req.session, '.....................from logout.........');
	res.redirect('/');
}


exports.get_profile = (req, res, next) => {
	res.render('profile');
}

exports.localStorageTokenVerification = (req, res, next) => {
	console.log(req.headers, '............................header from get');
	var token = req.headers.authorization.split(' ')[1];

	console.log(token);
	jwt.verify(token, 'secretpassword', (err, user) => {
		if(err) return res.status(500).json({error: err});
		if(user) {

			console.log(user);
			Admin.findOne({email: user.email}, (err, admin) => {
				
				if(err) return res.status(500).json({error:err});
				if(admin) {
					res.json({
						success: true,
						user : {
							name: admin.name,
							id: admin._id,
							email: admin.email,
						}
					});
				}
			})
		}
	});
}
























