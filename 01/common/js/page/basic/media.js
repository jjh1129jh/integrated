console.log("media");

var _videoType=check.video(_type);
function getMediaData(){
	var _returnStr="";

	_returnStr+="<div class='frame'>";
	_returnStr+="	<div class='container'>";
	if(_videoType=="mp4"){
		
		if(_type=="intro" || _type=="mp4" || _type=="html"){
			_returnStr+="		<video id='video' style='width: "+_width+"px; height: "+_height+"px;' preload='metadata'";
		}else{
			if(_htmlmp4){
				_returnStr+="		<video id='video' style='width: "+_width+"px; height: "+_height+"px;' preload='metadata'";
			}else{
				_returnStr+="		<video id='video' style='width: 0px; height: 0px;' preload='metadata'";
			}
			
		}
		
		//_returnStr+="		<video id='video' style='width: "+_width+"px; height: "+_height+"px;' preload='metadata'";
		if(_device.substring(0,2)=="IP"){
			_returnStr+="webkit-playsinline='true' playsinline='true'>";
		}else{
			_returnStr+=">";
		}
		_returnStr+="		</video>";
	}else{
		//그렇치 않은경우 오디오 테그를 베이스로 한다.
		_returnStr+="		<audio id='video' style='width: 0px; height: 0px;' preload='metadata'></audio>";
	}
	//효과음
	_returnStr+="		<audio id='effect' style='width: 0px; height: 0px;' preload='metadata'></audio>";
	
	//html영역
	_returnStr+='		<div class="htmlPage"></div>';
	
	_returnStr+="	</div>";
	
	//가이드
	_returnStr+='<div class="guideBg"></div>';
	_returnStr+='<div class="prevTimeGuide"></div>';
	_returnStr+='<div class="playGuide"></div>';
	_returnStr+='<div class="nextTimeGuide"></div>';
	
	_returnStr+="</div>";
	
	//프라미스 재생버튼
	_returnStr+='<div class="playCon">';
	_returnStr+='	<div class="playBg"></div>';
	_returnStr+='	<div class="playArea"><button class="play" tabindex="1"><i class="far fa-play-circle"></i></butotn></div>';
	_returnStr+='</div>';
	
	//로딩
	_returnStr+='<div class="loadingCon">';
	_returnStr+='	<div class="loadingBg"></div>';
	_returnStr+='	<div class="loadingText"></div>';
	_returnStr+='</div>';
	
	//오디오(효과음)
	_returnStr+="<audio id='effect' preload='metadata'></audio>";
	
	return _returnStr;
}