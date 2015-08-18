(function(){
  var app = angular.module('keybladeFactory', []);
  app.controller("mainCtrl", function($scope){
  	$scope.items = [];
  	$scope.addNote = function() {
  		var newItem = {
  			name: $scope.currentNote,
  			createdDate: (new Date())
  		}
  		$scope.items.push(newItem);
  		$scope.currentNote = "";
  	}
  	$scope.removeNote = function( key ) {
  		$scope.items.splice(key,1);
  	}

  });
  
})();
