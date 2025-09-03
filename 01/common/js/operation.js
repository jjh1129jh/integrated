console.log("operation");
////////////////////////////////////////////////////////////////////////////////////////////
//영상
////////////////////////////////////////////////////////////////////////////////////////////
//커스텀에 맞추어 영상크기를 조정한다.
//영상을 연결한다.

var _video = $("#video")[0];
var _videoPath;
var ccnum = 1;
var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
var isMobile = /Mobi|Android/i.test(navigator.userAgent);
//PC와 모바일 환경을 구분하여 path를 활용한다.
if (_device == "PC") {
	_videoPath = _metaData[1].path[0].mp4;
} else {
	_videoPath = _metaData[1].path[0].mobile;
}

var _videoSrc = _metaData[3].pages[_chasi - 1].chasi[_page - 1].page[0].url;
if (_videoType == "mp3") {
	_videoPath = "../common/mp3/"
	_videoSrc = _videoSrc.split("mp4").join("mp3");
}
_video.src = _videoPath + _videoSrc;

//진도제어(hunet)
var _compulsory = false;
if (location.href.indexOf("hunet") != -1) {
	_compulsory = true;
}

//재생전에 _tl이 먼저 실행해주는 오류를 방지한다.
/*
if (typeof _tl != "undefined") {
	_tl.pause();
}
*/

////////////////////////////////////////////////////////////////////////////////////////////
//영상 on Event
////////////////////////////////////////////////////////////////////////////////////////////
//영상 시작
_video.onloadedmetadata = function () {
	//로딩화면 감춤
	$(".loadingCon").fadeOut();

	var _promise = _video.play();
	if (_promise !== undefined) {
		_promise.then(function () {
			//불필요한 재생버튼 노출을 막아주기 위해 기본을 감춰주는것으로 한다.
			//$(".playCon").fadeOut();
		}).catch(function () {
			//재생전에 _tl이 먼저 실행해주는 오류를 방지한다.
			if (typeof _tl != "undefined") {
				_tl.pause();
			}
			$(".playCon").fadeIn();

			$(".playCon .play").click(function () {
				$(".playCon").fadeOut();
				_video.play();
			});

		});
	} else {
		$(".playCon").fadeOut();
	}

	//진행시간 세팅(초기)
	$(".currentTime").html(trance.sec(_video.currentTime));
	$(".duration").html(trance.sec(_video.duration));

	//수어영상으로 전환인경우 아래 내용은 생략한다.
	if(_handswap){
		return;
	}

	//저장된 볼륨과, 자동재생 기능이 있다면해당 내용으로 적용한다.
	//_videoPath를 고유키로 활용한다.
	_volum = cookie.get(_videoPath + "_volum");

	if (_volum == null) {
		_volum = 1
	}

	setVolum(_volum);

	if (_bottomVolum == "v") {
		$(".vertical").fadeOut(200);
	}

	//alert(cookie.get(_videoPath+"_autoplay"))
	if (cookie.get(_videoPath + "_autoplay") == "auto") {
		autoplay();
	}

	//배속
	_rate = cookie.get(_videoPath + "_rate");
	rate(_rate);

	//PIP
	if (_device == "PC" && document.pictureInPictureEnabled) {
		$(".PIP").show();
	}
}
_video.oncanplay = function () {

};

//영상 진행
_video.ontimeupdate = function () {
	if (_drag == true) {
		return;
	}
	
	var _max = $(".progress .area").width();
	var _per = (_video.currentTime / _video.duration)
	$(".progress .fill").css({
		"width": (_max * _per) + "px"
	});
	$(".progress .point").css({
		"left": (_max * _per) + "px"
	});
	
	time(_max * _per)
	/*
	$(".time").css({
		//"left": $(".progress").offset().left+(_max * _per) + "px"
		"left": trance.px($(".progress").css("left"))+(_max * _per) + "px"
	});
	*/

	if (_compulsory) {
		if (location.href.indexOf("hunet") != -1) {
			//페이지별 최대 진행정도만 드레그 가능하도록
			var  _progressFillWidth = $(".progress .fill").width();
			_maxDrag = Math.max(_maxDrag, _progressFillWidth);
		}
	}
	
	//
	end(false);
	//$(".end").fadeOut();

	//진행시간 안내
	$(".currentTime").html(trance.sec(_video.currentTime));
	$(".duration").html(trance.sec(_video.duration));

	//커스텀 내용에 따라 자막을 시간별로 보여준다.
	if (_bottomScriptTime == "true") {
		$(".sync").hide();
		scriptMath(_video.currentTime);
	}
};

//영상 잠시 멈춤
_video.onpause = function () {
	//TimelineLite
	if (typeof _tl != "undefined") {
		_tl.pause();
	}

	$(".playGuide").css({
		"opacity": 1,
		"animation-play-state": "running",
		"background-position-x": $(".playGuide").css("width")
	});

	if ($(".playGuide").hasClass("guide")) {
		$(".playGuide").removeClass("guide");
	} else {
		$(".playGuide").addClass("guide");
	}

	if (_fontasome != false) {
		$(".bottom .play").html('<i class="fas fa-play"></i>');
	} else {
		$(".bottom .play").css({
			"background-position-x": "0px"
		});
	}
	//$(".bottom .play").attr("title", "재생");
	$(".bottom .play h3").html("재생");
};
//영상 진행
_video.onplay = function () {
	//TimelineLite
	
	if (typeof _tl != "undefined") {
		_tl.play();
	}

	$(".playGuide").css({
		"opacity": 1,
		"animation-play-state": "running",
		"background-position-x": "0px"
	});

	if ($(".playGuide").hasClass("guide")) {
		$(".playGuide").removeClass("guide");
	} else {
		$(".playGuide").addClass("guide");
	}

	if (_fontasome != false) {
		$(".bottom .play").html('<i class="fas fa-pause"></i>');
	} else {
		$(".bottom .play").css({
			"background-position-x": $(".bottom .play").css("width")
		});
	}
	//$(".bottom .play").attr("title", "정지");
	$(".bottom .play h3").html("정지");
};
//영장 종료
_video.onended = function () {
	//$(".end").fadeIn();
	end(true);
};

//학습완료 안내
//퀴즈등 조작이 필요한 페이지의경우 _endLock이 true가 되기 전까지는 학습완료 안내를 하지 않는다.
var _endLock = false;
var _autoSetInterval;

