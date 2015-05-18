//require("./landing");
//require("./collection");
//require("./album");
//require("./profile");

blocJams = angular.module('BlocJams', ['ui.router']);


// ------------------------------
// Navigation

blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templateUrl: '/templates/landing.html'
  });

  $stateProvider.state('song', {
    url: '/',
//controller: 'Landing.controller',
templateUrl: '/templates/song.html'
});

  $stateProvider.state('collection', {
    url: '/collection',
    controller: 'Collection.controller',
    templateUrl: '/templates/collection.html'
  });

  $stateProvider.state('album', {
    url: '/album',
    templateUrl: '/templates/album.html',
    controller: 'Album.controller'
  });
}]);


// ------------------------------
// Albums

var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',

  songs: [
  { name: 'Blue', length: '4:26' },
  { name: 'Green', length: '3:14' },
  { name: 'Red', length: '5:01' },
  { name: 'Pink', length: '3:21'},
  { name: 'Magenta', length: '2:15'}
  ]
};
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
  { name: 'Hello, Operator?', length: '1:01' },
  { name: 'Ring, ring, ring', length: '5:01' },
  { name: 'Fits in your pocket', length: '3:21'},
  { name: 'Can you hear me now?', length: '3:14' },
  { name: 'Wrong phone number', length: '2:15'}
  ]
};
var albumTSFH = {
  name: 'Illusions',
  artist: 'Thomas J. Bergersen',
  label: 'Orchestral',
  year: '2011',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
  { name: 'Aura', length: '7:43' },
  { name: 'Starvation', length: '4:27' },
  { name: 'Dreammaker', length: '4:18'},
  { name: 'Hurt', length: '1:43' },
  { name: 'Ocean Princess', length: '2:53'},
  { name: 'Gift of Life', length: '3:22'},
  { name: 'Rada', length: '4:23'},
  { name: 'A Place In Heaven', length: '4:16'},
  { name: 'Merchant Prince', length: '2:26'},
  { name: 'Promise', length: '4:59	'},
  ]
}


// ------------------------------
// Controllers

blocJams.controller('Landing.controller', ['$scope', 'SayHello', function($scope, SayHello) {

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

$scope.ace = { myString: "",}; // for the SayHello
$scope.titleClicked = function() {
  shuffle($scope.albumURLs);
  if ( $scope.ace.myString ) { // for the SayHello
    SayHello.setstring($scope.ace.myString); // for the SayHello
    $scope.ace.myString = ""; // for the SayHello
  } // for the SayHello
  SayHello.log(); // for the SayHello
};

$scope.subTextClicked = function() {
  $scope.subText += '!';
};
}]);


blocJams.controller('Collection.controller', ['$scope', 'SongPlayer', 'SayHello', function($scope, SongPlayer, SayHello) {
  $scope.albums = [];
  for (var i = 0; i < 33; i++) {
    var rand = Math.random();
    if (rand < 0.34) {
      $scope.albums.push(angular.copy(albumPicasso));
    } else if (rand < 0.67) {
      $scope.albums.push(angular.copy(albumMarconi));
    } else {
      $scope.albums.push(angular.copy(albumTSFH));
    }
  }
  console.log('-- Collection --');
  SayHello.log();
}]);

blocJams.controller('Album.controller', ['$scope', 'SongPlayer', 'SayHello', function($scope, SongPlayer, SayHello) {
  var rand = Math.random();
  if (rand < 0.34) {
    $scope.album = angular.copy(albumPicasso);
  } else if (rand < 0.67) {
    $scope.album = angular.copy(albumMarconi);
  } else {
    $scope.album = angular.copy(albumTSFH);
  }

  var hoveredSong = null;

  $scope.onHoverSong = function(song) {
    hoveredSong = song;
  };

  $scope.offHoverSong = function(song) {
    hoveredSong = null;
  };
  $scope.getSongState = function(song) {
    if (song === SongPlayer.currentSong && SongPlayer.playing) {
      return 'playing';
    }
    else if (song === hoveredSong) {
      return 'hovered';
    }
    return 'default';
  };
  $scope.playSong = function(song) {
    SongPlayer.setSong($scope.album, song);
    SongPlayer.play();
  };

  $scope.pauseSong = function(song) {
    SongPlayer.pause();
  };
  console.log('-- Album --');
  SayHello.log();
}]);


blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', 'SayHello', function($scope, SongPlayer, SayHello) {
  $scope.songPlayer = SongPlayer;
  console.log('-- PlayerBar --');
  SayHello.log();
}]);

blocJams.service('SongPlayer', function() {
  return {
    currentSong: null,
    currentAlbum: null,
    playing: false,

    play: function() {
      if ( this.currentSong ) {
        this.playing = true;
      }
    },
    pause: function() {
      this.playing = false;
    },
    setSong: function(album, song) {
      this.currentAlbum = album;
      this.currentSong = song;
    }
  };
});

blocJams.service('SayHello', function() {
  return {
    string: "",

    setstring: function(str) {
      this.string = str;
    },

    log: function() {
      if ( this.string ) {
        console.log(this.string);
      } else {
        console.log('Hello World!');
      }
    },
  };
});