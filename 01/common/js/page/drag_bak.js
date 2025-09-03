console.log("drag");

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _drag = _pageData.drag;
var _dragImgTime;
var _dragImg;

//if(!_htmlmp4){
	if (typeof _prevdrag == "undefined") {
		_dragImgTime = trance.array(_metaData[2].custom[0].dragImgTime);
		_dragImg = _metaData[2].custom[0].dragImg;
	} else {
		_dragImgTime = trance.array(_metaData[2].custom[0].pdragImgTime);
		_dragImg = _metaData[2].custom[0].pdragImg;
	}
//}

var _dragPage;
var dropCount = 0; //드랍 개수

var _tl = new TimelineLite();
////////////////////////////////////////////////////////////////////////////////////////////
//css적용
////////////////////////////////////////////////////////////////////////////////////////////
$("#page").append('<link rel="stylesheet" type="text/css" href="../common/css/' + _type + '.css">') 
{
	////////////////////////////////////////////////////////////////////////////////////////////
	//페이지 구성
	////////////////////////////////////////////////////////////////////////////////////////////
	var _str = "";
	for (var _q = 0; _q < (_dragImgTime.length); _q++) {
		_str += "<div class='img drag" + _q + "'></div>";
	}

	//사전퀴즈는 커버 & 결과안내를 구성하지 않는다.
	if (typeof _prevdrag == "undefined") {
		//커버페이지
		_str += "<div class='drags'>"

		//퀴즈 컨테이너
		_str += "<div class='drag page0'>"

		//_str+="	<div class='imgtxt'>오늘 학습한 내용을 <br/>문제를 풀며 점검해 보겠습니다.</div>";
		_str += "	<button class='start' role='button' tabindex='0' onclick='dragSet(1);'>start</button>";
		_str += "</div>"
	} else {
		//사전퀴즈의 경우 1번 문제부터 시작하기에 기본값을 1로 지정한다.
		_dragPage = 1;

		//퀴즈 컨테이너
		_str += "<div class='drags'>"
	}

	//퀴즈 구성
	// for (var _i = 0; _i < _drag.length; _i++) {
	// }

	var _a = 0;
	var _b = 1;
	var _c = 2;

	//1페이지
	
	var _dragType = _drag[_a].type;
	//지문에 부정형 단어가 있는경우 색을 달리한다.
	var _question = setColor(_drag[_a].question);

	var _sample = _drag[_a].sample;
	_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")

	var _right = _drag[_a].right;
	_right = multiple(_right); //복수의 정답인 경우 변환한다.

	var _explanation = _drag[_a].explanation;
	var _viewerMultiChoiceArrList = _drag[_a].viewerMultiChoiceArrList[0];

	_str += '<div class="drag page' + (_a + 1) + ' dragPage">';
	// _str += '	<div class="no">Q' + (_a + 1) + '. </div>';
	_str += '	<div class="question"><span class="qtxt">' + _question + '</span></div>';
	if (_sample != "") {
		if(_sample.indexOf("img")!=-1){
			_str += '	<div class="sample imgsample">';
			_str += _sample;
		}else{
			_str += '	<div class="sample">';
			_str += '		<div class="scroll">' + _sample + '</div>';
		}
		
		_str += '	</div>';
	}
	_str += '	<div class="feed0"></div>';
	_str += '	<div class="block"></div>';
	_str += '	<div class="hint">';
	if (_a == (_drag.length - 1)) {
		if (typeof _prevdrag == "undefined") {
			_str += '	<button class="result" role="button" tabindex="0" onclick="dragSet(' + (_a + 2) + ')">result</button>';
		}
	} else {
		_str += '	<button class="next" role="button" tabindex="0" onclick="dragSet(' + (_a + 2) + ')">next</button>';
	}
	// _str += '		<div class="right">' + _right + '</div>';
	_str += '		<div class="infocon">';
	_str += '			<div class="scroll">' + _explanation + '</div>';
	_str += '		</div>';
	_str += '	</div>';
	_str += '	<div class="feed1"></div>';

	_str += '</div>';

	//2페이지
	
	var _dragType = _drag[_b].type;
	//지문에 부정형 단어가 있는경우 색을 달리한다.
	var _question = setColor(_drag[_b].question);

	var _sample = _drag[_b].sample;
	_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")

	var _right = _drag[_b].right;
	_right = multiple(_right); //복수의 정답인 경우 변환한다.

	var _explanation = _drag[_b].explanation;
	var _viewerMultiChoiceArrList = _drag[_b].viewerMultiChoiceArrList[0];

	_str += '<div class="drag page' + (_b + 1) + ' dragPage">';
	// _str += '	<div class="no">Q' + (_b + 1) + '. </div>';
	_str += '	<div class="question"><span class="qtxt">' + _question + '</span></div>';
	if (_sample != "") {
		if(_sample.indexOf("img")!=-1){
			_str += '	<div class="sample imgsample">';
			_str += _sample;
		}else{
			_str += '	<div class="sample">';
			_str += '		<div class="scroll">' + _sample + '</div>';
		}
		
		_str += '	</div>';
	}
	_str += '	<div class="feed0"></div>';
	_str += '	<div class="block"></div>';
	_str += '	<div class="hint">';
	if (_b == (_drag.length - 1)) {
		if (typeof _prevdrag == "undefined") {
			_str += '	<button class="result" role="button" tabindex="0" onclick="dragSet(' + (_b + 2) + ')">result</button>';
		}
	} else {
		_str += '	<button class="next" role="button" tabindex="0" onclick="dragSet(' + (_b + 2) + ')">next</button>';
	}
	// _str += '		<div class="right">' + _right + '</div>';
	_str += '		<div class="infocon">';
	_str += '			<div class="scroll">' + _explanation + '</div>';
	_str += '		</div>';
	_str += '	</div>';
	_str += '	<div class="feed1"></div>';

	_str += '</div>';

	//3페이지
	
		var _dragType = _drag[_c].type;
		//지문에 부정형 단어가 있는경우 색을 달리한다.
		var _question = setColor(_drag[_c].question);
	
		var _sample = _drag[_c].sample;
		_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")
	
		var _right = _drag[_c].right;
		_right = multiple(_right); //복수의 정답인 경우 변환한다.
	
		var _explanation = _drag[_c].explanation;
		var _viewerMultiChoiceArrList = _drag[_c].viewerMultiChoiceArrList[0];
	
		_str += '<div class="drag page' + (_c + 1) + ' dragPage">';
		// _str += '	<div class="no">Q' + (_c + 1) + '. </div>';
		_str += '	<div class="question"><span class="qtxt">' + _question + '</span></div>';
		if (_sample != "") {
			if(_sample.indexOf("img")!=-1){
				_str += '	<div class="sample imgsample">';
				_str += _sample;
			}else{
				_str += '	<div class="sample">';
				_str += '		<div class="scroll">' + _sample + '</div>';
			}
			
			_str += '	</div>';
		}
		_str += '	<div class="feed0"></div>';
		_str += '	<div class="block"></div>';
		_str += '	<div class="hint">';
		if (_c == (_drag.length - 1)) {
			if (typeof _prevdrag == "undefined") {
				_str += '	<button class="result" role="button" tabindex="0" onclick="dragSet(' + (_c + 2) + ')">result</button>';
			}
		} else {
			_str += '	<button class="next" role="button" tabindex="0" onclick="dragSet(' + (_c + 2) + ')">next</button>';
		}
		// _str += '		<div class="right">' + _right + '</div>';
		_str += '		<div class="infocon">';
		_str += '			<div class="scroll">' + _explanation + '</div>';
		_str += '		</div>';
		_str += '	</div>';
		_str += '	<div class="feed1"></div>';
	
		_str += '</div>';


	//결과페이지
	if (typeof _prevdrag == "undefined") {
	

		if(_drag.length<=3){
			_str += '<div class="drag page' + (_drag.length + 1) + ' resultPage">';


		}else{
			_str += '<div class="drag page' + (_drag.length + 1) + ' resultPage feedNone">';
		}
		

		// _str += '	<div class="rtxt"></div>'; // 결과화면 텍스트
		_str += '		<button class="retry" role="button" tabindex="0" onclick="dragSet(1)">retry</button>';
		_str += '</div>';
	}
	_str += "</div>"

	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//페이지 커스텀
		////////////////////////////////////////////////////////////////////////////////////////////
		for (var _i = 0; _i < $(".drags").children().length; _i++) {
			$(".drag").eq(_i).css({
				/*
				"width": _width + "px",
				"height": _height + "px",
				"left": (_width * _i) + "px"
				*/
				"width": "1920px",
				"height": "1080px",
				"left": (1920 * _i) + "px"
			})
		}

		$(".htmlPage .scroll").mCustomScrollbar({
			theme: "light-3",
			scrollInertia: 0,
			mouseWheelPixels: 18
		});

		//모바일의 경우 기본 스크롤로 대체한다.
		if (_device != "PC" && _device.substring(0, 2) != "IP") {
			$(".htmlPage .scroll").mCustomScrollbar("destroy");
			$(".htmlPage .scroll").css("overflow", "auto");
		}

		////////////////////////////////////////////////////////////////////////////////////////////
		//등장 모션
		////////////////////////////////////////////////////////////////////////////////////////////
		//_dragImg[_s].duration="0";
		//_dragImg[_s].ease="Power1.out";
		//_dragImg[_s].onComplete="dragReset";
		
		_tl.to($('.img').eq(_s), {
			duration: 0,
			onComplete: dragReset
		}, _dragImgTime[_s]);
		_tl.eventCallback("onComplete", dragReset)

		if(!_htmlmp4){
			for (var _s = 0; _s < _dragImgTime.length; _s++) {
				_dragImg[_s].duration = "0.5";
				_dragImg[_s].ease = "Power1.out";
				_tl.to($('.img').eq(_s), _dragImg[_s], _dragImgTime[_s]);
			}
			_dragImg[_dragImgTime.length - 1].duration = "0.5";
			_dragImg[_dragImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.drags'), _dragImg[_dragImgTime.length - 1], _dragImgTime[_dragImgTime.length - 1]);
		}else{
			_dragImg[_dragImgTime.length - 1].duration = "0.5";
			_dragImg[_dragImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.drags'), _dragImg[_dragImgTime.length - 1], _video.duration-1);
			// 퀴즈 시작 타이밍 조절
		}
		
		clearTimeout(_setTimeout);
		
	}, 100);
};


