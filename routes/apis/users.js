var express = require('express');
var router = express.Router();
var Admin = require('../../models/Admin');
var passport = require('passport');
var authController = require('../../controllers/authenticationController');
var userController = require('../../controllers/usersController');




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// routing to login page
router.get('/me', userController.localStorageTokenVerification);


// taking the login credentials and verifying here.
router.post('/login', userController.post_loginPage);


// routing to signup page.
router.get('/signup', (req, res, next) => {
	res.render('signup');
})


// taking the data and creating the user database.
router.post('/signup', userController.post_signUpPage);

router.get('/logout', (req, res, next) => {
	req.session.destroy();
	console.log(req.session, '.....................from logout.........');
	res.redirect('/');
})


router.get('/profile', (req, res, next) => {
	res.render('profile');
})


module.exports = router;
