console.log("puzzle");
$(".time").hide()
$(".progress").hide()
$(".mark").hide()
$(".markdel").hide()
$(".rate").hide()
$(".autoplay").hide()
$(".down").css("right"," 246px")

////////////////////////////////////////////////////////////////////////////////////커트라인

// JavaScript Document
/*드래그 액션*/

var puzzlefirststart = 0;

var chk1 = 0;
var chk2 = 0;
var chk3 = 0;
var wrongchk1 = 0;
var wrongchk2 = 0;

var isProcessing = false; // 플래그 변수 추가

function getClientX(e){
	var returnVal = (e.originalEvent && e.originalEvent.clientX) || (e.touches && e.touches[0] && e.touches[0].clientX) || e.clientX || e.pageX ;
	return returnVal;
}
function getClientY(e){
	var returnVal = (e.originalEvent && e.originalEvent.clientY) || (e.touches && e.touches[0] && e.touches[0].clientY) || e.clientY || e.pageY ;
	return returnVal;
}
function _ChkHitTest(o, l){

	function getOffset(o){

		for(var r = {l: o.offsetLeft, t: o.offsetTop, r: o.offsetWidth, b: o.offsetHeight};

			o = o.offsetParent; r.l += o.offsetLeft, r.t += o.offsetTop);

		return r.r += r.l, r.b += r.t, r;

	}

	for(var b, s, r = [], a = getOffset(o), j = isNaN(l.length), i = (j ? l = [l] : l).length; i;

		b = getOffset(l[--i]), (a.l == b.l || (a.l > b.l ? a.l <= b.r : b.l <= a.r))

		&& (a.t == b.t || (a.t > b.t ? a.t <= b.b : b.t <= a.b)) && (r[r.length] = l[i]));

	return j ? !!r.length : r;

};
var currentOS;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLowerCase());
isMobile += navigator.userAgent.match(/iPhone|iPad|iPod/i) === null && navigator.maxTouchPoints != 5 ? false : true;
//isMobile=true;
if (isMobile) {
	// 유저에이전트를 불러와서 OS를 구분합니다.
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search("android") > -1)
		currentOS = "android";
	else if ((userAgent.search("iPhone") > -1)
			 || (userAgent.search("iPad") > -1)
			 || (userAgent.search("iPod") > -1)
			 || (userAgent.search("like Mac") > -1)
			 || (userAgent.match(/iPhone|iPad|iPod/i) === null && navigator.maxTouchPoints != 5 ? false : true))
		currentOS = "ios";
	else
		currentOS = "else";
} else {
	// 모바일이 아닐 때
	currentOS = "nomobile";

}
var mousedownEvent = currentOS=="nomobile" ? "mousedown" : "touchstart";
var mouseupEvent =  currentOS=="nomobile" ? "mouseup" : "touchend";
var mousemoveEvent =  currentOS=="nomobile" ? "mousemove" : "touchmove";
var mouseoverEvent =  currentOS=="nomobile" ? "mouseover" : "touchover";
var mouseoutEvent =  currentOS=="nomobile" ? "mouseout" : "touchcancle";
var mouseleaveEvent =  currentOS=="nomobile" ? "mouseleave" : "touchcancle";

var puzzleArray = new Array();
var dropArray = new Array();

var totalpuzzleNum=0;
var totalDropNum=0;
var isClickEnabledFlag=true;

var puzzleMc=null;
var dropTarget

var ispuzzleingFlag=false;

var nPosX;
var nPosY;

var iszIndex=0;;

var isCorrectNum=0; //해당 페이지 맞춰야 하는 개수


var array = [
  "ㅡ",    "인1",   "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",    "청5",   "ㅡ",

  "ㅡ",    "천2",   "안3",   "ㅡ",    "ㅡ",    "광6",   "주",    "ㅡ",

  "ㅡ",    "ㅡ",    "산4",   "본",    "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",

  "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",    "김7",   "ㅡ",    "대8",   "ㅡ",

  "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",    "포",    "ㅡ",    "구9",   "미",

  "태10",  "ㅡ",    "서12",  "울13",  "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",

  "안11",  "성",    "ㅡ",    "산",    "ㅡ",    "ㅡ",    "목14",  "포15",
	
  "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",    "ㅡ",    "항"
];  

function _doActivityInit(){
	_doActivityInit2();
}


