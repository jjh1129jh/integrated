/*
  2017. 07. 20
  Creator : woojung

	노인학대예방_pracite페이지
*/

var praTotal = 0;											// 하단 페이징 전체 수 
var praCurrent = 1;
var firstFlag = false;
var praNumArr = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);//17문항 

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
	
	//결과보기
	$(".pra_result_btn").on("click",function(){
		var praSum = 0;
		for(var i = 0; i<praNumArr.length; i++){
			praSum += praNumArr[i];
		}
		console.log(praSum+"합계");
		var praModalStr = '';
		praModalStr += '<div class="pra_modal">';
		praModalStr += '	<div class="pra_modal_close over"><img src="../common/css/img/page/pra_modal_close_b.png"></div>';
		praModalStr += '	<p>총점 : '+praSum+' 점</p>';
		praModalStr += '</div>';
		$("#practice").append(praModalStr);
		$("#practice .pra_modal_close").on("mouseover",handleOver);
		$("#practice .pra_modal_close").on("mouseout",handleOut);
		$("#practice .pra_modal_close").on("click",handlePraModalClose);
		//다음페이지로 툴팁
		toolTipFlag = true;
		if( endFlag && toolTipFlag ){
			$(".next_tooltip").fadeIn(1000,function(){
				playSound("chimes");
			});
		}else{
			$(".next_tooltip").hide();
		}
	});
	//결과보기 모달 창 닫기
	function handlePraModalClose(){
		
		$(".pra_modal").remove();
	}

	//문항 체크 
	$(".pra_list .praNum li").on("click",handlePraNumCheck);
	$(".pra_list .praNum li").on("mouseover",handlePraNumOver);
	$(".pra_list .praNum li").on("mouseout",handlePraNumOut);

	
}
//문항 번호에 오버
function handlePraNumOver(){
	$(this).css("cursor","pointer");
	$(this).css("color","red");
}
//문항 번호에 아웃
function handlePraNumOut(){
	//$(this).css("cursor","default");
	$(this).css("color","#333");
}

//문항 번호에 클릭
function handlePraNumCheck(){

	var ListNumCheck = $(this).index()+1
	var praListNum = $(this).parent().attr("id");
	praListNum = praListNum.substr(praListNum.length-2,2)
	$("#PraNum_"+praListNum+" li").css("color","#333");
	$("#PraNum_"+praListNum+" li").eq(ListNumCheck-1).off("mouseout");
	$(this).css("color","red");
	if(praListNum.substr(0,1) == 0){
		praListNum = praListNum.substr(1,1);
	}
	praNumArr[praListNum] = ListNumCheck;
	var checkPraNum = 0;;
	for(var i =1; i<praNumArr.length; i++){
		if(praNumArr[i] != 0 ){
			checkPraNum++;
		}
	}
	if(checkPraNum == 17){
		$(".pra_result_btn").show();
	}
	
}