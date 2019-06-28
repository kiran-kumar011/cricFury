const passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var Admin = require('../models/Admin');

passport.serializeUser((user, done) => {
	console.log('serializeUser/............................')
	done(null, user)
})

passport.deserializeUser((user, done) => {
	console.log('deserializeUser/............................')
	done(null, user);
});

passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
	console.log(email, '.......................passport use mddleware...............');
	Admin.findOne({email: email}, (err, user) => {
		console.log(err, user, 'inside the findone.................');
		if(err) { console.log('1'); return done(err); }
		if (!user) {
			console.log('if user is false...............')
	    return done(null, false, { message: 'Incorrect username.' });
	  }
	  console.log('3', user.comparePassword(password));
	  if (!user.comparePassword(password, user.password)) {
	  	console.log(',.......................comparePassword',user.comparePassword(password, user.password))
	    return done(null, false, { message: 'Incorrect password.' });
	  }
	  console.log(',.......................outside comparePassword', user.comparePassword(password, user.password));
	  return done(null, user);
	})
}))


module.exports = passport;