function _doActivityInit2(){
	$(".ispuzzleObj").each(function(idx){
		_puzzleInit($(this));
	});
	var table = $('#arrayTable');
  var index = 0;

  for (var row = 0; row < 8; row++) {
      var tr = $('<tr></tr>');
      for (var col = 0; col < 8; col++) {
          var td = $('<td></td>');
          var input = $('<input type="text" maxlength="1" />');
          input.data('index', index);
					input.data('row', row);
          input.data('col', col);
          input.addClass(array[index] == "ㅡ" ? 'gray' : 'white');
          if(array[index].length > 1){
						td.addClass("connerNum")
					}
          input.on('change', onInputChange);
          input.on('keydown', onDirectionKeyPress);
          td.append(input);
          tr.append(td);
          if(array[index].length > 1){
						var conner = $('<p class="conum">' + array[index].substring(1) + '</p>');
						td.append(conner);
					}
          index++;
      }
      table.append(tr);
  }

	function onDirectionKeyPress(e) {
    var input = $(this);
    var row = input.data('row');
    var col = input.data('col');

    // Prevent the default action for the arrow keys
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
    }

    if (e.key === 'ArrowUp') {
        moveFocus(row - 1, col, -1, 0);
    } else if (e.key === 'ArrowDown') {
        moveFocus(row + 1, col, 1, 0);
    } else if (e.key === 'ArrowLeft') {
        moveFocus(row, col - 1, 0, -1);
    } else if (e.key === 'ArrowRight') {
        moveFocus(row, col + 1, 0, 1);
    }
}

function moveFocus(row, col, rowIncrement, colIncrement) {
    while (row >= 0 && row < 8 && col >= 0 && col < 8) {
        var nextInput = $('input.white').filter(function() {
            return $(this).data('row') == row && $(this).data('col') == col;
        });
        if (nextInput.length > 0) {
            if (nextInput.hasClass('white')) { // 회색 칸을 건너뛰기
                setTimeout(() => {
                    nextInput.focus();
                }, 0);
                return;
            }
        }
        row += rowIncrement;
        col += colIncrement;
    }
}

var isProcessing = false; // 플래그 변수 추가

function onInputChange() {
    if (isProcessing) return; // 중복 실행 방지

    isProcessing = true; // 플래그 설정

    var input = $(this);
    var index = input.data('index');
    var value = input.val();

    console.log("입력한 값 = " + value);
    if (array[index].charAt(0) == value) {
        input.removeClass("answer");
        input.removeClass("wrong");
        input.css('color', 'black');
        input.addClass("answer");
    } else {
        input.removeClass("answer");
        input.removeClass("wrong");
        input.css('color', 'black');
        input.addClass("wrong");
    }
    if ($(".answer").length + $(".wrong").length == 22) {
        $(".whitecircle").css("pointer-events", "auto");
        $(".resultext").css('color', '#000');
        $(".resultext").html('정답확인 >');
        $(".whitecircle").css("background", "#fff");
    }

    isProcessing = false; // 플래그 해제
}

// Add this to initialize the event handlers
$(document).ready(function() {
    $('input.white').on('keydown', onDirectionKeyPress);
    $('input.white').on('input', onInputChange);
});

	$(".whitecircle").on("click", function() {
		$(".resultbtn").css("background","#2c73cb")
		$(".whitecircle").css("left","56px")
		$(".whitecircle").css("background","#fff")

		if($(".answer").length == 22){
			setTimeout(() => {
				$(".answer").css('color', '#2c73cb');
				$(".resultext").css('color', '#2c73cb');
				$(".resultext").html('정답!');
				$(".whitecircle").css("pointer-events","none")
				$("input").css("pointer-events","none")
				alert("완료")	
			}, 1000);
		}
		else{
			setTimeout(() => {
				alert("(오답 초기화)")
				$(".answer").css('color', '#2c73cb');
				$(".wrong").val("")
				$("#arrayTable input").removeClass("wrong")
				$(".resultext").css('color', 'red');
				$(".resultext").html('오답!');
				$(".resultbtn").css("background","#a02626")
				setTimeout(() => {
					$(".resultext").html('');
					$(".resultbtn").css("background","#7e7e7e")
					$(".whitecircle").css("left","8px")
					$(".whitecircle").css("background","#bbbbbb")
					$(".whitecircle").css("pointer-events","none")
				}, 2500);
			}, 1000);
		}

	})
}





function _doCheckOK(){
	_doCheck(true);
	effect("correct")
		
}


