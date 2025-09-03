console.log("quiz");

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _quiz = _pageData.quiz;
var _quizImgTime;
var _quizImg;

//if(!_htmlmp4){
	if (typeof _prevQuiz == "undefined") {
		_quizImgTime = trance.array(_metaData[2].custom[0].quizImgTime);
		_quizImg = _metaData[2].custom[0].quizImg;
	} else {
		_quizImgTime = trance.array(_metaData[2].custom[0].pquizImgTime);
		_quizImg = _metaData[2].custom[0].pquizImg;
	}
//}

var _quizPage;

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
	for (var _q = 0; _q < (_quizImgTime.length); _q++) {
		_str += "<div class='img quiz" + _q + "'></div>";
	}

	//사전퀴즈는 커버 & 결과안내를 구성하지 않는다.
	if (typeof _prevQuiz == "undefined") {
		//커버페이지
		_str += "<div class='quizs'>"

		//퀴즈 컨테이너
		_str += "<div class='quiz page0'>"

		//_str+="	<div class='imgtxt'>오늘 학습한 내용을 <br/>문제를 풀며 점검해 보겠습니다.</div>";
		_str += "	<button class='start' role='button' tabindex='0' onclick='quizSet(1);'>start</button>";
		_str += "</div>"
	} else {
		//사전퀴즈의 경우 1번 문제부터 시작하기에 기본값을 1로 지정한다.
		_quizPage = 1;

		//퀴즈 컨테이너
		_str += "<div class='quizs'>"
	}

	//퀴즈 구성
	for (var _i = 0; _i < _quiz.length; _i++) {
		/*
		console.log(_quiz[_i].type)
		console.log(_quiz[_i].question)
		console.log(_quiz[_i].sample)
		console.log(_quiz[_i].right)
		console.log(_quiz[_i].explanation)
		console.log(_quiz[_i].viewerMultiChoiceArrList)
		*/

		var _quizType = _quiz[_i].type;
		//지문에 부정형 단어가 있는경우 색을 달리한다.
		var _question = setColor(_quiz[_i].question);

		var _sample = _quiz[_i].sample;
		_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")

		var _right = _quiz[_i].right;
		_right = multiple(_right); //복수의 정답인 경우 변환한다.

		var _explanation = _quiz[_i].explanation;
		var _viewerMultiChoiceArrList = _quiz[_i].viewerMultiChoiceArrList[0];

		_str += '<div class="quiz page' + (_i + 1) + ' quizPage">';
		_str += '	<div class="no">Q' + (_i + 1) + '. </div>';
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

		//개별 s
		if (_quizType == "00") {
			//O,X
			if (_sample != "") {
				if(_sample.indexOf("img")!=-1){
					_str += '	<div class="btns">';
				}else{
					_str += '	<div class="btns samplebtn">';
				}
			} else {
				_str += '	<div class="btns">';
			}

			_str += '		<button class="oxbtn0" role="button" tabindex="0" onclick="quizCheck(\'O\');"></button><br/>';
			_str += '		<div class="line"></div>';
			_str += '		<button class="oxbtn1" role="button" tabindex="0" onclick="quizCheck(\'X\');"></button><br/>';
			_str += '	</div>';
		} else if (_quizType == "03") {
			//주관식
			if (_sample != "") {
				if(_sample.indexOf("img")!=-1){
					_str += '	<div class="btns">';
				}else{
					_str += '	<div class="btns samplebtn">';
				}
			} else {
				_str += '	<div class="btns">';
			}

			_str += '		<div class="inputdiv">';
			_str += '			<input class="inputfield" value="">';
			_str += '		</div>';
			_str += '	</div>';
			_str += '		<button class="ok" role="button" tabindex="0" onclick="quizCheck();">ok</button>';
		} else {
			//객관식
			if (_sample != "") {
				if(_sample.indexOf("img")!=-1){
					_str += '	<div class="btns">';
				}else{
					_str += '	<div class="btns samplebtn">';
				}
			} else {
				_str += '	<div class="btns">';
			}

			var _no = 1;
			for (let x in _viewerMultiChoiceArrList) {
				if (_viewerMultiChoiceArrList[x] != "") {
					if (_right.length > 1) {
						_str += '<button class="btn" onclick="btnCheck(' + (_no - 1) + ')"><span class="blit">' + _no + '</span><span class="txt">' + _viewerMultiChoiceArrList[x] + '</span></button>';
					} else {
						_str += '<button class="btn" onclick="quizCheck(' + (_no - 1) + ')"><span class="blit">' + _no + '</span><span class="txt">' + _viewerMultiChoiceArrList[x] + '</span></button>';
					}
					_no += 1;
				}
			}
			_str += '	</div>';
			if (_right.length > 1) {
				_str += ' <button class="ok" role="button" tabindex="0" onclick="quizCheck();">ok</button>';
			}
		}
		//개별 e
		_str += '	<div class="block"></div>';
		_str += '	<div class="hint">';

		if (_i == (_quiz.length - 1)) {
			if (typeof _prevQuiz == "undefined") {
				_str += '	<button class="result" role="button" tabindex="0" onclick="quizSet(' + (_i + 2) + ')">result</button>';
			}
		} else {
			_str += '	<button class="next" role="button" tabindex="0" onclick="quizSet(' + (_i + 2) + ')">next</button>';
		}

		_str += '		<div class="right">' + _right + '</div>';
		_str += '		<div class="infocon">';
		_str += '			<div class="scroll">' + _explanation + '</div>';
		_str += '		</div>';
		_str += '	</div>';
		_str += '	<div class="feed1"></div>';

		_str += '</div>';
	}

	//결과페이지
	if (typeof _prevQuiz == "undefined") {
	

		if(_quiz.length<=3){
			_str += '<div class="quiz page' + (_quiz.length + 1) + ' resultPage">';

			//결과 번호
			_str += '<div class="resultNo">';
			for (var _i = 0; _i < _quiz.length; _i++) {
				_str += '<span class="no">' + (_i + 1) + '</span>';
			}
			_str += '</div>';

			//결과 feed
			_str += '<div class="resultFeed">';
			for (var _i = 0; _i < _quiz.length; _i++) {
				_str += '<span class="feed"></span>';
			}
			_str += '</div>';
		}else{
			_str += '<div class="quiz page' + (_quiz.length + 1) + ' resultPage feedNone">';
		}
		

		_str += '	<div class="rtxt"></div>';
		_str += '		<button class="retry" role="button" tabindex="0" onclick="quizSet(1)">retry</button>';
		_str += '</div>';
	}
	_str += "</div>"

	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//페이지 커스텀
		////////////////////////////////////////////////////////////////////////////////////////////
		for (var _i = 0; _i < $(".quizs").children().length; _i++) {
			$(".quiz").eq(_i).css({
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
		//_quizImg[_s].duration="0";
		//_quizImg[_s].ease="Power1.out";
		//_quizImg[_s].onComplete="quizReset";
		
		_tl.to($('.img').eq(_s), {
			duration: 0,
			onComplete: quizReset
		}, _quizImgTime[_s]);
		_tl.eventCallback("onComplete", quizReset)

		if(!_htmlmp4){
			for (var _s = 0; _s < _quizImgTime.length; _s++) {
				_quizImg[_s].duration = "0.5";
				_quizImg[_s].ease = "Power1.out";
				_tl.to($('.img').eq(_s), _quizImg[_s], _quizImgTime[_s]);
			}
			_quizImg[_quizImgTime.length - 1].duration = "0.5";
			_quizImg[_quizImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.quizs'), _quizImg[_quizImgTime.length - 1], _quizImgTime[_quizImgTime.length - 1]);
		}else{
			_quizImg[_quizImgTime.length - 1].duration = "0.5";
			_quizImg[_quizImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.quizs'), _quizImg[_quizImgTime.length - 1], _video.duration-1);
			// 퀴즈 시작 타이밍 조절
		}
		
		clearTimeout(_setTimeout);
		
	}, 100);
};


////////////////////////////////////////////////////////////////////////////////////////////
//function
////////////////////////////////////////////////////////////////////////////////////////////
function quizReset() {
	if (typeof _prevQuiz == "undefined") {
		_quizPage = undefined;
	} else {
		$(".result").show();
		_quizPage = 1;
	}

	_tryCount = 1;

	$(".quizs").css({
		"left": "0px"
	})
	$(".quizs .btns .btn").removeClass("check");
	$(".quizs .btns .btn").removeClass("okview");

	$(".quizs .btns .oxbtn0").removeClass("check");
	$(".quizs .btns .oxbtn1").removeClass("check");
	$(".quizs .btns .oxbtn0").removeClass("okview");
	$(".quizs .btns .oxbtn1").removeClass("okview");
	$(".quizs .inputfield").val("");
	$(".quizs .block").hide();
	$(".quizs .hint").hide();
	$(".quizs .feed0").hide();

	//ok
	$(".quizs .ok").show();
}

function quizSet(n) {
	if (_quizPage == undefined) {
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

	_quizPage = n;

	//사전퀴즈등에서 더이상 이동할 퀴즈 페이지가 없는경우 바로 학습완료해준다.
	if (n > $(".quizs").children().length) {
		_endLock = true;
		//_video.currentTime = (_video.duration * 0.99);
		//_video.play();
		end(true, true);

		//
		$(".result").hide();
		return;
	}
	$(".quizs").animate({
		//left: -(_width * n) + "px"
		left: -(1920 * n) + "px"
	}, {
		complete: function () {
			//다시 해당 퀴즈가 진행될것을 대비하여 선택된 내용등 변형된 부분들을 원상복귀한다.
			$(".quizs .btns .btn").removeClass("check");
			$(".quizs .btns .btn").removeClass("okview");

			$(".quizs .btns .oxbtn0").removeClass("check");
			$(".quizs .btns .oxbtn1").removeClass("check");
			$(".quizs .btns .oxbtn0").removeClass("okview");
			$(".quizs .btns .oxbtn1").removeClass("okview");
			$(".quizs .inputfield").val("");
			$(".quizs .block").hide();
			$(".quizs .hint").hide();
			$(".quizs .feed0").hide();
			$(".quizs .ok").show();

			//마지막 페이지의 경우 학습완료 안내
			if (n == ($(".quizs").children().length - 1)) {
				end(true, true);
			} else {
				end(false, true);
			}
		}
	});
}

//객관식 버튼 체크
function btnCheck(v) {
	if ($(".quizs .page" + _quizPage + " .btn").eq(v).hasClass("check")) {
		$(".quizs .page" + _quizPage + " .btn").eq(v).removeClass("check");
	} else {
		$(".quizs .page" + _quizPage + " .btn").eq(v).addClass("check");
	}
}

//정오답 확인
var _tryCount = 1;
var _rightCount = 0;

function quizCheck(v) {
	var _try;
	var _right = $(".quizs .page" + _quizPage + " .right").html();

	if (_quiz[_quizPage - 1].type == "00") {
		//O,X
		//$(".quizs .page"+_quizPage+" .btns button").removeClass("check");
		if (v == "O") {
			$(".quizs .page" + _quizPage + " .btns .oxbtn0").addClass("check");
		} else {
			$(".quizs .page" + _quizPage + " .btns .oxbtn1").addClass("check");
		}

		_try = v;
	} else if (_quiz[_quizPage - 1].type == "03") {
		//주관식
		_try = $(".quizs .page" + _quizPage + " .inputfield").val();
		_try = _try.split(" ").join("");
		if (_try == "") {
			alert("정답을 입력후 확인 버튼을 눌러주세요.");
			return;
		}
	} else {
		//객관식
		_try = new Array();
		$(".quizs .page" + _quizPage + " .btn").removeClass("check");

		for (var _v = 0; _v < $(".quizs .page" + _quizPage + " .btns").children().length; _v++) {
			$(".quizs .page" + _quizPage + " .btn").eq(v).addClass("check");

			if ($(".quizs .page" + _quizPage + " .btn").eq(_v).hasClass("check")) {
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

		$(".quizs .page" + _quizPage + " .feed0").css({
			"background-position-x": "0px"
		});
		infoShow();

		_rightCount += 1;
		//결과 적용
		$(".resultPage .resultFeed .feed").eq(_quizPage - 1).css({
			"background-position-x": "0px"
		});

		//다음안내
		$(".next").focus();
		$(".result").focus();
	} else {
		effect("wrong");

		$(".quizs .page" + _quizPage + " .feed0").css({
			"background-position-x": $(".quizs .page" + _quizPage + " .feed0").css("width")
		});
		if (_quiz[_quizPage - 1].type == "00") {
			//O,X의 경우 한번의 기회만 제공
			infoShow();

			//정답안내
			if (_right == "O") {
				$(".quizs .page" + _quizPage + " .btns .oxbtn0").addClass("okview");
			} else {
				$(".quizs .page" + _quizPage + " .btns .oxbtn1").addClass("okview");
			}

			$(".resultPage .resultFeed .feed").eq(_quizPage - 1).css({
				"background-position-x": $(".resultPage .resultFeed .feed").eq(_quizPage - 1).css("width")
			});
		} else {
			if (_tryCount < 2) {
				_tryCount += 1;
			} else {
				_tryCount = 1;
				infoShow();

				//정답안내
				$(".quizs .page" + _quizPage + " .btn").eq(Number(_right) - 1).addClass("okview")

				$(".resultPage .resultFeed .feed").eq(_quizPage - 1).css({
					"background-position-x": $(".resultPage .resultFeed .feed").eq(_quizPage - 1).css("width")
				});

				//다음안내
				$(".next").focus();
				$(".result").focus();
			}
		}
	}

	//결과 적용
	$(".resultPage .rtxt").html("총" + _quiz.length + "문제중 " + _rightCount + "문제를 맞히셨습니다.");

	//feed
	$(".quizs .page" + _quizPage + " .feed0").show();

}

function infoShow() {
	//ok
	$(".quizs .page" + _quizPage + " .ok").hide();

	$(".quizs .page" + _quizPage + " .block").show();
	$(".quizs .page" + _quizPage + " .hint").show();

	//사전퀴즈의 경우 바로 다음페이지를 안내한다.
	if (typeof _prevQuiz != "undefined") {
		quizSet(((_quiz.length) + 1))
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