function end(b, c) {
	if (b) {
		if (c) {
			//퀴즈등의 페이지에서 조작이 완료된 경우
			_endLock = true;
			//return;
		} else {
			//퀴즈등 조작이후 학습완료 안내가 필요한경우
			if (_type.indexOf("quiz") != -1 && _endLock == false) {
				return;
			}
			if (_type.indexOf("drag") != -1 && _endLock == false) {
				return;
			}
			if (_type.indexOf("icheck") != -1 && _endLock == false) {
				return;
			}
		}

		//자동재생기능을 활용하고, 논으로 체크되어 있지 않다면 다음페이지로 진행한다.
		if (_autoplay && $(".autoplay").hasClass("auto") && _page < _pageLength) {
			autoplaySet();
		}

		$(".bottom .groub").fadeIn(200);
		$(".guideBg").fadeIn(200);
		//$(".menu").fadeIn(200);
		if ($(".menu").css(_indexAlignType) == "0px") {
			$(".menu").fadeIn(200);
		}

		if ($(".scripts").css("bottom") != _scriptor) {
			$(".scripts").css({
				"bottom": _scriptor
			})
		}

		clearTimeout(_bottomSetTimeOut);

		$(".end").fadeIn();
	} else {
		clearInterval(_autoSetInterval);
		$(".end").fadeOut();
	}
}

function autoplaySet() {
	//3초후 이동
	var _autoCount = 3;
	var _autoCountMax = _autoCount;
	var _endWidth = $(".end .endFill").width();
	$(".end .endTxt").html(_autoCount + "초 후 다음페이지");

	$(".end .endFill").removeClass("endFillAni");
	$(".end .endFill").addClass("endFillAni");
	//endFillAni
	//$(".end .endFill").css({"width":"0px"})

	clearInterval(_autoSetInterval);
	_autoSetInterval = setInterval(function () {
		//end 노출 상황이 아니라면 인터벌 종료
		if ($(".end").css("display") == "none") {
			clearInterval(_autoSetInterval);
		}

		//
		_autoCount -= 1;
		//$(".end .endFill").css({"width":((_endWidth/(_autoCountMax-1))*(_autoCountMax-_autoCount))+"px"})
		if (_autoCount == 0) {
			$(".end .endTxt").html("1초 후 다음페이지");
			clearInterval(_autoSetInterval);
			if (_page < _pageLength) {
				pageMove("next");
			}
		} else {
			$(".end .endTxt").html(_autoCount + "초 후 다음페이지");
		}
	}, 1000);
}
////////////////////////////////////////////////////////////////////////////////////////////
//영상 조작 이벤트
////////////////////////////////////////////////////////////////////////////////////////////
//영상 조작
var _drag = false;
var _volumDrag = false;
var _maxDrag = 0;

//진행 선택 이동
$(".progress .area").on("click", function (e) {
	var _max = $(".progress .area").width();
	if (_device == "PC"){
		var _x=e.originalEvent.pageX-$(".progress").offset().left;
		var _percent=_x/_max;

		//실제 가로 크기 = (클릭한 위치의 백분율 값) * (요소의 가로 크기) / per
		var _left =_percent*_max/_resizePer;
	}else{
		var _left =e.originalEvent.pageX-$(".progress").offset().left;
	}
	
	//강제 진도 제어
	if (_compulsory) {
		if (location.href.indexOf("hunet") != -1) {
			//저장된 시간만큼 제어하는경우
			/*
			var _playsec = top.navi_frame.FnGetPlaySec(trance.str(_chasi) + '_' + trance.str(_page)+".html");
			//var _convertSec=trance.convertSec("00:00:05");
			var _convertSec=trance.convertSec(_playsec);
			if(_video.currentTime>_convertSec){
			   _per = _convertSec / _video.duration;
			}
			*/
			//Y, N으로만 구분하는경우
			//해당상황의 경우 학습자가 불편할것 같은데... 이게 맞는지 의문
			//하지만 휴넷에서 30초에 한번 시간을 저장하기에 해당 방법외에는 마땅한 방법이 없음
			/*
			var _pass_yn = top.navi_frame.FnGetStudyFrameInfo(trance.str(_chasi) + '_' + trance.str(_page) + ".html").pass_yn;
			if (_pass_yn != "Y") {
				alert("학습 완료 후 이동 가능합니다.");
				return;
			}
			*/
			//페이지별 최대 진행정도만 드레그 가능하도록
			var  _progressFillWidth = $(".progress .fill").width();
			if (_maxDrag < _progressFillWidth) {
				alert("학습 완료 후 이동 가능합니다.");
				_maxDrag = _progressFillWidth;
				_left=_maxDrag;
				return
			}else {
				_maxDrag = Math.max(_maxDrag, _progressFillWidth);
			}
		}
	}
	
	$(".progress .fill").css({
		"width": _left + "px"
	});
	$(".progress .point").css({
		"left": _left + "px"
	});

	time(_left)

	var _now = $(".progress .fill").width();
	var _per = _now / _max;
	if (_per >= 1) {
		_per = 0.99;
	}
	
	_video.currentTime = (_video.duration * _per);
	if(typeof videoElement === 'undefined' || videoElement === null){

}else if(videoElement){
		videoElement.currentTime = (videoElement.duration * _per);
	}
	//TimelineLite
	if (typeof _tl != "undefined") {
		_tl.seek(_video.currentTime);
	}
});

$(".volum .volumArea").on("click", function (e) {
	if (_bottomVolum == "v") {
		var _min = trance.px($(".volum .volumFill").css("top"));
		var _max = $(".volum .volumArea").height() + _min;

		var _top = e.originalEvent.pageY;
		_top -= $(".volum").offset().top;

		if (_device == "PC"){
			var _percent=_top/_max;
			_top =_percent*_max/_resizePer;
		}

		_top -= $(".volum").height()
		_top -= (trance.px($(".vertical").css("padding"))) * 2
		_top = -_top;

		if (_top > _max) {
			_top = _max;
		}
		if (_top < 0) {
			_top = 0;
		}

		$(".volum .volumFill").css({
			"height": (_top - _min) + "px"
		});
		$(".volum .volumPoint").css({
			"top": (_top) + "px"
		});
	} else {
		//가로인경우
		var _max = $(".volum .volumArea").width();
		var _left = e.originalEvent.pageX - $(".volum").offset().left;
		//e.originalEvent.touches[0].pageX;

		var _percent=_left/_max;
		_left =_percent*_max/_resizePer;

		if (_left > _max) {
			_left = _max;
		}
		if (_left < 0) {
			_left = 0;
		}
		$(".volum .volumFill").css({
			"width": _left + "px"
		});
		$(".volum .volumPoint").css({
			"left": _left + "px"
		});
	}

	var _now = $(".volum .volumFill").width();
	var _per = _now / _max;
	if (_per >= 1) {
		_per = 0.99;
	}

	_video.volume = _per;
	_volum = _video.volume;

	//쿠키저장
	cookie.set(_videoPath + "_volum", _per);

	volumIconSwap(_per);
});

