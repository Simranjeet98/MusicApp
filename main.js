
 var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon



 var songs = [{
        'name': 'Tamma Tamma Again',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
	   		'image': 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
		'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
		'image': 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
		'image': 'song4.jpg'
    }]



/*Humne ek function bnaya, 
	usme code likha,ab jab  bi humein same code ki jarurat kahin pdegi
	to hum sidhe function ko call krenge*/
	function toggleSong() {
		var song = document.querySelector('audio');
		//== will compare the both sides
		if(song.paused == true) {
		//console also used to debug the code
		console.log('Playing');
		$('.play-icon').removeClass('fa-play').addClass('fa-pause');
		song.play();
		}
		else {
		console.log('Pausing');
		$('.play-icon').removeClass('fa-pause').addClass('fa-play');
		song.pause();
		}
		}


function fancyTimeFormat(time)
{
// Hours, minutes and seconds
var hrs = ~~(time / 3600);
var mins = ~~((time % 3600) / 60);
var secs = time % 60;

// Output like "1:01" or "4:03:59" or "123:03:59"
var ret = "";

if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
}

ret += "" + mins + ":" + (secs < 10 ? "0" : "");
ret += "" + secs;
return ret;
}


function updateCurrentTime() {
			var song = document.querySelector('audio');
			//console.log(song.currentTime);
			//console.log(song.duration);
			var currentTime = Math.floor(song.currentTime);
			/*we call the function called 'fancyTimeFormat'
			We pass it the currentTime
			Whatever value it returns,
			we catch it in the same variable*/
			currentTime = fancyTimeFormat(currentTime);
			var duration = Math.floor(song.duration);
			duration = fancyTimeFormat(duration)
			$('.time-elapsed').text(currentTime);
			$('.song-duration').text(duration);

			}

   function updateTimer(){
		var song = document.querySelector('audio');
		var ct = song.currentTime;
		var td = song.duration;
		var percentage = (ct/td)*100;
		$('.progress-filled').css('width', percentage+ "%");
	}
	


  function changeCurrentSongDetails(songObj) {
      $('.current-song-image').attr('src','img/' + songObj.image)
      $('.current-song-name').text(songObj.name)
      $('.current-song-album').text(songObj.album)
  }


  function addSongNameClickEvent(songObj,position) {
    var songName = songObj.fileName; // New Variable
        var id = '#song' + position;
        $(id).click(function() {
            var audio = document.querySelector('audio');
            var currentSong = audio.src;
            if(currentSong.search(songName) != -1)
            {
              toggleSong();
            }
            else {
              audio.src = songName;
              toggleSong();
              changeCurrentSongDetails(songObj); // Function Call
              currentSongNumber = position;
            }
        });
    }


 

   for(var i =0; i < songs.length;i++) {
       var obj = songs[i];
       var name = '#song' + (i+1);
       var song = $(name);
       song.find('.song-name').text(obj.name);
       song.find('.song-artist').text(obj.artist);
       song.find('.song-album').text(obj.album);
       song.find('.song-length').text(obj.duration);
       addSongNameClickEvent(obj,i+1);
     }

    $('#songs').DataTable({
        paging: false
			});
			
			
			$('.fa-repeat').on('click',function() {
         $('.fa-repeat').toggleClass('disabled')
        willLoop = 1 - willLoop;
            });
			
			$('.fa-random').on('click',function() {
         $('.fa-random').toggleClass('disabled')
         willShuffle = 1 - willShuffle;
           });
		   

		 
		 
		 function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}

       function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}



$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})
			

  
/*This means, 1. Wait for the website to load
2. Once it has loaded, run everything that is in the function
time will be  updated after every 1 second*/
			window.onload = function() {

			changeCurrentSongDetails(songs[1]);
			
			updateCurrentTime();
			setInterval(function(){
			updateCurrentTime();
			updateTimer();
			},1000);
  }

$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
		// $('.effct').removeClass('hidden');
    } else {
        $('#name-input').addClass('error');
    }
});



 $ ('.content button').on('click', function() {
  
        $('.content').addClass('hidden');
        $('.effct').removeClass('hidden');
		
     
 })










$('.play-icon').on('click', function() {
   toggleSong();
});

$('body').on('keypress', function(event) {
  // console.log(event);
            var target = event.target;
            if (event.keyCode == 32  && target.tagName !='INPUT') {
                toggleSong();
            }
        });
		
		
		
		
		
		
		
