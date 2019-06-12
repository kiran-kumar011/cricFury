var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var adminSchema = new mongoose.Schema({
	username: { type: String, required: true,lowercase: true },
	email: { type: String, required: true },
	password: { type: String, minlength: 6 },
	strategies:[{ type:String }],
	local: { type: Object },
	google: { type: Object },
	matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
	created_date: Date,
	avatar_url: String,
});


// hashing a password.
adminSchema.pre('save', function(next) {
	console.log(this);
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if(err) return next(err);
		bcrypt.hash(user.password, salt, (err, hash) => {
			if(err) return next(err);
			user.password = hash;
			console.log(hash, ',..............hashed password............');
			next();
		})
	})
})


adminSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
	    if(err) return cb(err);
	    // console.log(cb(null, isMatch), '..........................is match status............');
	    cb(null, isMatch);
	});
}

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;