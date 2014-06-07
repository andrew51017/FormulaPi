angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('RcCtrl', function($scope, $http) {

	$scope.loaded = false; 
	$scope.notice = false; 
	$scope.connected = false; 
	$scope.error = false; 
	setTimeout(function() {
		var responsePromise = $http.get("http://192.168.1.1:8800");
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
	
	}, 5000); 
	
	$scope.goForwards = function() {
		
		var resp = $http.get("http://192.168.1.1:8800/act/fw");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Moved forward";
		});	
	};
	
	$scope.goBackwards = function() {
		
		var resp = $http.get("http://192.168.1.1:8800/act/bw");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Moved back";
		});	
	};
	
	$scope.goLeft = function() {
		
		var resp = $http.get("http://192.168.1.1:8800/act/left");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Turned left";
		});	
	};
	
	$scope.goRight = function() {
		
		var resp = $http.get("http://192.168.1.1:8800/act/right");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Turned right";
		});	
	};
	
	$scope.LedOn = function() {
		
		var resp = $http.get("http://192.168.1.1:8800/act/ledon");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "LED On";
		});
	};
	
	$scope.LedOff = function() {
		
		var resp = $http.get("http://192.168.1.1:8800/act/ledoff");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "LED Off";
		});
	};
	
	$scope.stopMove = function() {
		
		var resp = $http.get("http://192.168.1.1:8800/act/stop");
		resp.success(function(data, status, headers, config) {	
				$scope.currentStatus = "Stopped";
		});
	};
	

});