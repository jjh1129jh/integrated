console.log("top");

//상단
function getTopData() {
	var _returnStr = "";
	_returnStr += "<div class='top'>";

	//별도 부가메뉴가 필요한경우
	//if(_additional){
	//_returnStr+="<button class='additional' onclick='additional()'></button>";
	//}

	//_returnStr+="<button class='PIP' onclick='PIP()'></button>";
	if (_device == "PC") {
		_returnStr += "<div class='logo'>" + _logoName + "</div>";

		_returnStr += "<div class='title'>";
		_returnStr += "<div class='chasi'>";
		if (_jucha != undefined) {
			_returnStr += "<span class='no'>" + trance.str(_jucha) + "_" + trance.str(_chasi) + "</span>";
		} else {
			_returnStr += "<span class='no'>" + trance.str(_chasi) + "</span>";
		}
		_returnStr += "<span class='txt'>" + _chasiName + "</span>";
		_returnStr += "	</div>";

		_returnStr += "<div class='details'>";
		_returnStr += "	<span class='bundleName'>" + _bundleName + "</span>";
		if (_pageName != "") {
			_returnStr += "	<span class='pageName'>" + _pageName + "</span>";
		}

		_returnStr += "</div>";
		_returnStr += "</div>";
	}
	_returnStr += "</div>";

	return _returnStr;
}