function _getDropTarget(n , _arr){
	
	var returnObject=null;
	for(var i=0;i<_arr.length;i++){
		console.log(_arr[i])
		console.log($(_arr[i]).attr("id"));
		console.log($(_arr[i]).data("dap"));
		console.log(n+" == "+_arr[i].dap);
		if(n == $(_arr[i]).data("dap")){
			returnObject = _arr[i];
			break;
		}
	}
	if(returnObject){
		console.log(returnObject.id+" , "+returnObject.dap);	
	}
	
	return returnObject;
	
}

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _puzzle = _pageData.puzzle;
var _puzzleImgTime;
var _puzzleImg;

//if(!_htmlmp4){
	if (typeof _prevpuzzle == "undefined") {
		_puzzleImgTime = trance.array(_metaData[2].custom[0].puzzleImgTime);
		_puzzleImg = _metaData[2].custom[0].puzzleImg;
	} else {
		_puzzleImgTime = trance.array(_metaData[2].custom[0].ppuzzleImgTime);
		_puzzleImg = _metaData[2].custom[0].ppuzzleImg;
	}
//}

var _puzzlePage;
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
	for (var _q = 0; _q < (_puzzleImgTime.length); _q++) {
		_str += "<div class='img puzzle" + _q + "'></div>";
	}

	//사전퀴즈는 커버 & 결과안내를 구성하지 않는다.
	if (typeof _prevpuzzle == "undefined") {
		//커버페이지
		_str += "<div class='puzzles'>"

		//퀴즈 컨테이너
		_str += "<div class='puzzle page0'>"

		//_str+="	<div class='imgtxt'>오늘 학습한 내용을 <br/>문제를 풀며 점검해 보겠습니다.</div>";
		_str += "	<button class='start' role='button' tabindex='0' onclick='puzzleeventStart();'>start</button>";
		_str += "</div>"
	} else {
		//사전퀴즈의 경우 1번 문제부터 시작하기에 기본값을 1로 지정한다.
		_puzzlePage = 1;

		//퀴즈 컨테이너
		_str += "<div class='puzzles'>"
	}

	//퀴즈 구성
	// for (var _i = 0; _i < _puzzle.length; _i++) {
	// }

	var _a = 0;
	var _b = 1;
	var _c = 2;

	//1페이지
	
	var _puzzleType = _puzzle[_a].type;
	//지문에 부정형 단어가 있는경우 색을 달리한다.
	var _question = setColor(_puzzle[_a].question);

	var _sample = _puzzle[_a].sample;
	_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")

	var _right = _puzzle[_a].right;
	_right = multiple(_right); //복수의 정답인 경우 변환한다.

	var _explanation = _puzzle[_a].explanation;
	var _viewerMultiChoiceArrList = _puzzle[_a].viewerMultiChoiceArrList[0];

	_str += '<div class="puzzle page' + (_a + 1) + ' puzzlePage">';
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

//컨텐츠영역
_str += '<div class="resultext"></div>';
_str += '<div class="resultbtn">';
_str += '<div class="resultbtnback">';
_str += '<div class="whitecircle"></div>';
_str += '<div class="blackline"></div>';
_str += '</div>';
_str += '</div>';
_str += ' <table id="arrayTable"></table>';
_str += ' <span class="explanation">';
_str += '01. OO상륙작전<br>';
_str += '02. 호두과자가 유명한 지역<br>';
_str += '03. 대부도가 있는 지역<br>';
_str += '04. 군포에 속해 있는 1기 신도시<br>';
_str += '05. 충청북도에서 가장 큰 도시, 국제공항이 있다.<br>';
_str += '06. 해당 지역을 순우리말로 빛고을 이라고 한다.<br>';
_str += '07. 인천국제공항에 이은 수도권 국제공항이 있는 지역<br>';
_str += '08. 대한민국에서 가장 덥기로 유명한 지역<br>';
_str += '09. 대구광역시 군위군과 인접한 지역<br>';
_str += '10. 반도라고 불리며, 꽃지해수욕장이 유명한 지역<br>';
_str += '11. 서운산이 유명한 지역<br>';
_str += '12. 대한민국의 수도<br>';
_str += '13. 태화강이 유명한 대한민국 최대 공업지역<br>';
_str += '14. 전라남도의 항구도시로 유명한 지역, 서해안고속도로의 시작지점<br>';
_str += '15. 경상북도의 철강산업으로 유명한 지역, 포스코 본사가 있다.<br>';
_str += ' </span>';

