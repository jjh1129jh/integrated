console.log("outro");
////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _outText = _metaData[2].custom[0].outText;
var _outImgTime = trance.array(_metaData[2].custom[0].outImgTime);
var _outImg = _metaData[2].custom[0].outImg;

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
	for (var _o = 0; _o < _outImgTime.length; _o++) {
		_str += "<div class='img out" + _o + "'></div>";
	}

	//차시정보를 텍스트로 노출하려는 경우
	if (_outText) {
		_str += "<div class='text this'><span class='no'>" + _chasi + "</span><span class='txt'>" + _metaData[3].pages[_chasi - 1].chasi[0].page[0].title0 + "</span></div>";
		if (_chasi == _pageLength) {
			_str += "<div class='text next'><span class='no'></span><span class='txt'>수고하셨습니다.</span></div>";
		} else {
			_str += "<div class='text next'><span class='no'>" + (_chasi + 1) + "</span><span class='txt'>" + _metaData[3].pages[_chasi].chasi[0].page[0].title0 + "</span></div>";
		}
	}
	
	
	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//등장 모션
		////////////////////////////////////////////////////////////////////////////////////////////
		
		for (var _o = 0; _o < _outImgTime.length; _o++) {
			_outImg[_o].duration = "0.5";
			_outImg[_o].ease = "Power1.out";

			_tl.to($('.img').eq(_o), _outImg[_o], _outImgTime[_o]);
		}

		//이번차시 안내 & 다음차시 안내
		var _this = _metaData[3].pages[_chasi - 1].chasi[_page - 1].page[0].this;
		var _next = _metaData[3].pages[_chasi - 1].chasi[_page - 1].page[0].next;

		//별도 기입된 시간이 없다면 이번시간안내는 1초
		//다음시간 안내는 2초
		if (_this == "") {
			_this = 1;
			_next = 2;
		}
		_tl.to($('.this'), {
			opacity: 1,
			duration: "0.5",
			ease: "Power1.out"
		}, _this);
		_tl.to($('.this'), {
			opacity: 0,
			duration: "0.5",
			ease: "Power1.out"
		}, _next);
		_tl.to($('.next'), {
			opacity: 1,
			duration: "0.5",
			ease: "Power1.out"
		}, _next);

		//_tl.play();
		clearTimeout(_setTimeout);
	}, 100);
};
