console.log("dataSetting");

////////////////////////////////////////////////////////////////////////////////////////////
//페이지 정보를 추출하여 기억한다.
////////////////////////////////////////////////////////////////////////////////////////////
var _jucha;
var _chasi;
var _page;
var container_scale;
responsive();
getPageValue();

/** resizing **/
$(window).resize(function (e) {
	responsive();
});

function getPageValue(){
	var _hrefArray=location.href.split("/");
	
	//폴더/페이지
	_chasi=_hrefArray[_hrefArray.length-2];
	var _chasiArray=_chasi.split("_");
	if(_chasiArray.length>1){
		//학점은행의 경우 _ 로 구분하여 주차를 추출한다.
		_jucha=parseInt(_chasiArray[0],10);
		_chasi=parseInt(_chasiArray[1],10);
	}else{
		_chasi=parseInt(_chasi,10);
	}
	
	if(_hrefArray[_hrefArray.length-1].indexOf("_")!=-1){
		_page=parseInt(_hrefArray[_hrefArray.length-1].replace('.html','').substring(3,5),10);
	}else{
		_page=parseInt(_hrefArray[_hrefArray.length-1].replace('.html','').substring(0,2),10);
	}

	getMetadata();
}

////////////////////////////////////////////////////////////////////////////////////////////
//metadata 값을 불러 기억한다.
////////////////////////////////////////////////////////////////////////////////////////////
var _metaData;
function getMetadata(){
	$.ajax({
		type : 'GET',
		url : '../common/json/metadata.txt', 
		dataType : 'json',
		success : function(data) {
			_metaData=data.metadata;
			getScript();
			getPageData();
			
			//수화영상이 있는지 확인한다.
			handCheck();
			console.log("수화영상 load")
			$(".handCheck").css("pointer-events","none")
		},
		error : function(e) {
			console.log('meatadata 불러오기 실패');
		},
		complete: function(){
			
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////////
//script 값을 불러 기억한다.
////////////////////////////////////////////////////////////////////////////////////////////
var _scriptData;
var _languge=["kor","eng","chi","jap"];
var _langugeCount=0;
var _multilingualScriptData=new Array();

function getScript(){
	var _url;
	if(_multilingual){
		_url="../common/json/script/"+trance.str(_chasi)+"/"+trance.str(_page)+"_"+_languge[_langugeCount]+".txt"
	}else{
		_url="../common/json/script/"+trance.str(_chasi)+"/"+trance.str(_page)+".txt"
	}
	
	$.ajax({
		type : 'GET',
		url : _url, 
		success : function(data) {
			if(_multilingual){
				_multilingualScriptData.push(data);
				if(_langugeCount<(_languge.length-1)){
					_langugeCount+=1;
					getScript();
				}else{
					console.log("다국어중 kor을 기본 자막으로 설정")
					_scriptData=_multilingualScriptData[0];
				}
			}else{
				_scriptData=data;
			}
		},
		error : function(e) {
			console.log('자막정보 불러오기 실패');
		},
		complete: function(){
			
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////////
//수어영상이 있는지 체크한다.
////////////////////////////////////////////////////////////////////////////////////////////
function handCheck(){
	var _handVideoSrc = _metaData[1].path[0].mp4+_metaData[3].pages[_chasi - 1].chasi[_page - 1].page[0].url;
	console.log("mp4 src = " + _handVideoSrc)
	_handVideoSrc=_handVideoSrc.split(".mp4").join("_hand.mp4");
	var _str="<video class='handCheck' src='"+_handVideoSrc+"'></video>"

	$("body").append(_str);

	$(".handCheck")[0].onloadedmetadata = function () {
		$(".handCheck").remove();
		$(".hand").show();
	}
}


////////////////////////////////////////////////////////////////////////////////////////////
//page 정보를 불러 기억한다.
////////////////////////////////////////////////////////////////////////////////////////////
var _type;
//page 정보중 일부 타입은 json형태로 구분하여 활용한다.
var _jsonType=["quiz","drag","pquiz","line","vrmp4","icheck","puzzle"];
var _noneDataType=["intro","road","guide","teacher","out"];

var _pageData;
function getPageData(){
	_type=_metaData[3].pages[_chasi-1].chasi[_page-1].page[0].type;
	//page data type에 따라 구분하여 페이지 정보를 다르게 불러와 기억한다.
	var _url;
    if(_type=="html"){
        _url ="../common/json/"+_type+"/"+trance.str(_chasi)+"/"+trance.str(_page)+".txt";
    }else{
        _url ="../common/json/"+_type+"/"+trance.str(_chasi)+".txt";
    }
	
	var _dataType="html";

	if(_jsonType.indexOf(_type)!=-1){
	   _dataType="json";
	}
	
	_importJs=new Array();
	
	//페이지 기본 구성
	_importJs.push("page/basic/media");
	_importJs.push("page/basic/roadmap");
	_importJs.push("page/basic/menu");
	_importJs.push("page/basic/bottom");
	_importJs.push("page/basic/top");
	_importJs.push("page/basic");
	_importJs.push("page/custom");
	
	//관련 내용 연산
	_importJs.push("operation");
	
	//_pageData를 활용하지 않아도 되는 페이지의 경우
	if(_noneDataType.indexOf(_type)!=-1){
	    _importJs.push("page/"+_type);
		importJs(_importJs[0]);
		return;
	}

	$.ajax({
		type : 'GET',
		url : _url, 
		dataType : _dataType,
		success : function(data) {
			_pageData=data;

			_importJs.push("page/"+_type);
			importJs(_importJs[0]);
		},
		error : function(e) {
			console.log(_type + ' 페이지정보 불러오기 실패');
			importJs(_importJs[0]);
		},
		complete: function(){
			
		}
	});
}

//반응형 container_scale 조정
function responsive() {
	w_w = document.documentElement.clientWidth;
	w_h = document.documentElement.clientHeight;
	var w_scale = w_w / 1920;
	var h_scale = w_h / 1080;
	if (h_scale > w_scale) {//w 기준
		container_scale = w_scale;
	} else {//h 기준
		container_scale = h_scale;
	}
}