/*
  2017. 07. 20
  Creator : woojung
*/

var praTotal = 0;											// 하단 페이징 전체 수 
var praCurrent = 1;
var firstFlag = false;

//요약 초기화 
function initPractice(){
	//console.log(" 들어와")
	praCurrent = 1;
	praTotal = $("#practice article").length;
	$("#practice article").hide();
	$("#practice .list_"+praCurrent).show();
	$(".pra_result_btn").hide();
	//console.log(praTotal)
	checkPractice();

	//요약 이벤트 초기화
	if(!firstFlag){
		practiceEvent();
		firstFlag = true;
	}
	
}

//요약 페이지 체크  
function checkPractice(){
	$("#practice article").hide();
	$("#practice .list_"+praCurrent).show();

	if(praCurrent == praTotal){	
		praCurrent = praTotal;
		$("#practice .nexArrow").hide();
		$("#practice .preArrow").show();
		$(".pra_result_btn").show();
		toolTipFlag = true;
		if( endFlag && toolTipFlag ){
			$(".next_tooltip").fadeIn(1000,function(){
				playSound("chimes");
			});
		}else{
			$(".next_tooltip").hide();
		}

	}else if(praCurrent <= 1){
		praCurrent = 1;
		$("#practice .nexArrow").show();
		$("#practice .preArrow").hide();
	}else{
		$("#practice .preArrow").show();
		$("#practice .nexArrow").show();
	}

	$(".pra_curPage").text(praCurrent);
	$(".pra_tolPage").text(praTotal);

}

//요약 이벤트
function practiceEvent(){
	$("#practice .over").on("mouseover",handleOver);
	$("#practice .over").on("mouseout",handleOut);

	//하단 다음버튼
	$("#practice .nexArrow").on("click",function(){

		if(praCurrent < praTotal){
			praCurrent++;			
		}
		checkPractice();
	});

	// 하단 이전버튼
	$("#practice .preArrow").on("click",function(){

		if(praCurrent > 1){
			praCurrent--;
		}
		checkPractice();
	});

	$(".pra_result_btn").on("click",function(){
		var praModalStr = '';
		praModalStr += '<div class="pra_modal">';
		praModalStr += '	<div class="pra_modal_close over"><img src="../common/css/img/page/pra_modal_close_b.png"</div>';
		praModalStr += '</div>';
		$("#practice").append(praModalStr);
		$("#practice .pra_modal_close").on("mouseover",handleOver);
		$("#practice .pra_modal_close").on("mouseout",handleOut);
		$("#practice .pra_modal_close").on("click",handlePraModalClose);
	});
	//결과보기 모달 창 닫기
	function handlePraModalClose(){
		
		$(".pra_modal").remove();
	}
}

