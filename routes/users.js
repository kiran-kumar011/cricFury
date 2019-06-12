var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin');
var passport = require('passport');
var authController = require('../controllers/authenticationController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// routing to login page
router.get('/login', (req, res, next) => {
	console.log(req.session, ',.............from get request............');
	res.render('login');
});


// taking the login credentials and verifying here.
router.post('/login', (req, res, next) => {
	var { email, password } = req.body;
	Admin.findOne({email: email}, (err, admin) => {
		if(err) return res.send('invalid email id');
		if(admin) {
			admin.comparePassword(password, (err, isMatch) => {
				if(err) return res.send(err);
				if(isMatch) {
					console.log('inside the is match true conditin/..............')
					req.session.userId = admin._id;
					console.log(req.session, ',...............session req from post request.');
					return res.redirect('/users/profile');
				} else {
					return res.send('invalid password');
				}
			})
		} else {
			return res.send('invalid email id')
		}
	})
})


// routing to signup page.
router.get('/signup', (req, res, next) => {
	res.render('signup')
})


// taking the data and creating the user database.
router.post('/signup', (req, res, next) => {
	var { email, password } = req.body;
	Admin.findOne({email: email}, (err, admin) => {
		if(err) return console.log(err);
		if(!admin) {
			var local = req.body;
			var record = new Admin();
			record.username = local.username;
			record.email = local.email;
			record.password = local.password;
			record.strategies.push('LOCAL');
			record.created_date = new Date();
			record.save((err, newAdmin) => {
				if(err) {
					return res.status(500).send('db error from creating user asdasdads');
				}
				else {
					res.render('login');
				}
			})	
		}
		else {
			return res.send('email is already in use');
		}
	})
})


router.get('/logout', (req, res, next) => {
	req.session.destroy();
	console.log(req.session, '.....................from logout.........');
	res.redirect('/');
})


router.get('/profile', (req, res, next) => {
	res.render('profile');
})


module.exports = router;