//진행
$(".progress .point").bind("mousedown touchstart", function (e) {
	e.preventDefault();

	_drag = true;

	$(document).bind("mousemove touchmove", function (e) {
		e.preventDefault();
		//진행
		if (_drag) {
			_video.pause();
			var _max = $(".progress .area").width();
			var _left;
			if (_device == "PC") {
				_left = e.originalEvent.pageX - $(".progress").offset().left;
				var _percent=_left/_max;
				_left =_percent*_max/_resizePer;
			} else {
				_left = e.originalEvent.touches[0].pageX - $(".progress").offset().left;
			}

			if (_left > _max) {
				_left = _max;
			}
			if (_left < 0) {
				_left = 0;
			}
			$(".progress .fill").css({
				"width": _left + "px"
			});
			$(".progress .point").css({
				"left": _left + "px"
			});

			time(_left)
		}
	});
	$(document).bind("mouseup touchend", function (e) {
		//alert("")
		$(document).unbind("mouseup touchend");
		$(document).unbind("mousemove touchmove");

		e.preventDefault();
		//진행
		if (_drag) {
			_drag = false;

			//20220810: 드레그후 포인트가 사라질수 있도록
			if (_device == "PC") {
				$(".progress .point").css({
					"display": "none",
					"margin": "-" + (($(".progress .point").width() / 2) - (_bottomProgressHeight / 2)) + "px"
				});
			}
			
			//강제 진도 제어
			if (_compulsory) {
				if (location.href.indexOf("hunet") != -1) {
					//페이지별 최대 진행정도만 드레그 가능하도록
					var  _progressFillWidth = $(".progress .fill").width();
					if (_maxDrag < _progressFillWidth) {
						$(".progress .fill").css({
							"width": _maxDrag + "px"
						});
						$(".progress .point").css({
							"left": _maxDrag + "px"
						});
						
						alert("학습 완료 후 이동 가능합니다.");
						_maxDrag = _progressFillWidth;
						
						return;
					}else {
						_maxDrag = Math.max(_maxDrag, _progressFillWidth);
					}
				}
			}
			
			var _max = $(".progress .area").width();
			var _now = $(".progress .fill").width();
			var _per = _now / _max;
			if (_per >= 1) {
				_per = 0.99;
			}
			
			_video.currentTime = (_video.duration * _per);
			if(typeof videoElement === 'undefined' || videoElement === null){

		}
		else if(videoElement){
				videoElement.currentTime = (videoElement.duration * _per);
			}
			_video.play();

			//TimelineLite
			if (typeof _tl != "undefined") {
				_tl.seek(_video.currentTime);
			}
		}
	});
});
//볼륨
$(".volum .volumPoint").bind("mousedown touchstart", function (e) {
	e.preventDefault();

	_volumDrag = true;

	$(document).bind("mousemove touchmove", function (e) {
		e.preventDefault();
		//볼륨
		if (_volumDrag) {
			//볼륨조절이 새로인경우
			if (_bottomVolum == "v") {
				var _min = trance.px($(".volum .volumFill").css("top"));
				var _max = $(".volum .volumArea").height() + _min - ($(".volum .volumPoint").height() / 2);

				//var _top=e.originalEvent.pageY;

				var _top;
				if (_device == "PC") {
					_top = e.originalEvent.pageY;
					_top -= $(".volum").offset().top;

					var _percent=_top/_max;
					_top =_percent*_max/_resizePer;
				} else {
					_top = e.originalEvent.touches[0].pageY;
					_top -= $(".volum").offset().top;
				}

				_top -= $(".volum").height();
				_top -= (trance.px($(".vertical").css("padding"))) * 2;
				_top = -_top;

				if (_top > _max) {
					_top = _max;
				}
				if (_top < _min) {
					_top = _min;
				}

				$(".volum .volumFill").css({
					"height": (_top - _min) + "px"
				});
				$(".volum .volumPoint").css({
					"top": (_top) + "px"
				});
			} else {
				//가로인경우
				var _max = $(".volum .volumArea").width();
				//var _left=e.originalEvent.pageX-$(".volum").offset().left;

				var _left;
				if (_device == "PC") {
					_left = e.originalEvent.pageX - $(".volum").offset().left;
				} else {
					_left = e.originalEvent.touches[0].pageX - $(".volum").offset().left;
				}

				var _percent=_left/_max;
				_left =_percent*_max/_resizePer;

				//e.originalEvent.touches[0].pageX;

				if (_left > _max) {
					_left = _max;
				}
				if (_left < 0) {
					_left = 0;
				}
				$(".volum .volumFill").css({
					"width": _left + "px"
				});
				$(".volum .volumPoint").css({
					"left": _left + "px"
				});
			}
		}
	});
	$(document).bind("mouseup touchend", function (e) {

		$(document).unbind("mouseup touchend");
		$(document).unbind("mousemove touchmove");

		e.preventDefault();
		//볼륨
		if (_volumDrag) {
			_volumDrag = false;
			if (_bottomVolum == "v") {
				var _max = $(".volum .volumArea").height();
				var _now = $(".volum .volumFill").height();
			} else {
				var _max = $(".volum .volumArea").width();
				var _now = $(".volum .volumFill").width();
			}

			var _per = _now / _max;
			if (_per >= 1) {
				_per = 1;
			}

			_video.volume = _per;
			if(typeof videoElement === 'undefined' || videoElement === null){

		}
		else if(videoElement){
				videoElement.volume = _per;
			}
			_volum = _video.volume;

			//쿠키저장
			cookie.set(_videoPath + "_volum", _per);

			volumIconSwap(_per);
		}
	});
});

//화면 크기조정
resize();
$(window).on('resize', function () {
	resize();
	if(_type == 'line'){
		$(".bottom").css({
			"transform-origin":"center bottom",
		});
		if (!isMac && !isMobile) {
		$(".bottom").css({
			"transform": "translate(-50%, 0%) scale(" + _resizePer + ")"
		});
	}
	}
});

