console.log("roadmap");

//로드맵
function getRoadmapData(s){
	var _returnStr="";
	
	//스크롤이 필요없는경우와 필요한 경우를 구분한다.
	if(s==false){
	   	_returnStr+="	<div class='roadScroll'>";
	}else{
		_returnStr+="	<div class='roadScroll'>";
	}
	

	var _chasiLength=_metaData[3].pages.length;
	var _moduleDatas;
	var _moduleNames;
	var _chasiDatas;
	var _chasiNames;
	
	for(var _c=0;_c<_chasiLength;_c++){
		_moduleDatas=_metaData[3].pages[_c].chasi[0].page[0].module;
		//모듈명이 달라질때 마다. 묶음 메뉴 생성
		if(_moduleDatas!=_moduleNames){
		   _moduleNames=_moduleDatas;

			//이전 생성된 moduleGroub, chasiGroub을 닫아준다.
			if(_c!=0){
				_returnStr+="	</div>";
				_returnStr+="</div>";
			}

			_returnStr+="<div class='moduleGroub'>";
			_returnStr+="		<button class='moduleMenu";

			//포커싱 묶음 활성
			if((_page-1)==_c){
				_returnStr+=" active";
			}

			_returnStr+="' onclick='roadFocus("+(_c+1)+");'>"
			_returnStr+=_moduleDatas;
			_returnStr+="	</button>";

			//chasiMenu를 그룹으로 묶어 관리한다.
			_returnStr+="<div class='chasiGroub'>";
		}

		_chasiDatas=_metaData[3].pages[_c].chasi[0].page[0].title0;
		//페이지명이 달라질때 마다. 페이지 메뉴 생성
		if(_chasiDatas!=_chasiNames){
			_chasiNames=_chasiDatas;

			_returnStr+="		<button class='chasiMenu";

			//포커싱 페이지 활성
			if((_page-1)==_c){
				_returnStr+=" active";
			}

			_returnStr+="' onclick='roadFocus("+(_c+1)+");'><span class='blit'>ㆍ</span><span class='txt'>"+_chasiDatas+"</span></button>";
			_returnStr+="<br/>";
		}
	}
	_returnStr+="		</div>";
	_returnStr+="	</div>";
	_returnStr+="</div>";
	
	return _returnStr;
}