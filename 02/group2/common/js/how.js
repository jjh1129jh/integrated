function initHow(){
    checkBoxArr = []
    for(var i = 0 ;i<$("#howBox li").length;i++){
        checkBoxArr[i] = 0;
    }
    //console.log(checkBoxArr)
    $("#howBox li em img").attr("src","../common/css/img/page/chk_b.png");
}


function checkBoxEvent(e){
    checkBoxArr = []
    for(var i = 0 ;i<$("#howBox li").length;i++){
        checkBoxArr[i] = 0;
    }
    $("#howBox li span,#howBox li em").on("mouseover",function (){
        var idx = $(this).parent().index();
        $("#howBox li:eq("+idx+") em img").attr("src","../common/css/img/page/chk_u.png");
        $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").css("cursor","pointer")
    })
    $("#howBox li span,#howBox li em").on("mouseout",function (){
        console.log("아웃")
        var idx = $(this).parent().index();
        $("#howBox li:eq("+idx+") em img").attr("src","../common/css/img/page/chk_b.png");
        $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").css("cursor","default")
    })
    $("#howBox li span,#howBox li em").on("click",function (){
        var idx = $(this).parent().index();
        console.log(idx+" 번째가 : "+checkBoxArr[idx]);
        if(checkBoxArr[idx] == 0){
            $("#howBox li:eq("+idx+") em img").attr("src","../common/css/img/page/chk_u.png");
            $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").off("mouseover")
            $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").off("mouseout")
            $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").css("cursor","default")
            checkBoxArr[idx] = 1;
        }else if(checkBoxArr[idx] == 1){
            $("#howBox li:eq("+idx+") em img").attr("src","../common/css/img/page/chk_b.png");
            $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").on("mouseover",function (){
                $("#howBox li:eq("+idx+") em img").attr("src","../common/css/img/page/chk_u.png");
                $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").css("cursor","pointer")
            })
            $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").on("mouseout",function (){
                $("#howBox li:eq("+idx+") em img").attr("src","../common/css/img/page/chk_b.png");
                $("#howBox li:eq("+idx+") em,#howBox li:eq("+idx+") span").css("cursor","default")
            })
            checkBoxArr[idx] = 0;
        }
    })
    $("#howBtn").on("click",handleNextClick);
    $("#howBtn").on("mouseover",handleOver);
    $("#howBtn").on("mouseout",handleOut);
    $("#howBtn").on("mousedown",handleDown);
}