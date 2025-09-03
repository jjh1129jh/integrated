console.log("drag");

////////////////////////////////////////////////////////////////////////////////////커트라인

// JavaScript Document
/*드래그 액션*/

var dragfirststart = 0;

var chk1 = 0;
var chk2 = 0;
var chk3 = 0;
var wrongchk1 = 0;
var wrongchk2 = 0;

function getClientX(e){
	var returnVal = (e.originalEvent && e.originalEvent.clientX) || (e.touches && e.touches[0] && e.touches[0].clientX) || e.clientX || e.pageX ;
	return returnVal;
}
function getClientY(e){
	var returnVal = (e.originalEvent && e.originalEvent.clientY) || (e.touches && e.touches[0] && e.touches[0].clientY) || e.clientY || e.pageY ;
	return returnVal;
}
function _ChkHitTest(o, l){

	function getOffset(o){

		for(var r = {l: o.offsetLeft, t: o.offsetTop, r: o.offsetWidth, b: o.offsetHeight};

			o = o.offsetParent; r.l += o.offsetLeft, r.t += o.offsetTop);

		return r.r += r.l, r.b += r.t, r;

	}

	for(var b, s, r = [], a = getOffset(o), j = isNaN(l.length), i = (j ? l = [l] : l).length; i;

		b = getOffset(l[--i]), (a.l == b.l || (a.l > b.l ? a.l <= b.r : b.l <= a.r))

		&& (a.t == b.t || (a.t > b.t ? a.t <= b.b : b.t <= a.b)) && (r[r.length] = l[i]));

	return j ? !!r.length : r;

};
var currentOS;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLowerCase());
isMobile += navigator.userAgent.match(/iPhone|iPad|iPod/i) === null && navigator.maxTouchPoints != 5 ? false : true;
//isMobile=true;
if (isMobile) {
	// 유저에이전트를 불러와서 OS를 구분합니다.
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search("android") > -1)
		currentOS = "android";
	else if ((userAgent.search("iPhone") > -1)
			 || (userAgent.search("iPad") > -1)
			 || (userAgent.search("iPod") > -1)
			 || (userAgent.search("like Mac") > -1)
			 || (userAgent.match(/iPhone|iPad|iPod/i) === null && navigator.maxTouchPoints != 5 ? false : true))
		currentOS = "ios";
	else
		currentOS = "else";
} else {
	// 모바일이 아닐 때
	currentOS = "nomobile";

}
var mousedownEvent = currentOS=="nomobile" ? "mousedown" : "touchstart";
var mouseupEvent =  currentOS=="nomobile" ? "mouseup" : "touchend";
var mousemoveEvent =  currentOS=="nomobile" ? "mousemove" : "touchmove";
var mouseoverEvent =  currentOS=="nomobile" ? "mouseover" : "touchover";
var mouseoutEvent =  currentOS=="nomobile" ? "mouseout" : "touchcancle";
var mouseleaveEvent =  currentOS=="nomobile" ? "mouseleave" : "touchcancle";

var dragArray = new Array();
var dropArray = new Array();

var totalDragNum=0;
var totalDropNum=0;
var isClickEnabledFlag=true;

var dragMc=null;
var dropTarget

var isDragingFlag=false;

var nPosX;
var nPosY;

var iszIndex=0;;

var isCorrectNum=0; //해당 페이지 맞춰야 하는 개수

var mouseover = 0;

function _doActivityInit(){
	_doActivityInit2();

}


function _doActivityInit2(){
	$(".isDragObj").each(function(idx){
		dragArray.push({
			objElm:$(this),
			obj:this,
			id:this.id,
			top:$(this).offset.top,
			left:$(this).offset.left
			
		});
		
		this["thisNum"] = idx+1;
		this["initTop"] = $(this).css("top");
		this["initLeft"] = $(this).css("left");
		this["dap"] = $(this).data("dap");
		
		console.log(this.id +" , dap = "+this["dap"] +" / idx= "+idx);
		
		_dragInit($(this));
	});
	
	$(".isDropObj").each(function(idx){
		dropArray.push($(this));
		
		this["dap"] = $(this).data("dap");
		this["initTop"] = $(".dropPos").css("top");
		this["initLeft"] = $(this).css("left");
		console.log("DROP ::"+this["dap"]+" / "+this.id+" :: "+this["initTop"]);
		totalDropNum++;
	});
}

function _dragInit(mc){
	mc[0].addEventListener(mousedownEvent,_DragStart,false);
}


function _DragStart(e){
	var e = e || window.event;
	if(!isClickEnabledFlag){return;}
	dragMc = e.currentTarget;
	iszIndex++;
	 $(dragMc).css("z-index",iszIndex);
	e.preventDefault();
	isDragingFlag=true;
	effect("s_click");
	window.addEventListener(mousemoveEvent,_mouseMove);
	window.addEventListener(mouseupEvent,_mouseMoveStop);
}

