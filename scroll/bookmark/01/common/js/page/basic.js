console.log("basic");

var _basicStr="";
var _width=_metaData[2].custom[0].width;
var _height=_metaData[2].custom[0].height;
var _device=check.device();

var _client=_metaData[2].custom[0].client;

var _chasiName=_metaData[3].pages[_chasi-1].chasi[_page-1].page[0].title0;
var _bundleName=_metaData[3].pages[_chasi-1].chasi[_page-1].page[0].title1;
var _pageName=_metaData[3].pages[_chasi-1].chasi[_page-1].page[0].title2;
var _logoName=_metaData[2].custom[0].title;

var _bundleMenuData;
var _bundleMenuName;
var _bundleArray=new Array();
var _bundleMenuIcon=['fa-book','fa-book-reader','fa-book-open','fa-align-justify',''];

var _pageMenuData;
var _pageMenuName;

var _indexDesignType=_metaData[2].custom[0].indexDesignType;
var _indexAlignType=_metaData[2].custom[0].indexAlignType;
var _pageLength=_metaData[3].pages[_chasi-1].chasi.length;

////////////////////////////////////////////////////////////////////////////////////////////
//미디어
////////////////////////////////////////////////////////////////////////////////////////////
//영상(베이스)
//영상타입이거나 PC의경우 video테그를 
_basicStr+=getMediaData();

////////////////////////////////////////////////////////////////////////////////////////////
//상단
////////////////////////////////////////////////////////////////////////////////////////////
_basicStr+=getTopData();


////////////////////////////////////////////////////////////////////////////////////////////
//메뉴
////////////////////////////////////////////////////////////////////////////////////////////

//메뉴 정렬 방식이 없는경우 기본 아래 정렬으로 진행한다.
if(_indexAlignType==undefined){
   _indexAlignType="bottom"
}

_basicStr+=getMenuData();

////////////////////////////////////////////////////////////////////////////////////////////
//하단
////////////////////////////////////////////////////////////////////////////////////////////

_basicStr+=getBottomData();


////////////////////////////////////////////////////////////////////////////////////////////
//부가메뉴
////////////////////////////////////////////////////////////////////////////////////////////
var _additional;
var _teachers;
var _teacher_path;
try{_additional=trance.array(_metaData[2].custom[0].additional);}catch(e){_additional=[];}
try{_teachers=trance.number(_metaData[2].custom[0].teachers);}catch(e){_teachers=1;}
try{_teacher_path=trance.array(_metaData[2].custom[0].teacher_path);}catch(e){_teacher_path=[];}

_basicStr+="<div class='add'>";
_basicStr+="<div class='addBg'></div>";

_basicStr+="<div class='addConArea'>";
_basicStr+="<div class='addCon'>";
for(var _a=0;_a<_additional.length;_a++){
	_basicStr+="<div class='"+_additional[_a]+"' style='position: absolute;left:"+(_width*_a)+"px'>";
	_basicStr+="<div class='addConBg'>";
	//강사정보
	if(_additional[_a]=="teacher"){
		_teacher_path
		
		_basicStr+="<div class='teachers'>";
		for(var _t=0;_t<_teachers;_t++){
			_basicStr+="<div class='teacherImg' style='background:url(../common/img/custom/"+_teacher_path[_t]+")'></div>";
		}
		if(_teachers>1){
		    _basicStr+="<button class='prev' onclick='teacherFocus(0)'>"
			//아이콘 디자인
			if(_fontasome!=false){
				_basicStr+="<i class='fas fa-angle-left'></i>"
			}
			_basicStr+="</button>"
			_basicStr+="<button class='next' onclick='teacherFocus(1)'>"
			//아이콘 디자인
			if(_fontasome!=false){
				_basicStr+="<i class='fas fa-angle-right'></i>"
			}
			_basicStr+="</button>"
		}
		_basicStr+="</div>";
	}else if(_additional[_a]=="road"){
		//로드맵
		_basicStr+=getRoadmapData();
	}
	
	_basicStr+="</div>";
	_basicStr+="</div>";
}
_basicStr+="</div>";

_basicStr+="<div class='addBtns'>";
for(var _a=0;_a<_additional.length;_a++){
	_basicStr+="<button class='addBtn' onclick='addFocus(this);'>"+trance.korean(_additional[_a])+"</button>";
}
_basicStr+="</div>";

_basicStr+="<button class='addClose' onclick='additional();'>"
//아이콘 디자인
if(_fontasome!=false){
	_basicStr+="<i class='fas fa-times'></i>"
}
"</button>";

_basicStr+="</div>";
_basicStr+="</div>";
////////////////////////////////////////////////////////////////////////////////////////////
//기타
////////////////////////////////////////////////////////////////////////////////////////////
_basicStr+="<div class='etc'>";
_basicStr+="</div>";

$("#page").html(_basicStr);

getBottomData2()
//북마크 불러오기
$(".roadScroll").mCustomScrollbar({
	theme:"dark-3",
	scrollInertia:0,
	mouseWheelPixels: 18
});

//모바일의 경우 기본 스크롤로 대체한다.
if(_device!="PC" && _device.substring(0,2)!="IP"){
	$(".roadScroll").mCustomScrollbar("destroy");
	$(".roadScroll").css("overflow","auto");
}
