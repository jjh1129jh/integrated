console.log("line");

////////////////////////////////////////////////////////////////////////////////////커트라인

// JavaScript Document
/*드래그 액션*/

var dragfirststart = 0;
var leftpointer;
var _resizePer;
var _width = "1920"
var _height = "1080"
var dragresult = 1;

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

var dragArray = new Array();
var dropArray = new Array();

var totalDragNum=0;
var totalDropNum=0;
var isClickEnabledFlag=true;

var dragMc=null;
var dropTarget

var isDragingFlag=false;

var nPosX;
var nPosY;

var iszIndex=0;;

var isCorrectNum=0; //해당 페이지 맞춰야 하는 개수

var mouseover = 0;
var leftpointer;
function _doActivityInit(){
initializeCanvas()
}


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
		_str += "	<button class='start' role='button' tabindex='0' onclick='drageventStart();'>start</button>";
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
_str += '<div class="lineinfo">질문에 따라 왼쪽에서 오른쪽으로 선을 이어 보세요.</div>  ';

_str += '<div id="container" style="width: 1920px; height: 1080px; position: relative;">';
_str += '<div class="layer left" id="layer1"></div>';
_str += '<div class="layer left" id="layer2"></div>';
_str += '<div class="layer left" id="layer3"></div>';
_str += '<div class="layer left" id="layer4"></div>';
_str += '<div class="layer right" id="layer5"></div>';
_str += '<div class="layer right" id="layer6"></div>';
_str += '<div class="layer right" id="layer7"></div>';
_str += '<div class="layer right" id="layer8"></div>';
_str += '<button id="checkAnswerButton">정답 체크</button>';
_str += '<button id="resetButton">Reset</button>';
_str += '<button id="startButton" onclick="initializeCanvas()">시작</button>';
_str += '<canvas id="lineCanvasTrue"></canvas>';
_str += '<canvas id="lineCanvasFalse"></canvas>';
_str += '</div>';
//컨텐츠영역

	_str += '	<div class="block"></div>';
	_str += '	<div class="hint">';
	if (_a == (_drag.length - 1)) {
		if (typeof _prevdrag == "undefined") {
			_str += '	<button class="result" role="button" tabindex="0" onclick="dragSet(' + (_a + 2) + ')">result</button>';
		}
	} else {
		_str += '	<p class="retryconunt">2</p>';
		_str += '	<button id="retryButton">Retry</button>';
		_str += '	<button class="next" role="button" tabindex="0" onclick="dragSet(' + (_a + 2) + ')">next</button>';
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
	$(".objectdiv").show();
	$(".objectdiv").removeClass("off")
	$(".objectdiv").css("top","revert-layer")
	$(".objectdiv").css("left","revert-layer")
	$(".vacuumdiv").css("background-image","revert-layer")
	$(".vacuumdiv").removeClass("off")
	$(".resulttextleft").html("")
	$(".resulttextright").html("")
	$(".resulttextleft").css("color","#2c73cb")
	$(".resulttextright").css("color","#2c73cb")
	$("#vacuum0102").hide()
	$("#vacuum0104").hide()
	$("#vacuum0105").hide()
	$("#vacuum0101").show()
	$("#vacuum0103").show()
	$(".trynum").html("남은 기회 : 3")
	dropCount = 0 // 드랍 개수 초기화
	isCorrectNum = 0;
}

function drageventStart(){
	if(dragfirststart == 0){
		
		dragfirststart++;
	}

	_doActivityInit()
	dragSet(1)
	resetline();
}

