/********************************************
   HTML 이러닝 콘텐츠 프레임워크
   제작사:(주)케이브레인컴퍼니
   제작일:2023.04.
   제작자:

   임의 수정 및 무단 배포를 금지합니다.
   Copyright 2023 Kbrainc All rights reserved.
***********************************************/
//kbc.en//////////////////////////////////////////////////////////////////////////
;(function(root,name,factory){
    if(root[name])
        throw new Error(name+" already defined.");
    root[name] = factory(root);
}(window,"KbcLMS",function(root){
    return (function(modules){
        var exports = {};
        modules.forEach(function(m){
           var module = {name:"",exports:{}};
           m.call(module.exports,module,exports);
           if(module.name)exports[module.name] = module.exports;
        });
        return exports;
    }([
        //공통//////////////////////////////////////////////////////////////////////
        (function(mod,EXP){
            //스콤판단
            if(!!root["doInitialize"]){
                Object.defineProperty(EXP,"isScorm",{value: root["doInitialize"]() == "true"});
            }else{
                Object.defineProperty(EXP,"isScorm",{value:false});
            };
            //포팅여부 판단
            Object.defineProperty(EXP,"isPorting",{
                value:!$.isLocal,
                writable:true
            });  
            Object.defineProperty(EXP,"nowPage",{
                value:false,
                writable:true
            });
            /* 통합연수원은 beforeunload 사용 금지(top 프레임에서 doTerminate 시켜 버렸음) */
            window.addEventListener("beforeunload",function(e){});
            EXP.maxLoopCount = 30;
            EXP.curLoopCount = 0;
            
            Object.defineProperty(EXP,"bookmark",{
                set:function(obj){//2022 01 25 북마크 관련 수정 - 이현우
                    // var storage = KbcUtil.localStorage;
                    console.log("항 아퍼1!!!")
                    if(top.navi_frame){
                        console.log("set-time : ", curPage, Player.currentTime);
                        top.navi_frame.FnSavePlaySec(curPage, parseInt(Player.currentTime));
                        setTimeout(function(){
                            console.log("get-time : ", curPage, top.navi_frame.FnGetPlaySec(curPage));
                        }, 500)
                    }else{
                        // storage.save("bookmark", curPage, Player.currentTime);
                    };
                },

                get:function(){
                    var storage = KbcUtil.localStorage;
                    // var bookTime = (top.navi_frame) ? 
                    //                     top.navi_frame.FnGetPlaySec(EXP.nowPage) : 
                    //                     parseInt(storage.load("bookmark",EXP.nowPage), 10) || 0;
                    var bookTime = (top.navi_frame) ? 
                                        top.navi_frame.FnGetPlaySec(curPage) : 0;

                    console.log("call-bookTime : ", bookTime, "noPage : ", curPage);
                    return bookTime;
                }
            });

        }),
        //Init//////////////////////////////////////////////////////////////////////////
        (function(mod,EXP){
            var init = function(pagenum){}
            mod.name = "init";
            mod.exports = init;
        }),
        

        //checkProg:진도체크///////////////////////////////////////////////////////////////////////
        (function(mod,EXP){
            var checkProg = function(bool){
                return true;
                //페이지 진도가 완성되었을 때 호출 됨.
                //페이지 진도를 완료로 강제처리 할 수 있는 코드가 있으면 삽입하면 됨.
            }
            mod.name = "checkProg";
            mod.exports = checkProg;
        }),
        //checkedPage:요청한 페이지 진도완료여부 리턴////////////////////////////////////////////////////////
        (function(mod,EXP){
            var menuCheckedPage = function(targetPageNum, chapterName){//01_01.html

                var pass_yn = (top.navi_frame) ? top.navi_frame.FnGetStudyFrameInfo(targetPageNum).pass_yn || false : false;              
                console.log("pass_yn : ", pass_yn)
                if(pass_yn == "Y"){// Y = 완료, N = 진행중 , E = 미학습
                    return true;
                }else{
                    return false;
                }
                
            }
            mod.name = "menuCheckedPage"
            mod.exports = menuCheckedPage
        }),
        //checkedPage:요청한 페이지 진도완료여부 리턴////////////////////////////////////////////////////////
        (function(mod,EXP){
            var checkedPage = function(targetPageNum, chapterName){//01_01.html

                // const targetPageName = chapterName+"_"+ this.itostr(targetPageNum)+".html";
                // console.log("targetPageName : ", targetPageName)
                // console.log(top.navi_frame)
                //var pass_yn = (top.navi_frame) ? top.navi_frame.FnGetStudyFrameInfo(targetPageNum).pass_yn || false : false;
                /* var pass_yn = "Y";
                console.log("pass_yn : ", pass_yn)
                if(pass_yn == "Y"){// Y = 완료, N = 진행중 , E = 미학습
                    return true;
                }else{
                    return false;
                } */
                //EXP.maxLoopCount = 30;
                //EXP.curLoopCount = 0;
                
                return new Promise((resolve, reject) => {
                    
                    var intervalId = setInterval( e =>{
                        try{
                            EXP.curLoopCount++;
                            var pass_yn = top.navi_frame.FnGetStudyFrameInfo(targetPageNum).pass_yn;
                            
                            console.log("promise-pass_yn : ",pass_yn)

                            
                           
                            
                            if(pass_yn == "Y"){// Y = 완료, N = 진행중 , E = 미학습
                                resolve(true)
                            }else{
                                resolve(false)
                            }
                            clearInterval(intervalId);
                        }catch(e){
                            console.log(EXP.curLoopCount)
                            if(EXP.maxLoopCount < EXP.curLoopCount){                            
                                resolve("N");
                                clearInterval(intervalId);
                            }
                        }
                    }, 100);
                });
                /* setTimeout(function(){
                    try{
                        EXP.curLoopCount++;
                        var pass_yn = top.navi_frame.FnGetStudyFrameInfo(targetPageNum).pass_yn;
                        console.log(pass_yn)
                        if(pass_yn == "Y"){// Y = 완료, N = 진행중 , E = 미학습
                            return true;
                        }else{
                            return false;
                        }
                    }catch(e){
                        console.log(EXP.curLoopCount)
                        if(EXP.maxLoopCount >= EXP.curLoopCount){                            
                            EXP.checkedPage(targetPageNum);
                        }
                    }
                }, 100); */


                
            }
            mod.name = "checkedPage"
            mod.exports = checkedPage
        }),
        //pageMove:휴넷 페이지 이동 함수////////////////////////////////////////////////////////
        (function(mod,EXP){
            var hunetPageMove = function(fileName){
                top.navi_frame.FnNextMove(fileName);
            }
            mod.name = "hunetPageMove"
            mod.exports = hunetPageMove
        }),
        //checkedSco:스코 진도완료여부////////////////////////////////////////////////////////
        (function(mod,EXP){
            var checkedSco = function(){
                return true;//nonescorm 이라서 true
            }
            mod.name = "checkedSco"
            mod.exports = checkedSco
        }),
        //move:스코이동//비스콤형 사용안함///////////////////////////////////////////////////////
        (function(mod,EXP){
            var move = {}

            move.nextSco = function(){
                console.log("nextSco : ", String(parent.isStudyMode))
            }

            move.prevSco = function(){
                console.log("prevSco : ", String(parent.isStudyMode))
            }

            mod.name = "move";
            mod.exports = move;
        }),
        //itostr - 0 string 형변환//////////////////////////////////////////////////////////
		(function(module){
			function itostr(np){
				return (np>=10)?String(np):"0"+np;
			};
			module.name = "itostr";
			module.exports = itostr;
		})
    ]));
}));