function _mouseMove(e){
	var e = e || window.event;
	e.preventDefault();
	isDragingFlag=true;
	nPosX = getClientX(e);
	nPosY = getClientY(e);
	// console.log(nPosX)
	// console.log(nPosY)
	_doMOVE_MOUSE(nPosX , nPosY);

}


﻿function _doMOVE_MOUSE(_nPosX ,_nPosY){
    /*2023.07.27*/
    var sw = $(dragMc)[0].clientWidth;
    var sh = $(dragMc)[0].clientHeight;
    var new_left = ((nPosX - $(".page"+_dragPage).find("#dragBox").offset().left)* 1/container_scale) ;
    var new_top  = ((nPosY - $(".page"+_dragPage).find("#dragBox").offset().top)* 1/container_scale);
    $(dragMc).css("top",(new_top-sh/2)+"px");
    $(dragMc).css("left",(new_left-sw/2)+"px");
    /*2023.07.27*/
}

function _mouseMoveStop(e){
	var e = e || window.event;
	e.preventDefault();
	window.removeEventListener(mousemoveEvent,_mouseMove);
	window.removeEventListener(mouseupEvent,_mouseMoveStop);
	var dragMouseleft = $(dragMc).css("left");
	var dragMousetop = $(dragMc).css("top");
	var dragMouseleftNum = (Number(dragMouseleft.replace('px', '')));
	var dragMousetopNum = (Number(dragMousetop.replace('px', '')));
	if(dragMouseleftNum > 621 && dragMouseleftNum < 1155 && dragMousetopNum > 357 && dragMousetopNum < 581){
		dropTarget = _getDropTarget(dragMc["dap"] ,dropArray);
		var isHitFlag=false;
		if(dropTarget){
			
			console.log("dropTarget = "+dropTarget.attr("id"));	
			var hit = _ChkHitTest($(dragMc)[0] , dropTarget[0]);
			console.log($(dragMc)[0] , dropTarget[0]);
			console.log("hit >> "+hit);
			console.log(hit);
			if(hit){
				isHitFlag=true;
			}
			
		}else{
			console.log("no target!");
		}
		console.log("isHitFlag = 항아퍼항아퍼"+isHitFlag);
	
		
		if(isHitFlag){
			_doCheckOK();
		}else{
			$(dragMc).css("top" , dragMc["initTop"]);
			$(dragMc).css("left" , dragMc["initLeft"]);
			_doCheckNo();
			
		}
	}
	else{
		$(dragMc).css("top" , dragMc["initTop"]);
			$(dragMc).css("left" , dragMc["initLeft"]);
	}
}

function _doCheckOK(){
	_doCheck(true);
	effect("correct")
		
}

function _doCheckNo(){
	_doCheck(false);
	effect("wrong")
	_tryCount ++;
	$(".trynum").html("남은 기회 : " + (3 - _tryCount+1))
	if(_tryCount == 4){
		effect("wrong");
		$(".resulttextleft").html("도")
		$(".resulttextright").html("핑")
		$(".resulttextleft").css("color","red")
		$(".resulttextright").css("color","red")
_tryCount = 1;
infoShow();
//정답안내
$(".drags .page" + _dragPage + " .btn").eq(Number(_right) - 1).addClass("okview")
$(".resultPage .resultFeed .feed").eq(_dragPage - 1).css({
	"background-position-x": $(".resultPage .resultFeed .feed").eq(_dragPage - 1).css("width")
});
//다음안내
$(".next").focus();
$(".result").focus();
	}
}

function _getDropTarget(n , _arr){
	
	var returnObject=null;
	for(var i=0;i<_arr.length;i++){
		console.log(_arr[i])
		console.log($(_arr[i]).attr("id"));
		console.log($(_arr[i]).data("dap"));
		console.log(n+" == "+_arr[i].dap);
		if(n == $(_arr[i]).data("dap")){
			returnObject = _arr[i];
			break;
		}
	}
	if(returnObject){
		console.log(returnObject.id+" , "+returnObject.dap);	
	}
	
	return returnObject;
	
}

////////////////////////////////////////////////////////////////////////////////////////////
//data set
////////////////////////////////////////////////////////////////////////////////////////////
var _drag = _pageData.drag;
var _dragImgTime;
var _dragImg;

//if(!_htmlmp4){
	if (typeof _prevdrag == "undefined") {
		_dragImgTime = trance.array(_metaData[2].custom[0].dragImgTime);
		_dragImg = _metaData[2].custom[0].dragImg;
	} else {
		_dragImgTime = trance.array(_metaData[2].custom[0].pdragImgTime);
		_dragImg = _metaData[2].custom[0].pdragImg;
	}
//}