document.addEventListener('DOMContentLoaded', (event) => {
	var inputField = document.getElementById('inputField');

	inputField.addEventListener('focusout', () => {
		resize();
	});
});

$(window).on('beforeunload', function () {

});

if (_device == "PC") {
	$('.progress').hover(function () {
		$(this).css({
			"height": (_bottomProgressHeight * 2) + "px",
			"top": -(_bottomProgressHeight * 2) + "px"
		});

		$(".progress .point").css({
			"display": "block",
			"z-index": "99",
			"margin": "-" + (($(".progress .point").width() / 2) - (_bottomProgressHeight)) + "px"
		});

	}, function () {
		$(this).css({
			"height": (_bottomProgressHeight) + "px",
			"top": -(_bottomProgressHeight) + "px"
		});

		//20220810: 드레그 중에는 포인트가 유지되도록
		if (!_drag) {
			$(".progress .point").css({
				"display": "none",
				"margin": "-" + (($(".progress .point").width() / 2) - (_bottomProgressHeight / 2)) + "px"
			});
		}
	});
}

var _bottomSetTimeOut;
//$(document).bind("mousemove touchmove",function(e){
$("#page").bind("mousemove touchmove", function (e) {
	ui();
});

//자막창 위치 이동을 위해 기억
var _scriptor;

function ui() {
	if ($(".scripts").css("bottom") != _scriptor) {
		$(".scripts").css({
			"bottom": _scriptor
		})
	}

	$(".bottom .groub").fadeIn(200);
	$(".guideBg").fadeIn(200);

	//console.log($(".menu").css("display"))
	if ($(".menu").css(_indexAlignType) == "0px") {
		$(".menu").fadeIn(200);
	}
	//if ($(".menu").css("display") == "none") {
	//$(".menu").fadeIn(200);
	//}

	clearTimeout(_bottomSetTimeOut);
	if ($(".end").css("display") == "none") {
		var _iw = self.innerWidth;
		var _ih = self.innerHeight;
		if (_device != "PC" && _iw < _ih) {
			clearTimeout(_bottomSetTimeOut);
			return;
		}
		_bottomSetTimeOut = setTimeout(
			function () {
				if (!_video.paused) {

					$(".volum").fadeOut(200);
					$(".rateCon").fadeOut(200);
					$(".bottom .groub").fadeOut(200);
					$(".guideBg").fadeOut(200);

					//if ($(".menu").css("display") != "none") {
					if ($(".menu").css(_indexAlignType) == "0px") {
						$(".menu").fadeOut(200);
					}

					_scriptor = $(".scripts").css("bottom");

					if(_device=="pc"){
						$(".scripts").css({
							"bottom": "20px"
						});
					}else{
						$(".scripts").css({
							"bottom": "0px"
						});
					}
					
				}
			}, 3000)
	}
}

//단축키 세팅
$(document).keydown(function (key) {
	ui();

	//주관식등 입력 영역 활용을 위하여 INPUT tag나 TEXTAREA tag에 포커싱 되더 있는경우 단축키 기능을 실행되지 않도록 한다.
	if ($(':focus').prop('tagName') == "INPUT" || $(':focus').prop('tagName') == "TEXTAREA") {
		//if ($(':focus').prop('tagName') == "INPUT" || $(':focus').prop('tagName') == "TEXTAREA" || $(':focus').prop('tagName') == "BUTTON") {
		return;
	}
	switch (Number(key.which)) {
		case 32:
			if ($(':focus').prop('tagName') == "BUTTON") {
				return;
			}
			//스페이스
			if ($(':focus').attr("class") != "play") {
				$(".play").focus();
				play();
			}

			//ui();
			break;
		case 13:
			if ($(':focus').prop('tagName') == "BUTTON") {
				return;
			}
			//엔터
			if ($(':focus').attr("class") != "full") {
				$(".full").focus()
				//full();
			}

			break;
		case 39:
			if(typeof videoElement === 'undefined' || videoElement === null){
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
			}
			else if(videoElement){
					
			}

			break;
		case 37:
			if(typeof videoElement === 'undefined' || videoElement === null){
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
			}
			else if(videoElement){
					
			}

			break;
		case 38:
			if(typeof videoElement === 'undefined' || videoElement === null){
				$(".volumPoint").focus()
				setVolum((Number(_video.volume) + 0.1))
			}
			else if(videoElement){
					
			}


			break;
		case 40:
			if(typeof videoElement === 'undefined' || videoElement === null){
				$(".volumPoint").focus()
				setVolum((Number(_video.volume) - 0.1))
			}
			else if(videoElement){
					
			}
			

			break;
		case 20:
			$(".script").focus()
			script()

			break;
		case 33:
			$(".prevPage").focus()
			pageMove("prev");

			break;
		case 34:

			$(".nextPage").focus()
			pageMove("next");

			break;
		default:
			break;
	}
});

////////////////////////////////////////////////////////////////////////////////////////////
//함수
////////////////////////////////////////////////////////////////////////////////////////////
//영상 진행&멈춤
function play() {
	if (_video.paused) {
		_video.play();
if(typeof videoElement === 'undefined' || videoElement === null){

		}else if(videoElement){
			videoElement.play();
		}
		//TimelineLite
		if (typeof _tl != "undefined") {
			_tl.seek(_video.currentTime);
		}
	} else {
		_video.pause();
		if(typeof videoElement === 'undefined' || videoElement === null){

		}
		else if(videoElement){
			videoElement.pause();
		}
	}

}

function replay() {
	_video.currentTime = 0;
	if(typeof videoElement === 'undefined' || videoElement === null){

}else if(videoElement){
		videoElement.currentTime = 0;
	}
	play();

	//TimelineLite
	if (typeof _tl != "undefined") {
		_tl.seek(_video.currentTime);
	}
}

function script() {
	if ($(".scripts").css("display") == "none") {
		$(".scripts").fadeIn();

		if (_indexAlignType == "bottom" && $(".menu").css("display") != "none") {
			index();
		}
	} else {
		$(".scripts").fadeOut();
	}
}

function additional() {
	if ($(".add").css("display") == "none") {
		$(".add").fadeIn();
		_video.pause();
		if(typeof videoElement === 'undefined' || videoElement === null){

		}
		else if(videoElement){
			videoElement.pause();
		}
		if (typeof _tl != "undefined") {
			//_tl.pause();
		}
	} else {
		$(".add").fadeOut();
		if ($(".end").css("display") == "none") {
			_video.play();
			if(typeof videoElement === 'undefined' || videoElement === null){

		}
		else if(videoElement){
				videoElement.play();
			}

			if (typeof _tl != "undefined") {
				//_tl.play();
			}
		}
	}
}

