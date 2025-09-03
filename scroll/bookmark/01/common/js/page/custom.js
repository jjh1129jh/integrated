console.log("custom");

var _bgcolor = _metaData[2].custom[0].bgcolor;
var _bgPath = _metaData[2].custom[0].bgPath;

var _frameThick = _metaData[2].custom[0].frameThick;
var _frameColor = _metaData[2].custom[0].frameColor;
var _frameOpacity = _metaData[2].custom[0].frameOpacity;

var _bottomHeight = _metaData[2].custom[0].bottomHeight;
var _bottomColor = _metaData[2].custom[0].bottomColor;

var _bottomProgressLeft = _metaData[2].custom[0].bottomProgressLeft;
var _bottomProgressWidth = _metaData[2].custom[0].bottomProgressWidth;
var _bottomProgressHeight = _metaData[2].custom[0].bottomProgressHeight;

var _bottomProgressAreaColor = _metaData[2].custom[0].bottomProgressAreaColor;
var _bottomProgressFillColor = _metaData[2].custom[0].bottomProgressFillColor;

var _bottomVolum = _metaData[2].custom[0].bottomVolum;

var _indexAlignType = _metaData[2].custom[0].indexAlignType;
var _logo = _metaData[2].custom[0].logo;

setBgCustom();
setFrameCustom();
setBottomCustom();
setMenuCustom();
setTopCustom();
setAddCustom();


function setBgCustom() {
	/*
		"bgcolor": "#ffffff",
    	"bgPath": "../common/img/custom/5_bg.png",
	*/
	//바탕이미지 혹은 바탕색으로 적용한다.
	if (_bgPath == "") {
		$("body").css({
			"background-color": _bgcolor
		});
	} else {
		$("body").css({
			"background": "url(" + _bgPath + ")"
		})
	}
}

function setFrameCustom() {
	/*
		"frameThick": "0",
		"frameColor": "#ffffff",
		"frameOpacity": "1",
	*/

	//페이지 크기를 적용한다.
	//$("#page").css({"width":_width+"px","height":_height+"px","margin":"-"+(_height/2)+"px -"+(_width/2)+"px"})

	var _frameWidth = trance.number(_width) + (_frameThick * 2);
	var _frameHeight = trance.number(_height) + (_frameThick * 2);
	$(".frame").css({
		"width": _frameWidth + "px",
		"height": _frameHeight + "px",
		// "background-color": _frameColor,
		"opacity": _frameOpacity,
		//"margin": -(_height / 2) + "px -" + (_width / 2) + "px"
	});
	$(".container").css({
		"margin": _frameThick + "px"
	});
	//$(".htmlPage").css({"width":_frameWidth+"px","height":_frameHeight+"px"});
}