var _dragPage;
var dropCount = 0; //드랍 개수

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
	for (var _q = 0; _q < (_dragImgTime.length); _q++) {
		_str += "<div class='img drag" + _q + "'></div>";
	}

	//사전퀴즈는 커버 & 결과안내를 구성하지 않는다.
	if (typeof _prevdrag == "undefined") {
		//커버페이지
		_str += "<div class='drags'>"

		//퀴즈 컨테이너
		_str += "<div class='drag page0'>"

		//_str+="	<div class='imgtxt'>오늘 학습한 내용을 <br/>문제를 풀며 점검해 보겠습니다.</div>";
		_str += "	<button class='start' role='button' tabindex='0' onclick='drageventStart();'>start</button>";
		_str += "</div>"
	} else {
		//사전퀴즈의 경우 1번 문제부터 시작하기에 기본값을 1로 지정한다.
		_dragPage = 1;

		//퀴즈 컨테이너
		_str += "<div class='drags'>"
	}

	//퀴즈 구성
	// for (var _i = 0; _i < _drag.length; _i++) {
	// }

	var _a = 0;
	var _b = 1;
	var _c = 2;

	//1페이지
	
	var _dragType = _drag[_a].type;
	//지문에 부정형 단어가 있는경우 색을 달리한다.
	var _question = setColor(_drag[_a].question);

	var _sample = _drag[_a].sample;
	_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")

	var _right = _drag[_a].right;
	_right = multiple(_right); //복수의 정답인 경우 변환한다.

	var _explanation = _drag[_a].explanation;
	var _viewerMultiChoiceArrList = _drag[_a].viewerMultiChoiceArrList[0];

	_str += '<div class="drag page' + (_a + 1) + ' dragPage">';
	// _str += '	<div class="no">Q' + (_a + 1) + '. </div>';
	_str += '	<div class="question"><h2 class="qtxt">' + _question + '</h2></div>';
	if (_sample != "") {
		if(_sample.indexOf("img")!=-1){
			_str += '	<div class="sample imgsample">';
			_str += _sample;
		}else{
			_str += '	<div class="sample">';
			_str += '		<div class="scroll">' + _sample + '</div>';
		}
		
		_str += '	</div>';
	}
	_str += '	<div class="feed0"></div>';

//컨텐츠영역
_str += '		<div id="dragBox">';
_str += '			<div id="dBox">';
_str += '				<div id="vacuum1" class="dropPos">  ';
_str += '					<div id="vacuum0101" class="isDropObj vacuumdiv" data-dap="1" title="빈칸" alt="1페이지 빈칸1"></div>  ';
_str += '					<div id="vacuum0102" class="isDropObj vacuumdiv" data-dap="2" title="빈칸" alt="1페이지 빈칸2"></div>  ';
_str += '					<div id="vacuum0103" class="isDropObj vacuumdiv" data-dap="3" title="빈칸" alt="1페이지 빈칸3"></div>  ';
_str += '					<div id="vacuum0104" class="isDropObj vacuumdiv" data-dap="4" title="빈칸" alt="1페이지 빈칸4"></div>  ';
_str += '					<div id="vacuum0105" class="isDropObj vacuumdiv" data-dap="5" title="빈칸" alt="1페이지 빈칸5"></div>  ';

_str += '					<div class="resulttextleft"></div>  ';
_str += '					<div class="resulttextright"></div>  ';

_str += '					<div class="draginfo">다음 질문에 맞춰 정답을 드래그 앤 드롭해 보세요.</div>  ';
_str += '					<div class="trynum">남은 기회 : 3</div>  ';

