angular.module('starter.controllers', [])

//Default controller - doesn't need an
.controller('AppCtrl', function($scope) {
})

//Remote page controller
.controller('RcCtrl', function($scope, $http) {
	//Hard-coded demo address - TODO: Network broadcast system to find web service on local subnet. 
	var SERVICEROOT = "http://192.168.1.1:8800"; 
	//Check we're connected to the Pi's web service. 
	$scope.loaded = false; 
	$scope.notice = false; 
	$scope.connected = false; 
	$scope.error = false; 
	var responsePromise = $http.get(SERVICEROOT);
	responsePromise.success(function(data, status, headers, config) {		
		$scope.loaded = true; 
		$scope.notice = true; 
		$scope.currentStatus = "Waiting for move...";
		setTimeout(function() { $scope.notice = false; $scope.connected = true; $scope.$apply();  }, 3000); 
	}); 
	responsePromise.error(function(data, status, headers, config) {
		$scope.loaded = true; 
		$scope.error = true;		
	}); 

	//Control functions. 
	$scope.goForwards = function() {
		
		var resp = $http.get(SERVICEROOT + "/act/fw");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Moved forward";
		});	
	};
	
	$scope.goBackwards = function() {
		
		var resp = $http.get(SERVICEROOT + "/act/bw");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Moved back";
		});	
	};
	
	$scope.goLeft = function() {
		
		var resp = $http.get(SERVICEROOT + "/act/left");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Turned left";
		});	
	};
	
	$scope.goRight = function() {
		
		var resp = $http.get(SERVICEROOT + "/act/right");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Turned right";
		});	
	};
	
	$scope.LedOn = function() {
		
		var resp = $http.get(SERVICEROOT + "/act/ledon");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "LED On";
		});
	};
	
	$scope.LedOff = function() {
		
		var resp = $http.get(SERVICEROOT + "/act/ledoff");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "LED Off";
		});
	};
	
	$scope.stopMove = function() {
		
		var resp = $http.get(SERVICEROOT + "/act/stop");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Stopped";
		});
	};
	

});