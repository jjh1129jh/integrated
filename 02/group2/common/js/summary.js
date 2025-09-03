/*
  2017. 06. 28
  Creator : woojung

*/

var sumTotal = 0;											// 하단 페이징 전체 수 
var sumCurrent = 1;
var firstFlag = false;

//요약 초기화 
function initSummary(){
	sumCurrent = 1;
	sumTotal = $("#summary section").length;
	checkSummary();

	//요약 이벤트 초기화
	if(!firstFlag){
		summaryEvent();
		firstFlag = true;
	}
	
}

//요약 페이지 체크  
function checkSummary(){
	$("#summary section").hide();
	$("#sum_"+sumCurrent).show();

	if(sumCurrent == sumTotal){	
		sumCurrent = sumTotal;
		$("#summary .nexArrow").hide();
		$("#summary .preArrow").show();
			if(endFlag){
				progressControll = "Y";
				$(".next_tooltip").fadeIn(500,function(){
					playSound("chimes");	
				});
			}
			toolTipFlag = true;	

	}else if(sumCurrent <= 1){
		sumCurrent = 1;
		$("#summary .nexArrow").show();
		$("#summary .preArrow").hide();
		blinkFlag = true;
	}else{
		$("#summary .preArrow").show();
		$("#summary .nexArrow").show();
	}

	$(".sum_curPage").text(sumCurrent);
	$(".sum_tolPage").text(sumTotal);

}

//요약 이벤트
function summaryEvent(){
	console.log("isMobilePlatform() : " + isMobilePlatform())
	if(isMobilePlatform()){
		$(".top_button").hide();
	}
	$("#summary .over").on("mouseover",handleOver);
	$("#summary .over").on("mouseout",handleOut);

	//하단 다음버튼
	$("#summary .nexArrow").on("click",function(){

		if(sumCurrent < sumTotal){
			sumCurrent++;			
		}
		checkSummary();
		playSound("click")
	});

	// 하단 이전버튼
	$("#summary .preArrow").on("click",function(){

		if(sumCurrent > 1){
			sumCurrent--;
		}
		checkSummary();
		playSound("click")
	});

	//상단 다운로드 버튼
	$("#summary .down-btn").on("click",function(){
		downUrl = "../common/down/note_"+ itostr(curChasi) +".zip";
		window.open(downUrl);
	});

	//상단 프린트 하기 버튼
	$("#summary .print-btn").on("click",print_page);

	function print_page(){
		playSound("click");
		//protoAlt();
		//return;
		printThis();			
	}

	function printThis(){
		//console.log("printThis2");
		link = 'about:blank';
		
		var src = '';
		if(summaryPrintPage != 0){//여러장
			for(var i =1; i<= summaryPrintPage; i++){
				src += "<img src='./img/note_"+itostr(curChasi)+"_"+itostr(i)+".png'/>";	
			}
		}
		console.log("src : " + src);
		//return;
		var pw = window.open(link, "_new");
		pw.document.open();
		pw.document.write(makePrintPage(src));
		pw.document.close();
	}

	function makePrintPage(src){
		return '<!doctype html><html lang="ko"><head><title></title><script>' +
			'function step1() { setTimeout(\'step2()\', 10); }' +
			'function step2() { window.print(); window.close(); }' +
			'</scr' + 'ipt></head><body onLoad="step1()">' +src+ '</body></html>';
	}

}