function setBottomCustom() {
	/*
		"bottomHeight": "32",
		"bottomColor": "#131313",

		"bottomBtnWidth": "32",
		"bottomButtons": "play, replay, script, additional, mute",
		"bottomEtcButtons": "index",
		"bottomProgressCustom": "true",
		"bottomProgressVerticalAlign": "over",

		"bottomProgressLeft": "0",
		"bottomProgressWidth": "960",
		"bottomProgressHeight": "5",

		"bottomProgressRadius": "0",
		"bottomProgressAreaColor": "#4d4d4d",
		"bottomProgressFillColor": "#c3e074",
		"bottomProgressPoint": "point",

		"bottomScriptCustom": "true",
		"bottomScriptWidth": "960",
		"bottomScriptHeight": "70",
		"bottomScriptRadius": "0",
		"bottomScriptOpacity": "1",
		"bottomScriptAreaY": "1",
		"bottomScriptTime": "true",
		"bottomVolum": "p",
		"bottomEndType": "normal",
	*/

	

	$(".playCon .play").hover(function () {
		$(this).children().css({
			"color": _bottomProgressFillColor
		})
	}, function () {
		$(this).children().css({
			"color": "#fff"
		})
	})

	$(".bottom").css({
		"width": _width + "px"
	});

	$(".bottom .btns button").css({
		"width": _bottomHeight + "px",
		"height": _bottomHeight + "px"
	});
	$(".bottom .etc button").css({
		"width": _bottomHeight + "px",
		"height": _bottomHeight + "px"
	});
	$(".bottom .pages button").css({
		"width": _bottomHeight + "px",
		"height": _bottomHeight + "px"
	});
	$(".rateBtn").css({
		"width": "100%"
	});


	//index의 경우 텍스트를 포함해서 간격을 지정한다.
	//$(".bottom .etc .index").css({"width":"150px"})
	if (_fontasome != false) {
		$(".bottom button").hover(function () {
			$(this).children().css({
				"color": _bottomProgressFillColor
			})
		}, function () {
			$(this).children().css({
				"color": "#fff"
			})
		})
	}
	$(".bottom .bg").css({
		"height": _bottomHeight + "px",
		"background-color": _bottomColor
	});

	//$(".bottom .progress").css({"left":_bottomProgressLeft+"px"});
	//$(".bottom .progress").css({"margin":"0px -"+(_width/2)+"px","top":-_bottomProgressHeight+"px"});
	$(".bottom .progress").css({
		"top": -_bottomProgressHeight + "px",
		"height": _bottomProgressHeight + "px"
	});
	//$(".progress .area").css({"width":_bottomProgressWidth+"px","height":_bottomProgressHeight+"px","background-color":_bottomProgressAreaColor});
	//$(".progress .fill").css({"width":_bottomProgressWidth+"px","height":_bottomProgressHeight+"px","background-color":_bottomProgressFillColor});

	$(".progress .area").css({
		"background-color": _bottomProgressAreaColor
	});
	$(".progress .fill").css({
		"background-color": "#e05939"
	});
	//$(".progress .point").css({"background-color":_bottomProgressFillColor,"margin":"-"+(($(".progress .point").width()/2)-(_bottomProgressHeight/2))+"px"});
	//$(".progress .point").css({"margin":"-"+(($(".progress .point").width()/2)-(_bottomProgressHeight/2))+"px"});

	//볼륨조절이 세로인경우
	if (_bottomVolum == "v") {
		
		$(".volum").addClass("vertical");
		$(".volum").css({
			"top": -($(".vertical").height() + (trance.px($(".vertical").css("padding-top")) * 2)) - 10 + "px"
		});
		
		//$(".volum").css({"top":-($(".vertical").height())+"px"});
	} else {
		$(".volum").css({
			"top": ((_bottomHeight / 2) - 2) + "px"
		});
	}

	//$(".volum .volumArea").css({"background-color":_bottomProgressAreaColor});
	$(".volum .volumFill").css({
		"background-color": _bottomProgressFillColor
	});
	$(".volum .volumPoint").css({
		"background-color": _bottomProgressFillColor
	});

	var _bottomScriptWidth = _metaData[2].custom[0].bottomScriptWidth;
	var _bottomScriptHeight = _metaData[2].custom[0].bottomScriptHeight;
	var _bottomScriptRadius = _metaData[2].custom[0].bottomScriptRadius;
	var _bottomScriptOpacity = _metaData[2].custom[0].bottomScriptOpacity;
	var _bottomScriptAreaY = _metaData[2].custom[0].bottomScriptAreaY;

	$(".scripts .scriptBg").css({
		"border-radius": _bottomScriptRadius + "px",
		"opacity": _bottomScriptOpacity + "px"
	});
	//$(".scripts .scriptTxt").css({"width":(_bottomScriptWidth-20)+"px","height":(_bottomScriptHeight-20)+"px"});
	$(".scripts .scriptArea").css({
		"top": _bottomScriptAreaY + "px",
		"width": _bottomScriptWidth + "px",
		"height": _bottomScriptHeight + "px"
	});

	//left를 기준으로 정렬
	if (_fontasome != false) {
		$(".bottom button").css({
			"background": "url('../img/basic/blck.png')"
		})

		/*
		for(var _b=0;_b<_bottomButtons.length;_b++){
			//$(".bottom button").eq(_b).css({"left":(_bottomHeight*_b)+"px"})
		}
		*/
		//$(".bottom .btns").css({"left":$(".bottom .etc").width()+"px"});


		//볼륨조절이 세로인경우
		/*
		if(_bottomVolum=="v"){
			$(".bottom .volum").css({"left":trance.px($(".bottom .btns").css("left"))+(_bottomHeight*(_bottomButtons.length-1))+"px"})
			$(".bottom .time").css({"left":trance.px($(".bottom .btns").css("left"))+(_bottomHeight*_bottomButtons.length)+"px"});
		}else{
			$(".bottom .volum").css({"left":trance.px($(".bottom .btns").css("left"))+(_bottomHeight*_bottomButtons.length)+"px"})
			$(".bottom .time").css({"left":trance.px($(".bottom .btns").css("left"))+(_bottomHeight*_bottomButtons.length+1)+"px"});
		}
		*/
	}

	/*
	$(".bottom .time").css({
		"background-color":_bottomProgressFillColor
	});
	*/
	
	/*
	$(".bottom .time div").css({
		"height": _bottomHeight + "px"
	});
	*/

	$(".bottom .pages").css({
		"height": _bottomHeight + "px"
	});

	if (_bottomButtons.indexOf("rate") != -1) {
		if (_fontasome != false) {
			$(".rateCon").css({
				"left": trance.px($(".btns").css("left")) + trance.px($(".rate").css("left")) + "px"
			})
		}
		$(".rateCon").css({
			"top": -$(".rateCon").height() - 10 + "px"
		})
	}

	if (_autoplay) {
		if (_fontasome != false) {
			$(".bottom .pages .autoplay").css({
				"right": (_bottomHeight * 4) + "px"
			})
		}
	}
	/*
	if(_fontasome!=false){
		//right을 기준으로 정렬
		//10은 division크기
		var _divisionWidth=$(".bottom .pages .division").width();
		$(".bottom .pages .prevPage").css({"right":(_bottomHeight*3)+_divisionWidth+"px"})
		$(".bottom .pages .now").css({"width":_bottomHeight+"px","height":_bottomHeight+"px","right":(_bottomHeight*2)+_divisionWidth+"px"});
		$(".bottom .pages .division").css({"height":_bottomHeight+"px","right":(_bottomHeight*2)+"px"});
		$(".bottom .pages .max").css({"width":_bottomHeight+"px","height":_bottomHeight+"px","right":_bottomHeight+"px"});
		$(".bottom .pages .nextPage").css({"right":"0px"})
	}else{
		$(".bottom .pages .now").css({"width":_bottomHeight+"px","height":_bottomHeight+"px"});
		$(".bottom .pages .division").css({"width":_bottomHeight+"px","height":_bottomHeight+"px"});
		$(".bottom .pages .max").css({"width":_bottomHeight+"px","height":_bottomHeight+"px"});
	}
	*/
	$(".bottom .pages .now").css({
		"width": _bottomHeight + "px",
		"height": _bottomHeight + "px"
	});
	$(".bottom .pages .division").css({
		"width": _bottomHeight + "px",
		"height": _bottomHeight + "px"
	});
	$(".bottom .pages .max").css({
		"width": _bottomHeight + "px",
		"height": _bottomHeight + "px"
	});

	//$(".end").css({"bottom":_bottomHeight+"px","background-color":_bottomProgressFillColor});
	//$(".end").css({"bottom":_bottomHeight+"px"});

	//간격 5를 더한다.
	$(".scripts").css({
		"margin-left": -((_width / 2) - _frameThick) + "px",
		"bottom": Number(_bottomHeight) + Number(_bottomProgressHeight) + "px",
		"width": _bottomScriptWidth + "px",
		"height": _bottomScriptHeight + "px"
	});

	$(".scripts .scriptArea").mCustomScrollbar({
		theme: "light-3",
		scrollInertia: 0,
		mouseWheelPixels: 18
	});

	//모바일의 경우 기본 스크롤로 대체한다.
	if (_device != "PC" && _device.substring(0, 2) != "IP") {
		$(".scripts .scriptArea").mCustomScrollbar("destroy");
		$(".scripts .scriptArea").css("overflow", "auto");
	}
}


