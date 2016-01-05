angular.module('beastMode', ['ngRoute'])


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '963080633758734',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


angular.module('beastMode', ['ngRoute'])


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
	});
})

.controller('beastModeMap', function($scope){
	$scope.name = "Login Please";
	$scope.myMap = '';
	$scope.FBLogin = function(){
		FB.login(function(response){
			if(response.authResponse){
				console.log('Welcome! Fetching your information');
				FB.api('/me', function(response) {
					console.log('Good to see you ' + response.name + ".");
					console.log(response)
				});
			}else{
				console.log("User cancelled Login or did not authorize");
			}
		});
	};
	$scope.getLocation = function() {
	  var myLoc;
	  var geoSuccess = function(position) {
	    myLoc = position;
	    console.log(myLoc.coords.latitude);
	    console.log(myLoc.coords.longitude);
	    var myMarker = new google.maps.Marker({
		  	position: new google.maps.LatLng(myLoc.coords.latitude, myLoc.coords.longitude), 
		  	animation: google.maps.Animation.BOUNCE,
		  	map: myMap,
		  	icon: "../assets/me.png"
		  });
	  };
	  var geoError = function(error) {
	  	var myMarker = new google.maps.Marker({
		  	position: new google.maps.LatLng(37.783697, -122.408966), 
		  	animation: google.maps.Animation.BOUNCE,
		  	map: myMap,
		  	icon: "../assets/me.png"
		  });
	    console.log('Error occurred. Error code: ' + error.code);
	  };
	  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
	};

	$scope.initMap = function(){
	  myMap = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 37.7833, lng: -122.4167},
	    zoom: 14,
	    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
	  });
	},
	$scope.showGymMarkers = function(){
		var myGyms = [
      ['<h4>Planet Fitness</h4> Hours: 9 a.m.- 10 p.m. <p><a href="#links"> Read More Here </a>', 37.793686, -122.401268, '../assets/planetfitness.png'],
      ['<h4>24 Hour Fitness</h4> Hours: 9 a.m.- 10 p.m. <p><a href="#links"> Read More Here </a', 37.789911, -122.402327, '../assets/24hourfitness.png'],
      ['<h4>Crunch</h4> Hours: 9 a.m.- 10 p.m. <p><a href="#links"> Read More Here </a>', 37.790051, -122.390192, '../assets/crunch.png'],
      ['<h4>Active Sports Club</h4> Hours: 9 a.m.- 10 p.m. <p><a href="#links"> Read More Here </a>', 37.788574, -122.410391, '../assets/activesportsclub.png'],
      ['<h4>Equinox Sports Club</h4> Hours: 9 a.m.- 10 p.m. <p><a href="#links"> Read More Here </a>', 37.786551, -122.404334, '../assets/equinox.png']
    ];
    var infowindow = new google.maps.InfoWindow({maxWidth: 160});
		for (var i = 0; i < myGyms.length; i++) {  
			var gymMarker = new google.maps.Marker({
		  	position: new google.maps.LatLng(myGyms[i][1], myGyms[i][2]), 
		  	animation: google.maps.Animation.DROP,
		  	map: myMap,
		  	icon: myGyms[i][3]
		  });
			
			google.maps.event.addListener(gymMarker, 'click', (function(gymMarker, i) {
        return function() {
          infowindow.setContent(myGyms[i][0]);
          infowindow.open(myMap, gymMarker);
        };
      })(gymMarker, i));
		}
	};
})




