console.log("summary");

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _summayType = _metaData[2].custom[0].summayType;
var _summaryImgTime = trance.array(_metaData[2].custom[0].summaryImgTime);
var _summaryImg = _metaData[2].custom[0].summaryImg;
var _summayBtn = _metaData[2].custom[0].summayBtn;

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
	for (var _s = 0; _s < (_summaryImgTime.length - 1); _s++) {
		_str += "<div class='img summary" + _s + "'></div>";
	}

	var _summaryData = _pageData.split("[/]pop");

	//정리하기와 아웃트로를 합한 케이스의 경우 구분하여 구성한다.
	if (_summayType == "all") {
		_str += "<button class='open' onclick='popOpen(this);'></button>";
		_str += "<div class='summaryPop'>";
	}

	//scroll s
	_str += "<div class='summary scroll mCustomScrollbar'>";

	//미리보기의경우(_design을 기준으로구분)경로를 변경한다.
	var _icon_path = "../common/";
	if (typeof _design != "undefined") {
		_icon_path = '../../../basic/custom/type' + _design + '/'
	}

	_str += "</div>";

	//scroll e

	//참고문헌
	if (_summaryData[1].length > 1) {
		_str += "<button class='etcOpen' onclick='popOpen(this);'></button>";
		_str += "</div>"

		_str += "<div class='etcPop'>";

		//scroll s
		_str += "<div class='etc scroll'>";
		var _etcPopData = _summaryData[1].split("\r");
		for (var _e = 0; _e < _etcPopData.length; _e++) {
			if (_etcPopData[_e] != "") {
				_str += "<table><tr><td class='blit'><img src='" + _icon_path + "img/summary/blit1.png'/><td>" + _etcPopData[_e] + "</td></tr></table>"
			}
		}
		_str += "</div>"
		//scroll e

		_str += "<button class='etcClose' onclick='popOpen(this);'><i class='fas fa-times'></i></button>";
		_str += "</div>"
	}
	if (_summayBtn.indexOf("print") != -1) {
		_str += " <button class='print' onclick='printPage();'></button>";
	}
	if (_summayBtn.indexOf("down") != -1) {
		_str += " <button class='down' onclick='down();'></button>";
	}

	if (_summayType == "all") {
		_str += " <button class='close' onclick='popOpen(this);'><i class='fas fa-times'></i></button>";
		_str += "</div>";
	}

	$(".htmlPage").html(_str);


	_summaryData[0] = _summaryData[0].split('"one"><tr><td class="blit">').join('"one"><tr><td class="blit"><img src="' + _icon_path + 'img/summary/blit00.png"/>')
	for (var _p = 1; _p < 10; _p++) {
		_summaryData[0] = _summaryData[0].split('"one' + _p + '"><tr><td class="blit">').join('"one"><tr><td class="blit"><img src="' + _icon_path + 'img/summary/blit0' + _p + '.png"/>')
	}
	_summaryData[0] = _summaryData[0].split('"two"><tr><td class="blit">').join('"two"><tr><td class="blit"><img src="' + _icon_path + 'img/summary/blit1.png"/>')
	_summaryData[0] = _summaryData[0].split('"three"><tr><td class="blit">').join('"three"><tr><td class="blit"><img src="' + _icon_path + 'img/summary/blit2.png"/>')
	_summaryData[0] = _summaryData[0].split('"four"><tr><td class="blit">').join('"four"><tr><td class="blit"><img src="' + _icon_path + 'img/summary/blit3.png"/>')
	_summaryData[0] = _summaryData[0].split('"five"><tr><td class="blit">').join('"five"><tr><td class="blit"><img src="' + _icon_path + 'img/summary/blit4.png"/>')

	
	var _setTimeout = setTimeout(function () {
		$(".summary").append(_summaryData[0]);

		$(".htmlPage .scroll").mCustomScrollbar({
			theme: "light-3",
			scrollInertia: 0,
			mouseWheelPixels: 18
		});

		clearTimeout(_setTimeout);
	}, 100);

	////////////////////////////////////////////////////////////////////////////////////////////
	//페이지 커스텀
	////////////////////////////////////////////////////////////////////////////////////////////
	$(".htmlPage button").hover(function () {
		$(this).children().css({
			"color": _bottomProgressFillColor
		})
	}, function () {
		$(this).children().css({
			"color": "#000"
		})
	})

	//모바일의 경우 기본 스크롤로 대체한다.
	if (_device != "PC" && _device.substring(0, 2) != "IP") {
		$(".htmlPage .scroll").mCustomScrollbar("destroy");
		$(".htmlPage .scroll").css("overflow", "auto");
	}

	////////////////////////////////////////////////////////////////////////////////////////////
	//등장 모션
	////////////////////////////////////////////////////////////////////////////////////////////
	
	for (var _s = 0; _s < _summaryImgTime.length - 1; _s++) {
		_summaryImg[_s].duration = "0.5";
		_summaryImg[_s].ease = "Power1.out";

		_tl.to($('.img').eq(_s), _summaryImg[_s], _summaryImgTime[_s]);
	}
	_summaryImg[_summaryImgTime.length - 1].duration = "0.5";
	_summaryImg[_summaryImgTime.length - 1].ease = "Power1.out";
	if (_summayType == "all") {
		_tl.to($('.open'), _summaryImg[_summaryImgTime.length - 1], _summaryImgTime[_summaryImgTime.length]);
	} else {
		_tl.to($('.summary'), _summaryImg[_summaryImgTime.length - 1], _summaryImgTime[_summaryImgTime.length]);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////
//function
////////////////////////////////////////////////////////////////////////////////////////////
//popOpen & popClose
function popOpen(t) {
	var _pop;

	//all상황에서의 팝업과, 참고문헌 팝업을 구분하여 조작한다.
	if ($(t).attr("class").indexOf("etc") != -1) {
		_pop = $(".etcPop")
	} else {
		_pop = $(".summaryPop")
	}

	if ($(_pop).css("display") == "none") {
		$(_pop).show();

		if ($(".end").css("display") == "none") {
			play();
		}
	} else {
		$(_pop).hide();

		if ($(".end").css("display") == "none") {
			play();
		}
	}
}

//정리하기 인쇄
var _printPageSetTimeout

function printPage() {
	var _win = window.open('', 'printArea', 'width=1120,height=630');
	_win.document.write('<!DOCTYPE html>');
	_win.document.write('<html lang="ko">');
	_win.document.write('<head>');
	_win.document.write('<link rel="stylesheet" type="text/css" href="../common/css/summary.css">');
	_win.document.write('</head>');
	_win.document.write('	<body>');
	_win.document.write($(".summary .mCSB_container").html());
	_win.document.write('	</body>');
	_win.document.write('</html>');

	//바로 인쇄를 시도할경우 CSS등 적용이 않되는경우가 있어 약간의 딜레이를 준다.
	clearTimeout(_printPageSetTimeout);
	_printPageSetTimeout = setTimeout(function () {

		_win.document.close();
		_win.print();
		_win.close();
	}, 500);
}

//down
function down() {
	window.open(_icon_path + "down/file_" + trance.str(_chasi) + "_pdf.zip", "_blank");
}