function dragSet(n) {
	if (_dragPage == undefined) {
		//skip(_video.duration-0.5);
		skip(_video.duration);
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
			$(".objectdiv").show();
			$(".objectdiv").removeClass("off")
			$(".objectdiv").css("top","revert-layer")
			$(".objectdiv").css("left","revert-layer")
			$(".vacuumdiv").css("background-image","revert-layer")
			$(".vacuumdiv").removeClass("off")
			$(".resulttextleft").html("")
			$(".resulttextright").html("")
			$(".resulttextleft").css("color","#2c73cb")
			$(".resulttextright").css("color","#2c73cb")
			$("#vacuum0102").hide()
			$("#vacuum0104").hide()
			$("#vacuum0105").hide()
			$("#vacuum0101").show()
			$("#vacuum0103").show()
			$(".trynum").html("남은 기회 : 3")
			isCorrectNum = 0;
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

	if (_drag[_dragPage - 1].type == "05") {

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
	setTimeout(() => {
		$(".drags .page" + _dragPage + " .feed0").fadeIn(500);
	}, 1500);
	

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

function infoShowre() {
	$(".drags .page" + _dragPage + " .block").hide();
	$(".drags .page" + _dragPage + " .hint").hide();
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


function getFrameScale() {
	var transform = $('.frame').css('transform');
	if (transform === 'none') return 1;
	var values = transform.split('(')[1].split(')')[0].split(',');
	var a = values[0];
	var b = values[1];
	return Math.sqrt(a * a + b * b);
}

function myHelper(event) {
    return '<div id="draggableHelper"></div>';
  }

	function getCanvasOffset() {
    var canvasOffset = $('#lineCanvasTrue').offset();
    return canvasOffset;
}
function initializeCanvas() {
	resize();
	var canvasTrue = document.getElementById('lineCanvasTrue');
	var ctxTrue = canvasTrue.getContext('2d');
	var canvasFalse = document.getElementById('lineCanvasFalse');
	var ctxFalse = canvasFalse.getContext('2d');
	var isDragging = false;
	var startX, startY, endX, endY;
	var tempLineDrawn = false;
	var isValidConnection = false;
	var confirmedLinesTrue = [];
	var confirmedLinesFalse = [];
	var linecount1 = 0, linecount2 = 0, linecount3 = 0, linecount4 = 0;
	var linecount1false = 0, linecount2false = 0, linecount3false = 0, linecount4false = 0;
	var falsecount = 0;
	var recount = 1;

	canvasTrue.width = document.getElementById('container').clientWidth;
	canvasTrue.height = document.getElementById('container').clientHeight;
	canvasFalse.width = document.getElementById('container').clientWidth;
	canvasFalse.height = document.getElementById('container').clientHeight;

	function resetline() {
			linecount1 = 0;
			linecount2 = 0;
			linecount3 = 0;
			linecount4 = 0;
			linecount1false = 0;
			linecount2false = 0;
			linecount3false = 0;
			linecount4false = 0;
			falsecount = 0;
			confirmedLinesTrue = [];
			confirmedLinesFalse = [];
			refreshCanvas();
			$(".left").css("pointer-events", "auto");
			$("#checkAnswerButton").hide();
			$("#resetButton").hide();
	}

	function resetlinefalse() {
		if(linecount1false == 1){linecount1 = 0; linecount1false = 0;}
		if(linecount2false == 1){linecount2 = 0; linecount2false = 0;}
		if(linecount3false == 1){linecount3 = 0; linecount3false = 0;}
		if(linecount4false == 1){linecount4 = 0; linecount4false = 0;}
			falsecount = 0;
			confirmedLinesFalse = [];
			ctxFalse.clearRect(0, 0, canvasFalse.width, canvasFalse.height);
			$(".left").css("pointer-events", "auto");
			$("#checkAnswerButton").hide();
			$("#resetButton").hide();
			// confirmedLinesTrue.forEach(function(line) {drawLine(ctxTrue, line.startX, line.startY, line.endX, line.endY, '#ffd239');});

			// setTimeout(() => {
			// 	confirmedLinesTrue.forEach(function(line) {drawLine(ctxTrue, line.startX, line.startY, line.endX, line.endY, 'rgb(84, 137, 236)');});
			// }, 1000);
	}

	resetline();

	$(".left").draggable({
			helper: 'clone',
			start: function(event, ui) {
					ui.helper.css("opacity", "0");
					isDragging = true;
					var scale = getFrameScale();
					var canvasOffset = getCanvasOffset();
					var original = $(this).offset();
					startX = ((original.left - canvasOffset.left) + ($(this).outerWidth() / 2)) / scale;
					startY = ((original.top - canvasOffset.top) + ($(this).outerHeight() / 2) -2.5) / scale;
					$(this).data("startingScrollTop", window.scrollY);
					refreshCanvas();
					isValidConnection = true;
			},
			drag: function(event, ui) {
					var st = parseInt($(this).data("startingScrollTop"));
					ui.position.top -= st;
					var scale = getFrameScale();
					var canvasOffset = getCanvasOffset();
					endX = (event.clientX - canvasOffset.left) / scale;
					endY = (event.clientY - canvasOffset.top + $(window).scrollTop()) / scale;
					refreshCanvas();
					drawLines();
					if (!isValidConnection) {
							drawLine(ctxFalse, startX, startY, endX, endY, 'red');
					} else {
							drawLine(ctxTrue, startX, startY, endX, endY, 'rgb(84, 137, 236)');
					}
			},
			stop: function(event, ui) {
					isDragging = false;
					leftpointer = $(this);
					if (tempLineDrawn && isValidConnection) {
							confirmedLinesTrue.push({ startX: startX, startY: startY, endX: endX, endY: endY });
							$(this).animate({ left: 0, top: 0 });
					}
					if (!isValidConnection) {
							confirmedLinesFalse.push({ startX: startX, startY: startY, endX: endX, endY: endY });
							$(this).animate({ left: 0, top: 0 });
					}
					tempLineDrawn = false;
					isValidConnection = false;
					refreshCanvas();
			}
	});

	$(".right").droppable({
			drop: function(event, ui) {
					if (isDragging) {
							var startOffset = ui.draggable.offset();
							var endOffset = $(this).offset();
							var frameScale = parseFloat($('.frame').css('transform').split('(')[1].split(')')[0].split(',')[3]);
							var scale = getFrameScale();
							var canvasOffset = getCanvasOffset();
							endX = (endOffset.left - canvasOffset.left) / scale;
							endY = ((endOffset.top - canvasOffset.top) + $(this).height() / 2) / scale;
							
							if (isValidDrop(ui.draggable.attr('id'), $(this).attr('id'))) {
									drawLine(ctxTrue, startX, startY, endX, endY, 'rgb(84, 137, 236)');
									confirmedLinesTrue.push({ startX: startX, startY: startY, endX: endX, endY: endY });
									isValidConnection = true;
									updateLineCounts(ui.draggable.attr('id'), $(this).attr('id'));
							} else {
									drawLine(ctxFalse, startX, startY, endX, endY, 'red');
									confirmedLinesFalse.push({ startX: startX, startY: startY, endX: endX, endY: endY });
									falsecount = 1;
									updateLineCountsfalse(ui.draggable.attr('id'), $(this).attr('id'));
							}
					}
			}
	});

	function drawLine(ctx, x1, y1, x2, y2, color) {
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = 3;
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
	}

	function drawLines() {
			confirmedLinesTrue.forEach(function(line) {
					drawLine(ctxTrue, line.startX, line.startY, line.endX, line.endY, 'rgb(84, 137, 236)');
			});
			confirmedLinesFalse.forEach(function(line) {
					drawLine(ctxFalse, line.startX, line.startY, line.endX, line.endY, 'rgb(84, 137, 236)');
			});
	}

	function refreshCanvas() {
			ctxTrue.clearRect(0, 0, canvasTrue.width, canvasTrue.height);
			ctxFalse.clearRect(0, 0, canvasFalse.width, canvasFalse.height);
			drawLines();
	}

	function isValidDrop(startLayerId, endLayerId) {
			var isValid = false;
			if (
					(startLayerId === 'layer1' && endLayerId === 'layer8') ||
					(startLayerId === 'layer2' && endLayerId === 'layer7') ||
					(startLayerId === 'layer3' && endLayerId === 'layer6') ||
					(startLayerId === 'layer4' && endLayerId === 'layer5')
			) {
					isValid = true;
			}
			if (isValid) {
					$('#' + startLayerId).css('pointer-events', 'none');
			}
			return isValid;
	}

	function updateLineCounts(startLayerId, endLayerId) {
			switch (startLayerId) {
					case 'layer1':
							linecount1 = 1;
							console.log("linecount1:", linecount1);
							break;
					case 'layer2':
							linecount2 = 1;
							console.log("linecount2:", linecount2);
							break;
					case 'layer3':
							linecount3 = 1;
							console.log("linecount3:", linecount3);
							break;
					case 'layer4':
							linecount4 = 1;
							console.log("linecount4:", linecount4);
							break;
			}
			if ((linecount1 + linecount2 + linecount3 + linecount4) > 0) {
					// $("#resetButton").fadeIn(200);
			}
			if (linecount1 == 1 && linecount2 == 1 && linecount3 == 1 && linecount4 == 1) {
				checkAnswer()
					// $("#checkAnswerButton").fadeIn(200);
			}
	}

	function updateLineCountsfalse(startLayerId, endLayerId) {
			switch (startLayerId) {
					case 'layer1':
							linecount1 = 1;
							linecount1false = 1;
							console.log("linecount1:", linecount1);
							break;
					case 'layer2':
							linecount2 = 1;
							linecount2false = 1;
							console.log("linecount2:", linecount2);
							break;
					case 'layer3':
							linecount3 = 1;
							linecount3false = 1;
							console.log("linecount3:", linecount3);
							break;
					case 'layer4':
							linecount4 = 1;
							linecount4false = 1;
							console.log("linecount4:", linecount4);
							break;
			}
			$('#' + startLayerId).css('pointer-events', 'none');
			if (linecount1 == 1 && linecount2 == 1 && linecount3 == 1 && linecount4 == 1) {
				checkAnswer()
					// $("#checkAnswerButton").fadeIn(200);
			}
	}

	$("#checkAnswerButton").click(function() {
		checkAnswer()
	});

	function checkAnswer() {
		console.log(linecount1)
		console.log(linecount2)
		console.log(linecount3)
		console.log(linecount4)
		console.log(falsecount)
			if (linecount1 == 1 && linecount2 == 1 && linecount3 == 1 && linecount4 == 1 && falsecount == 0) {
					console.log("오 퀴즈완");
					dragresult = 2;
					recount = 1;
					dragend();

			}
			else {
				if(recount == 1){
					$(".retryconunt").html(recount + "번")
					dragresult = 1;
					recount = 0;
				}
				else if(recount == 0){
					$(".retryconunt").html(recount + "번")
					dragresult = 0;
				}
				console.log("퀴즈 실패");
				// 정답 캔버스의 선을 노란색으로 변경
				dragend();
				
			}
	}

	$("#resetButton").click(function() {
			resetline();
	});

	$("#retryButton").click(function() {
			infoShowre()
			resetlinefalse()
	});

	function dragend() {
		//결과 적용
		$(".resultPage .resultFeed .feed").eq(_dragPage - 1).css({
			"background-position-x": "0px"
		});
		console.log("현재 값은? : " + dragresult)
		$(".retryconunt").hide()
		$("#retryButton").hide()
		if(dragresult == 2){
			infoShow();
			effect("correct");
			_tryCount = 1;
		
			$(".drags .page" + _dragPage + " .feed0").css({"background-position-x": "0px"});
			$(".drags .page" + _dragPage + " .feed0").fadeIn(500);
			dragresult = 1; // 초기화
		}else if(dragresult == 1){
			$(".feed0").css("display","none")
			effect("wrong");
			_tryCount = 1;
			resetlinefalse()
		}else if(dragresult == 0){
			infoShow();
			$(".feed0").css("display","none")
			effect("wrong");
			_tryCount = 1;
		}
}

//다음안내
$(".next").focus();
$(".result").focus();
}





//////////////////////////////

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
	if (1) {
		//PC
		$(".frame").css({
			"transform": "translate(-50%, -50%) scale(" + _resizePer + ")"
			//"transform": "translate(-50%, 0%) scale(" + _resizePer + ")"
		});

		//_paddingiw = _iw - 40;
		_paddingiw = _pw - 40;
	}
}