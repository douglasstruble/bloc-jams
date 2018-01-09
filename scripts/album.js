

var setSong = function(songNumber) {
if (currentSoundFile) {
         currentSoundFile.stop();
     }
 
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber -1];
};

var getSongNumberCell =(number) {
    return $('.song-item-number [data-song-number="' + number + '"']');
};


var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
       '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
       '  <td class="song-item-title">' + songName + '</td>'
       '  <td class="song-item-duration">' + songLength + '</td>'
       '</tr>'
      ;
 
      var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');
        

	if (currentlyPlayingSongNumber !== null) {
	
		var currentlyPlayingCell = getSongNumberCell =(currentlyPlayingSongNumber);
	currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
if (currentlyPlayingSongNumber !== songNumber) {
		$(this).html(pauseButtonTemplate);
currentlyPlayingSongNumber = songNumber;
 currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
        
    
+   var $volumeFill = $('.volume .fill');
+   var $volumeThumb = $('.volume .thumb');
+   $volumeFill.width(currentVolume + '%');
+   $volumeThumb.css({left: currentVolume + '%'});
+
    
    
    // #1
     currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
       
         var currentVolume = 80;
         
         formats: [ 'mp3' ],
         preload: true
     });
    
     var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }
    
    
     setVolume(currentVolume);
    
};
        
        
    
  var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };  
    
    
	 } else if (currentlyPlayingSongNumber === songNumber) {
		
           if (currentSoundFile.isPaused()) {
             $(this).html(pauseButtonTemplate);
 $('.main-controls .play-pause').html(playerBarPauseButton);
 currentSoundFile.play();
} else {
 $(this).html(playButtonTemplate);
$('.main-controls .play-pause').html(playerBarPlayButton);
 currentSoundFile.pause();  
}
         
     
	}    
        
     };
 
     var onHover = function(event) {
         // Placeholder for function logic
          var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        } 
     };
     var offHover = function(event) {
         // Placeholder for function logic
         console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
         
         var songNumberCell = $(this).find('.song-item-number');
         
      var songNumber = parseInt($(this).attr('data-song-number'));

         
if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }   
     };
    
    
    
     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
     
 };
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
    
      var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };
       
     // #2
 $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // #3
   $albumSongList.empty();
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

 var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
 
     $seekBars.click(function(event) {
        
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         var seekBarFillRatio = offsetX / barWidth;
 
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }
           
         
         updateSeekPercentage($(this), seekBarFillRatio);
     });
     
    
$seekBars.find('.thumb').mousedown(function(event) {

        var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;
            
            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());   
            } else {
                setVolume(seekBarFillRatio);
            }
            
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
     }
 };
    
             
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
 
         // #10
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
     
     
     
     
 };




var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };



var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    
         currentSoundFile.play();

    
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell =(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};


var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    
    currentSoundFile.play();
    
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell =(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};



var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
 $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';




// #1
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
var currentSongFromAlbum = null;

 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
    setupSeekBars();
    $previousButton.click(previousSong);
     $nextButton.click(nextSong);
 
//for (var i = 0; i < songRows.length; i++) {
    
});  
    
     var album = [albumPicasso, albumMarconi, albumCher];







// NEW CODE FROM SHARON 1.6.18 - DOES IT GO HERE?
   var albumPicasso = { title: 'The Colors', artist: 'Pablo Picasso', label: 'Cubism', year: '1881', albumArtUrl: 'assets/images/album_covers/01.png', songs: [ { title: 'Blue', duration: '4:26' }, { title: 'Green', duration: '3:14' }, { title: 'Red', duration: '5:01' }, { title: 'Pink', duration: '3:21'}, { title: 'Magenta', duration: '2:15'} ] };

var albumMarconi = { title: 'The Telephone', artist: 'Guglielmo Marconi', label: 'EM', year: '1909', albumArtUrl: 'assets/images/album_covers/20.png', songs: [ { title: 'Hello, Operator?', duration: '1:01' }, { title: 'Ring, ring, ring', duration: '5:01' }, { title: 'Fits in your pocket', duration: '3:21'}, { title: 'Can you hear me now?', duration: '3:14' }, { title: 'Wrong phone number', duration: '2:15'} ] };

  + '  <td class="song-item-number">' + songNumber + '</td>'
   + '  <td class="song-item-title">' + songName + '</td>'
   + '  <td class="song-item-duration">' + songLength + '</td>'
   + '</tr>'
   ;

  return template;

};

var setCurrentAlbum = function(album) { // #1 var albumTitle = document.getElementsByClassName('album-view-title')[0]; var albumArtist = document.getElementsByClassName('album-view-artist')[0]; var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0]; var albumImage = document.getElementsByClassName('album-cover-art')[0]; var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


    // #2
 albumTitle.firstChild.nodeValue = album.title;
 albumArtist.firstChild.nodeValue = album.artist;
 albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
 albumImage.setAttribute('src', album.albumArtUrl);

 // #3
 albumSongList.innerHTML = '';

 // #4
 for (var i = 0; i < album.songs.length; i++) {
     albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
 }
};

window.onload = function() { setCurrentAlbum(albumPicasso); };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

var createSongRow = function(songNumber, songName, songLength) { var template = '' 


var index = 1;
     albumImage.addEventListener("click", function(event){
         setCurrentAlbum(album[index]);
         index++;
         if (index == albums.length) {
             index = 0;
         }
    }};
};