////////////////////////////////////////////////////////////////////////////////////////////
//function
////////////////////////////////////////////////////////////////////////////////////////////
function dragReset() {
	if (typeof _prevdrag == "undefined") {
		_dragPage = undefined;
	} else {
		$(".result").show();
		_dragPage = 1;
	}

	_tryCount = 1;

	$(".drags").css({
		"left": "0px"
	})
	$(".drags .inputfield").val("");
	$(".drags .block").hide();
	$(".drags .hint").hide();
	$(".drags .feed0").hide();
	$(".drags .ok").show();
	dropCount = 0 // 드랍 개수 초기화
}

function dragSet(n) {
	if (_dragPage == undefined) {
		//skip(_video.duration-0.5);
		skip(_video.duration);

		//_video.currentTime = _video.duration;
		//_video.stop();
		//_video.play();

		//end(true, true);
	} else {
		//다시 풀기의 경우
		if (n == 1) {
			//정답 카운트 리셋
			_rightCount = 0;
		}
	}

	_dragPage = n;

	//사전퀴즈등에서 더이상 이동할 퀴즈 페이지가 없는경우 바로 학습완료해준다.
	if (n > $(".drags").children().length) {
		_endLock = true;
		//_video.currentTime = (_video.duration * 0.99);
		//_video.play();
		end(true, true);

		//
		$(".result").hide();
		return;
	}
	$(".drags").animate({
		//left: -(_width * n) + "px"
		left: -(1920 * n) + "px"
	}, {
		complete: function () {
			//다시 해당 퀴즈가 진행될것을 대비하여 선택된 내용등 변형된 부분들을 원상복귀한다.
			$(".drags .inputfield").val("");
			$(".drags .block").hide();
			$(".drags .hint").hide();
			$(".drags .feed0").hide();
			$(".drags .ok").show();
			dropCount = 0 // 드랍 개수 초기화
			//마지막 페이지의 경우 학습완료 안내
			if (n == ($(".drags").children().length - 1)) {
				end(true, true);
			} else {
				end(false, true);
			}
		}
	});
}

