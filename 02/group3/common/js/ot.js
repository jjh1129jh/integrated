var liActive = 1;
var tabPage = ["", 1, 1, 1, 1, 1 ];
var tabTotalPage = ["", 1, 1, 1, 1, 1];//tab 안에 페이지 수
var imgSrc = "../ot/img/" 
var pastFlowLiOnEvent = 1;

function otInit2(){
    tabPage = [0, 1, 1, 1, 1, 1];
    $("#tabBox_"+liActive).css("background-image","url(../ot/img/ot_article_"+liActive+"_"+tabPage[liActive]+".png)");
    $("#tabBox_1").show();
    $("#mainTab li").eq(0).trigger("click",handleMainTabClick);
}
function guideInit(){
    $("#ot section").hide();
    for(var i = 1; i< tabPage.length ; i++){
        console.log(i)
        $("#tabBox_"+i).css("background-image","url(../ot/img/ot_article_"+i+"_1.png)")
    }
    $("#tabBox_1").show();
    console.log(tabTotalPage)
    for(var i = 0; i < tabPage.length; i++){
        console.log(i+"번째 tab 안에 페이지 수 "+tabTotalPage[i])
        if(tabTotalPage[i] >1){
            $("#tabBox_"+i).append('<div class="preArrow"><img src="'+imgSrc+'help_pre_d.png" alt="이전 버튼"></div>')
            $("#tabBox_"+i).append('<div class="nextArrow"><img src="'+imgSrc+'help_next_d.png" alt="다음 버튼"></div>')
        }
    }
    //화면구성 tab5
    var str = '';
    for(var i = 1;i <9;i++){
        str += '<img id="num_'+i+'" class="compositionNum" src="../ot/img/tab5_tool_number_'+i+'.png" alt="'+i+'번"/>';
        str += '<img id="text_'+i+'" src="../ot/img/tab5_tool_'+i+'.png"  alt="'+i+'번 설명"/>';
    }
    $("#tabBox_5 .section_inner").append(str)
    $(".preArrow").hide();
    $(".nextArrow").show();
    guideEvent();
    $("#mainTab li").eq(0).trigger("click",handleMainTabClick);
    
}
function guideEvent(){
    //상단 메인 tab버튼 
    $("#mainTab li").on("click",handleMainTabClick);
    $("#mainTab li").on("mouseover",handleMainTabOver);
    $("#mainTab li").on("mouseout",handleMainTabOut);
    
    //tab4 학습흐름
    $("#flowTab li").on("click",flowTabFn);
    $("#flowTab li").on("mouseover",handleOver);
    $("#flowTab li").on("mouseout",handleOut);

    //tab5 학습구성
    $("#tabBox_5 .compositionNum").on("click",compositionTabFn);

    //다음 버튼
    $(".preArrow").on("click",handlePagePre);
    $(".preArrow").on("mouseover",handleOver);
    $(".preArrow").on("mouseout",handleOut);

    //이전 버튼
    $(".nextArrow").on("click",handlePageNext);
    $(".nextArrow").on("mouseover",handleOver);
    $(".nextArrow").on("mouseout",handleOut);

    //닫기 버튼
    $(".closeot").on("click",handleGuideCloseClick);
    $(".closeot").on("mouseover",handleOver);
    $(".closeot").on("mouseout",handleOut);
    
    //학습방법 미디어 플레이어 다운 버튼
    $("#mediaDownBtn").on("click",handleMediaDownClick);
    $("#mediaDownBtn").on("mouseover",handleOver);
    $("#mediaDownBtn").on("mouseout",handleOut);

    //새창으로 오티열릴때 닫기 버튼
    $(".closeOt").on("click",function(){
        window.close();
    })
    $(".closeOt").on("mouseover",handleOver);
    $(".closeOt").on("mouseout",handleOut);
    
}
//상단 메인 Tab 클릭
function handleMainTabClick(){
    //이전 버튼 기본으로 돌려놓기 
    var activeImgAttr = $("#mainTab .tab"+liActive).children().attr("src");
    activeImgAttr = activeImgAttr.substr(0,activeImgAttr.length-5);
    $("#mainTab .tab"+liActive).children().attr("src",activeImgAttr+"b.png");
    
    //클릭한 번호 담기(현재 버튼)
    var tabIdx = $(this).attr("class");
    tabIdx = tabIdx.substr(3,1);
    liActive = tabIdx;
    
    var imgAttr = $(this).children().attr("src");
    imgAttr = imgAttr.substr(0,imgAttr.length-5);
    $(this).children().attr("src",imgAttr+"o.png");
    $(this).children().css("cursor","pointer");
    
    $("#ot section").hide();
    $("#tabBox_"+liActive).show();
    $(".preArrow").hide();
    $(".nextArrow").show();
    //tab 클릭마다 초기화 
    tabPage = [0, 1, 1, 1, 1, 1];
    $("#tabBox_"+liActive).css("background-image","url(../ot/img/ot_article_"+liActive+"_"+tabPage[liActive]+".png)");

    if(liActive == 1){
        //console.log("1이벤트 없어" );
    }else if(liActive == 2){
        //console.log("2이벤트 없어" );
    }else if(liActive == 3){
        //console.log("3이벤트 mainTab 이벤트 있어" );
        //pastFlowLiOnEvent = 1;
        $("#flowTab li").eq(0).trigger("click",flowTabFn);
    }else if(liActive == 5){
        //console.log("5이벤트 mainTab 이벤트 있어" );
    }
}
//tab박스 내 이전버튼
function handlePagePre(){
    tabPage[liActive]--;
    $("#tab"+liActive).children().attr("src",imgSrc+"ot_article_"+liActive+"_"+tabPage[liActive]+".png");
    if( tabPage[liActive] == 1 ){
        $(".nextArrow").show();
        $(".preArrow").hide();
    }
}

