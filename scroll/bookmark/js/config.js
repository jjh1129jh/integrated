var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		fileType = ".mp4"
	} else {
		fileType = ".mp4"
	}

var contents_list =new Array();
contents_list[0] = new Array();


contents_list[1] = new Array();
contents_list[1][0] = ["",false,"",0,1280,720];
contents_list[1][1]  =  ["드래그앤드롭 테스트 (1페이지)",true,"01/01/01_01.html",0,1280,720];
contents_list[1][2]  =  ["줄긋기 테스트 (1페이지)",true,"01/02/02_01.html",0,1280,720];
contents_list[1][3]  =  ["북마크 테스트",true,"01/03/03_01.html",0,1280,720];
