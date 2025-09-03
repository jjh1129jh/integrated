console.log("prev");

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _prevImgTime = trance.array(_metaData[2].custom[0].prevImgTime);
var _prevImg = _metaData[2].custom[0].prevImg;

////////////////////////////////////////////////////////////////////////////////////////////
//css적용
////////////////////////////////////////////////////////////////////////////////////////////
$("#page").append('<link rel="stylesheet" type="text/css" href="../common/css/' + _type + '.css">') 
{
	////////////////////////////////////////////////////////////////////////////////////////////
	//페이지 구성
	////////////////////////////////////////////////////////////////////////////////////////////
	var _str = "";
	for (var _s = 0; _s < (_prevImgTime.length - 1); _s++) {
		_str += "<div class='img prev" + _s + "'></div>";
	}

	//var _cookieValue=""
	var _cookieValue = cookie.get(_logoName + "_" + _jucha + "_" + _chasi + "_" + _page);
	if (_cookieValue == '' || _cookieValue == null) {
		_cookieValue = '의견을 입력하세요.'
	}

	var _pageDatas = _pageData.split("[/]pop");
	_pageData = _pageDatas[0];

	_str += "<div class='info'>";
	_str += "<div class='info_blit'></div>";
	_str += "<div class='info0'>" + _pageData + "</div>";

	_str += "<textarea class='input'>" + _cookieValue + "</textarea>";
	_str += "<button class='save' onclick='cookieSave();'>저장</button>";

	_str += "</div>";


	if (_pageDatas[1] == "" || _pageDatas[1] == undefined) {

	} else {
		_pageDatas[1] = _pageDatas[1].split("\r").join("</li><li>");

		_str += "<button class='open' title='새창열림' onclick='popOpen();'>교수님 의견보기</button>";
		_str += "<div class='pop'>";
		_str += "<div class='poplist mCustomScrollbar'>";

		_str += "<ul>"
		_str += _pageDatas[1];
		_str += "</ul>"

		_str += "</div>"

		_str += "<button class='close' onclick='popOpen();'>닫기</button>";

		_str += "</div>";
	}

	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//등장 모션
		////////////////////////////////////////////////////////////////////////////////////////////
		var _tl = new TimelineLite();
		for (var _s = 0; _s < _prevImgTime.length - 1; _s++) {
			_prevImg[_s].duration = "0.5";
			_prevImg[_s].ease = "Power1.out";

			_tl.to($('.img').eq(_s), _prevImg[_s], _prevImgTime[_s]);
		}

		_prevImg[_prevImgTime.length - 2].duration = "0.5";
		_prevImg[_prevImgTime.length - 2].ease = "Power1.out";

		_tl.to($('.info'), _prevImg[_prevImgTime.length - 2], _prevImgTime[_prevImgTime.length]);
		_tl.to($('.open'), _prevImg[_prevImgTime.length - 2], _prevImgTime[_prevImgTime.length]);

		clearTimeout(_setTimeout);
	}, 100);
}

////////////////////////////////////////////////////////////////////////////////////////////
//function
////////////////////////////////////////////////////////////////////////////////////////////
function cookieSave() {
	var _inputValue = $(".input").val();
	try {
		if (_inputValue == "의견을 입력하세요." || _inputValue == "") {
			alert("내용을 입력하세요.");
			return;
		}
		cookie.set(_logoName + "_" + _jucha + "_" + _chasi + "_" + _page, $(".input").val())
		alert("저장되었습니다.");
	} catch (e) {}
}

function popOpen() {
	if ($(".pop").css("display") == "none") {
		$(".pop").show();

		if (!_video.paused) {
			play();
		}
	} else {
		$(".pop").hide();
		if (_video.paused && $(".end").css("display") == "none") {
			play();
		}
	}
}