//컨텐츠영역

	_str += '	<div class="block"></div>';
	_str += '	<div class="hint">';
	if (_a == (_puzzle.length - 1)) {
		if (typeof _prevpuzzle == "undefined") {
			_str += '	<button class="result" role="button" tabindex="0" onclick="puzzleSet(' + (_a + 2) + ')">result</button>';
		}
	} else {
		// _str += '	<button class="next" role="button" tabindex="0" onclick="puzzleSet(' + (_a + 2) + ')">next</button>';
		_str += '	<button class="next" role="button" tabindex="0" onclick="icheckeventStart()">next</button>';
	}
	// _str += '		<div class="right">' + _right + '</div>';
	_str += '		<div class="infocon">';
	_str += '			<div class="scroll">' + _explanation + '</div>';
	_str += '		</div>';
	_str += '	</div>';
	_str += '	<div class="feed1"></div>';

	_str += '</div>';

	//


	//결과페이지
	if (typeof _prevpuzzle == "undefined") {
	

		if(_puzzle.length<=3){
			_str += '<div class="puzzle page' + (_puzzle.length + 1) + ' resultPage">';


		}else{
			_str += '<div class="puzzle page' + (_puzzle.length + 1) + ' resultPage feedNone">';
		}
		

		// _str += '	<div class="rtxt"></div>'; // 결과화면 텍스트
		_str += '		<button class="retry" role="button" tabindex="0" onclick="puzzleSet(1)">retry</button>';
		_str += '</div>';
	}
	_str += "</div>"

	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//페이지 커스텀
		////////////////////////////////////////////////////////////////////////////////////////////
		for (var _i = 0; _i < $(".puzzles").children().length; _i++) {
			$(".puzzle").eq(_i).css({
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
		//_puzzleImg[_s].duration="0";
		//_puzzleImg[_s].ease="Power1.out";
		//_puzzleImg[_s].onComplete="puzzleReset";
		
		_tl.to($('.img').eq(_s), {
			duration: 0,
			onComplete: puzzleReset
		}, _puzzleImgTime[_s]);
		_tl.eventCallback("onComplete", puzzleReset)

		if(!_htmlmp4){
			for (var _s = 0; _s < _puzzleImgTime.length; _s++) {
				_puzzleImg[_s].duration = "0.5";
				_puzzleImg[_s].ease = "Power1.out";
				_tl.to($('.img').eq(_s), _puzzleImg[_s], _puzzleImgTime[_s]);
			}
			_puzzleImg[_puzzleImgTime.length - 1].duration = "0.5";
			_puzzleImg[_puzzleImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.puzzles'), _puzzleImg[_puzzleImgTime.length - 1], _puzzleImgTime[_puzzleImgTime.length - 1]);
		}else{
			_puzzleImg[_puzzleImgTime.length - 1].duration = "0";
			_puzzleImg[_puzzleImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.puzzles'), _puzzleImg[_puzzleImgTime.length - 1], _video.duration - (_video.duration + 1));
			// 퀴즈 시작 타이밍 조절
		}
		
		clearTimeout(_setTimeout);
		
	}, 100);
};


////////////////////////////////////////////////////////////////////////////////////////////
//function
////////////////////////////////////////////////////////////////////////////////////////////
function puzzleReset() {
	if (typeof _prevpuzzle == "undefined") {
		_puzzlePage = undefined;
	} else {
		$(".result").show();
		_puzzlePage = 1;
	}

	_tryCount = 1;

	$(".puzzles").css({
		"left": "0px"
	})
	 
	$(".puzzles .inputfield").val("");
	$(".puzzles .block").hide();
	$(".puzzles .hint").hide();
	$(".puzzles .feed0").hide();
	$(".puzzles .ok").show();
	$(".trynum").html("남은 기회 : 3")
	dropCount = 0 // 드랍 개수 초기화
	isCorrectNum = 0;
}

function puzzleeventStart(){
	if(puzzlefirststart == 0){
		_doActivityInit()
		puzzlefirststart++;
	}
	puzzleSet(1)
}

function puzzleSet(n) {
	if($(".feed0").css("display")=="block"){
		$(".feed0").hide()
	}
	if (_puzzlePage == undefined) {
		//skip(_video.duration-0.5);
		//비디오 스킵안함
		// skip(_video.duration);
		//비디오 스킵안함

		//재생바 안보이게
		$(".time").hide()
		$(".progress").hide()
		$(".end").css("bottom","9999px")

		//재생바 안보이게
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

	_puzzlePage = n;

	//사전퀴즈등에서 더이상 이동할 퀴즈 페이지가 없는경우 바로 학습완료해준다.
	if (n > $(".puzzles").children().length) {
		_endLock = true;
		//_video.currentTime = (_video.duration * 0.99);
		//_video.play();
		end(true, true);

		//
		$(".result").hide();
		return;
	}
	$(".puzzles").animate({
		//left: -(_width * n) + "px"
		left: -(1920 * n) + "px"
	}, {
		complete: function () {
			//다시 해당 퀴즈가 진행될것을 대비하여 선택된 내용등 변형된 부분들을 원상복귀한다.
			$(".puzzles .inputfield").val("");
			$(".puzzles .block").hide();
			$(".puzzles .hint").hide();
			$(".puzzles .feed0").hide();
			$(".puzzles .ok").show();
			$(".trynum").html("남은 기회 : 3")
			isCorrectNum = 0;
			dropCount = 0 // 드랍 개수 초기화
			//마지막 페이지의 경우 학습완료 안내
			if (n == ($(".puzzles").children().length - 1)) {
				end(true, true);
			} else {
				end(false, true);
			}
		}
	});
}

function icheckeventStart(){
	puzzleSet(2)
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
}


//정오답 확인
var _tryCount = 1;
var _rightCount = 0;

function puzzleCheck(v) {
	var _try;
	var _right = $(".puzzles .page" + _puzzlePage + " .right").html();

	if (_puzzle[_puzzlePage - 1].type == "04") {

		if(_tryCount < 2){
			_try = _right;
		}
		else{
			_try = 0;
		}
		

	}

	//정오답 확인
	if (_try == _right) {
		effect("correct");
		_tryCount = 1;

		$(".puzzles .page" + _puzzlePage + " .feed0").css({
			"background-position-x": "0px"
		});
		infoShow();

		_rightCount += 1;
		//결과 적용
		$(".resultPage .resultFeed .feed").eq(_puzzlePage - 1).css({
			"background-position-x": "0px"
		});

		//다음안내
		$(".next").focus();
		$(".result").focus();
	} else {
		effect("wrong");

		$(".puzzles .page" + _puzzlePage + " .feed0").css({
			"background-position-x": $(".puzzles .page" + _puzzlePage + " .feed0").css("width")
		});
		if (_puzzle[_puzzlePage - 1].type == "00") {
			//O,X의 경우 한번의 기회만 제공
			infoShow();

			//정답안내
			if (_right == "O") {
				$(".puzzles .page" + _puzzlePage + " .btns .oxbtn0").addClass("okview");
			} else {
				$(".puzzles .page" + _puzzlePage + " .btns .oxbtn1").addClass("okview");
			}

			$(".resultPage .resultFeed .feed").eq(_puzzlePage - 1).css({
				"background-position-x": $(".resultPage .resultFeed .feed").eq(_puzzlePage - 1).css("width")
			});
		} else {
			if (_tryCount < 2) {
				_tryCount += 1;
			} else {
				_tryCount = 1;
				infoShow();

				//정답안내
				$(".puzzles .page" + _puzzlePage + " .btn").eq(Number(_right) - 1).addClass("okview")

				$(".resultPage .resultFeed .feed").eq(_puzzlePage - 1).css({
					"background-position-x": $(".resultPage .resultFeed .feed").eq(_puzzlePage - 1).css("width")
				});

				//다음안내
				$(".next").focus();
				$(".result").focus();
			}
		}
	}

	//결과 적용
	$(".resultPage .rtxt").html("총" + _puzzle.length + "문제중 " + _rightCount + "문제를 맞히셨습니다.");

	//feed
	setTimeout(() => {
		$(".puzzles .page" + _puzzlePage + " .feed0").fadeIn(500);
	}, 1500);
	

}

function infoShow() {
	//ok
	$(".puzzles .page" + _puzzlePage + " .ok").hide();

	$(".puzzles .page" + _puzzlePage + " .block").show();
	$(".puzzles .page" + _puzzlePage + " .hint").show();
	setTimeout(() => {
		$(".next").fadeIn(200)
	}, 2001);
	

	//사전퀴즈의 경우 바로 다음페이지를 안내한다.
	if (typeof _prevpuzzle != "undefined") {
		puzzleSet(((_puzzle.length) + 1))
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

/////////////////////////////////////////////////////커트라인

