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
    { name: 'Blue', length: 161.71, audioUrl: '/music/placeholders/blue' }, // length: 163.38
    { name: 'Green', length: 103.96, audioUrl: '/music/placeholders/green' }, // length: 105.66
    { name: 'Red', length: 268.45, audioUrl: '/music/placeholders/red' }, // length: 270.14
    { name: 'Pink', length: 153.14, audioUrl: '/music/placeholders/pink' }, // length: 154.81
    { name: 'Magenta', length: 374.22, audioUrl: '/music/placeholders/magenta' } // length: 375.92
  ]
};
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
  { name: 'Hello, Operator?', length: 161.71, audioUrl: '/music/placeholders/blue' },
  { name: 'Ring, ring, ring', length: 103.96, audioUrl: '/music/placeholders/green' },
  { name: 'Fits in your pocket', length: 268.45, audioUrl: '/music/placeholders/red' },
  { name: 'Can you hear me now?', length: 153.14, audioUrl: '/music/placeholders/pink' },
  { name: 'Wrong phone number', length: 374.22, audioUrl: '/music/placeholders/magenta' }
  ]
};
var albumTSFH = {
  name: 'Illusions',
  artist: 'Thomas J. Bergersen',
  label: 'Orchestral',
  year: '2011',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
  { name: 'Aura', length: 161.71, audioUrl: '/music/placeholders/blue' },
  { name: 'Starvation', length: 103.96, audioUrl: '/music/placeholders/green' },
  { name: 'Dreammaker', length: 268.45, audioUrl: '/music/placeholders/red' },
  { name: 'Hurt', length: 153.14, audioUrl: '/music/placeholders/pink' },
  { name: 'Ocean Princess', length: 374.22, audioUrl: '/music/placeholders/magenta' },
  { name: 'Gift of Life', length: 161.71, audioUrl: '/music/placeholders/blue' },
  { name: 'Rada', length: 103.96, audioUrl: '/music/placeholders/green' },
  { name: 'A Place In Heaven', length: 268.45, audioUrl: '/music/placeholders/red' },
  { name: 'Merchant Prince', length: 153.14, audioUrl: '/music/placeholders/pink' },
  { name: 'Promise', length: 374.22, audioUrl: '/music/placeholders/magenta' },
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


blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', 'TimeCodeFilter', function($scope, SongPlayer, TimeCodeFilter) {
  $scope.songPlayer = SongPlayer;
  $scope.playTimeFiltered = TimeCodeFilter(NaN);
  
  $scope.volumeClass = function() {
    return {
      'fa-volume-off': SongPlayer.volume == 0,
      'fa-volume-down': SongPlayer.volume <= 70 && SongPlayer.volume > 0,
      'fa-volume-up': SongPlayer.volume > 70
    }
  };
  
  SongPlayer.onTimeUpdate(function(event, time){
    $scope.$apply(function(){
      $scope.playTimeFiltered = TimeCodeFilter(time);
      $scope.playTime = time;
    });
  });



}]);

blocJams.service('SongPlayer', ['$rootScope', function($rootScope) {
  var currentSoundFile = null;
  var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };
  
  return {
    currentSong: null,
    currentAlbum: null,
    playing: false,
    volume: 90,

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
    setVolume: function(volume) {
      if(currentSoundFile){
        currentSoundFile.setVolume(volume);
      }
      this.volume = volume;
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
      currentSoundFile.setVolume(this.volume);
      
      currentSoundFile.bind('timeupdate', function(e){
        $rootScope.$broadcast('sound:timeupdate', this.getTime());
      });

      this.play();
    },
    setAlbum: function(album) {
      if (!this.currentAlbum) {
        this.currentAlbum = album;
      }
    },
    seek: function(time) {
      if(currentSoundFile) {
        currentSoundFile.setTime(time);
      }
    },
    onTimeUpdate: function(callback) {
      return $rootScope.$on('sound:timeupdate', callback);
    }
  };
}]);


blocJams.directive('slider', ['$document', function($document){
  var calculateSliderPercentFromMouseEvent = function($slider, event) {
    var offsetX =  event.pageX - $slider.offset().left; // Distance from left
    var sliderWidth = $slider.width(); // Width of slider
    var offsetXPercent = (offsetX  / sliderWidth);
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(1, offsetXPercent);
    return offsetXPercent;
  }

  var numberFromValue = function(value, defaultValue) {
    if (typeof value === 'number') {
      return value;
    }
 
    if(typeof value === 'undefined') {
      return defaultValue;
    }
 
    if(typeof value === 'string') {
      return Number(value);
    }
   }

  return {
    templateUrl: '/templates/directives/slider.html',
    replace: true,
    restrict: 'E',
    scope: {
      onChange: '&'
    },
    link: function(scope, element, attributes) {
      scope.value = 0;
      scope.max = 100;
      var $seekBar = $(element);

      attributes.$observe('value', function(newValue) {
        scope.value = numberFromValue(newValue, 0);
      });
      attributes.$observe('max', function(newValue) {
        scope.max = numberFromValue(newValue, 100) || 100;
      });

      var percentString = function () {
        var value = scope.value || 0;
        var max = scope.max || 100;
        percent = value / max * 100;
        return percent + "%";
      };

      scope.fillStyle = function() {
        return {width: percentString()};
      };

      scope.thumbStyle = function() {
        return {left: percentString()};
      };

      scope.onClickSlider = function(event) {
        var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
        scope.value = percent * scope.max;
        notifyCallback(scope.value);
      };
      scope.trackThumb = function() {
        $document.bind('mousemove.thumb', function(event){
          var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
          scope.$apply(function(){
            scope.value = percent * scope.max;
            notifyCallback(scope.value);
          });
        });

        $document.bind('mouseup.thumb', function(){
          $document.unbind('mousemove.thumb');
          $document.unbind('mouseup.thumb');
        });
      };
      var notifyCallback = function(newValue) {
        if (typeof scope.onChange === 'function') {
          scope.onChange({niceValue: newValue});
        }
      };
    }
  };
}]);


blocJams.filter('TimeCode', function(){
  return function(seconds) {
    seconds = Number.parseFloat(seconds);

// Returned when no time is provided.
    if (Number.isNaN(seconds)) {
      return '-:--';
    }

// make it a whole number
    var wholeSeconds = Math.floor(seconds);

    var minutes = Math.floor(wholeSeconds / 60);

    remainingSeconds = wholeSeconds % 60;

    var output = minutes + ':';

// zero pad seconds, so 9 seconds should be :09
    if (remainingSeconds < 10) {
      output += '0';
    }

    output += remainingSeconds;

    return output;
  }
});