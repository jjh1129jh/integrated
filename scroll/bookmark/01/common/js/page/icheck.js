console.log("icheck");

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _icheck = _pageData.icheck;
var _icheckImgTime;
var _icheckImg;

var chk1 = 0;
var chk2 = 0;
var chk3 = 0;
var wrongchk1 = 0;
var wrongchk2 = 0;

//if(!_htmlmp4){
	if (typeof _previcheck == "undefined") {
		_icheckImgTime = trance.array(_metaData[2].custom[0].icheckImgTime);
		_icheckImg = _metaData[2].custom[0].icheckImg;
	} else {
		_icheckImgTime = trance.array(_metaData[2].custom[0].picheckImgTime);
		_icheckImg = _metaData[2].custom[0].picheckImg;
	}
//}

var _icheckPage;

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
	for (var _q = 0; _q < (_icheckImgTime.length); _q++) {
		_str += "<div class='img icheck" + _q + "'></div>";
	}

	//사전퀴즈는 커버 & 결과안내를 구성하지 않는다.
	if (typeof _previcheck == "undefined") {
		//커버페이지
		_str += "<div class='ichecks'>"

		//퀴즈 컨테이너
		_str += "<div class='icheck page0'>"

		//_str+="	<div class='imgtxt'>오늘 학습한 내용을 <br/>문제를 풀며 점검해 보겠습니다.</div>";
		_str += "	<button class='start' role='button' tabindex='0' onclick='icheckeventStart();'>start</button>";
		_str += "</div>"
	} else {
		//사전퀴즈의 경우 1번 문제부터 시작하기에 기본값을 1로 지정한다.
		_icheckPage = 1;

		//퀴즈 컨테이너
		_str += "<div class='ichecks'>"
	}

	//퀴즈 구성
	// for (var _i = 0; _i < _icheck.length; _i++) {
	// }

	var _a = 0;
	var _b = 1;
	var _c = 2;

	//1페이지
	
	var _icheckType = _icheck[_a].type;
	//지문에 부정형 단어가 있는경우 색을 달리한다.
	var _question = setColor(_icheck[_a].question);

	var _sample = _icheck[_a].sample;
	_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")

	var _right = _icheck[_a].right;
	_right = multiple(_right); //복수의 정답인 경우 변환한다.

	var _explanation = _icheck[_a].explanation;
	var _viewerMultiChoiceArrList = _icheck[_a].viewerMultiChoiceArrList[0];

	_str += '<div class="icheck page' + (_a + 1) + ' icheckPage">';
	// _str += '	<div class="no">Q' + (_a + 1) + '. </div>';
	_str += '	<div class="question"><h2 class="qtxt">' + _question + '</h2></div>';
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

//1페이지

//컨텐츠영역
_str += '		<div id="icheckBox">';
_str += '			<ul class="checkgroup">';
_str += '				<li class="chkcon1 chkcon"></li>';
_str += '				<li class="chkcon2 chkcon"></li>';
_str += '				<li class="chkcon3 chkcon"></li>';
_str += '				<li class="chkcon4 chkcon"></li>';
_str += '				<li class="chkcon5 chkcon"></li>';
_str += '			</ul>  ';
_str += '			<div class="textgroup">';
_str += '				<img class="textcon1 textcon" src="../common/img/icheck/01/textcon1_o.png"></img>';
_str += '				<img class="textcon2 textcon" src="../common/img/icheck/01/textcon2_o.png"></img>';
_str += '				<img class="textcon3 textcon" src="../common/img/icheck/01/textcon3_o.png"></img>';
_str += '				<img class="textcon4 textcon" src="../common/img/icheck/01/textcon4_o.png"></img>';
_str += '				<img class="textcon5 textcon" src="../common/img/icheck/01/textcon5_o.png"></img>';
_str += '				<img class="resultimg" src="../common/img/icheck/01/yellow.png"></img>';
_str += '			</div>  ';
_str += '				<button class="chkresult" onclick="icheckresult()">chkresult</button>';
_str += '		</div>';
//컨텐츠영역

