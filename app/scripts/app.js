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
    { name: 'Blue', length: '4:26', audioUrl: '/music/placeholders/blue' },
    { name: 'Green', length: '3:14', audioUrl: '/music/placeholders/green' },
    { name: 'Red', length: '5:01', audioUrl: '/music/placeholders/red' },
    { name: 'Pink', length: '3:21', audioUrl: '/music/placeholders/pink' },
    { name: 'Magenta', length: '2:15', audioUrl: '/music/placeholders/magenta' }
  ]
};
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
  { name: 'Hello, Operator?', length: '4:26', audioUrl: '/music/placeholders/blue' },
  { name: 'Ring, ring, ring', length: '3:14', audioUrl: '/music/placeholders/green' },
  { name: 'Fits in your pocket', length: '5:01', audioUrl: '/music/placeholders/red' },
  { name: 'Can you hear me now?', length: '3:21', audioUrl: '/music/placeholders/pink' },
  { name: 'Wrong phone number', length: '2:15', audioUrl: '/music/placeholders/magenta' }
  ]
};
var albumTSFH = {
  name: 'Illusions',
  artist: 'Thomas J. Bergersen',
  label: 'Orchestral',
  year: '2011',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
  { name: 'Aura', length: '4:26', audioUrl: '/music/placeholders/blue' },
  { name: 'Starvation', length: '3:14', audioUrl: '/music/placeholders/green' },
  { name: 'Dreammaker', length: '5:01', audioUrl: '/music/placeholders/red' },
  { name: 'Hurt', length: '3:21', audioUrl: '/music/placeholders/pink' },
  { name: 'Ocean Princess', length: '2:15', audioUrl: '/music/placeholders/magenta' },
  { name: 'Gift of Life', length: '4:26', audioUrl: '/music/placeholders/blue' },
  { name: 'Rada', length: '3:14', audioUrl: '/music/placeholders/green' },
  { name: 'A Place In Heaven', length: '5:01', audioUrl: '/music/placeholders/red' },
  { name: 'Merchant Prince', length: '3:21', audioUrl: '/music/placeholders/pink' },
  { name: 'Promise', length: '2:15', audioUrl: '/music/placeholders/magenta' },
  ]
}


// ------------------------------
// Controllers

blocJams.controller('Landing.controller', ['$scope', function($scope) {

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


blocJams.controller('Collection.controller', ['$scope', 'SongPlayer', 'SelectAlbum', function($scope, SongPlayer, SelectAlbum) {
  $scope.SelectAlbum = SelectAlbum;
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
  };

  $scope.playAlbum = function(album){
    SongPlayer.setSong(album, album.songs[0]); // Targets first song in the array.
  };

  $scope.chooseAlbum = function(album) {
    SelectAlbum.set(album.name);
  }

}]);

blocJams.service('SelectAlbum', function() {
  return {
    album: null,
    set: function(albumName) {
      this.album = albumName;
    }
  };
});

blocJams.controller('Album.controller', ['$scope', 'SongPlayer', 'SelectAlbum', function($scope, SongPlayer, SelectAlbum) {
  $scope.SelectAlbum = SelectAlbum;
  console.log(SelectAlbum.album);
  switch (SelectAlbum.album) {
    case 'The Colors':
      $scope.album = angular.copy(albumPicasso);
      break;
    case 'The Telephone':
      $scope.album = angular.copy(albumMarconi);
      break;
    case 'Illusions':
      $scope.album = angular.copy(albumTSFH);
      break;
    default:
      $scope.album = angular.copy(albumPicasso);
  };
  SongPlayer.setAlbum($scope.album);
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
    //SongPlayer.play();
  };

  $scope.pauseSong = function(song) {
    SongPlayer.pause();
  };
}]);


blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
  $scope.songPlayer = SongPlayer;
}]);

blocJams.service('SongPlayer', function() {
  var currentSoundFile = null;

  var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };
  
  return {
    currentSong: null,
    currentAlbum: null,
    playing: false,

    play: function() {
      if (!this.currentSong && this.currentAlbum) {
        this.setSong(this.currentAlbum, this.currentAlbum.songs[0]);
      }
      if (this.currentSong) {
        this.playing = true;
        currentSoundFile.play();
      }
    },
    pause: function() {
      this.playing = false;
      currentSoundFile.pause();
    },
    stop: function () {
      this.playing = false;
      currentSoundFile.stop();
      this.currentSong = null;
    },
    next: function() {
      if ( this.currentSong ) {
        var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
        currentTrackIndex++;
        if (currentTrackIndex >= this.currentAlbum.songs.length) {
          this.stop();
        } else {
          this.currentSong = this.currentAlbum.songs[currentTrackIndex];
          var song = this.currentAlbum.songs[currentTrackIndex];
          this.setSong(this.currentAlbum, song);
        }
      }
    },
    previous: function() {
      if ( this.currentSong ) {
        var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
          this.stop();
        } else { 
          this.currentSong = this.currentAlbum.songs[currentTrackIndex];
          var song = this.currentAlbum.songs[currentTrackIndex];
          this.setSong(this.currentAlbum, song);
        }
      }
    },
    setSong: function(album, song) {
      if (currentSoundFile) {
        currentSoundFile.stop();
      }
      this.currentAlbum = album;
      this.currentSong = song;
      currentSoundFile = new buzz.sound(song.audioUrl, {
        formats: [ "mp3" ],
        preload: true
       });
      this.play();
    },
    setAlbum: function(album) {
      if (!this.currentAlbum) {
        this.currentAlbum = album;
      }
    }
  };
});


blocJams.directive('slider', function(){
  var updateSeekPercentage = function($seekBar, event) {
    var barWidth = $seekBar.width();
    var offsetX =  event.pageX - $seekBar.offset().left;

    var offsetXPercent = (offsetX  / $seekBar.width()) * 100;
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);

    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
  }

  return {
    templateUrl: '/templates/directives/slider.html',
    replace: true,
    restrict: 'E',
    link: function(scope, element, attributes) {
      var $seekBar = $(element);
      $seekBar.click(function(event) {
        updateSeekPercentage($seekBar, event);
      });

      $seekBar.find('.thumb').mousedown(function(event){
        $seekBar.addClass('no-animate');

        $(document).bind('mousemove.thumb', function(event){
          updateSeekPercentage($seekBar, event);
        });

        $(document).bind('mouseup.thumb', function(){
          $seekBar.removeClass('no-animate');
          $(document).unbind('mousemove.thumb');
          $(document).unbind('mouseup.thumb');
        });
      });
    }
  };
});


blocJams.directive('clickme', function(){
  return {
    template: '<div class="click-me"></div>',
    replace: true,
    restrict: 'E',
    link: function() {
      $('.click-me').on('click', function() {
         alert("It's gonna explode!");
       });
    }
  };
});


blocJams.directive('countHoverTime', function() {
  var time = 0.0;
  var count = function() {
    time += 0.1;
  };
  var intervalID
  var onhover = function(event) {
    intervalID = window.setInterval(count, 100);
  };
  var offhover = function(event) {
    window.clearInterval(intervalID);
    console.log(time + 's');
    time = 0;
  };

  return {
    restrict: 'A',
    link: function(scope, element, attribute) {
      $(element).hover(onhover, offhover);
    }
  };
});


blocJams.directive('classify', function() {
  return {
    restrict: 'ACE',
    link: function(scope, element, attribute) {
      var text = $(element).text();
      $(element).addClass(text);
    }
  };
});
