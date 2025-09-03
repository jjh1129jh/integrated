/**
	2017. 01. 23
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
**/

///////////////////////////////////////////////////////////////////////////////////////////////////

var isLocal = true;   // true 로컬, false 서버				
var vodPath;		       // 영상 주소
var controlcheck  = 1;     // 0:순차진행안함 1:순차진행

/* 재생 시 로딩해야 할 함수 */ 
function studyOnLoad(){

	var stdyFnlInfo= window.parent.stdyFnlInfo;              //  최종진도값  ex) 0103 (01차시 03페이지) 
	var authKey = window.parent.authKey;                    //  인증키(콘텐츠)
	var preViewLectYn = window.parent.preViewLectYn ;  //   Y: 맛보기강의
	var reviewYn= window.parent.reviewYn;                  //   Y: 복습
	//alert("reviewYn : " + reviewYn)
}

studyOnLoad();

//alert("location.href : "+location.href)

if(location.href.indexOf("file") != -1 || location.href.indexOf("story21") != -1){	
	console.log("개발중")
}else{
	console.log("포팅");
}


if(isLocal){
	console.log("개발")
	vodPath = "../mp4/24_024_";
}else{
	console.log("포팅");
	vodPath = "https://vod.cdn.hunet.co.kr/eLearning/Hunet/HLAC00343/24_024_";

}

	

/** 
	CSS
**/
document.write('<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">');
document.write('<link href="../common/css/reset.css"  rel="stylesheet" />');
if(curChasi == '01'){
	document.write('<link href="../common/css/style_01.css"  rel="stylesheet" />');
}else if(curChasi == '02'){
	document.write('<link href="../common/css/style_02.css"  rel="stylesheet" />');
}else{
	document.write('<link href="../common/css/style.css"  rel="stylesheet" />');
}

document.write('<link href="../common/css/bottom.css"  rel="stylesheet" />');
document.write('<link href="../common/css/font.css"  rel="stylesheet" type="text/css" charset="utf-8" />');


if(pageArray[curPage][3] == "Check"){
	document.write('<link href="../common/css/quiz.css"  rel="stylesheet" />');
}else if(pageArray[curPage][3] == "Summary"){
	document.write('<link href="../common/css/summary.css"  rel="stylesheet" />');
}else if(pageArray[curPage][3] == "Practice"){
	document.write('<link href="../common/css/practice.css"  rel="stylesheet" />');
}
/**
	JS
**/

document.write('<script language="javascript" src="./js/scriptInfo.js"></script>');
document.write('<script language="javascript" src="./js/index.js"></script>');
document.write('<script language="javascript" src="../common/js/bottom.js"></script>');
document.write('<script language="javascript" src="../common/js/top.js"></script>');
document.write('<script language="javascript" src="../common/js/ui.js"></script>');
document.write('<script language="javascript" src="../common/js/audio.js"></script>');
document.write('<script language="javascript" src="../common/LMS/LMS_API.js"></script>');
document.write('<script language="javascript" src="../common/LMS/kbc.en.2023v1.min.js"></script>');

if(pageArray[curPage][3] == "Ot"){
	document.write('<script language="javascript" src="../common/js/ot.js"></script>');
}


function itostr(inum) {
	return inum<10 ? "0"+inum : inum;
}

// 시분초 초로 변환 
function timeToSecond(str){
	var timeArr = str.split(":");
	var SecondTime = Number(timeArr[0]*60) + Number(timeArr[1]);
	console.log("SecondTime : " + SecondTime + " str : " + str);
	return SecondTime;
}

function isMobilePlatform() {
	//return true;
	if (navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
		|| navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null)	{
		return true;
	}
	else {
		return false;
	}
}


function NextMove(next_page) {
	if(isLocal){
		location= next_page;
	} else {
	//	location= next_page;
		top.navi_frame.FnNextMove(next_page); //실제 LMS에서 사용     *실서버용 (진도체크용)
	}
}