function setMenuCustom() {
	/*
		"indexType": "sub",
		"indexDesignType": "img",
		"indexAlignType": "bottom",
		"indexEtc": "",
	*/

	var _bundleGroubLength = $(".menu").children().length;


	for (_p = 0; _p < _bundleGroubLength; _p++) {
		//하위메뉴가 하나인경우 감춰준다.
		var _pageMenuLength = $(".pageGroub").eq(_p).children().length;
		if (_pageMenuLength == 1) {
			$(".pageGroub").eq(_p).hide();
		}
	}

	//커스텀에 따라 정렬해준다.
	if (_indexAlignType == "bottom" || _indexAlignType == "top") {
		$(".bundleGroub").css({
			"width": Math.floor(_width / _bundleGroubLength) + "px",
			"float": "left"
		});
		$(".bundleGroub .pageGroub").css({
			"width": "100%"
		});
		$(".bundleGroub .bundleMenu").css({
			"height": "200px"
		});
		$(".bundleGroub button").css({
			"width": "100%"
		});

		$(".menu").css({
			"left": "50%",
			"margin": "0px -" + ((_width / 2) - _frameThick) + "px"
		});
		if (_indexAlignType == "bottom") {
			$(".pageGroub").css({
				"position": "absolute",
				"bottom": "200px"
			});
			//$(".menu").css({"bottom":+(parseInt(_bottomHeight,10)+5)+"px"})
			$(".menu").css({
				"bottom": "-500px"
			})
		} else {
			$(".menu").css({
				"top": "-500px"
			})
		}
	} else {
		//아이콘 디자인
		if (_fontasome != false) {
			$(".bundleGroub").css({
				"height": Math.floor(100 / _bundleGroubLength) + "%"
			});
			$(".bundleGroub .bundleMenu").css({
				"height": "100%"
			});
			$(".pageGroub").css({
				"position": "absolute",
				"top": "0px",
				"left": "200px"
			});
		}

		//$(".bundleGroub button").css({"width":"200px"});
		//$(".menu").css({"left":"-400px","top":"50%","margin":"-"+((_height/2)-_frameThick)+"px 0px"});
		$(".menu").css({
			"left": "-400px"
		});
	}

	//간격 5를 더한다.
	//$(".menu").css({"margin-left":-(_width/2)+"px","bottom":parseInt(_bottomHeight,10)+parseInt(_bottomScriptHeight,10)+5+"px"});

	//아이콘 디자인
	if (_fontasome != false) {
		$(".menu button").hover(function () {
			$(this).css({
				"color": _bottomProgressFillColor
			})
			$(this).children().css({
				"color": _bottomProgressFillColor
			})
		}, function () {
			$(this).css({
				"color": "#fff"
			})
			$(this).children().css({
				"color": "#fff"
			})
		})

		$(".menu .active").hover(function () {
			$(this).css({
				"color": "#2a2a2a"
			})
			$(this).children().css({
				"color": "#2a2a2a"
			})
		}, function () {
			$(this).css({
				"color": "#fff"
			})
			$(this).children().css({
				"color": "#fff"
			})
		})
	}

	//pageMenu를 통해 bundleMenu활성
	for (var _p = 0; _p < $(".pageMenu").length; _p++) {
		if ($(".pageMenu").eq(_p).hasClass("active")) {
			$(".pageMenu").eq(_p).parent().parent().children(".bundleMenu").addClass("active")
		}
	}
}

