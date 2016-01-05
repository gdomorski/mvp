angular.module('beastMode', ['beastMode.map', 'beastMode.direct', 'ngRoute'])

.config(function($routeProvider){
	$routeProvider

	.when('/', {
		controller: 'beastModeMap',
		templateUrl: 'login.html'
	})

	.when('/links', {
		templateUrl: '/gymReviews.html'
	})

	.when('/addReview', {
		templateUrl: '/gymReviews.html'
	})

	.when('/gymList', {
		controller: 'reviewList',
		templateUrl: '/gymList.html'
	});
});