//require("./landing");
//require("./collection");
//require("./album");
//require("./profile");

angular.module('BlocJams', []).controller('Landing.controller', ['$scope', function($scope) {

	function shuffle(o){ //v1.0
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
	};

	$scope.title = "Bloc Jams";
	$scope.subText = "Turn the music up!";

	$scope.albumURLs = [
		'/images/album-placeholders/album-1.jpg',
		'/images/album-placeholders/album-2.jpg',
		'/images/album-placeholders/album-3.jpg',
		'/images/album-placeholders/album-4.jpg',
		'/images/album-placeholders/album-5.jpg',
		'/images/album-placeholders/album-6.jpg',
		'/images/album-placeholders/album-7.jpg',
		'/images/album-placeholders/album-8.jpg',
		'/images/album-placeholders/album-9.jpg',
	];


	$scope.titleClicked = function() {
		shuffle($scope.albumURLs);
	};

	$scope.subTextClicked = function() {
		$scope.subText += '!';
	};
}]);