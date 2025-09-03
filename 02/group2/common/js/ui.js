/**
	2017. 03. 10
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
	UI View 
**/

var w_h;
var w_w;
var container_scale = 1;
var dev = true;// true 개발중 //false 검수
var mobileReadyFlag = false;//모바일 재생 확인
var samsung_Browser_4;
var deviceMobile;
var device_Android_4;
var device_iPhone;
var samsung_Browser_4;
var iframe = window.parent.document.getElementById("main") || window.parent.document.querySelector("iframe[name='main']");
var browserWidth = top.window.innerWidth;
var browserHeight = top.window.innerHeight;

/** onload **/
$(window).on("load", function() {
	if (isMobilePlatform()) {
		console.log(" 모바일 ");
	}
	if(!isLocal){
		adjustMainIframeSize();
	}
	responsive();
});

/** resizing **/
$(window).resize(function (e) {
	M_chage();
	if(!isLocal){
		adjustMainIframeSize();
	}
	responsive();
});

/** 모바일 화면 돌릴때 **/
$(window).on("orientationchange", function (event) {
	M_chage();
	if(!isLocal){
		adjustMainIframeSize();
	}
	responsive();
});
/** 페이지 초기화 **/
function initialize() {
	$('#fs-index').attr('showing', false)
	if (!dev) {//개발 아닐때 
		$("body").attr("oncontextmenu", "return false");
		$("body").attr("ondragstart", "return false");
		$("body").attr("onselectstart", "return false");
	}
	/** coin */
	// setCoin();
	// settingStart()
	
	/** menu **/
	setIndex();

	/** bottom **/
	setBottom();

	/** top **/
	// newstyle()
	setTop();

	/** 효과음 장착 **/
	writeEffectAudio();
	$("*").removeAttr("title")

	// if (jQuery.browser.safari) {
	// 	console.log("사파리 브라우저 차단")
	// 	// Safari인 경우 얼럿 메시지 띄우기
	// 	alert("(Error) safari 브라우저는 지원하지 않습니다.");
			
	// 	$('#wrap').css("pointer-events","none")
	// 	setPause()
	// 	handleCloseClick()
	// }	
	setTimeout(() => {
		if(!isLocal){
			adjustMainIframeSize();
		}
		$(top.window).resize(function (e) {
			M_chage();
			if(!isLocal){
				adjustMainIframeSize();
			}
			responsive();
		});
	}, 100);
}

//반응형 scale 조정
function responsive() {
	w_h = $('#wrap').height();
	w_w = $('#wrap').width();

	// 해상도가 1280x720 이상일 때에도 적절한 스케일을 계산
	var h_scale = w_h / 720;
	var w_scale = w_w / 1280;

	// 해상도가 1280x720 이하일 경우에만 스케일을 계산하고, 이상일 때는 고정
	if (w_w > 1280 || w_h > 720) {
		var w_scale = w_w / 1280;
		if (h_scale > w_scale) {//w 기준
			container_scale = w_scale;
		} else {//h 기준
			container_scale = h_scale;
		}
	} else {
			container_scale = Math.min(h_scale, w_scale);
	}

	// 안드로이드 4 버전일 경우
	if (device_Android_4) {
			$("#fs-container").css("-webkit-transform", 'scale(' + container_scale + ',' + container_scale + ')');
	} else { // 그 외 기기들
			$("#fs-container").css("transform", 'scale(' + container_scale + ',' + container_scale + ')');
			$('#fs-container').css('left', "50%");
			$('#fs-container').css('top', "50%");
	}

	// 스케일에 따른 마진 조정
	$('#fs-container').css('margin-top', container_scale * -360);
	$('#fs-container').css('margin-left', container_scale * -640);

	// 반응형으로 좌표 설정 재계산
	setTimeout(() => {
    var _slide_bg = document.getElementById("slide_bg");
    if (_slide_bg) {
        _rect = _slide_bg.getBoundingClientRect();
				_dragX = _rect.left;
				_dragWidth = _rect.left + _rect.width;
    } else {
        console.error("Error: _slide_bg 요소를 찾을 수 없습니다.");
    }
	}, 100);
}



function M_chage(){
			if( !mobileReadyFlag ){
				$("#mobile_ready img").attr("src","../common/css/img/m_ready.png");
				$("#mobile_ready").show();
			}else{
				$("#mobile_ready").hide();
			}
			$("#mobile_ready").on("click",function(){
				$(this).hide();
				setPlay();
				mobileReadyFlag = true;
			});
	//	}
	}

//모바일 view
function movileAlertView() {
	var m_view = '';
	m_view += '<div id="mobile_ready" style="z-index:999;width:100%;height:100%;position:fixed;left:0;top:0;text-align:center;background:rgba(0,0,0,0.8);display:none;">';
	m_view += '	<img style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);">';
	m_view += '</div>';
	$("#wrap").append(m_view);

}

function isMobilePlatform() {
	//return true;
	if (navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
		|| navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	}
	else {
		return false;
	}
}

function MobileCheck() {
	deviceMobile = true;
	device_Android_4 = false;
	device_iPhone = false;
	samsung_Browser_4 = false;
	if (/Android/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /Mobile/i.test(navigator.userAgent)) {
		//mobile 
		//alert('mobile 접속'); 
		if (/SamsungBrowser\/4.0/i.test(navigator.userAgent)) {
			//alert("삼성내장브라우저 버전 4.0")
			alert("배속을 지원하지 않는 브라우저 입니다. ")
			samsung_Browser_4 = true;
		}
		if (/Android 4./i.test(navigator.userAgent)) {
			//alert("안드로이드 버전 4.")
			device_Android_4 = true;
			// 안드로이드 4
		} else {
			device_Android_4 = false;
			device_iPhone = false;
			if (/iPhone/i.test(navigator.userAgent)) {
				device_iPhone = true;
			}
			//alert("안드로이드4.버전이 아닌")
			// 그 외 디바이스
		}
		//return true;
	} else {
		//pc 
		deviceMobile = false;
		//return false;
	}
}
	
function adjustMainIframeSize() {
	// 부모 프레임의 최상단 위치에 있는 #main iframe 요소를 찾습니다.

	// #main iframe이 감지되었을 때만 실행합니다.
	if (iframe !== 'undefined' && iframe !== null) {
			// 브라우저의 너비와 높이를 가져옵니다.
			// 부모 프레임인 #main의 크기를 브라우저 크기에 맞춥니다.
			browserWidth = top.window.innerWidth;
			browserHeight = top.window.innerHeight;
			iframe.style.width = browserWidth + "px";
			iframe.style.height = browserHeight + "px";
	}
}
