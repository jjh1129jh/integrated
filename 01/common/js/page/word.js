console.log("word");

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _word = _pageData.word;
var _wordImgTime = trance.array(_metaData[2].custom[0].wordImgTime);
var _wordImg = _metaData[2].custom[0].wordImg;

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

	for (var _w = 0; _w < (_wordImgTime.length); _w++) {
		_str += "<div class='img word" + _w + "'></div>";
	}

	_str += "<div class='btns'>";

	for (var _i = 0; _i < _word.length; _i++) {
		var _title = _word[_i].title;
		_str += "<button class='btn' onclick='cardOpen(" + _i + ")'>" + _title + "</button>";
	}

	_str += "</div>";
	_str += "<div class='scroll mCustomScrollbar'><div class='txt'></div></div>";

	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//페이지 커스텀
		////////////////////////////////////////////////////////////////////////////////////////////
		$(".htmlPage .scroll").mCustomScrollbar({
			theme: "dark-3",
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
		
		for (var _w = 0; _w < _wordImgTime.length - 1; _w++) {
			_wordImg[_w].duration = "1.5";
			_wordImg[_w].ease = "Power1.out";

			_tl.to($('.img').eq(_w), _wordImg[_w], _wordImgTime[_w]);
		}
		_tl.to($('.btns'), {
			"opacity": "1",
			duration: "0.5",
			ease: "Power1.out"
		}, _wordImgTime[_wordImgTime.length]);
		_tl.to($('.scroll'), {
			"opacity": "1",
			duration: "0.5",
			ease: "Power1.out"
		}, _wordImgTime[_wordImgTime.length]);

		////////////////////////////////////////////////////////////////////////////////////////////
		//function
		////////////////////////////////////////////////////////////////////////////////////////////
		cardOpen(0);

		clearTimeout(_setTimeout);
	}, 100);
};

function cardOpen(n) {
	$(".htmlPage .btns .btn").removeClass("check");
	$(".htmlPage .btns .btn").eq(n).addClass("check");
	$(".htmlPage .scroll .txt").html(_word[n].info);
}
