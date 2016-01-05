angular.module('beastMode.map', [])

.controller('beastModeMap',['$scope', '$compile', '$http', function($scope, $compile, $http){
	$scope.name = "Login Please";
	$scope.isConnected = false;
	$scope.myMap = '';
	$scope.FBLogin = function(){
	    function getUserData () {
	        console.log('Welcome! Fetching your information');
	        FB.api('/me', function(response) {
	            $scope.$apply(function(){
	              $scope.name = "Welcome " + response.name;
	              $scope.isConnected = true;
            	});
	            console.log('Good to see you ' + response.name + ".");
	            console.log(response);
	        });
	    }
	    FB.getLoginStatus(function (response) {
	        if (response.authResponse) {
	            return getUserData();
	        }
	        FB.login(function(response){
	            if(response.authResponse){
	                return getUserData();
	            } else{
	                console.log("User cancelled Login or did not authorize");
	            }
	        });
	    });
	};
	$scope.FBlogout = function(){
		console.log('hey');
		FB.logout(function(response) {
				$scope.$apply(function(){
	      $scope.name = 'Login Please';
	      $scope.isConnected = false;
        });
	            
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
      ['<h4>Planet Fitness</h4> 350 Sansome St, San Francisco, CA 91404 <p> planetfitness.com </p> <p>(415) 433-3033 </p> <p>5:00 AM – 10:00 PM </p>', 37.793686, -122.401268, '../assets/planetfitness.png'],
      ['<h4>24 Hour Fitness</h4> Hours: 9 a.m.- 10 p.m. <p><a href ng-click="getGymInfo(planetfitness)"> Read More Here </a', 37.789911, -122.402327, '../assets/24hourfitness.png'],
      ['<h4>Crunch</h4> Hours: 9 a.m.- 10 p.m. <p><a href ng-click="getGymInfo(planetfitness)"> Read More Here </a>', 37.790051, -122.390192, '../assets/crunch.png'],
      ['<h4>Active Sports Club - Mason Street</h4> 535 Mason St, San Francisco, CA 94102 <p>(415) 337-1010</p> <p>5:30 AM – 10:00 PM</p>', 37.788574, -122.410391, '../assets/activesportsclub.png'],
      ['<h4>Active Sports Club - Sansome Street</h4> <p>1 Sansome St, San Francisco, CA 94104 </p><p>(415) 399-1010</p><p>5:00 AM – 9:00 PM</p>', 37.790367, -122.401346, '../assets/activesportsclub.png'],
      ['<h4>Active Sports Club - California Street</h4> 950 California St, San Francisco, CA 94108 <p>(415) 834-1010</p> <p> 5:00 AM – 10:00 PM</p></a>', 37.792137, -122.410134, '../assets/activesportsclub.png'],
      ['<h4>Active Sports Club - Embarcadero Center</h4> Embarcadero Center, 2 Embarcadero Center, San Francisco, CA 94111<p>(415) 788-1010</p><p>  5:00 AM – 10:00 PM </p>', 37.794803, -122.398539, '../assets/activesportsclub.png'],
      ['<h4>Equinox Sports Club</h4> Hours: 9 a.m.- 10 p.m. <p><a ng-controller="reviewList" href ng-click="(planetfitness)"> Read More Here </a>', 37.786551, -122.404334, '../assets/equinox.png'],
    	['<h4>Live Fit Gym - Fell Street</h4> Hours: 9 a.m.- 10 p.m.', 37.775616, -122.423427, '../assets/livefit.jpg'],
    	['<h4>Live Fit Gym - Polk Street</h4> 1630 Polk St, San Francisco, CA 94109 <p>livefitgym.com</p> <p>(415) 923-5853</p><p> 5:00 AM – 11:00 PM </p>', 37.792041, -122.420695, '../assets/livefit.jpg'],
    	['<h4>SKYEFiT</h4> 864 Folsom St, San Francisco, CA 94103 <p> skyefit.com </p> <p>(415) 992-3110 </p>  6:00 AM – 8:00 PM </p>', 37.781088, -122.402832, '../assets/skyfit.png'],
    	['<h4>Body-Mechanix</h4> 1074 Folsom St, San Francisco, CA 94103 <p> body-mechanix.com </p> <p>(877) 658-4757 </p> <p>  6:00 AM – 9:00 PM</p>', 37.777414, -122.407435, '../assets/bodymechanix.png'],
    	['<h4>San Francisco Pilates</h4> 401, 870 Market St #913, San Francisco, CA 94102 <p>sfpilates.com </p><p>(415) 779-8088 </p>', 37.785181, -122.407278, '../assets/sfpilates.png']
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

}])

.controller('reviewList', function ($scope, $http){


$scope.allGyms = [{id:1,'name':'Planet Fitness', 'fullname': 'planetfitness'},
									{id:2,'name':'24 Hour Fitness', 'fullname': 'hourfitness'},
									{id:3,'name':'Crunch', 'fullname': 'crunch'},
									{id:4,'name':'Equinox Sports Club', 'fullname': 'equinox'},
									{id:5,'name':'Active Sports Club', 'fullname': 'activesportsclub'}
];
$scope.isClicked = false;
$scope.reviews = "";
$scope.findGym = function(input){
	console.log(input);

	 $scope.isClicked = true;
	 var category = input
		$http.get('/getReviewers?gym=' + category).
  	success(function(data, status, headers, config) {
    $scope.reviews = data;
  }).
  error(function(data, status, headers, config) {
      
  });
	};


});