//tab박스 내 다음 버튼
function handlePageNext(){
    tabPage[liActive]++;
    $("#tab"+liActive).children().attr("src",imgSrc+"ot_article_"+liActive+"_"+tabPage[liActive]+".png");
    $(".preArrow").show();
    if( tabPage[liActive] == tabTotalPage[liActive] ){
        $(".nextArrow").hide();
    }

}

//학습도우미 창 닫기
function handleGuideCloseClick(){
    window.close();
}
//상단 메인탭 이벤트
function handleMainTabOver(){//li 오버시 이미지 o
    //playSound("over");	
    var imgAttr = $(this).children().attr("src");
    imgAttr = imgAttr.substr(0,imgAttr.length-5);
    $(this).children().attr("src",imgAttr+"o.png");
    $(this).children().css("cursor","pointer");

    var activeImgAttr = $("#mainTab .tab"+liActive).children().attr("src");
    activeImgAttr = activeImgAttr.substr(0,activeImgAttr.length-5);
    $("#mainTab .tab"+liActive).children().attr("src",activeImgAttr+"o.png");
    $("#mainTab .tab"+liActive).children().css("cursor","default");
    
}
function handleMainTabOut(){//li 아웃시 이미지 b
    var imgAttr = $(this).children().attr("src");
    imgAttr = imgAttr.substr(0,imgAttr.length-5);
    $(this).children().attr("src",imgAttr+"b.png");
    $(this).children().css("cursor","default");
    
    var activeImgAttr = $("#mainTab .tab"+liActive).children().attr("src");
    activeImgAttr = activeImgAttr.substr(0,activeImgAttr.length-5);
    $("#mainTab .tab"+liActive).children().attr("src",activeImgAttr+"o.png");
    $("#mainTab .tab"+liActive).children().css("cursor","default");
}

//일반 버튼
function handleOver(){//오버시 이미지 o
    //playSound("over");
    var imgAttr = $(this).children().attr("src");
    imgAttr = imgAttr.substr(0,imgAttr.length-5);
    $(this).children().attr("src",imgAttr+"o.png");
    $(this).children().css("cursor","pointer");
}
function handleOut(){//아웃시 이미지 b
    var imgAttr = $(this).children().attr("src");
    imgAttr = imgAttr.substr(0,imgAttr.length-5);
    $(this).children().attr("src",imgAttr+"b.png");
}
/////////////////////////////////// 
//상단 탭 안에 버튼들 함수 
//////////////////////////////////
//tab3 학습흐름 함수
function flowTabFn(){
    var tabIdx = $(this).attr("id");
    tabIdx = tabIdx.substr(8,1);
    FlowLiActive = tabIdx;

    console.log("이전에 누른 버튼 "+ pastFlowLiOnEvent)
    console.log("지금 누른 버튼 :::::::"+ FlowLiActive)
    
    //이전버튼 이벤트 활성화 
    var activeImgAttr = $("#flowTab_"+pastFlowLiOnEvent).children().attr("src");
    activeImgAttr = activeImgAttr.substr(0,activeImgAttr.length-5);
    $("#flowTab_"+pastFlowLiOnEvent).children().attr("src",activeImgAttr+"b.png");
    $("#flowTab_"+pastFlowLiOnEvent).children().css("cursor","pointer");
    $("#flowTab_"+pastFlowLiOnEvent).on("mouseover",handleOver);
    $("#flowTab_"+pastFlowLiOnEvent).on("mouseout",handleOut);
    
    //지금버튼 이벤트 끔 
    var imgAttr = $(this).children().attr("src");
    imgAttr = imgAttr.substr(0,imgAttr.length-5);
    $(this).children().attr("src",imgAttr+"o.png");
    $("#flowTab_"+FlowLiActive).children().css("cursor","default");
    $("#flowTab_"+FlowLiActive).off("mouseover");
    $("#flowTab_"+FlowLiActive).off("mouseout");

    //학습흐름 배경 변경
    $("#tabBox_3").css("background-image","url(../ot/img/ot_article_3_"+FlowLiActive+".png)");
    pastFlowLiOnEvent = tabIdx;
}
//tab4 학습 방법 media player다운
function handleMediaDownClick(){
    window.open("https://support.microsoft.com/ko-kr/help/14209/get-windows-media-player");
    //playSound("click");
}
//tab5 학습구성 함수 
var pastNumIdx = 0;
function compositionTabFn(){
    
    var numIdx = $(this).attr("id");
    numIdx = numIdx.substr(4,1);
    
    console.log("지금 누른 버튼 :::::::"+ numIdx)
    $("#text_"+numIdx).show();
    $("#num_"+numIdx).css("cursor","default")

    if( pastNumIdx != 0 ){
        console.log("이전에 누른 버튼 //////////////////"+ pastNumIdx)
        $("#text_"+pastNumIdx).hide();
        $("#num_"+pastNumIdx).css("cursor","pointer")
    }

    pastNumIdx = numIdx;
}