addFocus($(".addBtn").eq(0))

function addFocus(n) {
	$(".addBtn").removeClass("active");
	$(n).addClass("active");
	$(".add .addCon").animate({
		"left": -(_width * $(n).index()) + "px"
	}, {
		complete: function () {}
	});
}

function index() {
	var _or = "0px";
	var _target;

	if (_indexAlignType == "bottom") {
		_or = (parseInt(_bottomHeight, 10) + 5) + "px";
	}
	if ($(".menu").css(_indexAlignType) == _or) {
		//$(".index h3").html("인덱스 열기");

		if (_indexAlignType == "left") {
			_target = -self.innerWidth + "px"
			$(".menu").animate({
				"left": _target
			}, {
				complete: function () {
					$(".menu").hide();
				}
			});
		} else if (_indexAlignType == "bottom") {
			_target = -self.innerHeight + "px"
			$(".menu").animate({
				"bottom": _target
			}, {
				complete: function () {
					$(".menu").hide();
				}
			});
		} else if (_indexAlignType == "top") {
			_target = -trance.px($(".menu").css("height"))
			$(".menu").animate({
				"top": _target
			}, {
				complete: function () {
					$(".menu").hide();
				}
			});
		}
	} else {
		//$(".index h3").html("인덱스 닫기");

		$(".menu").show();
		if (_indexAlignType == "left") {
			$(".menu").animate({
				"left": _or
			}, {
				complete: function () {}
			});
		} else if (_indexAlignType == "bottom") {
			$(".menu").animate({
				"bottom": _or
			}, {
				complete: function () {}
			});

			if ($(".scripts").css("display") != "none") {
				script();
			}
		} else if (_indexAlignType == "top") {
			$(".menu").animate({
				"top": _or
			}, {
				complete: function () {}
			});
		}
	}
}

//초기 볼륨
var _volum;

function mute() {

	if (_device.substring(0, 2) == "IP") {
		if (_video.muted) {
			setVolum(1);
		} else {
			setVolum(0);
		}
	} else {
		if ($(".volum").css("display") == "none") {
			$(".volum").css({
				"opacity": 1
			});

			$(".volum").fadeIn();

			//숨겨진 상황에서 단축키로 조절할경우 포인트 위치는 조정되지 않는 오류 해결을 위한 내용
			var _min = trance.px($(".volum .volumFill").css("top"));
			$(".volum .volumPoint").css({
				"top": ($(".volum .volumFill").height() + _min) + "px"
			});
		} else {
			$(".volum").fadeOut();
		}
	}
	/*
	if(_video.volume==0){
		setVolum(_volum);
	}else{
		setVolum(0);
	}
	*/
}

function setVolum(n) {
	//20220810: 쿠키저장된 수치는 string으로 되어 있어 number로 전환

	n = Number(n);
	if (n > 1) {
		n = 1;
	}

	if (n <= 0) {
		n = 0
	}

	n = n.toFixed(1);

	if (_device.substring(0, 2) == "IP") {
		if (n == 0) {
			_video.muted = true;
		} else {
			_video.muted = false;
		}

		//쿠키저장
		cookie.set(_videoPath + "_volum", n);
	} else {

		_video.volume = n;
		if(typeof videoElement === 'undefined' || videoElement === null){

		}
		else if(videoElement){
			videoElement.volume = n;
		}
		console.log(_video.volume)
		//쿠키저장
		cookie.set(_videoPath + "_volum", n);

		if (_bottomVolum == "v") {
			var _min = trance.px($(".volum .volumFill").css("top"));
			var _volumTop = $(".volum .volumArea").height() - $(".volum .volumPoint").height();

			_volumTop = _volumTop * _video.volume;
			$(".volum .volumFill").css({
				"height": _volumTop + "px"
			});
			$(".volum .volumPoint").css({
				"top": (_volumTop + _min) + "px"
			});
		} else {
			var _volumLeft = $(".volum .volumArea").width();
			_volumLeft = _volumLeft * _video.volume;
			$(".volum .volumFill").css({
				"width": _volumLeft + "px"
			});
			$(".volum .volumPoint").css({
				"left": _volumLeft + "px"
			});
		}
	}

	volumIconSwap(n);
}

function volumIconSwap(n) {
	if (n == 0) {
		if (_fontasome != false) {

		} else {
			$(".bottom .mute").css({
				"background-position-x": $(".bottom .mute").css("width")
			});
		}
	} else {
		if (_fontasome != false) {

		} else {
			$(".bottom .mute").css({
				"background-position-x": "0px"
			});
		}
	}
}

//자막 세팅
var _srtTime = new Array();
if (_scriptData) {
	setScript()
}

