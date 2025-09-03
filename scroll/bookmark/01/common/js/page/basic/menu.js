console.log("menu");

//메뉴
function getMenuData(){
	var _returnStr="";
	_returnStr+="<div class='menu'>";
	_returnStr+="<div class='menuTop'></div>";
	for(var _m=0;_m<_pageLength;_m++){
		_bundleMenuData=_metaData[3].pages[_chasi-1].chasi[_m].page[0].title1;
		//묶음명이 달라질때 마다. 묶음 메뉴 생성
		if(_bundleMenuData!=_bundleMenuName){
		   _bundleMenuName=_bundleMenuData;

			//이전 생성된 menuGroub, subGroub을 닫아준다.
			if(_m!=0){
				_returnStr+="	</div>";
				_returnStr+="</div>";
			}

			_returnStr+="<div class='bundleGroub'>";
			_returnStr+="		<button class='bundleMenu";
			//
			//_returnStr+=" active";
			//
			_returnStr+="' onclick='pageMove("+(_m+1)+");' tabindex='"+(51+_m)+"'>"

			//_indexDesignType에 따라 txt 혹은 아이콘으로 메뉴를 세팅
			if(_indexDesignType=="txt"){
				_returnStr+=_bundleMenuName;
			}else{
				//아이콘 디자인
				if(_fontasome!=false){
					_returnStr+="<i class='fas "+_bundleMenuIcon[_bundleArray.length]+"'></i>"
					_returnStr+="</br></br>";
				}
				
				_returnStr+="<span>"+_bundleMenuName+"</span>"
			}
			_returnStr+="	</button>";

			//생성된 묶음을 담아 관리한다.
			_bundleArray.push(_bundleMenuName);

			//pagemenu를 그룹으로 묶어 관리한다.
			_returnStr+="<div class='pageGroub'>";
		}

		_pageMenuData=_metaData[3].pages[_chasi-1].chasi[_m].page[0].title2;
		//페이지명이 달라질때 마다. 페이지 메뉴 생성
		if(_pageMenuData!=_pageMenuName){
			_pageMenuName=_pageMenuData;

			_returnStr+="		<button class='pageMenu";

			//포커싱 페이지 활성
			if((_page-1)==_m){
				_returnStr+=" active' onclick='pageMove("+(_m+1)+");' tabindex='"+(51+_m)+"'><span class='menuBlit'>▶</span>";
			}else{
				_returnStr+="' onclick='pageMove("+(_m+1)+");' tabindex='"+(51+_m)+"'><span class='menuBlit'>▷</span>";
			}
			_returnStr+="<span class='menuTxt'>"+_pageMenuName+"</span></button>";
		}
	}
	_returnStr+="		</div>";
	_returnStr+="	</div>";
	_returnStr+="</div>";
	
	return _returnStr;
}