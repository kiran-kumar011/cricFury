var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Admin = require('../models/Admin');



passport.use(
	new GoogleStrategy({
	// options for strategy.
	callbackURL: "/users/google/redirect",
	clientID: '873032729153-narui48t4kejp6t8qvac1vbjmlb58t7n.apps.googleusercontent.com',
	clientSecret: "W-U-tVxCKJR5YeUPzXxl4Fmi"
}, (accessToken, refreshToken, profile, done) => {
		// passport callback function.

		// check whether that user already exists.
		Admin.findOne({ email: email }).then(currentUser => {
			if(currentUser) {
				if(!currentUser.strategies.includes('GOOGLE')) {
					currentUser.strategies.push('GOOGLE');
					done(null, currentUser)
				}
			}
			else {
				new Admin({
				username: profile.displayName,
				email: profile.emails[0].value,
				googleID: profile.id,
				date: new Date(),
				avatar_url: profile.photos[0].value,
				}).save().then((newAuthor) => {
					// console.log('new user created:', newAuthor);
					done(null, newAuthor);
				})
			}
		}) 
	})
)