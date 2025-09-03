console.log("mega");

//추가된 별도 기능
var _fontasome=false;//fontasome을 활용할지 결정한다.
var _autoplay=true;//자동재생 기능을 활용할지 결정한다.
var _autoAlign=false;//자동정렬 기능을 활용할지 결정한다.
var _additional=false;//별도기능으로 부가메뉴기능을 활용할지 결정한다.
var _multilingual=true;//다국어 기능을 활용할지 결정한다.
var _htmlmp4=true;//퀴즈 시작부분 페이지 영상으로 대체

////////////////////////////////////////////////////////////////////////////////////////////
//순차적으로 js를 호출하기 위해 다음과 같이 배열로 담아 호출한다.
////////////////////////////////////////////////////////////////////////////////////////////
var _importJs=["common","dataSetting"];
function importJs(s){
	$.getScript("../common/js/"+s+".js")
		.done(function( script, textStatus ) {
			if(_importJs.length>1){
				_importJs.shift();

				importJs(_importJs[0]);
			}	
		})
		.fail(
		function( jqxhr, settings, exception ) {
			console.log("-importJs Error-");
			console.log(jqxhr);
			console.log(settings);
			console.log(exception);
		}
	);
}