_str += '	<div class="block"></div>';
_str += '	<div class="hint">';
if (_a == (_icheck.length - 1)) {
	if (typeof _previcheck == "undefined") {
		_str += '	<button class="result" role="button" tabindex="0" onclick="icheckSet(' + (_a + 2) + ')">result</button>';
	}
} else {
	_str += '	<button class="next" role="button" tabindex="0" onclick="icheckSet(' + (_a + 2) + ')">next</button>';
}
// _str += '		<div class="right">' + _right + '</div>';
_str += '		<div class="infocon">';
_str += '			<div class="scroll">' + _explanation + '</div>';
_str += '		</div>';
_str += '	</div>';
_str += '	<div class="feed1"></div>';

_str += '</div>';

	//결과페이지
	if (typeof _previcheck == "undefined") {
	

		if(_icheck.length<=3){
			_str += '<div class="icheck page' + (_icheck.length + 1) + ' resultPage">';

			//결과 번호
			_str += '<div class="resultNo">';
			for (var _i = 0; _i < _icheck.length; _i++) {
				_str += '<span class="no">' + (_i + 1) + '</span>';
			}
			_str += '</div>';

			//결과 feed
			_str += '<div class="resultFeed">';
			for (var _i = 0; _i < _icheck.length; _i++) {
				_str += '<span class="feed"></span>';
			}
			_str += '</div>';
		}else{
			_str += '<div class="icheck page' + (_icheck.length + 1) + ' resultPage feedNone">';
		}
		

		_str += '	<div class="rtxt"></div>';
		_str += '		<button class="retry" role="button" tabindex="0" onclick="icheckSet(1)">retry</button>';
		_str += '</div>';
	}
	_str += "</div>"

	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//페이지 커스텀
		////////////////////////////////////////////////////////////////////////////////////////////
		for (var _i = 0; _i < $(".ichecks").children().length; _i++) {
			$(".icheck").eq(_i).css({
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
		//_icheckImg[_s].duration="0";
		//_icheckImg[_s].ease="Power1.out";
		//_icheckImg[_s].onComplete="icheckReset";
		
		_tl.to($('.img').eq(_s), {
			duration: 0,
			onComplete: icheckReset
		}, _icheckImgTime[_s]);
		_tl.eventCallback("onComplete", icheckReset)

		if(!_htmlmp4){
			for (var _s = 0; _s < _icheckImgTime.length; _s++) {
				_icheckImg[_s].duration = "0.5";
				_icheckImg[_s].ease = "Power1.out";
				_tl.to($('.img').eq(_s), _icheckImg[_s], _icheckImgTime[_s]);
			}
			_icheckImg[_icheckImgTime.length - 1].duration = "0.5";
			_icheckImg[_icheckImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.ichecks'), _icheckImg[_icheckImgTime.length - 1], _icheckImgTime[_icheckImgTime.length - 1]);
		}else{
			_icheckImg[_icheckImgTime.length - 1].duration = "0.5";
			_icheckImg[_icheckImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.ichecks'), _icheckImg[_icheckImgTime.length - 1], _video.duration-1);
			// 퀴즈 시작 타이밍 조절
		}
		
		clearTimeout(_setTimeout);
		
	}, 100);
};


////////////////////////////////////////////////////////////////////////////////////////////
//function
////////////////////////////////////////////////////////////////////////////////////////////
function icheckReset() {
	if (typeof _previcheck == "undefined") {
		_icheckPage = undefined;
	} else {
		$(".result").show();
		_icheckPage = 1;
	}

	_tryCount = 1;

	$(".ichecks").css({
		"left": "0px"
	})
	$(".ichecks .btns .btn").removeClass("check");
	$(".ichecks .btns .btn").removeClass("okview");

	$(".ichecks .btns .oxbtn0").removeClass("check");
	$(".ichecks .btns .oxbtn1").removeClass("check");
	$(".ichecks .btns .oxbtn0").removeClass("okview");
	$(".ichecks .btns .oxbtn1").removeClass("okview");
	$(".ichecks .inputfield").val("");
	$(".ichecks .block").hide();
	$(".ichecks .hint").hide();
	$(".ichecks .feed0").hide();

	//ok
	$(".ichecks .ok").show();
}

function icheckeventStart(){
	icheckSet(1)
	$(".chkcon").on("click", function() {
		$(".chkresult").fadeIn(300)
		if($(this).hasClass("clickcon")){
			$(this).removeClass("clickcon")
			$(this).removeClass("blackcon")
		}else{
			$(this).addClass("clickcon")
			$(this).addClass("blackcon")
		}
	})
	// 정답쪽
	$(".chkcon1").on("click", function() {
		if(chk1 == 0){
			chk1 = 1;
		}else if(chk1 == 1){
			chk1 = 0;
		}
	})
	$(".chkcon2").on("click", function() {
		if(chk2 == 0){
			chk2 = 1;
		}else if(chk2 == 1){
			chk2 = 0;
		}
	})
	$(".chkcon5").on("click", function() {
		if(chk3 == 0){
			chk3 = 1;
		}else if(chk3 == 1){
			chk3 = 0;
		}
	})
	// 정답쪽
	$(".chkcon3").on("click", function() {
		if(wrongchk1 == 0){
			wrongchk1 = 1;
		}else if(wrongchk1 == 1){
			wrongchk1 = 0;
		}
	})
	$(".chkcon4").on("click", function() {
		if(wrongchk2 == 0){
			wrongchk2 = 1;
		}else if(wrongchk2 == 1){
			wrongchk2 = 0;
		}
	})
}


function icheckresult(){
	//정답 체크후 아이콘 변경
	// 오답
	$(".chkcon3").removeClass("clickcon")
	$(".chkcon4").removeClass("clickcon")

	// 정답
	$(".chkcon1").addClass("clickcon")
	$(".chkcon2").addClass("clickcon")
	$(".chkcon5").addClass("clickcon")

	//오답 이미지 변경
	$(".textcon3").attr("src","../common/img/icheck/01/textcon3_h.png")
	$(".textcon4").attr("src","../common/img/icheck/01/textcon4_h.png")

	if((chk1 + chk2 + chk3) == 3 && wrongchk1 == 0 && wrongchk2 == 0){
		effect("correct");
		console.log("정답입니다.")

	}else{
		effect("wrong");
		console.log("오답입니다.")
	}
	$(".chkresult").hide()
	// 초기화
	chk1=0;chk2=0;chk3=0;wrongchk1=0;wrongchk2=0;
	$(".resultimg").fadeIn(200);
	// $(".result").focus();
}

function icheckSet(n) {
	if (_icheckPage == undefined) {
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

	_icheckPage = n;

	//사전퀴즈등에서 더이상 이동할 퀴즈 페이지가 없는경우 바로 학습완료해준다.
	if (n > $(".ichecks").children().length) {
		_endLock = true;
		//_video.currentTime = (_video.duration * 0.99);
		//_video.play();
		end(true, true);

		//
		$(".result").hide();
		return;
	}
	$(".ichecks").animate({
		//left: -(_width * n) + "px"
		left: -(1920 * n) + "px"
	}, {
		complete: function () {
			//다시 해당 퀴즈가 진행될것을 대비하여 선택된 내용등 변형된 부분들을 원상복귀한다.
			$(".ichecks .btns .btn").removeClass("check");
			$(".ichecks .btns .btn").removeClass("okview");

			$(".ichecks .btns .oxbtn0").removeClass("check");
			$(".ichecks .btns .oxbtn1").removeClass("check");
			$(".ichecks .btns .oxbtn0").removeClass("okview");
			$(".ichecks .btns .oxbtn1").removeClass("okview");
			$(".ichecks .inputfield").val("");
			$(".ichecks .block").hide();
			$(".ichecks .hint").hide();
			$(".ichecks .feed0").hide();
			$(".ichecks .ok").show();

			//마지막 페이지의 경우 학습완료 안내
			if (n == ($(".ichecks").children().length - 1)) {
				end(true, true);
			} else {
				end(false, true);
			}
		}
	});
}

//객관식 버튼 체크
function btnCheck(v) {
	if ($(".ichecks .page" + _icheckPage + " .btn").eq(v).hasClass("check")) {
		$(".ichecks .page" + _icheckPage + " .btn").eq(v).removeClass("check");
	} else {
		$(".ichecks .page" + _icheckPage + " .btn").eq(v).addClass("check");
	}
}

//정오답 확인
var _tryCount = 1;
var _rightCount = 0;

function icheckCheck(v) {
	var _try;
	var _right = $(".ichecks .page" + _icheckPage + " .right").html();

	if (_icheck[_icheckPage - 1].type == "00") {
		//O,X
		//$(".ichecks .page"+_icheckPage+" .btns button").removeClass("check");
		if (v == "O") {
			$(".ichecks .page" + _icheckPage + " .btns .oxbtn0").addClass("check");
		} else {
			$(".ichecks .page" + _icheckPage + " .btns .oxbtn1").addClass("check");
		}

		_try = v;
	} else if (_icheck[_icheckPage - 1].type == "03") {
		//주관식
		_try = $(".ichecks .page" + _icheckPage + " .inputfield").val();
		_try = _try.split(" ").join("");
		if (_try == "") {
			alert("정답을 입력후 확인 버튼을 눌러주세요.");
			return;
		}
	} else {
		//객관식
		_try = new Array();
		$(".ichecks .page" + _icheckPage + " .btn").removeClass("check");

		for (var _v = 0; _v < $(".ichecks .page" + _icheckPage + " .btns").children().length; _v++) {
			$(".ichecks .page" + _icheckPage + " .btn").eq(v).addClass("check");

			if ($(".ichecks .page" + _icheckPage + " .btn").eq(_v).hasClass("check")) {
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

		$(".ichecks .page" + _icheckPage + " .feed0").css({
			"background-position-x": "0px"
		});
		infoShow();

		_rightCount += 1;
		//결과 적용
		$(".resultPage .resultFeed .feed").eq(_icheckPage - 1).css({
			"background-position-x": "0px"
		});

		//다음안내
		$(".next").focus();
		$(".result").focus();
	} else {
		effect("wrong");

		$(".ichecks .page" + _icheckPage + " .feed0").css({
			"background-position-x": $(".ichecks .page" + _icheckPage + " .feed0").css("width")
		});
		if (_icheck[_icheckPage - 1].type == "00") {
			//O,X의 경우 한번의 기회만 제공
			infoShow();

			//정답안내
			if (_right == "O") {
				$(".ichecks .page" + _icheckPage + " .btns .oxbtn0").addClass("okview");
			} else {
				$(".ichecks .page" + _icheckPage + " .btns .oxbtn1").addClass("okview");
			}

			$(".resultPage .resultFeed .feed").eq(_icheckPage - 1).css({
				"background-position-x": $(".resultPage .resultFeed .feed").eq(_icheckPage - 1).css("width")
			});
		} else {
			if (_tryCount < 2) {
				_tryCount += 1;
			} else {
				_tryCount = 1;
				infoShow();

				//정답안내
				$(".ichecks .page" + _icheckPage + " .btn").eq(Number(_right) - 1).addClass("okview")

				$(".resultPage .resultFeed .feed").eq(_icheckPage - 1).css({
					"background-position-x": $(".resultPage .resultFeed .feed").eq(_icheckPage - 1).css("width")
				});

				//다음안내
				$(".next").focus();
				$(".result").focus();
			}
		}
	}

	//결과 적용
	$(".resultPage .rtxt").html("총" + _icheck.length + "문제중 " + _rightCount + "문제를 맞히셨습니다.");

	//feed
	$(".ichecks .page" + _icheckPage + " .feed0").show();

}

function infoShow() {
	//ok
	$(".ichecks .page" + _icheckPage + " .ok").hide();

	$(".ichecks .page" + _icheckPage + " .block").show();
	$(".ichecks .page" + _icheckPage + " .hint").show();

	//사전퀴즈의 경우 바로 다음페이지를 안내한다.
	if (typeof _previcheck != "undefined") {
		icheckSet(((_icheck.length) + 1))
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