function setScript() {
	var _str = "";
	_str += "<table>"

	//#삭제
	for (var _i = 100; _i > 0; _i--) {
		_scriptData = _scriptData.split("#" + _i).join("");
	}

	//smi
	/*
	_scriptData = _scriptData.replace(/  /gi, ' ');
	_scriptData = _scriptData.replace(/<br>/gi, '');
	_scriptData = _scriptData.replace(/<p>/gi, '');

	_scriptData = _scriptData.replace(/<\/\br>/gi, '');
	_scriptData = _scriptData.replace(/<\/\p>/gi, '');

	_scriptData = _scriptData.replace(/<\/\BODY>/gi, '');
	_scriptData = _scriptData.replace(/<\/\SAMI>/gi, '');

	_scriptData = _scriptData.replace(/\r/gi, '');
	_scriptData = _scriptData.replace(/\n/gi, '');

	_scriptData = _scriptData.replace(/<SYNC START=/gi, '<sync start=');
	_scriptData = _scriptData.replace(/<P Class=krcc>/gi, '<p class=krcc>');
	*/

	_scriptData = _scriptData.replace(/\r/gi, '');
	//if (_scriptData.indexOf("sync") != -1) {
	if (_scriptData.indexOf("-->") != -1) {
		var _srt=_scriptData.split("\n");

		var _srtNo=new Array();
		//var _srtTime=new Array();
		//var _srtStr=new Array();
		
		for(var _i=0;_i<_srt.length;_i++){
			if(_i%4==0){
				_srtNo.push(_srt[_i]);
			}else if(_i%4==1){
				var _srtTimes=_srt[_i].split("-->");
				_srtTimes=_srtTimes[0].split(" ").join("");
				_srtTimes=_srtTimes.split(",");
				_srtTimes=_srtTimes[0];

				_srtTime.push(trance.convertSec(_srtTimes));
			}else if(_i%4==2){
				_str += "<tr class='sync'>";
				_str += "	<td>" + _srt[_i] + "</td>";
				_str += "</tr>";
			}
		}
		/*
		var _sync = _scriptData.split("<sync start=");
		for (_s = 1; _s < _sync.length; _s++) {

			var _syncScript = _sync[_s].split("><p class=krcc>");

			if (_syncScript[1] != "" && _syncScript[0] > 0) {
				_srtTime.push(trance.mili(_syncScript[0]));
				_str += "<tr class='sync'>";
				_str += "	<td>" + _syncScript[1] + "</td>";
				_str += "</tr>";
			}

		}
		*/
	} else {
		//화자 구분
		var _scriptArray = _scriptData.split("\r");
		var _speaker = "";
		for (var _s = 0; _s < _scriptArray.length; _s++) {
			_scriptArray[_s] = _scriptArray[_s].split("\n").join("");
			var _scriptWord = _scriptArray[_s].split(":");

			_str += "<tr>";
			if (_speaker == _scriptWord[0]) {
				_str += "	<td style='text-align:right;width:10%'>" + _scriptWord[0] + ":</td>"
			} else {
				if (_scriptWord[1] != undefined) {
					_str += "	<td style='text-align:right;width:10%'>" + _scriptWord[0] + ":</td>"
				} else {
					//_str+="	<td>"+_scriptWord[0]+"</td>"
					_str += "	<td style='text-align:left;'>" + _scriptWord[0] + "</td>";
				}
			}

			if (_scriptWord[1] != undefined) {
				_str += "	<td style='text-align:left;'>" + _scriptWord[1] + "</td>";
			}

			_str += "<tr>";

			_speaker = _scriptWord[0];
		}
	}
	_str += "</table>";
	$(".scripts .scriptTxt").html(_str);
}

//영상 진행에 맞추어 자막 노출
var _bottomScriptTime = _metaData[2].custom[0].bottomScriptTime;

function scriptMath(n) {
	for (_s = 0; _s < _srtTime.length; _s++) {
		if (n >= _srtTime[_s] && n < _srtTime[_s + 1]) {
			$(".sync").hide();
			$(".sync").eq(_s).show();
			break;
		}
		else if(n >= _srtTime[_srtTime.length-1] && (_s + 1 == _srtTime.length)){
			$(".sync").hide();
			$(".sync").eq(_s).show();
		}
	}
}

//특정시간으로 이동
function skip(n) {
	if (n > _video.duration) {
		return;
	}
	_video.currentTime = n;
	if(typeof videoElement === 'undefined' || videoElement === null){

}else if(videoElement){
		videoElement.currentTime = n;
	}
	//play();
}

//전체 화면
function full() {
	if (_device.substring(0, 2) == "IP" && _type != "mp4") {
		alert("iPhone에서 \nHTML페이지 전체 화면 기능을 \n지원하지 않습니다.");
		return;
	}

	if (!$(".full").hasClass("min")) {
		if (_device != "PC" && _type == "mp4" && _device != "IPAD") {
			_video.webkitEnterFullscreen();
			return;
		}

		//아이콘 디자인
		if (_fontasome != false) {
			$(".full i").removeClass("fa-expand");
			$(".full i").addClass("fa-compress")
		} else {
			$(".bottom .full").css({
				"background-position-x": $(".bottom .full").css("width")
			});
		}
		$(".bottom .full").attr("title", "전체화면 종료");

		$(".full").addClass("min")

		if ($("#page")[0].requestFullscreen) {
			$("#page")[0].requestFullscreen();
		} else if ($("#page")[0].webkitRequestFullscreen) {
			$("#page")[0].webkitRequestFullscreen();
		} else if ($("#page")[0].mozRequestFullScreen) {
			$("#page")[0].mozRequestFullScreen();
		} else if (_page.msRequestFullscreen) {
			$("#page")[0].msRequestFullscreen();
		}

		//화면 비율로 frame크기를 조정해준다.
		var _fullResizePer = screen.height / _height;
		$(".frame").css({
			"transform": "scale(" + _fullResizePer + ") translate(-50%, -50%)"
		})
	} else {
		//아이콘 디자인
		if (_fontasome != false) {
			$(".full i").removeClass("fa-compress")
			$(".full i").addClass("fa-expand");
		} else {
			$(".bottom .full").css({
				"background-position-x": "0px"
			});
		}
		$(".bottom .full").attr("title", "전체화면");
		$(".full").removeClass("min")

		if (document.exitFullscreen) {
			//크롬 71에서 오류가 발생하여 try문으로 처리
			try {
				document.exitFullscreen();
			} catch (e) {
				console.log('크롬 71에서 오류' + e);
			}

		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}

		$(".frame").css({
			"transform": "scale(1) translate(-50%, -50%)"
		})
	}
}
//배속조절
var _rate;

function rate(n) {
	if ($(".rateCon").css("display") == "none") {
		$(".rateCon").css({
			"opacity": 1
		});

		$(".rateCon").fadeIn();
		$(".volum").fadeOut();
	} else {
		$(".rateCon").fadeOut();
	}

	_rate = n;

	//$(".rateBtn").eq(n).html();
	if (_rate != undefined) {
		var _rateFocus = 0;
		for (var _r = 0; _r < $(".rateBtn").length; _r++) {
			if (Number($(".rateBtn").eq(_r).html().split("X").join("")) == n) {
				_rateFocus = _r;
			}
		}


		$(".rateBtn").removeClass("check");
		$(".rateBtn").eq(_rateFocus).addClass("check");
			_video.playbackRate = _rate;
			if(typeof videoElement === 'undefined' || videoElement === null){

		}
		else if(videoElement){
			videoElement = panorama.videoElement;
			videoElement.playbackRate = _rate;
			}
		//쿠키저장
		cookie.set(_videoPath + "_rate", _rate);
	}
}
////////////////////////////////////////////////////////////////////////////////////////////
//페이지 이동
////////////////////////////////////////////////////////////////////////////////////////////
//자동재생
function autoplay() {
	if ($(".autoplay").hasClass("auto")) {
		//자동재생
		$(".autoplay").removeClass("auto");
		//$(".autoplay").html("none")
		if (_fontasome != false) {

		} else {
			$(".autoplay").css({
				"background-position-x": "0px"
			});
		}
		//$(".autoplay").attr("title", "페이지 자동 넘김 중지");
		$(".autoplay h3").html("페이지 자동 넘김 중지");

		//쿠키저장
		cookie.set(_videoPath + "_autoplay", "none");
		if (_page < _pageLength) {
			clearInterval(_autoSetInterval);
			$(".end .endFill").removeClass("endFillAni");
			$(".end .endTxt").html("다음페이지로 이동");
		}
	} else {
		//자동재생 해제
		$(".autoplay").addClass("auto");
		//$(".autoplay").html("auto")
		if (_fontasome != false) {

		} else {
			$(".autoplay").css({
				"background-position-x": $(".autoplay").css("width")
			});
		}
		//$(".autoplay").attr("title", "페이지 자동 넘김 재생");
		$(".autoplay h3").html("페이지 자동 넘김 재생");

		//쿠키저장
		cookie.set(_videoPath + "_autoplay", "auto");

		if (_page < _pageLength) {
			autoplaySet();
		}
	}
}

