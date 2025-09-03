console.log("goal");

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _goalImgTime = trance.array(_metaData[2].custom[0].goalImgTime);
var _goalImg = _metaData[2].custom[0].goalImg;

var _tl = new TimelineLite();
////////////////////////////////////////////////////////////////////////////////////////////
//css적용
////////////////////////////////////////////////////////////////////////////////////////////
$("#page").append('<link rel="stylesheet" type="text/css" href="../common/css/' + _type + '.css">') 
{
	////////////////////////////////////////////////////////////////////////////////////////////
	//페이지 구성
	////////////////////////////////////////////////////////////////////////////////////////////

	//미리보기의경우(_design을 기준으로구분)경로를 변경한다.
	var _icon_path = "../common/";
	if (typeof _design != "undefined") {
		_icon_path = '../../../basic/custom/type' + _design + '/'
	}

	var _str = "";
	for (var _g = 0; _g < (_goalImgTime.length - 1); _g++) {
		_str += "<div class='img goal" + _g + "'></div>";
	}

	//20220812: 중앙 정렬을 위해 다음의 코드 삽입
	_pageData = _pageData.split('<div class="eContnt">').join('<div class="eContnt"><div class="con">');
	_pageData = _pageData.split('<div class="eGoal">').join('<div class="eGoal"><div class="con">');
	_pageData = _pageData.split('</div>').join('</div></div>');

	_str += _pageData;

	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//페이지 커스텀
		////////////////////////////////////////////////////////////////////////////////////////////
		$(".htmlPage .eGoal .blit").html('<img src="' + _icon_path + 'img/goal/goalblit.png"/>');
		$(".htmlPage .eContnt .blit").html('<img src="' + _icon_path + 'img/goal/contentsblit.png"/>');
		////////////////////////////////////////////////////////////////////////////////////////////
		//등장 모션
		////////////////////////////////////////////////////////////////////////////////////////////
		
		for (var _g = 0; _g < _goalImgTime.length; _g++) {
			_goalImg[_g].duration = "0.5";
			_goalImg[_g].ease = "Power1.out";

			_tl.to($('.img').eq(_g), _goalImg[_g], _goalImgTime[_g]);
		}

		_tl.to($('.eGoal'), {
			"opacity": "1",
			duration: "0.5",
			ease: "Power1.out"
		}, _goalImgTime[_goalImgTime.length - 3]);
		_tl.to($('.eContnt'), {
			"opacity": "1",
			duration: "0.5",
			ease: "Power1.out"
		}, _goalImgTime[_goalImgTime.length - 2]);
		clearTimeout(_setTimeout);
	}, 100);
};
