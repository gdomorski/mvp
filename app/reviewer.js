var db = require('./config');
var mongoose = require('mongoose');

var Reviewer = mongoose.model('Reviewer', {
	email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	name: String,
	comment: String,
});

module.exports = Reviewer;