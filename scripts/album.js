var setSong = function(songNumber) { if (currentSoundFile) { currentSoundFile.stop(); }

currentlyPlayingSongNumber = parseInt(songNumber); currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, { formats: [ 'mp3' ], preload: true });

setVolume(currentVolume);
};

var setVolume = function(volume) { if (currentSoundFile) { currentSoundFile.setVolume(volume); } };

var getSongNumberCell = function(number) { return $('.song-item-number[data-song-number="' + number + '"]'); };

var createSongRow = function(songNumber, songName, songLength) { var template = ''

   + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
   + '  <td class="song-item-title">' + songName + '</td>'
   + '  <td class="song-item-duration">' + songLength + '</td>'
   + '</tr>'
   ;

  var $row = $(template);

  var clickHandler = function(){
    var songNumber = parseInt($(this).attr('data-song-number'));

    if (currentlyPlayingSongNumber !== null) {
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber)
        currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }
    if (currentlyPlayingSongNumber !== songNumber) {
        $(this).html(pauseButtonTemplate);
      setSong(songNumber);
      currentSoundFile.play();
      updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber === songNumber) {
        if (currentSoundFile.isPaused()){
          $(this).html(pauseButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPauseButton);
          currentSoundFile.play();
        } else {
          $(this).html(playButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPlayButton);
          currentSoundFile.pause();
        }
    }
  }

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
    }
};

var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(songNumber);
    }
};

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) { currentAlbum = album; var $albumTitle = $('.album-view-title'); var $albumArtist = $('.album-view-artist'); var $albumReleaseInfo = $('.album-view-release-info'); var $albumImage = $('.album-cover-art'); var $albumSongList = $('.album-view-song-list'); $albumTitle.text(album.title); $albumArtist.text(album.artist); $albumReleaseInfo.text(album.year + ' ' + album.label); $albumImage.attr('src', album.albumArtUrl);

 $albumSongList.empty();
 for (var i = 0; i < album.songs.length; i++) {
   var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
   $albumSongList.append($newRow);
 }
};

var trackIndex = function(album, song) { return album.songs.indexOf(song); };

var updatePlayerBarSong = function() { $('.currently-playing .song-name').text(currentSongFromAlbum.title); $('.currently-playing .artist-name').text(currentAlbum.artist); $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist); $('.main-controls .play-pause').html(playerBarPauseButton); };

var nextSong = function() { var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum); // Note that we're incrementing the song here currentSongIndex++;

if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
}

// Save the last song number before changing it
var lastSongNumber = currentlyPlayingSongNumber;

// Set a new current song
setSong(currentSongIndex + 1);
currentSoundFile.play();

// Update the Player Bar information
updatePlayerBarSong();

var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

$nextSongNumberCell.html(pauseButtonTemplate);
$lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() { var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum); // Note that we're decrementing the index here currentSongIndex--;

if (currentSongIndex < 0) {
    currentSongIndex = currentAlbum.songs.length - 1;
}

// Save the last song number before changing it
var lastSongNumber = currentlyPlayingSongNumber;

// Set a new current song
setSong(currentSongIndex + 1);
currentSoundFile.play();

// Update the Player Bar information
updatePlayerBarSong();

$('.main-controls .play-pause').html(playerBarPauseButton);

var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

$previousSongNumberCell.html(pauseButtonTemplate);
$lastSongNumberCell.html(lastSongNumber);
};

var togglePlayFromPlayerBar = function() { var $currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber); if (currentSoundFile.isPaused()){ $currentlyPlayingCell.html(pauseButtonTemplate); $(this).html(playerBarPauseButton); currentSoundFile.play(); } else { $currentlyPlayingCell.html(playButtonTemplate); $(this).html(playerBarPlayButton); currentSoundFile.pause(); } }

var playButtonTemplate = ''; var pauseButtonTemplate = ''; var playerBarPlayButton = ''; var playerBarPauseButton = '';

var currentAlbum = null; var currentlyPlayingSongNumber = null; var currentSongFromAlbum = null; var currentSoundFile = null; var currentVolume = 80;

var $previousButton = $('.main-controls .previous'); var $nextButton = $('.main-controls .next'); var mainControlsPlayPause = $('.main-controls .play-pause');

$(document).ready(function() { setCurrentAlbum(albumPicasso); $previousButton.click(previousSong); $nextButton.click(nextSong); mainControlsPlayPause.click(togglePlayFromPlayerBar); });