//객관식 버튼 체크
function btnCheck(v) {
	if ($(".drags .page" + _dragPage + " .btn").eq(v).hasClass("check")) {
		$(".drags .page" + _dragPage + " .btn").eq(v).removeClass("check");
	} else {
		$(".drags .page" + _dragPage + " .btn").eq(v).addClass("check");
	}
}

//정오답 확인
var _tryCount = 1;
var _rightCount = 0;

function dragCheck(v) {
	var _try;
	var _right = $(".drags .page" + _dragPage + " .right").html();

	if (_drag[_dragPage - 1].type == "00") {
		//O,X
		//$(".drags .page"+_dragPage+" .btns button").removeClass("check");
		if (v == "O") {
			$(".drags .page" + _dragPage + " .btns .oxbtn0").addClass("check");
		} else {
			$(".drags .page" + _dragPage + " .btns .oxbtn1").addClass("check");
		}

		_try = v;
	} else if (_drag[_dragPage - 1].type == "03") {
		//주관식
		_try = $(".drags .page" + _dragPage + " .inputfield").val();
		_try = _try.split(" ").join("");
		if (_try == "") {
			alert("정답을 입력후 확인 버튼을 눌러주세요.");
			return;
		}
	} else {
		//객관식
		_try = new Array();
		$(".drags .page" + _dragPage + " .btn").removeClass("check");

		for (var _v = 0; _v < $(".drags .page" + _dragPage + " .btns").children().length; _v++) {
			$(".drags .page" + _dragPage + " .btn").eq(v).addClass("check");

			if ($(".drags .page" + _dragPage + " .btn").eq(_v).hasClass("check")) {
				_try.push((_v + 1));
			}
		}
		if (_try.length < 1) {
			alert("정답을 체크후 확인 버튼을 눌러주세요.");
			return;
		}
		_try = _try.toString();
	}

	//정오답 확인
	if (_try == _right) {
		effect("correct");
		_tryCount = 1;

		$(".drags .page" + _dragPage + " .feed0").css({
			"background-position-x": "0px"
		});
		infoShow();

		_rightCount += 1;
		//결과 적용
		$(".resultPage .resultFeed .feed").eq(_dragPage - 1).css({
			"background-position-x": "0px"
		});

		//다음안내
		$(".next").focus();
		$(".result").focus();
	} else {
		effect("wrong");

		$(".drags .page" + _dragPage + " .feed0").css({
			"background-position-x": $(".drags .page" + _dragPage + " .feed0").css("width")
		});
		if (_drag[_dragPage - 1].type == "00") {
			//O,X의 경우 한번의 기회만 제공
			infoShow();

			//정답안내
			if (_right == "O") {
				$(".drags .page" + _dragPage + " .btns .oxbtn0").addClass("okview");
			} else {
				$(".drags .page" + _dragPage + " .btns .oxbtn1").addClass("okview");
			}

			$(".resultPage .resultFeed .feed").eq(_dragPage - 1).css({
				"background-position-x": $(".resultPage .resultFeed .feed").eq(_dragPage - 1).css("width")
			});
		} else {
			if (_tryCount < 2) {
				_tryCount += 1;
			} else {
				_tryCount = 1;
				infoShow();

				//정답안내
				$(".drags .page" + _dragPage + " .btn").eq(Number(_right) - 1).addClass("okview")

				$(".resultPage .resultFeed .feed").eq(_dragPage - 1).css({
					"background-position-x": $(".resultPage .resultFeed .feed").eq(_dragPage - 1).css("width")
				});

				//다음안내
				$(".next").focus();
				$(".result").focus();
			}
		}
	}

	//결과 적용
	$(".resultPage .rtxt").html("총" + _drag.length + "문제중 " + _rightCount + "문제를 맞히셨습니다.");

	//feed
	$(".drags .page" + _dragPage + " .feed0").show();

}

function infoShow() {
	//ok
	$(".drags .page" + _dragPage + " .ok").hide();

	$(".drags .page" + _dragPage + " .block").show();
	$(".drags .page" + _dragPage + " .hint").show();

	//사전퀴즈의 경우 바로 다음페이지를 안내한다.
	if (typeof _prevdrag != "undefined") {
		dragSet(((_drag.length) + 1))
	}
}

//부정형 단어 색적용
function setColor(s) {
	var _rwords = ["못한", "잘못된", "잘못", "않한", "없는", "않은", "않는", "잘못된", "틀린", "다른", "아닌", "어려운", "먼", "않게"];
	for (j = 0; j < _rwords.length; j++) {
		s = s.split(_rwords[j]).join('<span class="red">' + _rwords[j] + '</span>')
		s = s.split('!<span class="red">' + _rwords[j] + '</span>').join(_rwords[j])
	}

	return s;
}


//복수의 정답 변환
function multiple(s) {
	var _ss = s.split("[,]");
	_ss = $.grep(_ss, function (n) {
		return n == " " || n;
	}); // 배열 빈요소 제거
	return _ss;
}