var _client = _metaData[2].custom[0].client;

function pageMove(n) {
	if (n == "next") {
		if (_page > (_pageLength - 1)) {
			alert("마지막 페이지 입니다.");
			_page = _pageLength
			return;
		} else {
			_page += 1;
		}

	} else if (n == "prev") {
		if (_page < 2) {
			alert("첫 페이지 입니다.");
			return;
		} else {
			_page -= 1;
		}
	} else {
		_page = n;
	}

	if (_client == "teacherville") {
		location.href = trance.str(_chasi) + "_" + trance.str(_page) + ".html";
	} else if (_client == "hunet") {
		if (location.href.indexOf("hunet") != -1) {
			if (_compulsory) {
				if(n=="next" && $(".end").css("display")=="none"){
				   alert("학습 완료 후 이동 가능합니다.");
				   return;
				}
			}
			
			top.navi_frame.FnNextMove(trance.str(_chasi) + "_" + trance.str(_page) + ".html");
		} else {
			//local
			location.href = trance.str(_chasi) + "_" + trance.str(_page) + ".html";
		}
	} else {
		location.href = trance.str(_page) + ".html";
	}
}
//
function PIP() {
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture();
		$(".PIP").css({
			"background-position-x": "0px"
		})

	} else {
		if (document.pictureInPictureEnabled) {
			_video.requestPictureInPicture();
			$(".PIP").css({
				"background-position-x": $(".PIP").css("width")
			})
		}
	}
}

//
var _resizePer;
function resize() {
	var _pw = _width;
	var _ph = _height;

	var _iw = self.innerWidth;
	var _ih = self.innerHeight;

	if (_iw > _ih) {
		_resizePer = _ih / _ph;
	} else {
		_resizePer = _iw / _pw;
	}

	//아이패드와 같이 1:9비율이 아닌경우
	if (_iw < (_pw * _resizePer)) {
		_resizePer = _iw / _pw;
	}

	if (_ih < (_ph * _resizePer)) {
		_resizePer = _ih / _ph;
	}

	if (_resizePer > 1) {
		_resizePer = 1;
	}

	//기본 크기가 FHD(1920)보다 작은경우 해당 비율로 크기조정을 한다.
	var _htmlper = _pw / 1920;
	$(".htmlPage").css({
		"transform-origin": "0% 0%",
		"transform": "scale(" + _htmlper + ")"
	});

	//_device="ANDROID"
	//20220522 좌우에 20px간격을 준다.
	var _paddingiw;
	if (_device == "PC") {
		//PC
		if(_type == 'vrmp4'){
			$(".frame").css({
				"transform": "translate(-50%, 0%) scale(1) !important"
			});
			$("#video").css({
				"width": "100%",
				"height": "100%",
				"transform": "scale(" + _resizePer + ")"
			});
		}else{
			$(".frame").css({
				"transform": "translate(-50%, -50%) scale(" + _resizePer + ")"
				//"transform-origin":"center top",
				//"transform": "translate(-50%, 0%) scale(" + _resizePer + ")"
			});
		}

		$(".progress").css({
			"top": -_bottomProgressHeight + "px"
		});

		$(".menu").removeClass("menuVertical");
		$(".menu").removeClass("menuHorizontal");

		$(".bottom").removeClass("bottomVertical");
		$(".bottom").removeClass("bottomHorizontal");

		$(".additional").show();

		$(".progress").css({
			"left": "20px"
		})

		//20220810:PC화면에서 화면 크기에 맞춰 조절될수 있도록 추가
		$(".title").css({
			"transform-origin":"0% 0%",
			"transform": "scale(" + _resizePer + ")"
		});
		$(".logo").css({
			"transform-origin":"100% 0%",
			"transform": "scale(" + _resizePer + ")"
		});
		

		$(".menu").css({
			"height": 100 * (1 / _resizePer) + "%",
			"transform-origin": "0% 0%",
			"transform": "scale(" + _resizePer + ")"
		});

		$(".bottom").css({
			"transform-origin":"center bottom",
		});
		if (!isMac && !isMobile) {
		$(".bottom").css({
			"transform": "translate(-50%, 0%) scale(" + _resizePer + ")"
		});
		}
		$(".bottom .bg").css({
			width: _width*(2.1-_resizePer)+"px"
		})

		//_paddingiw = _iw - 40;
		_paddingiw = _pw - 40;
	} else {
		if (_iw > _ih) {
			//가로
			$(".frame").removeClass("frameHorizontal");

			if(_type == 'vrmp4'){
				$(".frame").css({
					"transform": "translate(-50%, 0%) scale(1) !important"
				});
				$("#video").css({
					"width": "100%",
					"height": "100%",
					"transform": "scale(" + _resizePer + ")"
				});
			}else{
				$(".frame").css({
					"transform": "translate(-50%, -50%) scale(" + _resizePer + ")"
					//"transform-origin":"center top",
					//"transform": "translate(-50%, 0%) scale(" + _resizePer + ")"
				});
			}



			$(".progress").css({
				"top": -_bottomProgressHeight + "px"
			});

			$(".menu").removeClass("menuVertical");
			$(".menu").addClass("menuHorizontal");
			$(".menuHorizontal").css({
				"top": "0px",
				"height": _ih - (_bottomHeight * 2) + "px",
				"left": "-667px",
				"padding-bottom": _bottomHeight + "px",
				"display": "none"
			})

			$(".bottom").removeClass("bottomVertical");
			$(".bottom").addClass("bottomHorizontal");

			
			$(".bottom").css({
				"transform-origin":"center bottom",
			});
			if (!isMac && !isMobile) {
			$(".bottom").css({
				"transform": "translate(-50%, 0%) scale(" + _resizePer + ")"
			});
		}

			$(".bottom").css({"width":_iw+"px","left":"0%"})
			//
			//$(".bottom .time").css({"top":"-60px","left":"10px"});
			//$(".bottom .time div").css({
			//	"text-shadow": "0px 0px 5px #000"
			//});

			//$(".end").css({
			//	"top": ""
			//});

			
			
			/*
			$(".scripts .scriptTxt table").css({
				"height": "60px"
			})
			*/
			$(".scripts").css({
				"height": "40px",
				"bottom": Number(_bottomHeight) + Number(_bottomProgressHeight) + "px"
			})
			$(".scriptArea").css({
				"height": "40px",
			})
			

			_paddingiw = _iw - 40;
			//_paddingiw = _pw - 40;
			$(".progress").css({
				"left": "20px"
			})
			//
		} else {
			//세로
			$(".frame").addClass("frameHorizontal");
			$(".frame").css({
				"transform": "scale(" + _resizePer + ")",
			});

			$(".progress").css({
				"top": -(_ih - _bottomHeight - (_ph * _resizePer) + (_bottomProgressHeight * 1)) + "px",
				"left": "0px"
			});

			$(".pages").css({
				"top": -(_ih - _bottomHeight - (_ph * _resizePer) + (_bottomProgressHeight * 1)) - ((_ph/2) * _resizePer)-($(".pages").height()/2) + "px",
				"width":"100%"
			});
			$(".pages .nextPage").css({
				//"left": (_pw*_resizePer) - $(".pages .nextPage").width() + "px",
			});

			
			$(".time").css({
				"top": -(_ih - _bottomHeight - (_ph * _resizePer) + (_bottomProgressHeight * 1)) -($(".time").height())+ "px"
			});
			

			$(".menu").addClass("menuVertical");
			$(".menu").removeClass("menuHorizontal");
			$(".menu").css({
				"left": "0px",
				"display": "block"
			})
			$(".menuVertical").css({
				"top": (_ph * _resizePer) + "px",
				"height": _ih - ((_ph * _resizePer) + (_bottomHeight * 2)) + "px",
				"padding-bottom": _bottomHeight + "px"
			})

			$(".bottom").addClass("bottomVertical");
			$(".bottom").removeClass("bottomHorizontal");

			$(".bottom").css({"width":_iw+"px","left":"0%"})

			$(".rateBtn").css({
				"text-align": "left",
				"padding-left": "20px"
			})

			$(".end").css({
				"top": -(_ih - _bottomHeight - (_ph * _resizePer) + ($(".end").height() + 20)) + "px"
			});

			$(".scripts").css({
				"height": "40px",
				"bottom": _bottomHeight + "px"
			})
			$(".scriptArea").css({
				"height": "40px",
			})
			_paddingiw = _iw;
			//_paddingiw = _pw;
		}

	}

	//console.log(_paddingiw)
	$(".progress .area").css({
		"width": (_paddingiw) + "px"
	});
	$(".progress .fill").css({
		"width": ((_paddingiw) * (_video.currentTime / _video.duration)) + "px"
	});
	$(".progress .point").css({
		"left": ((_paddingiw) * (_video.currentTime / _video.duration)) + "px"
	});
	$(".addConArea").css({
		"top": ((_ph / 2) * _resizePer) + "px",
		"transform": "scale(" + _resizePer + ")"
	});
}