_str += '				</div>  ';
_str += '				<div id="selectBox1">  ';
_str += '					<div id="selectno1">  ';
_str += '						<div id="object0101" class="isDragObj objectdiv" title="ㄱ" alt="ㄱ">ㄱ</div>  ';
_str += '						<div id="object0102" class="isDragObj objectdiv" title="ㄴ" alt="ㄴ">ㄴ</div>  ';
_str += '						<div id="object0103" class="isDragObj objectdiv" data-dap="1" title="ㄷ" alt="ㄷ">ㄷ</div>  ';
_str += '						<div id="object0104" class="isDragObj objectdiv" title="ㄹ" alt="ㄹ">ㄹ</div>  ';
_str += '						<div id="object0105" class="isDragObj objectdiv" title="ㅁ" alt="ㅁ">ㅁ</div>  ';
_str += '						<div id="object0106" class="isDragObj objectdiv" title="ㅂ" alt="ㅂ">ㅂ</div>  ';
_str += '						<div id="object0107" class="isDragObj objectdiv" title="ㅅ" alt="ㅅ">ㅅ</div>  ';
_str += '						<div id="object0108" class="isDragObj objectdiv" data-dap="5" title="ㅇ" alt="ㅇ">ㅇ</div>  ';
_str += '						<div id="object0109" class="isDragObj objectdiv" title="ㅈ" alt="ㅈ">ㅈ</div>  ';
_str += '						<div id="object0110" class="isDragObj objectdiv" title="ㅊ" alt="ㅊ">ㅊ</div>  ';
_str += '						<div id="object0111" class="isDragObj objectdiv" title="ㅋ" alt="ㅋ">ㅋ</div>  ';
_str += '						<div id="object0112" class="isDragObj objectdiv" title="ㅌ" alt="ㅌ">ㅌ</div>  ';
_str += '						<div id="object0113" class="isDragObj objectdiv" data-dap="3" title="ㅍ" alt="ㅍ">ㅍ</div>  ';
_str += '						<div id="object0114" class="isDragObj objectdiv" title="ㅎ" alt="ㅎ">ㅎ</div>  ';
_str += '						<div id="object0115" class="isDragObj objectdiv" title="ㅏ" alt="ㅏ">ㅏ</div>  ';
_str += '						<div id="object0116" class="isDragObj objectdiv" title="ㅑ" alt="ㅑ">ㅑ</div>  ';
_str += '						<div id="object0117" class="isDragObj objectdiv" title="ㅓ" alt="ㅓ">ㅓ</div>  ';
_str += '						<div id="object0118" class="isDragObj objectdiv" title="ㅕ" alt="ㅕ">ㅕ</div>  ';
_str += '						<div id="object0119" class="isDragObj objectdiv" data-dap="2" title="ㅗ" alt="ㅗ">ㅗ</div>  ';
_str += '						<div id="object0120" class="isDragObj objectdiv" title="ㅛ" alt="ㅛ">ㅛ</div>  ';
_str += '						<div id="object0121" class="isDragObj objectdiv" title="ㅜ" alt="ㅜ">ㅜ</div>  ';
_str += '						<div id="object0122" class="isDragObj objectdiv" title="ㅠ" alt="ㅠ">ㅠ</div>  ';
_str += '						<div id="object0123" class="isDragObj objectdiv" title="ㅡ" alt="ㅡ">ㅡ</div>  ';
_str += '						<div id="object0124" class="isDragObj objectdiv" data-dap="4" title="ㅣ" alt="ㅣ">ㅣ</div>  ';
_str += '					</div>  ';
_str += '				</div>  ';
_str += '			</div>  ';
_str += '		</div>  ';
//컨텐츠영역

	_str += '	<div class="block"></div>';
	_str += '	<div class="hint">';
	if (_a == (_drag.length - 1)) {
		if (typeof _prevdrag == "undefined") {
			_str += '	<button class="result" role="button" tabindex="0" onclick="dragSet(' + (_a + 2) + ')">result</button>';
		}
	} else {
		// _str += '	<button class="next" role="button" tabindex="0" onclick="dragSet(' + (_a + 2) + ')">next</button>';
		_str += '	<button class="next" role="button" tabindex="0" onclick="icheckeventStart()">next</button>';
	}
	// _str += '		<div class="right">' + _right + '</div>';
	_str += '		<div class="infocon">';
	_str += '			<div class="scroll">' + _explanation + '</div>';
	_str += '		</div>';
	_str += '	</div>';
	_str += '	<div class="feed1"></div>';

	_str += '</div>';

	//
	
	//2페이지
	
	var _dragType = _drag[_b].type;
	//지문에 부정형 단어가 있는경우 색을 달리한다.
	var _question = setColor(_drag[_b].question);

	var _sample = _drag[_b].sample;
	_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")

	var _right = _drag[_b].right;
	_right = multiple(_right); //복수의 정답인 경우 변환한다.

	var _explanation = _drag[_b].explanation;
	var _viewerMultiChoiceArrList = _drag[_b].viewerMultiChoiceArrList[0];

	_str += '<div class="drag page' + (_b + 1) + ' dragPage">';
	// _str += '	<div class="no">Q' + (_a + 1) + '. </div>';
	_str += '	<div class="question"><h2 class="qtxt">' + _question + '</h2></div>';
	if (_sample != "") {
		if(_sample.indexOf("img")!=-1){
			_str += '	<div class="sample imgsample">';
			_str += _sample;
		}else{
			_str += '	<div class="sample">';
			_str += '		<div class="scroll">' + _sample + '</div>';
		}
		
		_str += '	</div>';
	}
	_str += '	<div class="feed0"></div>';

//2페이지

//컨텐츠영역
_str += '		<div id="icheckBox">';
_str += '			<ul class="checkgroup">';
_str += '				<li class="chkcon1 chkcon"></li>';
_str += '				<li class="chkcon2 chkcon"></li>';
_str += '				<li class="chkcon3 chkcon"></li>';
_str += '				<li class="chkcon4 chkcon"></li>';
_str += '				<li class="chkcon5 chkcon"></li>';
_str += '			</ul>  ';
_str += '			<div class="textgroup">';
_str += '				<img class="textcon1 textcon" src="../common/img/icheck/01/textcon1_o.png"></img>';
_str += '				<img class="textcon2 textcon" src="../common/img/icheck/01/textcon2_o.png"></img>';
_str += '				<img class="textcon3 textcon" src="../common/img/icheck/01/textcon3_o.png"></img>';
_str += '				<img class="textcon4 textcon" src="../common/img/icheck/01/textcon4_o.png"></img>';
_str += '				<img class="textcon5 textcon" src="../common/img/icheck/01/textcon5_o.png"></img>';
_str += '				<img class="resultimg" src="../common/img/icheck/01/yellow.png"></img>';
_str += '			</div>  ';
_str += '				<button class="chkresult" onclick="icheckresult()">chkresult</button>';
_str += '		</div>';
//컨텐츠영역