function setTopCustom() {
	/*
		"logo": "../common/img/custom/2107_logo.png",
	*/

	if (_logo != "") {
		var _str = "<img src='" + _logo + "' alt='" + _logoName + "'/>"
		$(".logo").html(_str);
	}

	$(".top .no").css({
		"background-color": _bottomProgressFillColor
	});

	$(".top .details").css({
		"top": $(".chasi").css("height")
	})

	if (_jucha != undefined) {
		//$(".top .no").css({"width":"80px"});
		//$(".top .chasi").css({"left":"85px"});

		//$(".top .bundle").css({"left":"85px"});
	}
	//10은bundle의 padding값
	//$(".top .page").css({"left":trance.px($(".top .bundle").css("left"))+$(".top .bundle").width()+20+"px"});
}

function setAddCustom() {

	$(".add .addConArea").css({
		"width": _width + "px",
		"height": _height + "px",
		"margin": (-((_height / 2) - _frameThick)) + "px " + (-((_width / 2) - _frameThick)) + "px"
	});
	$(".add .addCon").css({
		"width": (_width * _additional.length) + "px",
		"height": _height + "px"
	});
	$(".add .addCon").children().css({
		"width": _width + "px",
		"height": _height + "px"
	});
	$(".add .addCon .addConBg").css({
		"width": (_width - 40) + "px",
		"height": (_height - 100) + "px"
	});

	$(".addClose").hover(function () {
		$(this).children().css({
			"color": _bottomProgressFillColor
		})
	}, function () {
		$(this).children().css({
			"color": "#fff"
		})
	})

	$(".roadContainer").mCustomScrollbar({
		theme: "dark-3",
		scrollInertia: 0,
		mouseWheelPixels: 18
	});

	$(".mark").attr("title","북마크 추가")
	$(".mark").attr("alt","북마크 추가")
	$(".markdel").attr("title","북마크 초기화")
	$(".markdel").attr("alt","북마크 초기화")
	$(".rate").attr("title","재생속도")
	$(".rate").attr("alt","재생속도")

	//모바일의 경우 기본 스크롤로 대체한다.
	if (_device != "PC" && _device.substring(0, 2) != "IP") {
		$(".roadContainer").mCustomScrollbar("destroy");
		$(".roadContainer").css("overflow", "auto");
	}
}
