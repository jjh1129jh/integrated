console.log("bottom");

//하단
var _bottomButtons;
var _bottomEtcButtons;
try{_bottomButtons=trance.array(_metaData[2].custom[0].bottomButtons);}catch(e){_bottomButtons=[];}
try{_bottomEtcButtons=trance.array(_metaData[2].custom[0].bottomEtcButtons);}catch(e){_bottomEtcButtons=[];}

function getBottomData(){
	var _returnStr="";
	_returnStr+="<div class='bottom'>";
    
    _returnStr+="	<div class='scripts'>";
	_returnStr+="		<div class='scriptBg'></div>";
	_returnStr+="		<div class='scriptArea'>";
	_returnStr+="			<div class='scriptTxt'></div>";
	_returnStr+="		</div>";
	_returnStr+="	</div>";
    
    _returnStr+="	<div class='groub'>";
	_returnStr+="	<div class='bg'></div>";
	
	_returnStr+="	<div class='time'>";
	_returnStr+="		<div class='currentTime'></div>";
	_returnStr+="		<div class='division'>/</div>";
	_returnStr+="		<div class='duration'></div>";
	_returnStr+="	</div>";
	
	_returnStr+="	<div class='progress'>";
	_returnStr+="		<div class='area'></div>";
	_returnStr+="		<div class='fill'></div>";
	_returnStr+="		<div class='point'></div>";
	_returnStr+="	</div>";
	
	_returnStr+="	<div class='btns'>";
	for(var _b=0;_b<_bottomButtons.length;_b++){
		//다국어를 지원하는경우
		if(_bottomButtons[_b]=="script" && _multilingual){
			if(_langugeCount>0){
				_returnStr+="<select class='multilingual' onchange='multilingual(this)'>";
				_returnStr+="	<option value='none'>자막</option>";

				for(var _m=0;_m<_langugeCount;_m++){
					_returnStr+="	<option value='"+_m+"'>"+trance.korean(_languge[_m])+"</option>";
				}

				_returnStr+="</select>";
			}
		}else if(_bottomButtons[_b]=="PIP" && _type!="mp4"){
		
		}else{
			//_returnStr+="	<button title='"+trance.korean(_bottomButtons[_b])+"' 
			_returnStr+="	<button class='"+_bottomButtons[_b]+"' onclick='"+_bottomButtons[_b]+"();' tabindex='"+(_b+100)+"'>"
			
			//웹접근성 적용
			_returnStr+="<h3>"+trance.korean(_bottomButtons[_b])+"</h3>";
			
			//아이콘 디자인
			if(_fontasome!=false){
				_returnStr+="<i class='fas fa-"+trance.icon(_bottomButtons[_b])+"'></i>"
			}
			_returnStr+="</button>";
		}
	}
	
	//자동재생기능을 지원하는 경우
	if(_autoplay){
		//_returnStr+="	<button title='페이지 자동 넘김 재생 중지' class='autoplay' onclick='autoplay();' tabindex='150'></button>";
		_returnStr+="	<button class='autoplay' onclick='autoplay();' tabindex='150'><h3>페이지 자동 넘김 재생 중지</h3></button>";
	}
	_returnStr+="	</div>";
	
	_returnStr+="	<div class='etc'>";
	for(var _e=0;_e<_bottomEtcButtons.length;_e++){
		//_returnStr+="	<button title='"+trance.korean(_bottomEtcButtons[_e])+"' class='"+_bottomEtcButtons[_e]+"' onclick='"+_bottomEtcButtons[_e]+"();' tabindex='50'>"
		_returnStr+="	<button class='"+_bottomEtcButtons[_e]+"' onclick='"+_bottomEtcButtons[_e]+"();' tabindex='50'>"
	
		//웹접근성 적용
		_returnStr+="<h3>"+trance.korean(_bottomEtcButtons[_e])+"</h3>";
		
		//아이콘 디자인
		if(_fontasome!=false){
			_returnStr+="<i class='fas fa-"+trance.icon(_bottomEtcButtons[_e])+"'></i>";
		}else{
			_returnStr+="<span class='indexBlit'></span>";
		}
		if(_bottomEtcButtons[_e]=="index"){
		//_returnStr+="<span class='indexTxt'>"+_bottomEtcButtons[_e]+"</span>";
		_returnStr+="<span class='indexTxt'>INDEX</span>";
		}
		_returnStr+="	</button>";
	}

	_returnStr+="	</div>";

	_returnStr+="	<div class='pages'>";
	//_returnStr+="		<button title='이전 페이지' class='prevPage' onclick='pageMove(\"prev\");' tabindex='200'>"
	_returnStr+="		<button class='prevPage' onclick='pageMove(\"prev\");' tabindex='200'><h3>이전 페이지</h3>"
	
	//아이콘 디자인
	if(_fontasome!=false){
		_returnStr+="<i class='fas fa-chevron-left'></i>";
	}
	_returnStr+="</button>"
	_returnStr+="		<div class='now'>"+trance.str(_page)+"</div>";
	_returnStr+="		<div class='division'>/</div>";
	_returnStr+="		<div class='max'>"+trance.str(_pageLength)+"</div>";
	
	//_returnStr+="		<button title='다음 페이지' class='nextPage' onclick='pageMove(\"next\");' tabindex='201'>"
	_returnStr+="		<button class='nextPage' onclick='pageMove(\"next\");' tabindex='201'><h3>다음 페이지</h3>"
	
	//아이콘 디자인
	if(_fontasome!=false){
		_returnStr+="<i class='fas fa-chevron-right'></i></button>";
	}
	_returnStr+="	</div>";
	
	if(_bottomButtons.indexOf("mute")!=-1){  
		_returnStr+="	<div class='volum'>";
		_returnStr+="		<div class='volumArea'></div>";
		_returnStr+="		<div class='volumFill'></div>";
		_returnStr+="		<div class='volumPoint'></div>";
		_returnStr+="	</div>";
	}

	if(_bottomButtons.indexOf("mark")!=-1){  
		_returnStr+="	<div class='mark'>";
		_returnStr+="	</div>";
	}

	if(_bottomButtons.indexOf("markdel")!=-1){  
		_returnStr+="	<div class='mark'>";
		_returnStr+="	</div>";
	}

	
	if(_bottomButtons.indexOf("rate")!=-1){ 
		_returnStr+="	<div class='rateCon'>";
		_returnStr+="		<button class='rateBtn' onclick='rate(1.0)'>X 1.0</button>";
		_returnStr+="		<button class='rateBtn' onclick='rate(1.2)'>X 1.2</button>";
		_returnStr+="		<button class='rateBtn' onclick='rate(1.5)'>X 1.5</button>";
		_returnStr+="		<button class='rateBtn' onclick='rate(2.0)'>X 2.0</button>";
		_returnStr+="	</div>";
	}
	
	if(_page==_pageLength){
		_returnStr+="	<button class='end' onclick='pageMove(\"next\");' tabindex='600'>";
		_returnStr+="	<div class='endFill'></div>";
		_returnStr+="	<div class='endTxt'>수고하셨습니다.</div>";
		_returnStr+="	<div class='endIcon'></div>";
		_returnStr+="	</button>";
	}else{
		_returnStr+="	<button class='end' onclick='pageMove(\"next\");' tabindex='600'>";
		_returnStr+="	<div class='endFill'></div>";
		_returnStr+="	<div class='endTxt'>다음페이지로 이동하기</div>";
		_returnStr+="	<div class='endIcon'></div>";
		_returnStr+="	</button>"; 
	}
	
    _returnStr+="</div>";
	_returnStr+="</div>";
	
	return _returnStr;
}

