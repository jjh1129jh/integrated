/**
	2017. 03. 10
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
**/


var pageArray = new Array();
/**

	파일명, 타입(V1:동영상만 , V2:html 화면 이벤트 X, V3:html 화면 이벤트 X), html 나오는 시간, A mp3 페이지 

**/
// 퀴즈종류

// 'linearQuiz': 1,   // 일방 퀴즈 (기회 무한)
// 'quiz': 2,         // 일반 퀴즈 (기회 1번)
// 'quizMulti': 3,    // 답이 여러개인 퀴즈 (기회 1번)
// 'run': 4, 					// 드래곤잡기 이전 장애물 피하기
// 'clickAndLine': 5, // 클릭형 선긋기
// 'flip': 6,         // 카드 띄우기
// 'slide': 7,        // 슬라이드 넘기기
// 'receive': 8,      // 상자에 받기
// 'simpleclick': 9,  // 단순 클릭
// 'attack': 10,      // 드래곤 공격
// 'oath': 11         // 서약서 오픈

// 퀴즈종류

pageArray[1] = ["03_01.html", "V3", 1, "run"];

var _cw = 1280;
var _ch = 720;

var cssPath = "../common/css/img/";
var imgType = ".png";

var thisurl=location.href;
var fileurl = thisurl.lastIndexOf("/");
var fileName = thisurl.substring(fileurl+1);
var curChasi = parseInt(fileName.substr(0,2), 10);
var curPage = parseInt(fileName.substr(3,2), 10);
var curTol = pageArray.length-1;
var balloonFlag = true;

// 과정명
var topTitle = "2024 코오롱 윤리경영 과정"; //브라우저 타이틀
var leftChapterTitle = "2024 코오롱 윤리경영 과정";//왼쪽 챕터명
var rightChasiTitle = "";//오른쪽 차시명
var summaryPrintPage = 3//정리하기 인쇄 페이지 수
document.title = topTitle;

///////////////////////////////////////////////////////////////////////////////////////////////////
//msg("차시 : " + curChasi + " 페이지 : " + curPage + " 총 페이지 : " + curTol);
///////////////////////////////////////////////////////////////////////////////////////////////////


document.write('<script language="javascript" src="../common/js/common.js"></script>');


function itostr(inum) {
	return inum<10 ? "0"+inum : inum;
}

function msg(str){
	console.log(str);
}

function protoAlt(){
	alert("프로토에서는 지원하지 않습니다.");
}

function handleOver(){//오버시 이미지 o
	//playSound("over");
	var imgAttr = $(this).children().attr("src");
	imgAttr = imgAttr.substr(0,imgAttr.length-5);
	$(this).children().attr("src",imgAttr+"o.png");
	$(this).children().css("cursor","pointer");
}
function handleOut(){//아웃시 이미지 b
	var imgAttr = $(this).children().attr("src");
	imgAttr = imgAttr.substr(0,imgAttr.length-5);
	$(this).children().attr("src",imgAttr+"b.png");
}

function handleDown(){//크클릭 이미지 u
	var imgAttr = $(this).children().attr("src");
	imgAttr = imgAttr.substr(0,imgAttr.length-5);
	$(this).children().attr("src",imgAttr+"u.png");
}
function handleUp(){//크클릭 후 기본 b
	playSound("click");
	var imgAttr = $(this).children().attr("src");
	imgAttr = imgAttr.substr(0,imgAttr.length-5);
	$(this).children().attr("src",imgAttr+"b.png");
	
}