console.log("vrmp4");

// Create and append the control elements
var vrplayon = 1; //1플레이중 0정지상태
var vrtrans = 0; //1 3D 0 2D

var _str = "";
_str += '<div class="controls">';
// _str += '    <div id="progress-container">';
_str += '    </div>';
_str += '</div>';
$(".container").append(_str);

var _play = "";
_play += '        <div id="progress-bar">';
_play += '            <div class="time-display" id="time-display">00:00 / 00:00</div>';
_play += '        </div>';

_play += '	<div id="desc-container" style="display:none">';
_play += '	  <iframe src="https://www.youtube.com/embed/D7icsuamx5E"></iframe>';
_play += '	  <div class="title">China Forgotten War</div>';
_play += '	  <div class="text">WWII came to the small town of Tai’erzhuang in central China – and it was never the same again. The town was strategically placed, on the north-south transport railway corridor and the ancient Grand Canal, and so was a focus of the Japanese Imperial army as it advanced. Li Jing Shan was only a child when his family fled the fighting. They returned to find their home, and most of the town, in ruins.</div>';
_play += '	</div>';
// _play += '            <div class="vrplay" onclick="vrplay()"></div>';
$(".btns").append(_play);

// $("#progress-bar").hide();

// Initialize variables for PANOLENS and DOM elements
var panorama, viewer, videoElement, progressBar, progressContainer, timeDisplay, infospot, infospot2;
var panolensContainer = document.createElement('div');
panolensContainer.classList.add('panolens-container');

// 기존 .container 요소를 찾아 panolens-container 안에 추가
var container = document.querySelector('.container');
container.parentNode.insertBefore(panolensContainer, container);
panolensContainer.appendChild(container);

// Create PANOLENS VideoPanorama and Viewer
// panorama = new PANOLENS.VideoPanorama('../common/mp4/Chicago.mp4', { autoplay: true, muted: false });
// 포트폴리오용 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
panorama = new PANOLENS.VideoPanorama('../common/mp4/Desert.mp4', { autoplay: true, muted: false });
// 포트폴리오용 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

infospot = new PANOLENS.Infospot();
infospot.position.set(5000.00, -665.23, -3996.49);
infospot.addHoverText('The Where Is Bar');
infospot2 = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
infospot2.position.set(-5000.00, -1825.25, 197.56);
infospot2.addHoverElement(document.getElementById('desc-container'), 200);
panorama.add(infospot);
panorama.add(infospot2);

viewer = new PANOLENS.Viewer({ container: container });
viewer.add(panorama);

// Select DOM elements for video controls
videoElement = panorama.videoElement;
progressBar = document.getElementById('progress-bar');
progressContainer = document.getElementById('progress-container');
timeDisplay = document.getElementById('time-display');

// Function to update infospot positions based on frame scale


// Remove any existing PANOLENS container to avoid duplication
setTimeout(() => {
    $(".container > div:nth-child(7) > span:nth-child(2)").hide();
    $(".container > div:nth-child(7) > span:nth-child(4) > span:nth-child(1)").css("display", "none");
    $(".container > div:nth-child(7) > span:nth-child(4) > span:nth-child(2)").css("display", "none");

		$(".container > div:nth-child(7) > span:nth-child(1)").addClass("settinglist");
		$(".container > div:nth-child(7) > span:nth-child(3)").addClass("setting");
		$(".container > div:nth-child(7) > span:nth-child(1)").css({
						position: 'absolute',
						height: '80px',
						top: '-988px',
						bottom: 'unset',
						right: '10px',
						zIndex: 1000
		});
		$(".container > div:nth-child(7) > span:nth-child(3)").css({
						position: 'absolute',
						top: '-1032px',
						right: '0%',
						zIndex: 1000
		});
		$(".settinglist > a").on("click" ,function () {
			setTimeout(() => {
				$(".container > div:nth-child(7) > span:last-child").css({
					bottom: 'unset',
					top: '-988px',
					});
			}, 10);
			
		})
		$(".vrtransform").show()
		$(".vrtransform").css("background-position-x","-56px")
		$(".vrtransform").on("click" ,function () {
			if(vrtrans == 1){
				$(".vrtransform").css("background-position-x","-56px")
				$("#video").hide()
				existingVideoElement.muted = true;
				videoElement.muted = false;
				vrtrans = 0;
			}
			else if(vrtrans == 0){
				$(".vrtransform").css("background-position-x","0")
				$("#video").show()
				existingVideoElement.muted = false;
				videoElement.muted = true;
				vrtrans = 1;
			}
		})


    var existingVideoElement = document.getElementById('video');
    if (existingVideoElement) {
        // existingVideoElement.remove();
        existingVideoElement.style.display='none';
				existingVideoElement.muted = true;
    }

    //  var progressElements = document.querySelectorAll('.progress');
    //  progressElements.forEach(function(progressElements) {
		// 	progressElements.remove();
    //  });

     var timeElements = document.querySelectorAll('.time');
     timeElements.forEach(function(timeElements) {
			timeElements.remove();
     });

			var _videovr = videoElement;
			console.log(_videovr)
		 
			videoElement.removeAttribute('loop');

			markon()
			keyon()
			$(".down").css("right","346px")
			$(".mark").css("right","460px")
			$(".markdel").css("right","400px")
			$(".vrtransform").css("right","525px")
}, 10);