function getBottomData2(){

		//

		// 페이지 로드 시 저장된 쿠키 가져오기
    var cookies = document.cookie.split("; ");

    // 쿠키 개수 확인
    for (var i = 1; i < cookies.length; i++) {
			var fullUrl = window.location.href;
			var parts = fullUrl.split('/');
			var newUrl = parts.slice(parts.length - 4).join('/');
			
			var count = cookies[i].replace(/=true$/, '')
			var partstwo = count.split('|');
			var part0 = partstwo[0];
			console.log(part0 + "항 아퍼" + newUrl);
			if(part0 == newUrl){
        var count = cookies[i].replace(/=true$/, '')
				var parts = count.split('|');
				var part1 = parts[1];
				var part2 = parts[2];

				var $rectangle = $("<div>").addClass("markpoint").attr("val",part2);
				$rectangle.css({
					left: part1 + "px", // 각 사각형의 좌표는 count * 30px
				});
				$(".mark").append($rectangle);
			}
			else{
			}

    }

		$(".mark > div").on("click", function () {
			var bmove = $(this).attr("val")
			console.log(bmove)
			_video.currentTime = bmove
		});
		$(".markdel").on("click", function () {
			$(".mark").html("")
			

			function deleteCookie(name) {
				document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
		}
		
		// 모든 쿠키를 검사하여 조건에 맞는 쿠키 삭제
		function deleteCookiesByUrl(url) {
				var cookies = document.cookie.split(';'); // 쿠키를 세미콜론으로 분리하여 배열 생성
		
				for (var i = 0; i < cookies.length; i++) {
						var cookie = cookies[i];
						while (cookie.charAt(0) === ' ') {
								cookie = cookie.substring(1); // 쿠키 앞의 공백 제거
						}
						if (cookie.indexOf(url) !== -1) {
								var eqPos = cookie.indexOf('='); // '=' 위치 찾기
								var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie; // 쿠키 이름 추출
								deleteCookie(name); // 쿠키 삭제
						}
				}
		}
		
		// 'bookmark/01/03/03_02.html' URL을 포함하는 쿠키 삭제
		var fullUrl = window.location.href;
  var parts = fullUrl.split('/');
  var newUrl = parts.slice(parts.length - 4).join('/');
		deleteCookiesByUrl(newUrl);


			console.log("쿠키 삭제")
		});
		console.log("됐냐??")
		//
}

