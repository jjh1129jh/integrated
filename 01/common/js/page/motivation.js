console.log("motivation");

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _prevImgTime = trance.array(_metaData[2].custom[0].prevImgTime);
var _prevImg = _metaData[2].custom[0].prevImg;

//console.log(_prevImg)
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
	for (var _s = 0; _s < (_prevImgTime.length - 1); _s++) {
		_str += "<div class='img prev" + _s + "'></div>";
	}

	//웹접근성을 위한 추가 적용
	_pageData=_pageData.split('" onclick="').join('" title="새창 열림" onclick="')
	
	if(_pageData.indexOf("link0")!=-1){
		_pageData=_pageData.split("></button>").join(">사이트 바로가기</button>")
	}
	if(_pageData.indexOf("link1")!=-1){
		_pageData=_pageData.split("></button>").join(">기사보기</button>")
	}
	if(_pageData.indexOf("link2")!=-1){
		_pageData=_pageData.split("></button>").join(">영상보기</button>")
	}
	if(_pageData.indexOf("link3")!=-1){
		_pageData=_pageData.split("></button>").join(">다운로드</button>")
	}
	_str += _pageData;
	
	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//등장 모션
		////////////////////////////////////////////////////////////////////////////////////////////
		
		for (var _s = 0; _s < _prevImgTime.length - 1; _s++) {
			_prevImg[_s].duration = "0.5";
			_prevImg[_s].ease = "Power1.out";

			_tl.to($('.img').eq(_s), _prevImg[_s], _prevImgTime[_s]);
		}

		_prevImg[_prevImgTime.length - 2].duration = "0.5";
		_prevImg[_prevImgTime.length - 2].ease = "Power1.out";

		_tl.to($('.info'), _prevImg[_prevImgTime.length - 2], _prevImgTime[_prevImgTime.length]);

		clearTimeout(_setTimeout);
	}, 100);
}

////////////////////////////////////////////////////////////////////////////////////////////
//function
////////////////////////////////////////////////////////////////////////////////////////////