_str += '	<div class="block"></div>';
_str += '	<div class="hint">';
if (_a == (_drag.length - 1)) {
	if (typeof _previcheck == "undefined") {
		// _str += '	<button class="result" role="button" tabindex="0" onclick="dragSet(' + (_b + 2) + ')">result</button>';
		_str += '	<button class="result" role="button" tabindex="0" onclick="dragSet(' + (_b + 2) + ')">result</button>';
	}
} else {
	_str += '	<button class="next" role="button" tabindex="0" onclick="dragSet(' + (_b + 2) + ')">next</button>';
}
// _str += '		<div class="right">' + _right + '</div>';
_str += '		<div class="infocon">';
_str += '			<div class="scroll">' + _explanation + '</div>';
_str += '		</div>';
_str += '	</div>';
_str += '	<div class="feed1"></div>';

_str += '</div>';

	// //3페이지
	
	// 	var _dragType = _drag[_c].type;
	// 	//지문에 부정형 단어가 있는경우 색을 달리한다.
	// 	var _question = setColor(_drag[_c].question);
	
	// 	var _sample = _drag[_c].sample;
	// 	_sample = _sample.split("  ").join("&nbsp;&nbsp;&nbsp;&nbsp;")
	
	// 	var _right = _drag[_c].right;
	// 	_right = multiple(_right); //복수의 정답인 경우 변환한다.
	
	// 	var _explanation = _drag[_c].explanation;
	// 	var _viewerMultiChoiceArrList = _drag[_c].viewerMultiChoiceArrList[0];
	
	// 	_str += '<div class="drag page' + (_c + 1) + ' dragPage">';
	// 	// _str += '	<div class="no">Q' + (_c + 1) + '. </div>';
	// 	_str += '	<div class="question"><span class="qtxt">' + _question + '</span></div>';
	// 	if (_sample != "") {
	// 		if(_sample.indexOf("img")!=-1){
	// 			_str += '	<div class="sample imgsample">';
	// 			_str += _sample;
	// 		}else{
	// 			_str += '	<div class="sample">';
	// 			_str += '		<div class="scroll">' + _sample + '</div>';
	// 		}
			
	// 		_str += '	</div>';
	// 	}
	// 	_str += '	<div class="feed0"></div>';

	// 	//컨텐츠영역
	// 	_str += '		<div id="dragBox">';
	// 	_str += '			<div id="dBox">';
	// 	_str += '				<div id="vacuum3" class="dropPos">  ';
	// 	_str += '					<div id="vacuum0301" class="isDropObj vacuumdiv" data-dap="4" title="빈칸" alt="3페이지 빈칸1"></div>  ';
	// 	_str += '					<div id="vacuum0302" class="isDropObj vacuumdiv" data-dap="5" title="빈칸" alt="3페이지 빈칸1"></div>  ';
	// 	_str += '					<div id="vacuum0303" class="isDropObj vacuumdiv" data-dap="6" title="빈칸" alt="3페이지 빈칸1"></div>  ';
	// 	_str += '				</div>  ';
	// 	_str += '				<div id="selectBox3">  ';
	// 	_str += '					<div id="selectno3">  ';
	// 	_str += '						<div id="object0301" class="isDragObj objectdiv" data-dap="4" title="르노 SM6" alt="르노 SM6">르노 SM6</div>  ';
	// 	_str += '						<div id="object0302" class="isDragObj objectdiv" data-dap="5" title="르노 XM3" alt="르노 XM3">르노 XM3</div>  ';
	// 	_str += '						<div id="object0303" class="isDragObj objectdiv" data-dap="6" title="르노 QM6" alt="르노 QM6">르노 QM6</div>  ';
	// 	_str += '					</div>  ';
	// 	_str += '				</div>  ';
	// 	_str += '			</div>  ';
	// 	_str += '		</div>  ';
	// 	//컨텐츠영역

	// 	_str += '	<div class="block"></div>';
	// 	_str += '	<div class="hint">';
	// 	if (_c == (_drag.length - 1)) {
	// 		if (typeof _prevdrag == "undefined") {
	// 			_str += '	<button class="result" role="button" tabindex="0" onclick="dragSet(' + (_c + 2) + ')">result</button>';
	// 		}
	// 	} else {
	// 		_str += '	<button class="next" role="button" tabindex="0" onclick="dragSet(' + (_c + 2) + ')">next</button>';
	// 	}
	// 	// _str += '		<div class="right">' + _right + '</div>';
	// 	_str += '		<div class="infocon">';
	// 	_str += '			<div class="scroll">' + _explanation + '</div>';
	// 	_str += '		</div>';
	// 	_str += '	</div>';
	// 	_str += '	<div class="feed1"></div>';
	
	// 	_str += '</div>';


	//결과페이지
	if (typeof _prevdrag == "undefined") {
	

		if(_drag.length<=3){
			_str += '<div class="drag page' + (_drag.length + 1) + ' resultPage">';


		}else{
			_str += '<div class="drag page' + (_drag.length + 1) + ' resultPage feedNone">';
		}
		

		// _str += '	<div class="rtxt"></div>'; // 결과화면 텍스트
		_str += '		<button class="retry" role="button" tabindex="0" onclick="dragSet(1)">retry</button>';
		_str += '</div>';
	}
	_str += "</div>"

	var _setTimeout = setTimeout(function () {
		$(".htmlPage").append(_str);

		////////////////////////////////////////////////////////////////////////////////////////////
		//페이지 커스텀
		////////////////////////////////////////////////////////////////////////////////////////////
		for (var _i = 0; _i < $(".drags").children().length; _i++) {
			$(".drag").eq(_i).css({
				/*
				"width": _width + "px",
				"height": _height + "px",
				"left": (_width * _i) + "px"
				*/
				"width": "1920px",
				"height": "1080px",
				"left": (1920 * _i) + "px"
			})
		}

		$(".htmlPage .scroll").mCustomScrollbar({
			theme: "light-3",
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
		//_dragImg[_s].duration="0";
		//_dragImg[_s].ease="Power1.out";
		//_dragImg[_s].onComplete="dragReset";
		
		_tl.to($('.img').eq(_s), {
			duration: 0,
			onComplete: dragReset
		}, _dragImgTime[_s]);
		_tl.eventCallback("onComplete", dragReset)

		if(!_htmlmp4){
			for (var _s = 0; _s < _dragImgTime.length; _s++) {
				_dragImg[_s].duration = "0.5";
				_dragImg[_s].ease = "Power1.out";
				_tl.to($('.img').eq(_s), _dragImg[_s], _dragImgTime[_s]);
			}
			_dragImg[_dragImgTime.length - 1].duration = "0.5";
			_dragImg[_dragImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.drags'), _dragImg[_dragImgTime.length - 1], _dragImgTime[_dragImgTime.length - 1]);
		}else{
			_dragImg[_dragImgTime.length - 1].duration = "0.5";
			_dragImg[_dragImgTime.length - 1].ease = "Power1.out";
			_tl.to($('.drags'), _dragImg[_dragImgTime.length - 1], _video.duration-1);
			// 퀴즈 시작 타이밍 조절
		}
		
		clearTimeout(_setTimeout);
		
	}, 100);
};


////////////////////////////////////////////////////////////////////////////////////////////
//function
////////////////////////////////////////////////////////////////////////////////////////////
function dragReset() {
	if (typeof _prevdrag == "undefined") {
		_dragPage = undefined;
	} else {
		$(".result").show();
		_dragPage = 1;
	}

	_tryCount = 1;

	$(".drags").css({
		"left": "0px"
	})
	 
	$(".drags .inputfield").val("");
	$(".drags .block").hide();
	$(".drags .hint").hide();
	$(".drags .feed0").hide();
	$(".drags .ok").show();
	$(".objectdiv").show();
	$(".objectdiv").removeClass("off")
	$(".objectdiv").css("top","revert-layer")
	$(".objectdiv").css("left","revert-layer")
	$(".vacuumdiv").css("background-image","revert-layer")
	$(".vacuumdiv").removeClass("off")
	$(".resulttextleft").html("")
	$(".resulttextright").html("")
	$(".resulttextleft").css("color","#2c73cb")
	$(".resulttextright").css("color","#2c73cb")
	$("#vacuum0102").hide()
	$("#vacuum0104").hide()
	$("#vacuum0105").hide()
	$("#vacuum0101").show()
	$("#vacuum0103").show()
	$(".trynum").html("남은 기회 : 3")
	dropCount = 0 // 드랍 개수 초기화
	isCorrectNum = 0;
}

function drageventStart(){
	if(dragfirststart == 0){
		_doActivityInit()
		dragfirststart++;
	}
	dragSet(1)
}

function dragSet(n) {
	if($(".feed0").css("display")=="block"){
		$(".feed0").hide()
	}
	if (_dragPage == undefined) {
		//skip(_video.duration-0.5);
		skip(_video.duration);

		//_video.currentTime = _video.duration;
		//_video.stop();
		//_video.play();

		//end(true, true);
	} else {
		//다시 풀기의 경우
		if (n == 1) {
			//정답 카운트 리셋
			_rightCount = 0;
		}
	}

	_dragPage = n;

	//사전퀴즈등에서 더이상 이동할 퀴즈 페이지가 없는경우 바로 학습완료해준다.
	if (n > $(".drags").children().length) {
		_endLock = true;
		//_video.currentTime = (_video.duration * 0.99);
		//_video.play();
		end(true, true);

		//
		$(".result").hide();
		return;
	}
	$(".drags").animate({
		//left: -(_width * n) + "px"
		left: -(1920 * n) + "px"
	}, {
		complete: function () {
			//다시 해당 퀴즈가 진행될것을 대비하여 선택된 내용등 변형된 부분들을 원상복귀한다.
			$(".drags .inputfield").val("");
			$(".drags .block").hide();
			$(".drags .hint").hide();
			$(".drags .feed0").hide();
			$(".drags .ok").show();
			$(".objectdiv").show();
			$(".objectdiv").removeClass("off")
			$(".objectdiv").css("top","revert-layer")
			$(".objectdiv").css("left","revert-layer")
			$(".vacuumdiv").css("background-image","revert-layer")
			$(".vacuumdiv").removeClass("off")
			$(".resulttextleft").html("")
			$(".resulttextright").html("")
			$(".resulttextleft").css("color","#2c73cb")
			$(".resulttextright").css("color","#2c73cb")
			$("#vacuum0102").hide()
			$("#vacuum0104").hide()
			$("#vacuum0105").hide()
			$("#vacuum0101").show()
			$("#vacuum0103").show()
			$(".trynum").html("남은 기회 : 3")
			isCorrectNum = 0;
			dropCount = 0 // 드랍 개수 초기화
			//마지막 페이지의 경우 학습완료 안내
			if (n == ($(".drags").children().length - 1)) {
				end(true, true);
			} else {
				end(false, true);
			}
		}
	});
}

function icheckeventStart(){
	dragSet(2)
	$(".chkcon").on("click", function() {
		$(".chkresult").fadeIn(300)
		if($(this).hasClass("clickcon")){
			$(this).removeClass("clickcon")
			$(this).removeClass("blackcon")
		}else{
			$(this).addClass("clickcon")
			$(this).addClass("blackcon")
		}
	})
	// 정답쪽
	$(".chkcon1").on("click", function() {
		if(chk1 == 0){
			chk1 = 1;
		}else if(chk1 == 1){
			chk1 = 0;
		}
	})
	$(".chkcon2").on("click", function() {
		if(chk2 == 0){
			chk2 = 1;
		}else if(chk2 == 1){
			chk2 = 0;
		}
	})
	$(".chkcon5").on("click", function() {
		if(chk3 == 0){
			chk3 = 1;
		}else if(chk3 == 1){
			chk3 = 0;
		}
	})
	// 정답쪽
	$(".chkcon3").on("click", function() {
		if(wrongchk1 == 0){
			wrongchk1 = 1;
		}else if(wrongchk1 == 1){
			wrongchk1 = 0;
		}
	})
	$(".chkcon4").on("click", function() {
		if(wrongchk2 == 0){
			wrongchk2 = 1;
		}else if(wrongchk2 == 1){
			wrongchk2 = 0;
		}
	})
}


function icheckresult(){
	//정답 체크후 아이콘 변경
	// 오답
	$(".chkcon3").removeClass("clickcon")
	$(".chkcon4").removeClass("clickcon")

	// 정답
	$(".chkcon1").addClass("clickcon")
	$(".chkcon2").addClass("clickcon")
	$(".chkcon5").addClass("clickcon")

	//오답 이미지 변경
	$(".textcon3").attr("src","../common/img/icheck/01/textcon3_h.png")
	$(".textcon4").attr("src","../common/img/icheck/01/textcon4_h.png")

	if((chk1 + chk2 + chk3) == 3 && wrongchk1 == 0 && wrongchk2 == 0){
		effect("correct");
		console.log("정답입니다.")

	}else{
		effect("wrong");
		console.log("오답입니다.")
	}
	$(".chkresult").hide()
	// 초기화
	chk1=0;chk2=0;chk3=0;wrongchk1=0;wrongchk2=0;
	$(".resultimg").fadeIn(200);
	// $(".result").focus();
}

//객관식 버튼 체크
function btnCheck(v) {
	if ($(".drags .page" + _dragPage + " .btn").eq(v).hasClass("check")) {
		$(".drags .page" + _dragPage + " .btn").eq(v).removeClass("check");
	} else {
		$(".drags .page" + _dragPage + " .btn").eq(v).addClass("check");
	}
}

//정오답 확인
var _tryCount = 1;
var _rightCount = 0;

function dragCheck(v) {
	var _try;
	var _right = $(".drags .page" + _dragPage + " .right").html();

	if (_drag[_dragPage - 1].type == "04") {

		if(_tryCount < 2){
			_try = _right;
		}
		else{
			_try = 0;
		}
		

	}

	//정오답 확인
	if (_try == _right) {
		effect("correct");
		_tryCount = 1;

		$(".drags .page" + _dragPage + " .feed0").css({
			"background-position-x": "0px"
		});
		infoShow();

		_rightCount += 1;
		//결과 적용
		$(".resultPage .resultFeed .feed").eq(_dragPage - 1).css({
			"background-position-x": "0px"
		});

		//다음안내
		$(".next").focus();
		$(".result").focus();
	} else {
		effect("wrong");

		$(".drags .page" + _dragPage + " .feed0").css({
			"background-position-x": $(".drags .page" + _dragPage + " .feed0").css("width")
		});
		if (_drag[_dragPage - 1].type == "00") {
			//O,X의 경우 한번의 기회만 제공
			infoShow();

			//정답안내
			if (_right == "O") {
				$(".drags .page" + _dragPage + " .btns .oxbtn0").addClass("okview");
			} else {
				$(".drags .page" + _dragPage + " .btns .oxbtn1").addClass("okview");
			}

			$(".resultPage .resultFeed .feed").eq(_dragPage - 1).css({
				"background-position-x": $(".resultPage .resultFeed .feed").eq(_dragPage - 1).css("width")
			});
		} else {
			if (_tryCount < 2) {
				_tryCount += 1;
			} else {
				_tryCount = 1;
				infoShow();

				//정답안내
				$(".drags .page" + _dragPage + " .btn").eq(Number(_right) - 1).addClass("okview")

				$(".resultPage .resultFeed .feed").eq(_dragPage - 1).css({
					"background-position-x": $(".resultPage .resultFeed .feed").eq(_dragPage - 1).css("width")
				});

				//다음안내
				$(".next").focus();
				$(".result").focus();
			}
		}
	}

	//결과 적용
	$(".resultPage .rtxt").html("총" + _drag.length + "문제중 " + _rightCount + "문제를 맞히셨습니다.");

	//feed
	setTimeout(() => {
		$(".drags .page" + _dragPage + " .feed0").fadeIn(500);
	}, 1500);
	

}

function infoShow() {
	//ok
	$(".drags .page" + _dragPage + " .ok").hide();

	$(".drags .page" + _dragPage + " .block").show();
	$(".drags .page" + _dragPage + " .hint").show();
	setTimeout(() => {
		$(".next").fadeIn(200)
	}, 2001);
	

	//사전퀴즈의 경우 바로 다음페이지를 안내한다.
	if (typeof _prevdrag != "undefined") {
		dragSet(((_drag.length) + 1))
	}
}

//부정형 단어 색적용
function setColor(s) {
	var _rwords = ["못한", "잘못된", "잘못", "않한", "없는", "않은", "않는", "잘못된", "틀린", "다른", "아닌", "어려운", "먼", "않게"];
	for (j = 0; j < _rwords.length; j++) {
		s = s.split(_rwords[j]).join('<span class="red">' + _rwords[j] + '</span>')
		s = s.split('!<span class="red">' + _rwords[j] + '</span>').join(_rwords[j])
	}

	return s;
}


//복수의 정답 변환
function multiple(s) {
	var _ss = s.split("[,]");
	_ss = $.grep(_ss, function (n) {
		return n == " " || n;
	}); // 배열 빈요소 제거
	return _ss;
}

/////////////////////////////////////////////////////커트라인

function _doCheck(v){
	
	
	if(v){
		
		
		console.log("\n ************");
		console.log("정답보여주기");
		console.log($(dropTarget)["initTop"]);
		console.log($(dropTarget)["initLeft"]);
		console.log(dropTarget.css("top"))
		console.log(dropTarget.offset().top);
		console.log(dropTarget.offset().left);
		console.log($(dragMc).css("background-image"));
		$(dragMc).addClass("off");
		$(dragMc).offset({top:$(dropTarget)["initTop"] , left: dropTarget.offset().left});
		$(dragMc).hide();
		dropTarget.addClass("off");	
		dropTarget.css("background-image" , $(dragMc).css("background-image")); 
		effect("s_click");
		isCorrectNum++;
		nexthover();
	if($(dragMc).attr("id") == "object0103"){
		$("#vacuum0101").hide()
		$("#vacuum0102").show()
		$(".resulttextleft").html("ㄷ")
	}
	if($(dragMc).attr("id") == "object0119"){
		$(".resulttextleft").html("도")
	}
	if($(dragMc).attr("id") == "object0113"){
		$("#vacuum0103").hide()
		$("#vacuum0104").show()
		$(".resulttextright").html("ㅍ")
	}
	if($(dragMc).attr("id") == "object0124"){
		// $("#vacuum0104").hide()
		$("#vacuum0105").show()
		$(".resulttextright").html("피")
	}
	if($(dragMc).attr("id") == "object0108"){
		$(".resulttextright").html("핑")
	}
	
}

function nexthover() {
	
	if(_drag[_dragPage - 1].right == isCorrectNum){
		isCorrectNum = 0;
		dragCheck(v)
	}
}
}
