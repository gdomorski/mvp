var express = require('express'),
		bodyParser = require('body-parser'),
		app = express(),
		path = require('path'),
		fs = require('fs'),
		Reviewer = require('./reviewer'),
		port = process.env.PORT || 3000,
		formDataParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

app.get('/getReviewers', function(req, res){
	Reviewer.find({}, {_id:0, __v:0}, function(err, data){
		if(err){
			res.json(err);
		}else{
			res.json(data);
		}
	});
});

app.post('/new', formDataParser, function (req,res){
	new Reviewer({
		email: req.body.email,
		name: req.body.name,
		comment: req.body.comment,
		gym: req.body.gym
	}).save(function(err, data){
		if(err){
			res.json(err);
		}else{
			res.send('Successful insert');
		}
	});
});

app.get('/', function(request, response) {  
    response.sendFile('/public/index.html');  
});  


app.listen(port);