// Update the progress bar and time display
videoElement.addEventListener('timeupdate', function () {
    var currentTime = formatTime(videoElement.currentTime);
    var duration = formatTime(videoElement.duration);
    timeDisplay.innerText = currentTime + ' / ' + duration;

    var progress = (videoElement.currentTime / videoElement.duration) * 100;
    progressBar.style.width = progress + '%';
});

// Seek video position on progress bar click
progressContainer.addEventListener('click', function (e) {
    var rect = progressContainer.getBoundingClientRect();
    var pos = (e.pageX - rect.left) / rect.width;
    videoElement.currentTime = pos * videoElement.duration;
});

// Control video volume
document.getElementById('volume-control').addEventListener('input', function () {
    panorama.videoElement.volume = this.value / 100;
});

// Unmute video on panorama enter fade start
panorama.addEventListener('enter-fade-start', function () {
    panorama.videoElement.muted = false;
});

// Format time in MM:SS format
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function keyon() {
	$(document).keydown(function (key) {

		//주관식등 입력 영역 활용을 위하여 INPUT tag나 TEXTAREA tag에 포커싱 되더 있는경우 단축키 기능을 실행되지 않도록 한다.
		if ($("#video").css("display") == 'none') {
			//if ($(':focus').prop('tagName') == "INPUT" || $(':focus').prop('tagName') == "TEXTAREA" || $(':focus').prop('tagName') == "BUTTON") {
			return;
		}
		switch (Number(key.which)) {
			case 39:
					$(".nextPlay").focus()
				
					if (_compulsory) {
						if (location.href.indexOf("hunet") != -1) {
							//페이지별 최대 진행정도만 드레그 가능하도록
							var  _progressFillWidth = $(".progress .fill").width();
							if (_maxDrag < _progressFillWidth) {
								alert("학습 완료 후 이동 가능합니다.");
								_maxDrag = _progressFillWidth;
								
								return;
							}else {
								_maxDrag = Math.max(_maxDrag, _progressFillWidth);
							}
						}
					}
					
					skip((Number(_video.currentTime) + 5));
		
					$(".nextTimeGuide").css({
						"opacity": 1,
						"animation-play-state": "running"
					});
					if ($(".nextTimeGuide").hasClass("guide")) {
						$(".nextTimeGuide").removeClass("guide");
					} else {
						$(".nextTimeGuide").addClass("guide");
					}
		
					//ui();
	
				break;
			case 37:
					$(".prevPlay").focus()
					skip((Number(_video.currentTime) - 5));
		
					$(".prevTimeGuide").css({
						"opacity": 1,
						"animation-play-state": "running"
					});
					if ($(".prevTimeGuide").hasClass("guide")) {
						$(".prevTimeGuide").removeClass("guide");
					} else {
						$(".prevTimeGuide").addClass("guide");
					}
		
					//ui();
	
				break;
			case 38:
					$(".volumPoint").focus()
					setVolum((Number(_video.volume) + 0.1))
	
	
				break;
			case 40:
					$(".volumPoint").focus()
					setVolum((Number(_video.volume) - 0.1))
				
	
				break;
			default:
				break;
		}
	});
}