function effect(s) {
	var _eurl = "../common/mp3/" + s + ".mp3";
	$("#effect")[0].src = _eurl;
	$("#effect")[0].play();
}


//다국어 자막
function multilingual(t){
	var _select=$(t).children("option:selected").val();
	if(_select=="none"){
		$(".scripts").fadeOut();
	}else{
		_scriptData=_multilingualScriptData[_select]
		if(_scriptData==undefined){
			$(".scripts").fadeOut();
			return;
		}
		setScript();

		$(".scripts").fadeIn();

		if (_indexAlignType == "bottom" && $(".menu").css("display") != "none") {
			index();
		}
	}
}

//수화제공
var _handswap=false;
function hand(){
	_handswap=true;

	var _currentTime=_video.currentTime;
	if(_video.src.indexOf("hand")!=-1){
		_video.src = _videoPath + _videoSrc;
	}else{
		var _handsrc=_videoSrc.split(".mp4").join("_hand.mp4");
		_video.src = _videoPath + _handsrc;
	}
	
	_video.currentTime=_currentTime;
}

//교안다운로드
function down(){
	window.open('../common/down/file_'+_chasi+'.zip','_blank');
}

//시간안내 위치조정
function time(n){
	//trance.px($(".progress").css("left"))+
	
	var _left=trance.px($(".progress").css("left"))
	var _min=$(".time").width()/2;
	var _max=$(".progress .area").width();

	n=n+_left

	if(n<(_min+_left)){
		n=_min+_left;
	}else if(n>((_max-_min)+_left)){
		n=(_max-_min)+_left
	}
	
	$(".time").css({
		"left": n-_min + "px"
	});
}
// 포인트형 북마크
function mark() {
	document.cookie = "bookmarkon = true";

	var _markpoint="";
	var sp = $(".point").css("left")
	var new_str = sp.slice(0, -2);
	var savepoint = (10 + Number(new_str))
	_markpoint+="<div class='markpoint' val="+_video.currentTime+"></div>";

	$(".mark").append(_markpoint);
	if($(".markpoint").length == 0){
		$(".markpoint").css("left",savepoint)
	}else if($(".markpoint").length > 0){
		$(".markpoint:last-child").css("left",savepoint)
	}
	//북마크 기능 추가
	var fullUrl = window.location.href;
  var parts = fullUrl.split('/');
  var newUrl = parts.slice(parts.length - 4).join('/');
  console.log(newUrl);
	var bookCookie = newUrl +"|"+ savepoint +"|"+ _video.currentTime;
	document.cookie = bookCookie + "=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
	ccnum ++;

	markon()
}

function markon() {
	$(".mark > div").on("click", function () {
		var bmove = $(this).attr("val")
		console.log(bmove)
		_video.currentTime = bmove
		if(typeof videoElement === 'undefined' || videoElement === null){
	
		}
		else if(videoElement){
			videoElement.currentTime = bmove
		}
	});
}



function vrtransform() {
	console.log("영상 전환")
}
// 포인트형 북마크