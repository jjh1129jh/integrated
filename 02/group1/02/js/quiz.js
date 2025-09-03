// 인터렉티브 시작
if(pageArray[curPage][3] == "run"){
	document.write('<link href="../02/css/run.css"  rel="stylesheet" />');
}
var quizCategory; // 퀴즈 종류 저장
var quiztype = []; // 배열로 quiztypes 정의
var quizadd = 0; // 퀴즈 추가 생성
var quizNumber = 1; // 퀴즈 순서 *최대 7
var quizTotal = openTiming.length; //초기값 저장
var quizAtoB1 = 0; // type1 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB2 = 0; // type2 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB3 = 0; // type3 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB4 = 0; // type4 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB5 = 0; // type5 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB6 = 0; // type6 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB7 = 0; // type7 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB8 = 0; // type8 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB9 = 0; // type8 퀴즈 A타입이 먼저 나왔을경우 다음엔 자동으로 B타입이 나옴 1: B타입
var quizAtoB10 = 0; // 레벨업은 단일 타입
var levelup_bgm = new Audio('../common/sound/levelup.mp3');

//퀴즈는 한페이지에 최대 3개
var quizTypes = {
	'linearQuiz': 1,   // 일방 퀴즈 (기회 무한)
	'quiz': 2,         // 일반 퀴즈 (기회 1번)
	'quizMulti': 3,    // 답이 여러개인 퀴즈 (기회 1번)
	'run': 4, 				 // 드래곤잡기 이전 장애물 피하기
	'clickAndLine': 5, // 클릭형 선긋기
	'flip': 6,         // 카드 띄우기
	'slide': 7,        // 슬라이드 넘기기
	'receive': 8,      // 상자에 받기
	'simpleclick': 9,  // 단순 클릭
	'attack': 10,      // 드래곤 공격
	'oath': 11         // 서약서 오픈
};

function quizInit() {
	// 한페이지에 퀴즈는 최대 3개
	quiztype[0] = quizTypes[pageArray[curPage][3]] || 0; // 존재하지 않는 타입일 경우 0
	quiztype[1] = quizTypes[pageArray[curPage][4]] || 0; // 존재하지 않는 타입일 경우 0
	quiztype[2] = quizTypes[pageArray[curPage][5]] || 0; // 존재하지 않는 타입일 경우 0

	quizBase(); // 이후 quizBase 함수 호출
}

function quizConversion() { //순서에 맞는 퀴즈로 전환
	$(".quizType").hide();
	if($("#type"+quiztype[quizNumber - 1] + ".typeA").length == 1){
		// A타입에 over 클래스가 있을 경우 B타입 실행
		if($("#type"+quiztype[quizNumber - 1] + ".typeA").hasClass("over")){
			$("#type"+quiztype[quizNumber - 1] + ".typeB").show()
		}
		//A타입에 over 클래스가 없을 경우 A타입부터 실행
		else{
			$("#type"+quiztype[quizNumber - 1] + ".typeA").show()
		}
	}else if($("#type"+quiztype[quizNumber - 1] + ".typeA").length == 0){
		// 온니 B타입만 있을경우
		$("#type"+quiztype[quizNumber - 1] + ".typeB").show()
	}


}

function 	quizBase() {
	$("#htmlShow").empty();
	if(pageArray[curPage][3] !== undefined){
		quizadd ++;
	}
	if(pageArray[curPage][4] !== undefined){
		quizadd ++;
	}
	if(pageArray[curPage][5] !== undefined){
		quizadd ++;
	}
	for(var i=0 ; i<quizadd ; i++){
		quizCategory = quiztype[i]
		setQuiz()
	}
}


//BGM 영역
	//BGM
	var quiz1A_bgmclick = new Audio('../common/sound/click.mp3');
	var quiz1A_bgmright = new Audio('../common/sound/right.mp3');
	var quiz1A_bgmover = new Audio('../common/sound/wrong.mp3');
	var quiz1A_bgmdoor = new Audio('../common/sound/door.mp3');
	var quiz1A_bgmmessage = new Audio('../common/sound/message.mp3');
	var quiz1A_bgm = new Audio('../common/sound/normal_bgm.mp3');
	//BGM
	var quiz1B_bgmright = new Audio('../common/sound/right.mp3');
	var quiz1B_bgmover = new Audio('../common/sound/wrong.mp3');
	var quiz1B_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz2A_bgmright = new Audio('../common/sound/right.mp3');
	var quiz2A_bgmover = new Audio('../common/sound/wrong.mp3');
	var quiz2A_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz2B_bgmright = new Audio('../common/sound/right.mp3');
	var quiz2B_bgmover = new Audio('../common/sound/wrong.mp3');
	var quiz2B_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz3A_bgmright = new Audio('../common/sound/right.mp3');
	var quiz3A_bgmover = new Audio('../common/sound/box_crash.mp3');
	var quiz3A_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz3B_bgmright = new Audio('../common/sound/right.mp3');
	var quiz3B_bgmover = new Audio('../common/sound/wrong.mp3');
	var quiz3B_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz5A_bgmright = new Audio('../common/sound/right.mp3');
	var quiz5A_bgmover = new Audio('../common/sound/wrong.mp3');
	var quiz5A_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz6A_bgmright = new Audio('../common/sound/right.mp3');
	var quiz6A_bgmover = new Audio('../common/sound/wrong.mp3');
	var quiz6A_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz7A_bgmright = new Audio('../common/sound/right.mp3');
	var quiz7A_bgmover = new Audio('../common/sound/wrong.mp3');
	var quiz7A_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz9A_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var quiz9B_bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var bgm = new Audio('../common/sound/run_rider2.mp3');
	var bgmclear = new Audio('../common/sound/run_clear.mp3');
	var bgmover = new Audio('../common/sound/wrong.mp3');
	var bgmcrash = new Audio('../common/sound/attack.mp3');
	var bgmclick = new Audio('../common/sound/click.mp3');
	//BGM
	var box_bgmclear = new Audio('../common/sound/chimes.mp3');
	var box_bgmover = new Audio('../common/sound/wrong.mp3');
	var box_bgmcrash = new Audio('../common/sound/box_crash.mp3');
	var box_bgmright = new Audio('../common/sound/right.mp3');
//BGM
	var organize = new Audio('../common/sound/organize.mp3');
	var sword = new Audio('../common/sound/sword.mp3');

	// 하나의 오디오 배열
	var audioArray = [
		quiz1A_bgmclick, quiz1A_bgmright, quiz1A_bgmover, quiz1A_bgmdoor, quiz1A_bgmmessage, quiz1A_bgm,
		quiz1B_bgmright, quiz1B_bgmover, quiz1B_bgmclick,
		quiz2A_bgmright, quiz2A_bgmover, quiz2A_bgmclick,
		quiz2B_bgmright, quiz2B_bgmover, quiz2B_bgmclick,
		quiz3A_bgmright, quiz3A_bgmover, quiz3A_bgmclick,
		quiz3B_bgmright, quiz3B_bgmover, quiz3B_bgmclick,
		quiz5A_bgmright, quiz5A_bgmover, quiz5A_bgmclick,
		quiz6A_bgmright, quiz6A_bgmover, quiz6A_bgmclick,
		quiz7A_bgmright, quiz7A_bgmover, quiz7A_bgmclick,
		quiz9A_bgmclick,
		quiz9B_bgmclick,
		bgm, bgmclear, bgmover, bgmcrash, bgmclick,
		box_bgmclear, box_bgmover, box_bgmcrash, box_bgmright,
		organize, sword
	];

	window.addEventListener('load', function () {
		if(!Player.muted == 0){
			audioArray.forEach(function(audio) {
				audio.volume = 0;
			});
		}
		else{
			audioArray.forEach(function(audio) {
				audio.volume = Player.volume;
			});
		}
	})
//BGM 영역

function setQuiz(){
	if(quizCategory == 1){ // 타입1 일방 퀴즈 ////////////////////////////////////////////////////////////////////////////////

		// // 임시
		// if(pageArray[curPage][2] == 2){
		// 	quizAtoB1 = 1; //type1 A타입이 나왔으므로 B로 전환
		// }
		// // 임시

		// A타입 B타입 구분
		// A타입 퀴즈 스타트
		if(pageArray[curPage][2] == 1 && quizAtoB1 == 0){
			quizAtoB1 = 1; //type1 A타입이 나왔으므로 B로 전환
			// 일방 퀴즈 A타입 스타트
			var quizStr = "";
			
			quizStr += '	<div class="quizType typeA" id="type1" value="일방형 퀴즈(커스텀)">';
			quizStr += '		<div class="quiz">';
			quizStr += '			<div class="quiz1start"></div>';
			quizStr += '			<div id="quiz1content">';
			// 눈깜빡임
			quizStr += '				<div class="eyesT"></div>';
			quizStr += '				<div class="eyesB"></div>';
			// 문
			quizStr += '				<div class="yes"></div>';
			quizStr += '				<div class="no"></div>';
			// 하단자막 3개
			quizStr += '				<div class="script1"></div>';
			quizStr += '				<div class="script2"></div>';
			quizStr += '				<div class="script3"></div>';
			// 상하단 오브젝트
			quizStr += '				<div class="topobj"></div>';
			// quizStr += '				<div class="bottomobj"></div>';
			// 결과 화면
			quizStr += '				<div class="quiz1clear"></div>';
			quizStr += '				<div class="quiz1wrong"></div>';
			// 결과 버튼
			quizStr += '				<div class="retry"></div>';
			quizStr += '				<div class="resultbtn"></div>';

			quizStr += '			</div>';
			quizStr += '		</div>';
			quizStr += '	</div>';

			$("#htmlShow").append(quizStr);

			quiz1AOn()
			
			function quiz1AOn() {

				//변수
				var clickcount = 0; // 1되면 퀴즈 완료

				$("#type1.typeA .quiz1start").on("click", function () {
					quiz1A_bgmclick.play()
					//BGM 재생
					quiz1A_bgm.volume = volume;
					quiz1A_bgm.loop = true;
					quiz1A_bgm.play()
					$(this).hide()
					$("#type1.typeA").css("background","url(../02/img/quiz/01/01/A_background_2.png)")
					$("#type1.typeA").css("background-size","1280px")
					$("#type1.typeA .yes").show()
					$("#type1.typeA .no").show()
					$("#type1.typeA .eyesT").show()
					$("#type1.typeA .eyesB").show()
					$("#type1.typeA .eyesT").css("top","0px")
					$("#type1.typeA .eyesB").css("top","360px")
					ani1()
				})
				
				$("#type1.typeA .yes").on("click", function () {
					$("#type1.typeA .yes").css("pointer-events","none")
					$("#type1.typeA .no").css("pointer-events","none")
					$(".topobj").fadeOut(300)
					$(".script2").hide()
					// quiz1A_bgmclick.play()
					quiz1A_bgmdoor.play()
					$("#type1.typeA .yes").css("background","url(../02/img/quiz/01/01/yes_o.png)")
					$("#type1.typeA .yes").css("background-size","284px")
					setTimeout(() => {
						clickcount = 1;
						quizChack()
					}, 2000);
				})
				$("#type1.typeA .no").on("click", function () {
					$("#type1.typeA .yes").css("pointer-events","none")
					$("#type1.typeA .no").css("pointer-events","none")
					$(".topobj").fadeOut(300)
					$(".script2").hide()
					// quiz1A_bgmclick.play()
					quiz1A_bgmdoor.play()
					$("#type1.typeA .no").css("background","url(../02/img/quiz/01/01/no_o.png)")
					$("#type1.typeA .no").css("background-size","284px")
					setTimeout(() => {
						clickcount = 0;
						quizChack()
					}, 2000);
				})


				function quizChack() {
					if(clickcount){
						$(".script2").hide()
						$(".topobj").hide()
						$("#type1.typeA .yes").hide()
						$("#type1.typeA .no").hide()
						$("#type1.typeA").css("background","url(../02/img/quiz/01/01/A_background_3.png)")
						$("#type1.typeA").css("background-size","1280px")
						setTimeout(() => {
							quiz1A_bgmmessage.play()
							$(".script3").fadeIn(300)
						}, 2000);
						setTimeout(() => {
							$(".script3").hide()
							// $(".bottomobj").fadeIn(300)
						}, 8000);
						setTimeout(() => {
							anianswer()
						}, 9000);
					}else{
						aniwrong()
						$(".script2").hide()
						$(".topobj").hide()
					}
				}

				function ani1(){
					setTimeout(() => {
						$("#type1.typeA .eyesT").addClass("on")
						$("#type1.typeA .eyesB").addClass("on")
					}, 2000);
					setTimeout(() => {
						$("#type1.typeA .eyesT").css("top","-361px")
						$("#type1.typeA .eyesB").css("top","721px")
					}, 4200);
					setTimeout(() => {
						quiz1A_bgmmessage.play()
						$(".script1").fadeIn(300)
					}, 5500);
					setTimeout(() => {
						$("#type1.typeA .eyesT").css("top","-361px")
						$("#type1.typeA .eyesB").css("top","721px")
						$("#type1.typeA .yes").css("background","url(../02/img/quiz/01/01/yes_c.png)")
						$("#type1.typeA .yes").css("background-size","284px")
						$("#type1.typeA .no").css("background","url(../02/img/quiz/01/01/no_c.png)")
						$("#type1.typeA .no").css("background-size","284px")
						$(".script1").fadeIn(300)
					}, 9500);
					setTimeout(() => {
						$(".script1").hide()
					}, 12000);
					setTimeout(() => {
						$(".script1").hide()
						quiz1A_bgmmessage.play()
						$(".script2").fadeIn(300)
					}, 12500);
					setTimeout(() => {
						$(".script2").hide()
						$(".topobj").fadeIn(300)
						$("#type1.typeA .yes").css("pointer-events","auto")
						$("#type1.typeA .no").css("pointer-events","auto")
					}, 18500);


				}

				function anianswer(){ // 성공 애니메이션
					quiz1A_bgmright.play()
					$("#type1.typeA .quiz1clear").fadeIn(300)
					setTimeout(() => {
						$("#type1.typeA .resultbtn").on("click", function () {
							//BGM 끄기
							quiz1A_bgm.loop = false;
							quiz1A_bgm.pause()
							quiz1A_bgmclick.play()
							$("#type1.typeA").addClass("over")
							quizComplete1() //전용 마무리 코드
						})
						$("#type1.typeA .resultbtn").fadeIn(200)								
					}, 2000);																																
				}

				function aniwrong(){ // 실패 애니메이션
					quiz1A_bgmover.play()
					$("#type1.typeA .quiz1wrong").fadeIn(300)
					setTimeout(() => {
						$("#type1.typeA .retry").on("click", function () {
							$(this).hide()
							quiz1A_bgmclick.play()
							$("#type1.typeA .quiz1wrong").hide()
							$("#type1.typeA .no").css("background","url(../02/img/quiz/01/01/no_c.png)")
							$("#type1.typeA .no").css("background-size","284px")
							$(".script2").show()
							$(".topobj").show()
							$("#type1.typeA .yes").css("pointer-events","auto")
							$("#type1.typeA .no").css("pointer-events","auto")
						})
						$("#type1.typeA .retry").fadeIn(200)								
					}, 2000);
				}
			}
		}
		// B타입 퀴즈 스타트
		else if(pageArray[curPage][2] == 2 || quizAtoB1 == 1){

			var quizStr = "";
			
			quizStr += '	<div class="quizType typeB" id="type1" value="카드 뒤집기">';
			quizStr += '		<div class="quiz">';
			quizStr += '			<div id="quiz1content">';
			quizStr += '					<div class="objectbox">';
			quizStr += '					<ul>';
			quizStr += '						<li class="object object1">';
			quizStr += '							<div class="card card1">';
			quizStr += '								<div class="front"></div>';
			quizStr += '								<div class="back"></div>';
			quizStr += '							</div>';
			quizStr += '						</li>';
			quizStr += '						<li class="object object2">';
			quizStr += '							<div class="card card2">';
			quizStr += '								<div class="front"></div>';
			quizStr += '								<div class="back"></div>';
			quizStr += '							</div>';
			quizStr += '						</li>';
			quizStr += '						<li class="object object3">';
			quizStr += '							<div class="card card3">';
			quizStr += '								<div class="front"></div>';
			quizStr += '								<div class="back"></div>';
			quizStr += '							</div>';
			quizStr += '						</li>';
			quizStr += '						<li class="object object4">';
			quizStr += '							<div class="card card4">';
			quizStr += '								<div class="front"></div>';
			quizStr += '								<div class="back"></div>';
			quizStr += '							</div>';
			quizStr += '						</li>';
			quizStr += '					</ul>';
			quizStr += '					</div>';
			quizStr += '				<div class="quiz1clear"></div>';
			quizStr += '				<div class="quiz1retry"></div>';
			quizStr += '				<div class="quiz1wrong"></div>';
			quizStr += '				<div class="resultbtn"></div>';
			quizStr += '			</div>';
			quizStr += '		</div>';
			quizStr += '	</div>';
			$("#htmlShow").append(quizStr);
			quiz1BOn()
			
			function quiz1BOn() {
				var objectSelect = 0; //선택된 오브젝트 정보를 담을 변수
			
				$("#type1.typeB .object1").on("click", function () {
					$(this).find(".card").toggleClass("flipped");
					$("#type1.typeB .object").css("pointer-events","none")
					objectSelect = 1;
					quiz1B_bgmclick.play()
					setTimeout(() => {
						anwserCheck()
					}, 1500);
				})
				$("#type1.typeB .object2").on("click", function () {
					$(this).find(".card").toggleClass("flipped");
					$("#type1.typeB .object").css("pointer-events","none")
					objectSelect = 2;
					quiz1B_bgmclick.play()
					setTimeout(() => {
						anwserCheck()
					}, 1500);
				})
				$("#type1.typeB .object3").on("click", function () {
					$(this).find(".card").toggleClass("flipped");
					$("#type1.typeB .object").css("pointer-events","none")
					objectSelect = 3;
					quiz1B_bgmclick.play()
					setTimeout(() => {
						anwserCheck()
					}, 1500);
				})
				$("#type1.typeB .object4").on("click", function () {
					$(this).find(".card").toggleClass("flipped");
					$("#type1.typeB .object").css("pointer-events","none")
					objectSelect = 4;
					quiz1B_bgmclick.play()
					setTimeout(() => {
						anwserCheck()
					}, 1500);
				})
				function anwserCheck() {
					//게임 성공
					if(objectSelect == 3){
						$("#type1.typeB .card1").addClass("flipped")
						$("#type1.typeB .card2").addClass("flipped")
						$("#type1.typeB .card3").addClass("flipped")
						$("#type1.typeB .card4").addClass("flipped")
						quiz1B_bgmright.play()
						$("#type1.typeB .quiz1clear").fadeIn(300)
						setTimeout(() => {
							$("#type1.typeB .quiz1clear").fadeOut(300)
						}, 2000);
						setTimeout(() => {
							$("#type1.typeB .result").fadeIn(300)
						}, 2001);
						setTimeout(() => {
							// NEXT 버튼 클릭시 퀴즈 완료
							$("#type1.typeB .resultbtn").on("click", function () {
								quiz1B_bgmclick.play()
								$("#type1.typeB").addClass("over")
								quizComplete1()
							})
							$("#type1.typeB .resultbtn").fadeIn(300)
						}, 3000);
					}
					//게임 실패
					else{
						$("#type1.typeB .card1").removeClass("flipped")
						$("#type1.typeB .card2").removeClass("flipped")
						$("#type1.typeB .card3").removeClass("flipped")
						$("#type1.typeB .card4").removeClass("flipped")
						quiz1B_bgmover.play()
						setTimeout(() => {
							$("#type1.typeB .object").css("pointer-events","auto")
						}, 500);
					}
				}
				
			}
		}
		// 타입 지정 오류
		else{
			console.log("pageArray 오류를 확인하세요.")
		}

	}
	else if(quizCategory == 2){ // 타입2 단일 정답 퀴즈 //////////////////////////////////////////////////////////////////////
		// A타입 B타입 구분

		// 임시
		// if(pageArray[curPage][2] == 2){
		// 	quizAtoB2 = 1; //type1 A타입이 나왔으므로 B로 전환
		// }
		// 임시

		// A타입 퀴즈 스타트
		if(pageArray[curPage][2] == 1 && quizAtoB2 == 0){
			quizAtoB2 = 1; //type2 A타입이 나왔으므로 B로 전환
			// 단일 퀴즈 A타입 스타트
			var quizStr = "";
			
			quizStr += '	<div class="quizType typeA" id="type2" value="단일 정답">';
			quizStr += '		<div class="quiz">';
			quizStr += '			<div id="quiz1content">';
			quizStr += '					<div class="objectbox">';
			quizStr += '					<ul>';
			quizStr += '						<li class="object object1"></li>';
			quizStr += '						<li class="object object2"></li>';
			quizStr += '						<li class="object object3"></li>';
			quizStr += '						<li class="object object4"></li>';
			quizStr += '					</ul>';
			quizStr += '					</div>';
			quizStr += '				<div class="quiz1clear"></div>';
			quizStr += '				<div class="quiz1retry"></div>';
			quizStr += '				<div class="quiz1wrong"></div>';
			quizStr += '				<div class="trash"></div>';
			quizStr += '				<h3 class="trashment">《 눌러서 정답을 확인해보세요.</h3>';
			quizStr += '				<div class="result"><div class="resultbtn"></div></div>';
			quizStr += '				<div class="trashwarning"><div class="intrash"></div><div class="outtrash"></div></div>';
			quizStr += '			</div>';
			quizStr += '		</div>';
			quizStr += '	</div>';
			$("#htmlShow").append(quizStr);
			quiz2AOn()
			
			function quiz2AOn() {
			var objectSelect = 0; //선택된 오브젝트 정보를 담을 변수
			var trashsituation = 0; //쓰레기통의 상태 0 : 빈쓰레기통 1 : 채워진 쓰레기통
			var chance = 1; //퀴즈 기회 1번
			
			$("#type2.typeA .object1").on("click", function () {
				objectSelect = 1
				$("#type2.typeA .trashwarning").fadeIn(500)
				quiz2A_bgmclick.play()
			})
			$("#type2.typeA .object2").on("click", function () {
				objectSelect = 2
				$("#type2.typeA .trashwarning").fadeIn(500)
				quiz2A_bgmclick.play()
			})
			$("#type2.typeA .object3").on("click", function () {
				objectSelect = 3
				$("#type2.typeA .trashwarning").fadeIn(500)
				quiz2A_bgmclick.play()
			})
			$("#type2.typeA .object4").on("click", function () {
				objectSelect = 4
				$("#type2.typeA .trashwarning").fadeIn(500)
				quiz2A_bgmclick.play()
			})
			$("#type2.typeA .intrash").on("click", function () {
				quiz2A_bgmclick.play()
				$("#type2.typeA .trash").css("background","url(../02/img/quiz/02/01/trash_f.png)")
				$("#type2.typeA .trash").css("background-size","110px")
				$("#type2.typeA .trash").css("pointer-events","auto")
				$("#type2.typeA .object" + objectSelect).css("background","url(../02/img/quiz/02/01/object_null.png)")
				$("#type2.typeA .object" + objectSelect).css("background-size","281px")
				$("#type2.typeA .object" + objectSelect).css("pointer-events","none")
				trashsituation = 1; //쓰레기통이 채워진 상태가 됨
				$("#type2.typeA .trashwarning").hide()
				$("#type2.typeA .object").css("pointer-events","none")
				$("#type2.typeA .trashment").fadeIn(300)
			})
			$("#type2.typeA .outtrash").on("click", function () {
				quiz2A_bgmclick.play()
				$("#type2.typeA .trashwarning").fadeOut(500)
			})
			$("#type2.typeA .trash").on("click", function () {
				quiz2A_bgmclick.play()
				// 빈 쓰레기통 클릭
				if(trashsituation == 0){
					$("#type2.typeA .object1").css("background","url(../02/img/quiz/02/01/object1_o.png)")
					$("#type2.typeA .object1").css("background-size","281px")
					$("#type2.typeA .object2").css("background","url(../02/img/quiz/02/01/object2_o.png)")
					$("#type2.typeA .object2").css("background-size","281px")
					$("#type2.typeA .object3").css("background","url(../02/img/quiz/02/01/object3_o.png)")
					$("#type2.typeA .object3").css("background-size","281px")
					$("#type2.typeA .object4").css("background","url(../02/img/quiz/02/01/object4_o.png)")
					$("#type2.typeA .object4").css("background-size","281px")
					objectSelect = 0; //선택된 쓰레기 초기화
				}
				// 채워진 쓰레기통 클릭
				else{
					//게임 성공
					if(objectSelect == 4){
						$("#type2.typeA .object1").css("background","url(../02/img/quiz/02/01/object1_x.png)")
						$("#type2.typeA .object1").css("background-size","281px")
						$("#type2.typeA .object2").css("background","url(../02/img/quiz/02/01/object2_x.png)")
						$("#type2.typeA .object2").css("background-size","281px")
						$("#type2.typeA .object3").css("background","url(../02/img/quiz/02/01/object3_x.png)")
						$("#type2.typeA .object3").css("background-size","281px")
						quiz2A_bgmright.play()
						$("#type2.typeA .object").css("pointer-events","none")
						$("#type2.typeA .quiz1clear").fadeIn(300)
						setTimeout(() => {
							$("#type2.typeA .quiz1clear").fadeOut(300)
						}, 2000);
						setTimeout(() => {
							$("#type2.typeA .result").fadeIn(300)
						}, 2001);
						setTimeout(() => {
							// NEXT 버튼 클릭시 퀴즈 완료
							$("#type2.typeA .resultbtn").on("click", function () {
								quiz2A_bgmclick.play()
								$("#type2.typeA").addClass("over")
								quizComplete1()
							})
							$("#type2.typeA .resultbtn").fadeIn(300)
						}, 4000);
					}
					//찬스 1번
					else if (chance == 1){
						$("#type2.typeA .trashment").hide()
						quiz2A_bgmover.play()
						$("#type2.typeA .quiz1retry").fadeIn(300)
						setTimeout(() => {
							$("#type2.typeA .quiz1retry").fadeOut(300)
						}, 2000);
						chance = 0 // 이제 찬스 없음
						$("#type2.typeA .object1").css("background","url(../02/img/quiz/02/01/object1_o.png)")
						$("#type2.typeA .object1").css("background-size","281px")
						$("#type2.typeA .object2").css("background","url(../02/img/quiz/02/01/object2_o.png)")
						$("#type2.typeA .object2").css("background-size","281px")
						$("#type2.typeA .object3").css("background","url(../02/img/quiz/02/01/object3_o.png)")
						$("#type2.typeA .object3").css("background-size","281px")
						$("#type2.typeA .object4").css("background","url(../02/img/quiz/02/01/object4_o.png)")
						$("#type2.typeA .object4").css("background-size","281px")
						$("#type2.typeA .object").css("pointer-events","auto")
						objectSelect = 0; //선택된 쓰레기 초기화
						$("#type2.typeA .trash").css("background","url(../02/img/quiz/02/01/trash_n.png)")
						$("#type2.typeA .trash").css("background-size","110px")
						$("#type2.typeA .trash").css("pointer-events","none")
					}
					//게임 실패
					else{
						$("#type2.typeA .object1").css("background","url(../02/img/quiz/02/01/object1_x.png)")
						$("#type2.typeA .object1").css("background-size","281px")
						$("#type2.typeA .object2").css("background","url(../02/img/quiz/02/01/object2_x.png)")
						$("#type2.typeA .object2").css("background-size","281px")
						$("#type2.typeA .object3").css("background","url(../02/img/quiz/02/01/object3_x.png)")
						$("#type2.typeA .object3").css("background-size","281px")
						$("#type2.typeA .object4").css("background","url(../02/img/quiz/02/01/object4_o.png)")
						$("#type2.typeA .object4").css("background-size","281px")
						$("#type2.typeA .object").css("pointer-events","none")
						$("#type2.typeA .trashment").hide()
						quiz2A_bgmover.play()
						$("#type2.typeA .quiz1wrong").fadeIn(300)
						setTimeout(() => {
							$("#type2.typeA .quiz1wrong").fadeOut(300)
						}, 2000);
						setTimeout(() => {
							$("#type2.typeA .result").fadeIn(300)
						}, 2001);
						setTimeout(() => {
							// NEXT 버튼 클릭시 퀴즈 완료
							$("#type2.typeA .resultbtn").on("click", function () {
								quiz2A_bgmclick.play()
								$("#type2.typeA").addClass("over")
								quizComplete1()
							})
							$("#type2.typeA .resultbtn").fadeIn(300)
						}, 5000);
					}
				}
			})
			
			}			
		}
		// B타입 퀴즈 스타트
		else if(pageArray[curPage][2] == 2 || quizAtoB2 == 1){
		// 단일 퀴즈 B타입 스타트
			var quizStr = "";
			
			quizStr += '	<div class="quizType typeB" id="type2" value="단일 정답">';
			quizStr += '		<div class="quiz">';
			quizStr += '			<div id="custom-cursor"></div>';
			quizStr += '			<div id="quiz1content">';

			quizStr += '					<div class="objectbox">';
			quizStr += '					<ul>';
			quizStr += '						<li class="object object1"></li>';
			quizStr += '						<li class="object object2"></li>';
			quizStr += '						<li class="object object3"></li>';
			quizStr += '						<li class="object object4"></li>';
			quizStr += '					</ul>';
			quizStr += '					</div>';
			quizStr += '				<div class="quiz1clear"></div>';
			quizStr += '				<div class="quiz1retry"></div>';
			quizStr += '				<div class="quiz1wrong"></div>';

			quizStr += '				<div class="imgcloseup">';
			quizStr += '					<div class="yes"></div>';
			quizStr += '					<div class="no"></div>';
			quizStr += '				</div>';

			quizStr += '				<div class="resultbtn"></div>';

			quizStr += '			</div>';
			quizStr += '		</div>';
			quizStr += '	</div>';

			$("#htmlShow").append(quizStr);

			quiz2BOn()
			
			function quiz2BOn() {

			var objectSelect = 0; //선택된 오브젝트 정보를 담을 변수
			var A2chance = 1; //퀴즈 기회 1번

			var cursor = document.getElementById('custom-cursor');

			document.addEventListener('mousemove', (e) => {
				cursor.style.left = `${e.pageX - cursor.offsetWidth / 2}px`;
				cursor.style.top = `${e.pageY - cursor.offsetHeight / 2}px`;
			});

			$("#type2.typeB .object1").on("click", function () {
				objectSelect = 1;
				quiz2B_bgmclick.play()
				imgchange()
			})
			$("#type2.typeB .object2").on("click", function () {
				objectSelect = 2;
				quiz2B_bgmclick.play()
				imgchange()
			})
			$("#type2.typeB .object3").on("click", function () {
				objectSelect = 3;
				quiz2B_bgmclick.play()
				imgchange()
			})
			$("#type2.typeB .object4").on("click", function () {
				objectSelect = 4;
				quiz2B_bgmclick.play()
				imgchange()
			})

			$("#type2.typeB .no").on("click", function () {
				quiz2B_bgmclick.play()
				$("#type2.typeB .imgcloseup").hide()
			})

			function imgchange() {
				$("#type2.typeB .imgcloseup").css("background","url(../02/img/quiz/02/02/object_closeup" + objectSelect + ".png)")
				$("#type2.typeB .imgcloseup").css("background-size","1280px")
				$("#type2.typeB .imgcloseup").show()
			}
			$("#type2.typeB .yes").on("click", function () {
				$("#type2.typeB .imgcloseup").hide()
				quiz2B_bgmclick.play()
				// 빈 쓰레기통 클릭
				
				//게임 성공
				if(objectSelect == 3){
					quiz2B_bgmright.play()
					$("#type2.typeB .quiz1clear").fadeIn(300)
					setTimeout(() => {
						$("#type2.typeB .quiz1clear").fadeOut(300)
						$("#type2.typeB .object1").hide()
						$("#type2.typeB .object2").hide()
						$("#type2.typeB .object3").hide()
						$("#type2.typeB .object4").hide()
						$("#type2.typeB").css("background","url(../02/img/quiz/02/02/B_background2.png)")
						$("#type2.typeB").css("background-size","1280px")
						// $("#type2.typeB #quiz1content").css("cursor","auto")
					}, 2000);
					setTimeout(() => {
						$("#type2.typeB .resultbtn").on("click", function () {
							quiz2B_bgmclick.play()
							$("#type2.typeB").addClass("over")
							quizComplete1()
						})
						$("#type2.typeB .resultbtn").fadeIn(300)
					}, 2001);
				}
				//찬스 1번
				else if (A2chance == 1){
					$("#type2.typeB .trashment").hide()
					quiz2B_bgmover.play()
					$("#type2.typeB .quiz1retry").fadeIn(300)
					setTimeout(() => {
						$("#type2.typeB .quiz1retry").fadeOut(300)
					}, 2000);
					A2chance = 0 // 이제 찬스 없음
				}
				//게임 실패
				else{
					quiz2B_bgmover.play()
					$("#type2.typeB .quiz1wrong").fadeIn(300)
					setTimeout(() => {
						$("#type2.typeB .quiz1wrong").fadeOut(300)
						$("#type2.typeB .object1").hide()
						$("#type2.typeB .object2").hide()
						$("#type2.typeB .object3").hide()
						$("#type2.typeB .object4").hide()
						$("#type2.typeB").css("background","url(../02/img/quiz/02/02/B_background2.png)")
						$("#type2.typeB").css("background-size","1280px")
						$("#type2.typeB #quiz1content").css("cursor","auto")
					}, 2000);
					setTimeout(() => {
						$("#type2.typeB .result").fadeIn(300)
					}, 2001);
					setTimeout(() => {
						// NEXT 버튼 클릭시 퀴즈 완료
						$("#type2.typeB .resultbtn").on("click", function () {
							quiz2B_bgmclick.play()
							$("#type2.typeB").addClass("over")
							quizComplete1()
						})
						$("#type2.typeB .resultbtn").fadeIn(300)
					}, 5000);
				}
				

			})
			
			}
		}
		// 타입 지정 오류
		else{
			console.log("pageArray 오류를 확인하세요.")
		}

	}
	else if(quizCategory == 3){ // 타입3 복수 정답 퀴즈 //////////////////////////////////////////////////////////////////////
			// A타입 B타입 구분

			// 임시
			if(pageArray[curPage][2] == 2){
				quizAtoB3 = 1; //type1 A타입이 나왔으므로 B로 전환
			}
			// 임시
			// A타입 퀴즈 스타트
			if(pageArray[curPage][2] == 1 && quizAtoB3 == 0){
				quizAtoB2 = 1; //type2 A타입이 나왔으므로 B로 전환
				// 복수 퀴즈 A타입 스타트
				var quizStr = "";
				
				quizStr += '	<div class="quizType typeA" id="type3" value="복수 정답">';
				quizStr += '		<div class="quiz">';

				quizStr += '			<div class="quiz1start"></div>';

				quizStr += '			<div id="quiz1content">';
				//  객체
				quizStr += '					<div class="objectbox">';
				quizStr += '						<ul>';
				quizStr += '							<li class="object object1"></li>';
				quizStr += '							<li class="object object2"></li>';
				quizStr += '							<li class="object object3"></li>';
				quizStr += '							<li class="object object4"></li>';
				quizStr += '							<li class="object object5"></li>';
				quizStr += '							<li class="object object6"></li>';
				quizStr += '						</ul>';
				quizStr += '					</div>';
				// 블라인드
				quizStr += '				<div class="blind"></div>';
				// 정답 체크 객체
				quizStr += '				<div class="anwserchack"></div>';
				// 정답
				quizStr += '				<div class="anwser anwser1"></div>';
				quizStr += '				<div class="anwser anwser2"></div>';
				quizStr += '				<div class="anwser anwser3"></div>';
				quizStr += '				<div class="anwser4"></div>';
				//정답 표시
				quizStr += '				<div class="quizclear"></div>';
				quizStr += '				<div class="result"><div class="resultbtn"></div></div>';
				quizStr += '			</div>';
				quizStr += '		</div>';
				quizStr += '	</div>';

				$("#htmlShow").append(quizStr);

				quiz3AOn()
				
				function quiz3AOn() {

					var objectSelect = 0; //선택된 오브젝트 정보를 담을 변수
					var anwsercount = 0; //4개가 되면 퀴즈 완료
	
					$("#type3.typeA .quiz1start").on("click", function () {
						$(this).hide()
						$("#type3.typeA #quiz1content").show()
						$("#type3.typeA .object").css("pointer-events","none")
						setTimeout(() => {
							$("#type3.typeA .blind").fadeOut(500)
							$("#type3.typeA .object").css("pointer-events","auto")
						}, 3000);
					})

					$("#type3.typeA .object1").on("click", function () {
						$("#type3.typeA .object").css("pointer-events","none")
						objectSelect = '1';
						quiz3A_bgmclick.play()
						$("#type3.typeA .object1").css("margin-top","500px")
						$("#type3.typeA .anwserchack").addClass("object1")
						$("#type3.typeA .anwserchack").fadeIn(300)
						setTimeout(() => {
							quiz3A_bgmright.play()
							$("#type3.typeA .anwser1").addClass("ok")
							quizchack()
							$("#type3.typeA .anwserchack").removeClass("object1")
							$("#type3.typeA .anwserchack").hide()
							$("#type3.typeA .object").css("pointer-events","auto")
						}, 1500);
					})
					$("#type3.typeA .object2").on("click", function () {
						$("#type3.typeA .object").css("pointer-events","none")
						objectSelect = '2';
						quiz3A_bgmclick.play()
						$("#type3.typeA .object2").css("margin-top","500px")
						$("#type3.typeA .anwserchack").addClass("object2")
						$("#type3.typeA .anwserchack").fadeIn(300)
						setTimeout(() => {
							quiz3A_bgmover.play()
							$("#type3.typeA .anwserchack").addClass("wrong")
							setTimeout(() => {
								$("#type3.typeA .object2").css("margin-top","0")		
								$("#type3.typeA .anwserchack").removeClass("object2")
								$("#type3.typeA .anwserchack").removeClass("wrong")
								$("#type3.typeA .anwserchack").hide()				
							}, 1000);
							quizchack()
							$("#type3.typeA .object").css("pointer-events","auto")
						}, 1500);

					})
					$("#type3.typeA .object3").on("click", function () {
						$("#type3.typeA .object").css("pointer-events","none")
						objectSelect = '3';
						quiz3A_bgmclick.play()
						$("#type3.typeA .object3").css("margin-top","500px")
						$("#type3.typeA .anwserchack").addClass("object3")
						$("#type3.typeA .anwserchack").fadeIn(300)
						setTimeout(() => {
							quiz3A_bgmright.play()
							$("#type3.typeA .anwser3").addClass("ok")
							quizchack()
							$("#type3.typeA .anwserchack").removeClass("object3")
							$("#type3.typeA .anwserchack").hide()
							$("#type3.typeA .object").css("pointer-events","auto")
						}, 1500);
					})
					$("#type3.typeA .object4").on("click", function () {
						$("#type3.typeA .object").css("pointer-events","none")
						objectSelect = '4';
						quiz3A_bgmclick.play()
						$("#type3.typeA .object4").css("margin-top","500px")
						$("#type3.typeA .anwserchack").addClass("object4")
						$("#type3.typeA .anwserchack").fadeIn(300)
						setTimeout(() => {
							quiz3A_bgmright.play()
							$("#type3.typeA .anwser4").addClass("ok")
							quizchack()
							$("#type3.typeA .anwserchack").removeClass("object4")
							$("#type3.typeA .anwserchack").hide()
							$("#type3.typeA .object").css("pointer-events","auto")
						}, 1500);
					})
					$("#type3.typeA .object5").on("click", function () {
						$("#type3.typeA .object").css("pointer-events","none")
						objectSelect = '4';
						quiz3A_bgmclick.play()
						$("#type3.typeA .object5").css("margin-top","500px")
						$("#type3.typeA .anwserchack").addClass("object5")
						$("#type3.typeA .anwserchack").fadeIn(300)
						setTimeout(() => {
							quiz3A_bgmover.play()
							$("#type3.typeA .anwserchack").addClass("wrong")
							setTimeout(() => {
								$("#type3.typeA .object5").css("margin-top","0")
								$("#type3.typeA .anwserchack").removeClass("object5")
								$("#type3.typeA .anwserchack").removeClass("wrong")
								$("#type3.typeA .anwserchack").hide()									
							}, 1000);
							quizchack()
							$("#type3.typeA .object").css("pointer-events","auto")
						}, 1500);
					})
					$("#type3.typeA .object6").on("click", function () {
						$("#type3.typeA .object").css("pointer-events","none")
						objectSelect = '4';
						quiz3A_bgmclick.play()
						$("#type3.typeA .object6").css("margin-top","500px")
						$("#type3.typeA .anwserchack").addClass("object6")
						$("#type3.typeA .anwserchack").fadeIn(300)
						setTimeout(() => {
							quiz3A_bgmright.play()
							$("#type3.typeA .anwser2").addClass("ok")
							quizchack()
							$("#type3.typeA .anwserchack").removeClass("object6")
							$("#type3.typeA .anwserchack").hide()
							$("#type3.typeA .object").css("pointer-events","auto")
						}, 1500);
					})

					function quizchack() {
						
						setTimeout(() => {
							// 오답
							if(objectSelect == "2" || objectSelect == "5"){
								console.log("오답입니다.")
							}
							// 정답
							else{
								anwsercount ++
								
								// 퀴즈 완료
								if(anwsercount == 4){
									quizclear()
								}
							}
						}, 2000);

					}
					function quizclear() {
						setTimeout(() => {
							quiz3A_bgmright.play()
							$("#type3.typeA .quizclear").fadeIn(300)
						}, 1200);
						setTimeout(() => {
							// $("#type3.typeA .quizclear").hide()
							$("#type3.typeA .resultbtn").on("click", function () {
								quiz3A_bgmclick.play()
								$("#type3.typeA").addClass("over")
								quizComplete1()
							})
							$("#type3.typeA .result").fadeIn(300)
						}, 3200);
						setTimeout(() => {
							$("#type3.typeA .resultbtn").fadeIn(300)
						}, 5200);
					}

				}
			}
			// B타입 퀴즈 스타트
			else if(pageArray[curPage][2] == 2 || quizAtoB3 == 1){

				// 복수 퀴즈 B타입 스타트
				var quizStr = "";

				quizStr += '	<div class="quizType typeB" id="type3" value="복수 정답">';
				quizStr += '		<div class="quiz">';

				quizStr += '			<div class="quiz1start"></div>';

				quizStr += '			<div id="quiz1content">';
				//  객체
				quizStr += '				<div class="object aws object1"></div>';
				quizStr += '				<div class="object object2"></div>';
				quizStr += '				<div class="object aws object3"></div>';
				quizStr += '				<div class="object object4"></div>';
				quizStr += '				<div class="object aws object5"></div>';
				quizStr += '				<div class="object object6"></div>';
				// 블라인드
				quizStr += '				<div class="blind"></div>';
				// 정답
				quizStr += '				<div class="anwser anwser1"></div>';
				quizStr += '				<div class="anwser anwser2"></div>';
				quizStr += '				<div class="anwser anwser3"></div>';
				//정답 표시
				quizStr += '				<div class="quizclear"></div>';
				quizStr += '				<div class="quizretry"></div>';
				quizStr += '				<div class="resultbtn"></div>';
				quizStr += '			</div>';
				quizStr += '		</div>';
				quizStr += '	</div>';

				$("#htmlShow").append(quizStr);

				quiz3BOn()

				function quiz3BOn() {
				
					var anwsercount = [0,0,0]; //정답을 저장할 배열 1,3,5가 정답
					var chance = 2; //찬스가 0이 되면 힌트를 보여줌
					var addnumber = 0; //값을 저장할 변수
					var howmanynumber = 0; //클릭횟수저장

					$("#type3.typeB .quiz1start").on("click", function () {
						$(this).hide()
						$("#type3.typeB #quiz1content").show()
						setTimeout(() => {
						}, 3000);
					})
				
					$("#type3.typeB .object1").on("click", function () {
						quiz3B_bgmclick.play()
						$("#type3.typeB .object1").css("margin-top","500px")
						addnumber = 1;
						anwsercountadd()
					})
					$("#type3.typeB .object2").on("click", function () {
						quiz3B_bgmclick.play()
						$("#type3.typeB .object2").css("margin-top","500px")
						addnumber = 2;
						anwsercountadd()
					})
					$("#type3.typeB .object3").on("click", function () {
						quiz3B_bgmclick.play()
						$("#type3.typeB .object3").css("margin-top","500px")
						addnumber = 3;
						anwsercountadd()
					})
					$("#type3.typeB .object4").on("click", function () {
						quiz3B_bgmclick.play()
						$("#type3.typeB .object4").css("margin-top","500px")
						addnumber = 4;
						anwsercountadd()
					})
					$("#type3.typeB .object5").on("click", function () {
						quiz3B_bgmclick.play()
						$("#type3.typeB .object5").css("margin-top","500px")
						addnumber = 5;
						anwsercountadd()
					})
					$("#type3.typeB .object6").on("click", function () {
						quiz3B_bgmclick.play()
						$("#type3.typeB .object6").css("margin-top","500px")
						addnumber = 6;
						anwsercountadd()
					})
					
					function anwsercountadd() {
						howmanynumber ++ ; //클릭횟수 증가
						if(!$(".anwser1").hasClass("on")){
							$(".anwser1").addClass("on")
							$(".anwser1").css("background","url('../02/img/quiz/03/02/answer_" + addnumber + ".png')")
							$(".anwser1").css("background-size","88px")
						}
						else if($(".anwser1").hasClass("on") && !$(".anwser2").hasClass("on")){
							$(".anwser2").addClass("on")
							$(".anwser2").css("background","url('../02/img/quiz/03/02/answer_" + addnumber + ".png')")
							$(".anwser2").css("background-size","88px")
						}
						else if($(".anwser1").hasClass("on") && $(".anwser2").hasClass("on")){
							$(".anwser3").addClass("on")
							$(".anwser3").css("background","url('../02/img/quiz/03/02/answer_" + addnumber + ".png')")
							$(".anwser3").css("background-size","88px")
						}

						if(anwsercount[0] == 0){
							anwsercount[0] = addnumber;
						}else if(anwsercount[0] > 0 && anwsercount[1] == 0){
							anwsercount[1] = addnumber;
						}else if(anwsercount[0] > 0 && anwsercount[1] > 0 && anwsercount[2] == 0){
							anwsercount[2] = addnumber;
							$("#type3.typeB .object").css("pointer-events","none") // 더이상 클릭하지 못하게
						}else{
							console.log("정답체크")
						}

						console.log(anwsercount)

						if(howmanynumber == 3){
							howmanynumber = 0;
							quizchack()
						}
					}
				
					function quizchack() {

						setTimeout(() => {
							
							// 정답 퀴즈 완료
							if(anwsercount[0] == 1 && anwsercount[1] == 3 && anwsercount[2] == 5){
								quizclear()
							}
							else{
								// 오답
								console.log("오답입니다.")

								quiz3B_bgmover.play()
								$("#type3.typeB .quizretry").fadeIn(300)
								setTimeout(() => {
								$("#type3.typeB .quizretry").fadeOut(300)
								}, 2000);
								anwsercount = [0,0,0]; //배열 초기화
								$("#type3.typeB .object").css("pointer-events","auto") // 클릭 초기화
								// 찬스 감소
								if(chance > 0){
									chance --;
								}
								if(chance == 0){
									chance = -1
									$("#type3.typeB .object1").css("background","url('../02/img/quiz/03/02/object1_hint.png')") //힌트 이미지로 변경
									$("#type3.typeB .object3").css("background","url('../02/img/quiz/03/02/object3_hint.png')") //힌트 이미지로 변경
									$("#type3.typeB .object5").css("background","url('../02/img/quiz/03/02/object5_hint.png')") //힌트 이미지로 변경
									$("#type3.typeB .object1").css("background-size","215px 112px") //정답 초기화
									$("#type3.typeB .object3").css("background-size","215px 112px") //정답 초기화
									$("#type3.typeB .object5").css("background-size","215px 112px") //정답 초기화
								}
								$("#type3.typeB .object1").css("margin-top","0") //위치 초기화
								$("#type3.typeB .object2").css("margin-top","0") //위치 초기화
								$("#type3.typeB .object3").css("margin-top","0") //위치 초기화
								$("#type3.typeB .object4").css("margin-top","0") //위치 초기화
								$("#type3.typeB .object5").css("margin-top","0") //위치 초기화
								$("#type3.typeB .object6").css("margin-top","0") //위치 초기화
								$(".anwser1").css("background","url('../02/img/quiz/03/02/answer_null.png')") //정답 초기화
								$(".anwser2").css("background","url('../02/img/quiz/03/02/answer_null.png')") //정답 초기화
								$(".anwser3").css("background","url('../02/img/quiz/03/02/answer_null.png')") //정답 초기화
								$(".anwser1").css("background-size","88px") //정답 초기화
								$(".anwser2").css("background-size","88px") //정답 초기화
								$(".anwser3").css("background-size","88px") //정답 초기화
								$(".anwser1").removeClass("on") //정답 초기화
								$(".anwser2").removeClass("on") //정답 초기화
								$(".anwser3").removeClass("on") //정답 초기화
							}
						}, 2000);
					
					}
					function quizclear() {
						quiz3B_bgmright.play()
						$("#type3.typeB .quizclear").fadeIn(300)
						setTimeout(() => {
							// $("#type3.typeB .quizclear").hide()
							$("#type3.typeB .resultbtn").on("click", function () {
								quiz3B_bgmclick.play()
								$("#type3.typeB").addClass("over")
								quizComplete1()
							})
							$("#type3.typeB .resultbtn").fadeIn(300)
						}, 2000);
					}
				
				}

			}
			// 타입 지정 오류
			else{
				console.log("pageArray 오류를 확인하세요.")
			}
	}
	else if(quizCategory == 4){ // 타입4 드래곤잡기 장애물 피하기 ////////////////////////////////////////////////////////////////////////
			// 단일타입
		if(pageArray[curPage][2] == 1){

			rungame()
			
			// 게임 준비
			function rungame(){
				// 드래곤 잡기 전용 코드
				// 장애물 초기 셋팅
				var firstpitcount = 5; //장애물 개수
				var firstpitdelay = 1800; //장애물 간격 1000 = 1s ※1000 이하 셋팅 금지
				var firstpitspeed = 1500; //장애물 속도 1000 = 1s ※400 이하 셋팅 금지
	
				// 게임 기본값 셋팅
				var runarea;
				var track_distance = 0;
				var position = 1; // 0: 왼쪽, 1: 중간, 2: 오른쪽
				var trackbraek = 0; //트랙, 캐릭터 멈춤 등등 게임 완료 코드
				var pitcount = firstpitcount; //장애물 개수 셋팅
				var playerlocation = 1; //플레이어 위치
				var pitlocation; // 장애물 위치
				var gameclear = 0; // 1 : 게임성공
				var gameover = 0; // 1 : 게임오버
				var pitdelay = firstpitdelay; //장애물 간격 셋팅
				var pitspeed = firstpitspeed; //장애물 속도 셋팅
				var pitroop = 1; //장애물 클래스명 지정 반복루프
				var mop = 0; //장애물 클래스명 지정 반복루프
				var initialValue = 0;
				var remaining = 0; //남은 장애물 개수 저장
				var killcount = 0; //해치운횟수
				let trackcount; //트랙 반복 코드
				let pitTimeouts = [];  // 장애물 생성 타이머를 저장할 배열
				let treeInterval;  // addTree에 대한 setInterval ID를 저장
				let lastExecutedTime = 0; // 마지막으로 실행된 시간을 저장하는 변수
				let keydownRegistered = false;
				let trackIntervals = [];  // 트랙 움직임을 제어하는 타이머 ID 저장 배열

				setRun()
				$(".runstart").on("click", function () {
					$(".slide").css("pointer-events","none")
					$(".runintro").hide()
					$(this).hide()
					$("#runcontent").show()
					// 3초
					setTimeout(() => {$(".numbercount").html("3")}, 0);
					// 2초
					setTimeout(() => {$(".numbercount").html("2")}, 1000);
					// 1초
					setTimeout(() => {$(".numbercount").html("1")}, 2000);
					// 스타트
					setTimeout(() => {
						$(".countbox").hide();
						Runfunction()
						$(".arrow").show()
						bgm.play();
					}, 3000);
				})
	
				// 게임 구성 요소 추가
				function setRun(){
					var runStr = "";
							// 스타트 버튼
							runStr += ' <div class="runintro"></div>';
							runStr += '	<img class="runstart" src = "../02/img/run/run_start.png">';
				
							// 게임 영역
							runStr += '	<div id="runcontent">';
				
							runStr += '		<div class="restart"></div>';
							runStr += '		<div class="countbox">';
							runStr += '			<h3 class="numbercount"></h3>';
							runStr += '		</div>';
							runStr += '		<div class="retryBG"></div>';
				
							runStr += '		<div class="wall"></div>';
							runStr += '		<div class="runtitle"><span></span></div>';
							runStr += '  	<div class="gameover twinkling"></div>';
							runStr += '		<div class="runarea">';
				
							runStr += '			<div class="track"></div>';
							runStr += '		</div>';
							runStr += '  		<img id="player" src = "../02/img/run/human.png">';
							runStr += '  		<div class="crash"></div>';
				
							runStr += '  		<div class="arrow"><div><div class="arrowL"></div><div class="arrowR"></div></div></div>';
				
							runStr += '	</div>';
				
				
							runStr += '	</div>';
					$("#htmlShow").append(runStr);
					runarea = $(".runarea")
				}

				// 마무리 버튼에 손가락 없애기
				$(".gameover").mouseover(function(){
					$(".gameover").removeClass("twinkling")
				})
	
				// 트랙 움직임
				function checkForFail() {
					track_distance = track_distance + 7;
					// console.log(trackcount)
					$(".track").css("background-position-y","0"+track_distance+"px");
				
					if(gameclear == 1 && $(".pit").length == 0){
						// 게임 성공
						if(gameover == 0){
							console.log("게임 종료")
						
							// 게임을 완료했기때문에 방향키 숨김
							setTimeout(() => {
								$(".arrow").hide()
							}, 0);
						
							// 캐릭터를 중앙으로 이동
							setTimeout(() => {
								position = 1;
								updatePlayerPosition();
							}, 1000);
						
							// 트랙 멈춤, 게임 완료
							setTimeout(() => {
								trackbraek = 1;
								$("#player").attr("src","../02/img/run/human.png");
							}, 1200);
						
							// 게임 완료 박스 켜기
							if(killcount > 2){
								setTimeout(() => {
									$(".slide").css("pointer-events","auto")
									bgm.pause();
									bgm.currentTime = 0; // BGM 처음으로 되감기
									$(".gameover").fadeIn(300)
									// $(".countbox").fadeIn(300);
									// $(".numbercount").css("font-size","110px")
									// $(".numbercount").html("Complete!")
									bgmclear.play()
								}, 2500);
							}
							// 게임 실패 재도전
							else{
								setTimeout(() => {
									bgm.pause();
									bgm.currentTime = 0; // BGM 처음으로 되감기
									$('.retryBG').fadeIn(300)
									$(".restart").on("click",  function() {
										run_replay()
									})
									$(".restart").fadeIn(300)
									bgmover.play()
								}, 2500);
							}
							gameclear ++;
						}
					}
					
						var pitnum1 = $(".pitnum1").css("top");
						var pitnum2 = $(".pitnum2").css("top");
						var pitnum3 = $(".pitnum3").css("top");
						var pitnum4 = $(".pitnum4").css("top");
						var number1 = parseInt(pitnum1, 10)
						var number2 = parseInt(pitnum2, 10)
						var number3 = parseInt(pitnum3, 10)
						var number4 = parseInt(pitnum4, 10)
					
						if((10.8 * 43) > number1 && number1 > (10.8 * 32)){
							var num1 = $(".pitnum1").attr("class")
							pitlocation = num1.slice(-1)
							if(playerlocation == pitlocation){
								$(".pitnum1").remove()
								gameoverevent()}
						}
						if((10.8 * 43) > number2 && number2 > (10.8 * 32)){
							var num2 = $(".pitnum2").attr("class")
							pitlocation = num2.slice(-1)
							if(playerlocation == pitlocation){
								$(".pitnum2").remove()
								gameoverevent()}
						}
						if((10.8 * 43) > number3 && number3 > (10.8 * 32)){
							var num3 = $(".pitnum3").attr("class")
							pitlocation = num3.slice(-1)
							if(playerlocation == pitlocation){
								$(".pitnum3").remove()
								gameoverevent()}
						}
						if((10.8 * 43) > number4 && number4 > (10.8 * 32)){
							var num4 = $(".pitnum4").attr("class")
							pitlocation = num4.slice(-1)
							if(playerlocation == pitlocation){
								$(".pitnum4").remove()
								gameoverevent()}
						}
					}
	
					function infoupdate() {
						if(killcount < 4){
							$(".runtitle > span").html("")
							$(".runtitle > span").html("몬스터를 잡아라! : " + killcount + "/" + "3마리");
						}
						else{

						}
					}
	
					// 좌우 이동 좌표
					function updatePlayerPosition() {
						var positions = ['calc(32% - 58px)', 'calc(50% - 58px)', 'calc(68% - 58px)'];
						$('#player').css("left",positions[position]);
					}
	
				//장애물 추가
				function addPit() {
					if(!trackbraek){
						var pitPosition = Math.floor(Math.random() * 3); // 0: 왼쪽, 1: 가운데, 2: 오른쪽
						var positions = ['calc(43% - 50px)', 'calc(47% - 50px)', 'calc(51% - 50px)'];
					
						if(pitroop == 5){
							pitroop = 1;
						}
						if(mop == 5){
							mop = 0;
						}
	
						var p = $('<div>', {
								class: 'pit pitnum' + pitroop + ' mop' + mop + ' location' + pitPosition, // 클래스 추가
								css: { left: positions[pitPosition] } // 스타일 설정
						});
					
						pitroop ++;
						mop ++;
	
						// 장애물을 .track 요소에 추가
						$('#runcontent').append(p);
						// 장애물이 떨어지는 속도
						$(".location0").animate({ top : "100%", left : "16%"},pitspeed*3, "linear")
						$(".location1").animate({ top : "100%", left : "42.5%"},pitspeed*3, "linear")
						$(".location2").animate({ top : "100%", left : "68.5%"},pitspeed*3, "linear")
						// 남은 장애물 체크
						if(gameover == 0){
							setTimeout(() => {
								remaining ++ //남은 장애물 카운트
								infoupdate()
							}, pitspeed*2);
						}
						// 화면에서 사라진 장애물 삭제 떨어지는속도3 딜레이1
						setTimeout(() => {
							p.remove()
						}, pitspeed*4);
					}
				}
	
				// 장애물에 부딪힐 시
				function gameoverevent() {
					const now = Date.now(); // 현재 시간을 밀리초 단위로 가져옴
				
					if (now - lastExecutedTime < 800) return; // 마지막 실행 이후 1초가 지나지 않았으면 종료
				
					lastExecutedTime = now; // 마지막 실행 시간을 현재 시간으로 갱신
					var positions = ['calc(32%)', 'calc(50%)', 'calc(68%)'];
					$(".crash").css("left",positions[playerlocation])
					$(".crash").css("background","url(../01/img/run/boom.gif)")
					$(".crash").css("background-size","192px")
					$(".crash").show()
					setTimeout(() => {
						$(".crash").hide()
						$(".crash").css("background","none")
					}, 500);
					bgmcrash.play()
					setTimeout(() => {
						bgmcrash.pause()
						bgmcrash.currentTime = 0;
					}, 1400);

					killcount ++ ;
					console.log("몬스터 처치!!")

					// $("#player").css("animation","none")
					// setTimeout(() => {
					// 	$("#player").css("animation","crasheffect 1s linear forwards")
					// }, 50);
				}
	
	
	
				// 장애물 추가 함수 시간 간격두고 발생시키기
				function pitaction(){
					pitTimeouts.forEach(timeoutID => clearTimeout(timeoutID)); // 이전 타이머 제거
					pitTimeouts = [];  // 배열 초기화
					for (let i = 0; i < pitcount; i++) {
						let timeoutID = setTimeout(() => {
								if(trackbraek == 0){
									addPit()
									pitcount --;
									console.log("남은 장애물 개수 : " + pitcount)
								
									if(pitcount == 0){
										gameclear = 1;
									}
								
								}
							}, (i + 1)*pitdelay);
						
							pitTimeouts.push(timeoutID);  // 배열에 타이머 저장
						
							if (trackbraek == 1) {
								break; // for 루프 강제 종료
							}
					}
				}
	
				function Runfunction() {
					$(".runtitle").show()
					// 하단 텍스트 추가
					$(".runtitle").show()
					infoupdate()
					// 플레이어 gif 이미지로 변경
					$("#player").attr("src","../02/img/run/human-move.gif");
				
					// 장애물 스타트
					pitaction();

    			// 이전에 설정된 트랙 타이머 모두 제거
    			trackIntervals.forEach(timeoutID => clearTimeout(timeoutID));
    			trackIntervals = [];  // 배열 초기화

    			// 트랙 움직임 함수 반복 조건
    			for (let trackcount = 0; trackcount < 8000; trackcount++) {
    			    let timeoutID = setTimeout(() => {
    			        if (!trackbraek) {
    			            checkForFail();
    			        }
    			    }, (trackcount + 1) * 20);
						
    			    trackIntervals.push(timeoutID);  // 타이머 ID 저장
    			}
				
					// 기존 treeInterval이 있다면 제거
					if (treeInterval) {
						clearInterval(treeInterval);
					}
				
					// 0.5초마다 addTree() 호출 (새로운 setInterval 설정)
					// treeInterval = setInterval(() => {
					//   if (!trackbraek) {
					//     addTree();
					//   }
					// }, 500);
	
					if (!keydownRegistered) {
						if (!initialValue) {
							let isMoving = false;
	
							document.addEventListener('keydown', function (event) {
									if (!isMoving) {
											isMoving = true; // 움직임 시작
							
											if (event.key === 'ArrowLeft' && position > 0) {
													position--;
											} else if (event.key === 'ArrowRight' && position < 2) {
													position++;
											}
							
											playerlocation = position;
											updatePlayerPosition();
							
											// 짧은 지연 시간 후에 다시 움직임 허용
											setTimeout(() => {
													isMoving = false;
											}, 100); // 100ms 지연
									}
							});
						}
						keydownRegistered = true;  // keydown 이벤트가 등록되었음을 표시
					}
				
					// 좌우 움직임 기능 터치
					document.querySelector('.arrowL').addEventListener('click', function () {
						if (position > 0) {
							position--;
						}
						playerlocation = position;
						updatePlayerPosition();
					});
	
					document.querySelector('.arrowR').addEventListener('click', function () {
						if (position < 2) {
							position++;
						}
						playerlocation = position;
						updatePlayerPosition();
					});
				
				$(".gameover").on("click", function () {
					bgmclick.play()
					Player.currentTime = Player.duration //영상 강제 종료
					toolTipFlag = true;
					setTimeout(() => {
						handleNextClick() //퀴즈 종료하고 다음페이지로
					}, 200);
				})
				
				}
	
				const trees = ['url("https://contentservice.mc.reyrey.net/image_v1.0.0/?id=18961330-215b-5d16-b299-0fe8ce2d357e&637841750620440664")','url("https://contentservice.mc.reyrey.net/image_v1.0.0/?id=c88557a6-de87-506a-960b-86f5720a38a0&637841750769195913")','url("https://contentservice.mc.reyrey.net/image_v1.0.0/?id=b1a25712-d6ea-5a6e-8f77-9a0e3373fd47&637841795344914686")','url("https://contentservice.mc.reyrey.net/image_v1.0.0/?id=30776d25-8b46-5e5b-a26b-a74f8ee526fa&637841795591014601")']
	
				function addTree() {
					var p = document.createElement('div')
					p.className = 'tree'
					p.style.backgroundImage = trees[Math.floor(Math.random()*trees.length)];
					p.onanimationend = function(){ this.remove() }
				
					var c_loc = runarea[0].getBoundingClientRect(); 
					var side = Math.random();
				
					if (side < 0.25) {
							// left1
							p.style.left = 'calc(50% - 300px)';
							p.style.animation = 'tree1 4s ease-in forwards';
					} else if (side < 0.5) {
							// left2
							p.style.left = 'calc(50% - 160px)';
							p.style.animation = 'tree2 4s ease-in forwards';
					} else if (side < 0.75) {
							// right1
							p.style.left = 'calc(50% + 160px)';
							p.style.animation = 'tree3 4s ease-in forwards';
					} else {
							// right2
							p.style.left = 'calc(50% + 300px)';
							p.style.animation = 'tree4 4s ease-in forwards';
					}
					p.style.zIndex = '100'
					runarea.prepend(p)  
				
				
				}
	
				// 게임 재시작
				function run_replay() {
					console.log("게임을 재시작 합니다.")
				
					// 변수값 초기셋팅으로 초기화
					track_distance = 0;
					position = 1; // 0: 왼쪽, 1: 중간, 2: 오른쪽
					pitcount = firstpitcount; //장애물 개수 셋팅
					playerlocation = 1; //플레이어 위치
					pitlocation; // 장애물 위치
					gameclear = 0; // 1 : 게임성공
					gameover = 0; // 1 : 게임오버
					pitdelay = firstpitdelay; //장애물 간격 셋팅
					pitspeed = firstpitspeed; //장애물 속도 셋팅
					pitroop = 1; //장애물 클래스명 지정 반복루프
					mop = 0; //장애물 클래스명 지정 반복루프
					initialValue = 0;
					remaining = 0; //남은 장애물 개수 저장
					trackcount; //트랙 반복 코드
					pitTimeouts = [];  // 장애물 생성 타이머를 저장할 배열
					treeInterval;  // addTree에 대한 setInterval ID를 저장
					lastExecutedTime = 0; // 마지막으로 실행된 시간을 저장하는 변수
					killcount = 0; //해치운횟수 초기화
				
					pitTimeouts.forEach(timeoutID => clearTimeout(timeoutID)); // 타이머 초기화
					pitTimeouts = [];  // 배열 초기화
				
					//구성요소 초기화
					$("#runcontent").html("")
				
					//구성요소 재추가
					var runStr = "";

					runStr += '		<div class="restart"></div>';
					runStr += '		<div class="countbox">';
					runStr += '			<h3 class="numbercount"></h3>';
					runStr += '		</div>';
					runStr += '		<div class="retryBG"></div>';
		
					runStr += '		<div class="wall"></div>';
					runStr += '		<div class="runtitle"><span></span></div>';
					runStr += '  	<div class="gameover twinkling"></div>';

					runStr += '		<div class="runarea">';
					runStr += '			<div class="track"></div>';
					runStr += '		</div>';
					
					runStr += '  		<img id="player" src = "../02/img/run/human.png">';
					runStr += '  		<div class="crash"></div>';
		
					runStr += '  		<div class="arrow"><div><div class="arrowL"></div><div class="arrowR"></div></div></div>';

					$("#runcontent").append(runStr);
					runarea = $(".runarea")
					trackbraek = 1;
					// 3초
					setTimeout(() => {$(".numbercount").html("3")}, 0);
					// 2초
					setTimeout(() => {$(".numbercount").html("2")}, 1000);
					// 1초
					setTimeout(() => {$(".numbercount").html("1")}, 2000);
					// 스타트
					setTimeout(() => {
						$(".countbox").hide();
						trackbraek = 0;
						Runfunction()
						$(".arrow").show()
						bgm.play();
					}, 3000);
				}
			
			}
		}
		else{
			console.log("pageArray 오류를 확인하세요.")
		}
	}
	else if(quizCategory == 5){ // 타입5 클릭형 선긋기 ///////////////////////////////////////////////////////////////////////

			// A타입 B타입 구분

			// 임시
			// quizAtoB5 = 1; //type1 A타입이 나왔으므로 B로 전환
			// 임시

			// A타입 퀴즈 스타트
			if(pageArray[curPage][2] == 1 && quizAtoB5 == 0){
				quizAtoB5 = 1; //type5 A타입이 나왔으므로 B로 전환
				// 선긋기 A타입 스타트
				var quizStr = "";
				
				quizStr += '	<div class="quizType typeA" id="type5" value="선긋기">';
				quizStr += '		<div class="quiz">';
				quizStr += '			<div class="containerbase">';
				quizStr += '				<div class="container">';

				quizStr += '					<div class="left">';

				quizStr += '						<div class="box boxL" id="left1"><div class="circle circleL1 circleL"></div></div>';
				quizStr += '						<div class="box boxL" id="left2"><div class="circle circleL2 circleL"></div></div>';
				quizStr += '						<div class="box boxL" id="left3"><div class="circle circleL3 circleL"></div></div>';

				quizStr += '					</div>';

				quizStr += '					<canvas id="canvas""></canvas>';

				quizStr += '					<div class="right">';

				quizStr += '						<div class="box boxR" id="right1"><div class="circle circleR1 circleR"></div></div>';
				quizStr += '						<div class="box boxR" id="right2"><div class="circle circleR2 circleR"></div></div>';
				quizStr += '						<div class="box boxR" id="right3"><div class="circle circleR3 circleR"></div></div>';

				quizStr += '					</div>';

				quizStr += '				</div>';
				quizStr += '			</div>';
				quizStr += '			<div id="check-button"></div>';			
				quizStr += '			<div class="quiz1clear"></div>';
				quizStr += '			<div class="quiz1retry"></div>';
				quizStr += '			<div class="quiz1wrong"></div>';
				quizStr += '			<div class="resultbtn"></div>';	

				quizStr += '		</div>';
				quizStr += '	</div>';

				$("#htmlShow").append(quizStr);

				quiz5AOn()

				function quiz5AOn() {
				
						var chance = 1; //9가 되면 리설트 버튼 on
				
						$("#type5.typeA .resultbtn").on("click", function () {
								quiz5A_bgmclick.play()
								$("#type5.typeA").addClass("over")
								quizComplete1()
						})
				
						const canvas = $('#type5.typeA #canvas')[0];  // canvas는 jQuery로 선택하되, getContext를 위해 DOM 요소를 가져옴
						const ctx = canvas.getContext('2d');
						canvas.width = 1027;  // 초기 canvas 크기 설정
						canvas.height = 301;
				
						let selectedBox = null;
						let connections = {}; 
						let leftConnections = {}; 
						let rightConnections = {}; 
				
						const correctAnswers = {
								left2: 'right1',
								left1: 'right2',
								left3: 'right3'
						};
				
						function getScale() {
								const fsContainer = document.querySelector('#fs-container');
								const rect = fsContainer.getBoundingClientRect();
								const scaleX = rect.width / fsContainer.offsetWidth;
								const scaleY = rect.height / fsContainer.offsetHeight;
								return { scaleX, scaleY };
						}
				
						// 왼쪽 박스 클릭
						$('#type5.typeA .left .box').on('click', function() {
								quiz5A_bgmclick.play()
								handleBoxClick(this, 'left');
						});
				
						// 오른쪽 박스 클릭
						$('#type5.typeA .right .box').on('click', function() {
								quiz5A_bgmclick.play()
								handleBoxClick(this, 'right');
						});
				
						// // circle 클릭 시 부모 박스 클릭과 동일하게 처리
						// $('#type5.typeA .circle').on('click', function() {
						// 		quiz5A_bgmclick.play()
						// 		const parentBox = $(this).closest('.box')[0];
						// 		const side = $(parentBox).closest('.left').length ? 'left' : 'right';
						// 		handleBoxClick(parentBox, side);
						// });
				
						// 박스를 클릭했을 때 연결 처리 (양방향 허용)
						function handleBoxClick(box, side) {
								// 첫 번째 박스를 선택하는 경우
								if (!selectedBox) {
										selectedBox = { box: box, side: side }; // 선택된 박스와 해당 박스의 위치 저장
										console.log(`박스 선택됨: ${box.id}, 측면: ${side}`);
										$(box).find(".circle").addClass("red")
								}
								// 이미 선택된 박스가 있을 경우 연결을 시도
								else if (selectedBox && selectedBox.side !== side) {
										const isLeftBox = selectedBox.side === 'left' ? selectedBox.box : box;
										const isRightBox = selectedBox.side === 'right' ? selectedBox.box : box;
										connectBoxes(isLeftBox, isRightBox);
										selectedBox = null; // 연결 후 선택 초기화
								}
						}
				
						// 박스를 연결하는 함수 (양방향 연결 처리)
						function connectBoxes(leftBox, rightBox) {
								const leftCircle = $(leftBox).find('.circle')[0].getBoundingClientRect();
								const rightCircle = $(rightBox).find('.circle')[0].getBoundingClientRect();
								const canvasRect = canvas.getBoundingClientRect();
				
								// 스케일 값 계산
								const { scaleX, scaleY } = getScale();
				
								// 스케일을 고려하여 좌표를 조정
								const x1 = (leftCircle.left + leftCircle.width / 2 - canvasRect.left) / scaleX;
								const y1 = (leftCircle.top + leftCircle.height / 2 - canvasRect.top) / scaleY;
								const x2 = (rightCircle.left + rightCircle.width / 2 - canvasRect.left) / scaleX;
								const y2 = (rightCircle.top + rightCircle.height / 2 - canvasRect.top) / scaleY;
				
								// 기존 연결 제거
								if (rightConnections[rightBox.id]) {
										const previousLeftId = rightConnections[rightBox.id];
										delete connections[previousLeftId];
										delete leftConnections[previousLeftId];
										delete rightConnections[rightBox.id];
										drawAllLines();  // 기존 선을 지우고 모든 선 다시 그리기
								}
				
								if (leftConnections[leftBox.id]) {
										const previousRightId = leftConnections[leftBox.id];
										delete connections[leftBox.id];
										delete rightConnections[previousRightId];
										delete leftConnections[leftBox.id];
										drawAllLines();  // 기존 선을 지우고 모든 선 다시 그리기
								}
				
								// 새로운 연결 그리기
								console.log(`새로운 연결: 왼쪽(${leftBox.id}) -> 오른쪽(${rightBox.id})`);
								$(".circle").removeClass("red")
								connections[leftBox.id] = { left: leftBox.id, right: rightBox.id, x1, y1, x2, y2 };
								leftConnections[leftBox.id] = rightBox.id;
								rightConnections[rightBox.id] = leftBox.id;
				
								// 연결된 선 다시 그리기
								drawAllLines();
				
								// 연결된 선의 개수를 체크하여 3개가 모두 연결되었는지 확인
								checkConnections();
						}
				
						// 모든 선을 다시 그리는 함수
						function drawAllLines() {
								ctx.clearRect(0, 0, canvas.width, canvas.height);  // 기존 선 삭제
								$.each(connections, function(key, conn) {
										ctx.beginPath();
										ctx.moveTo(conn.x1, conn.y1);
										ctx.lineTo(conn.x2, conn.y2);
										ctx.strokeStyle = '#c52c2c';
										ctx.lineWidth = 4;
										ctx.stroke();
								});
						}
				
						// 선이 3개 모두 연결되었는지 체크하는 함수
						function checkConnections() {
								const connectedCount = Object.keys(connections).length;
								if (connectedCount === 3) {
										answerCheck()
								}
						}
				
						function answerCheck() {
								let isCorrect = true;
				
								$.each(correctAnswers, function(leftBox, rightBox) {
										if (leftConnections[leftBox] !== rightBox) {
												isCorrect = false;
												return false; // break loop
										}
								});
				
								if (isCorrect) {
										quiz5A_bgmright.play()
										$("#type5.typeA .object").css("pointer-events", "none")
										$("#type5.typeA .quiz1clear").fadeIn(300)
										setTimeout(() => {
												$("#type5.typeA .quiz1clear").fadeOut(300)
										}, 2000);
										console.log("정답입니다!");
										$('#type5.typeA #check-button').hide();
										$(".box").css("pointer-events", "none")
										setTimeout(() => {
												$('.resultbtn').fadeIn(500)
										}, 2100);
								}
								else if (chance == 1) {
										chance = 0;
										quiz5A_bgmover.play()
										$("#type5.typeA .object").css("pointer-events", "none")
										$("#type5.typeA .quiz1retry").fadeIn(300)
										setTimeout(() => {
												$("#type5.typeA .quiz1retry").fadeOut(300)
										}, 2000);
										clearConnections();
										$('#type5.typeA #check-button').hide();
				
								}
								else if (chance == 0) {
										quiz5A_bgmover.play()
										$("#type5.typeA .object").css("pointer-events", "none")
										$("#type5.typeA .quiz1wrong").fadeIn(300)
										setTimeout(() => {
												$("#type5.typeA .quiz1wrong").fadeOut(300)
										}, 2000);
										console.log("오답입니다!");
										showCorrectAnswers();  // 오답일 경우 정답 표시
										$('#type5.typeA #check-button').hide();
										setTimeout(() => {
												$('.resultbtn').fadeIn(500)
										}, 2100);
								}
						}
				
						function showCorrectAnswers() {
								$(".box").css("pointer-events", "none")
								// 기존 연결 초기화
								connections = {};
								leftConnections = {};
								rightConnections = {};
								ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
						
								// 정답을 자동으로 이어줌
								$.each(correctAnswers, function(leftBox, rightBox) {
										const leftElement = $('#' + leftBox);
										const rightElement = $('#' + rightBox);
						
										const leftCircle = leftElement.find('.circle')[0].getBoundingClientRect();
										const rightCircle = rightElement.find('.circle')[0].getBoundingClientRect();
										const canvasRect = canvas.getBoundingClientRect();
						
										// 스케일을 고려하여 좌표를 조정 (이미 getScale() 함수 존재)
										const { scaleX, scaleY } = getScale();
						
										const x1 = (leftCircle.left + leftCircle.width / 2 - canvasRect.left) / scaleX;
										const y1 = (leftCircle.top + leftCircle.height / 2 - canvasRect.top) / scaleY;
										const x2 = (rightCircle.left + rightCircle.width / 2 - canvasRect.left) / scaleX;
										const y2 = (rightCircle.top + rightCircle.height / 2 - canvasRect.top) / scaleY;
						
										// 정답 연결 그리기
										ctx.beginPath();
										ctx.moveTo(x1, y1);
										ctx.lineTo(x2, y2);
										ctx.strokeStyle = 'blue';
										ctx.lineWidth = 4;
										ctx.stroke();
						
										// connections에 정답 연결 저장
										connections[leftBox] = { left: leftBox, right: rightBox, x1, y1, x2, y2 };
										leftConnections[leftBox] = rightBox;
										rightConnections[rightBox] = leftBox;
								});
				
								// 정답을 표시한 후, 모든 선을 다시 그리기
								drawAllLines();
						}
				
						function clearConnections() {
								connections = {};
								leftConnections = {};
								rightConnections = {};
								ctx.clearRect(0, 0, canvas.width, canvas.height);
						}
				
						// 반응형 좌표 재계산 함수 추가
						function recalculateAndDrawLines() {
								const { scaleX, scaleY } = getScale();
				
								$.each(connections, function (key, conn) {
										const leftCircle = $('#' + conn.left).find('.circle')[0].getBoundingClientRect();
										const rightCircle = $('#' + conn.right).find('.circle')[0].getBoundingClientRect();
										const canvasRect = canvas.getBoundingClientRect();
				
										const x1 = (leftCircle.left + leftCircle.width / 2 - canvasRect.left) / scaleX;
										const y1 = (leftCircle.top + leftCircle.height / 2 - canvasRect.top) / scaleY;
										const x2 = (rightCircle.left + rightCircle.width / 2 - canvasRect.left) / scaleX;
										const y2 = (rightCircle.top + rightCircle.height / 2 - canvasRect.top) / scaleY;
				
										conn.x1 = x1;
										conn.y1 = y1;
										conn.x2 = x2;
										conn.y2 = y2;
								});
				
								drawAllLines(); // 모든 선을 다시 그리기
						}
				
						$(window).on('resize', function() {
								// 창 크기 변경 시, 캔버스 크기를 고정하여 재설정하지 않음
								recalculateAndDrawLines();  // 창 크기 변경 시 기존 선 다시 그리기
						});
				}
				
			}
			// B타입 퀴즈 스타트
			else if(pageArray[curPage][2] == 2 || quizAtoB5 == 1){
				console.log("B타입 없음")
			}
			// 타입 지정 오류
			else{
				console.log("pageArray 오류를 확인하세요.")
			}

	}
	else if(quizCategory == 6){ // 타입6 카드 띄우기 /////////////////////////////////////////////////////////////////////////

			// A타입 B타입 구분

			// 임시
			// quizAtoB6 = 1; //type1 A타입이 나왔으므로 B로 전환
			// 임시

			// A타입 퀴즈 스타트
			if(pageArray[curPage][2] == 1 && quizAtoB6 == 0){
				quizAtoB6 = 1; //type6 A타입이 나왔으므로 B로 전환
				// 카드 띄우기 A타입 스타트
				var quizStr = "";
				
				quizStr += '	<div class="quizType typeA" id="type6" value="카드 띄우기">';
				quizStr += '		<div class="quiz">';

				quizStr += '			<div id="quiz1content">';

				quizStr += '				<div class="object object1">';
				quizStr += '					<div><div class="paper object1_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="object object2">';
				quizStr += '					<div><div class="paper object2_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="object object3">';
				quizStr += '					<div><div class="paper object3_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="object object4">';
				quizStr += '					<div><div class="paper object4_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="object object5">';
				quizStr += '					<div><div class="paper object5_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="object object6">';
				quizStr += '					<div><div class="paper object6_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="object object7">';
				quizStr += '					<div><div class="paper object7_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="object object8">';
				quizStr += '					<div><div class="paper object8_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="object object9">';
				quizStr += '					<div><div class="paper object9_paper"></div></div>';
				quizStr += '				</div>';

				quizStr += '				<div class="resultbtn"></div>';
				quizStr += '			</div>';
				quizStr += '		</div>';
				quizStr += '	</div>';

				$("#htmlShow").append(quizStr);

				quiz6AOn()
				
				function quiz6AOn() {

				var clicknum = 0; //9가 되면 리설트 버튼 on

				$("#type6.typeA .object").on("click", function () {
					clicknum ++ ;
					quiz6A_bgmclick.play()
					$(this).css("pointer-events","none")
					$(this).find('.paper').show()
					if(clicknum == 9){
						$("#type6.typeA .resultbtn").fadeIn(500)
						clicknum = 0;
					}
				})
			
				$("#type6.typeA .resultbtn").on("click", function () {
					quiz6A_bgmclick.play()
					$("#type6.typeA").addClass("over")
					quizComplete1()
				})
				
						

				
				}
			}
			// B타입 퀴즈 스타트
			else if(pageArray[curPage][2] == 2 || quizAtoB6 == 1){
				console.log("B타입 없음")
			}
			// 타입 지정 오류
			else{
				console.log("pageArray 오류를 확인하세요.")
			}

	}
	else if(quizCategory == 7){ // 타입7 슬라이드 넘기기 /////////////////////////////////////////////////////////////////////

			// A타입 B타입 구분

			// 임시
			// quizAtoB7 = 1; //type1 A타입이 나왔으므로 B로 전환
			// 임시

			// A타입 퀴즈 스타트
			if(pageArray[curPage][2] == 1 && quizAtoB7 == 0){
				quizAtoB7 = 1; //type7 A타입이 나왔으므로 B로 전환
				// 단일 퀴즈 A타입 스타트
				var quizStr = "";
				
				quizStr += '	<div class="quizType typeA" id="type7" value="슬라이드 넘기기">';
				quizStr += '		<div class="quiz">';

				quizStr += '			<div id="quiz1content">';
				quizStr += '				<div class="object"></div>';
				quizStr += '				<div class="leftbtn"></div>';
				quizStr += '				<div class="rightbtn"></div>';
				quizStr += '				<div class="click"></div>';
				quizStr += '				<div class="pagenum"></div>';
				quizStr += '				<div class="resultbtn"></div>';
				quizStr += '			</div>';
				quizStr += '		</div>';
				quizStr += '	</div>';

				$("#htmlShow").append(quizStr);

				quiz7AOn()
				
				function quiz7AOn() {


				var pageNum = 1; // 페이지 정보 저장
				var pagedata = pageNum+"/8"; // 페이지 업데이트

				pagenumupdate()
				function pagenumupdate() {
					pagedata = pageNum+"/8"; // 페이지 업데이트
					$("#type7.typeA .pagenum").html(pagedata)
				}

				organize.volume = volume;
				organize.loop = true;
				organize.play()

				//진도체크때문에 버튼 4초 이따가 뜨게
				setTimeout(() => {
					$("#type7.typeA .rightbtn").fadeIn(500)
					$("#type7.typeA .click").fadeIn(500)
				}, 3500);
				//진도체크때문에 버튼 4초 이따가 뜨게
				
				$("#type7.typeA .rightbtn").on("click", function () {
					quiz7A_bgmclick.play()
					$("#type7.typeA .click").hide()
					if(pageNum < 8){
						pageNum++;
						pagenumupdate()
						if(pageNum == 2){
							$("#type7.typeA .leftbtn").show()
						}
						if(pageNum == 5){
							$("#type7.typeA .resultbtn").fadeIn(500)
						}
						if(pageNum == 8){
							$("#type7.typeA .rightbtn").hide()
						}else{
							$("#type7.typeA .rightbtn").show()
						}
						$("#type7.typeA .object").css("background","url(../02/img/quiz/07/01/junbeop" + pageNum + ".png)")
						$("#type7.typeA .object").css("background-size","999px 484px")
					}
				})

				$("#type7.typeA .leftbtn").on("click", function () {
					quiz7A_bgmclick.play()
					$("#type7.typeA .click").hide()
					if(pageNum > 0){
						pageNum--;
						pagenumupdate()
						if(pageNum == 1){
							$("#type7.typeA .leftbtn").hide()
						}
						if(pageNum == 7){
							$("#type7.typeA .rightbtn").show()
						}
						$("#type7.typeA .object").css("background","url(../02/img/quiz/07/01/junbeop" + pageNum + ".png)")
						$("#type7.typeA .object").css("background-size","999px 484px")
					}
				})

				$("#type7.typeA .resultbtn").on("click", function () {
					organize.loop = false;
					organize.pause()
					quiz7A_bgmclick.play()
					$("#type7.typeA").addClass("over")
					quizComplete2()
				})
				
						

				
				}
			}
			// B타입 퀴즈 스타트
			else if(pageArray[curPage][2] == 2 || quizAtoB7 == 1){
				console.log("B타입 없음")
			}
			// 타입 지정 오류
			else{
				console.log("pageArray 오류를 확인하세요.")
			}

	}
	else if(quizCategory == 8){ // 타입8 상자에 받기 /////////////////////////////////////////////////////////////////////////
			var quizStr = "";
			
			quizStr += '	<div class="quizType" id="type8" value="상자에 받기">';
			quizStr += '		<div class="quiz">';
	
			// 스타트 버튼
			quizStr += '			<div class="boxstart"></div>';
	
			// 게임 영역		
			quizStr += '			<div id="boxcontent">';
	
			quizStr += '				<div class="countbox">';
			quizStr += '					<h3 class="numbercount"></h3>';
			quizStr += '					<p class="restart"></p>';
			quizStr += '					<p class="type8finish"></p>';
			quizStr += '				</div>';
	
			quizStr += '				<div class="boxarea">';
	
			quizStr += '					<div class="track"></div>';
			quizStr += '  				<div id="box"></div>';
			quizStr += '  				<div class="arrow"><div><div class="arrowL"></div><div class="arrowR"></div></div></div>';
	
			quizStr += '				</div>';
	
			quizStr += '			</div>';
	
	
			quizStr += '		</div>';
			quizStr += '	</div>';
	
			$("#htmlShow").append(quizStr);
			// A타입 B타입 구분
			if(pageArray[curPage][2] == 1){
				$("#type8").addClass("typeA")
			}else if(pageArray[curPage][2] == 2){
				$("#type8").addClass("typeB")
			}else{
				console.log("pageArray 오류를 확인하세요.")
			}
			// 박스 게임 스타트
			boxOn()
	
			function boxOn(){
				// 박스 받기 전용 코드
				// 장애물 초기 셋팅
				var firstobjectcount = 6; //장애물 개수
				var firstobjectdelay = 1500; //장애물 간격 1000 = 1s ※1000 이하 셋팅 금지
				var firstobjectspeed = 1700; //장애물 속도 1000 = 1s ※400 이하 셋팅 금지
			
				// 게임 기본값 셋팅
				var track_distance = 0;
				var position = 2; // 0: 맨왼쪽, 1: 왼쪽, 2: 중간, 3: 오른쪽, 4: 맨오른쪽
				var player = $("#type8.typeA #box")
				var positions = ['calc(20% - 25px)', 'calc(33% - 25px)', 'calc(50% - 25px)', 'calc(66% - 25px)', 'calc(80% - 25px)']; //캐릭터의 좌우 위치
				var trackbraek = 0; //트랙, 캐릭터 멈춤 등등 게임 완료 코드
				var objectcount = firstobjectcount; //장애물 개수 셋팅
				var playerlocation = 2; //플레이어 위치
				var objectlocation; // 장애물 위치
				var gameclear = 0; // 1 : 게임성공
				var gameover = 0; // 1 : 게임오버
				var objectdelay = firstobjectdelay; //장애물 간격 셋팅
				var objectspeed = firstobjectspeed; //장애물 속도 셋팅
				var objectroop = 1; //장애물 클래스명 지정 반복루프
				var remaining = 0; //남은 장애물 개수 저장
				var answercount = 0; //정답 개수
				var box_answer1 = 0; //1번 정답을 받았는지 체크
				var box_answer2 = 0; //2번 정답을 받았는지 체크
				var box_answer3 = 0; //3번 정답을 받았는지 체크
	
				let trackcount; //트랙 반복 코드
				let objectTimeouts = [];  // 장애물 생성 타이머를 저장할 배열
	
				boxgame()
			
				// 게임 준비
				function boxgame(){
					setbox()
					$("#type8.typeA .boxstart").on("click", function () {
						$(this).hide()
						$("#type8.typeA #boxcontent").show()
						$("#type8.typeA .countbox").css("background","none")
						$("#type8.typeA .countbox").css("background","rgba(0,0,0,0.3)")
						$("#type8.typeA .numbercount").html("")
						// 3초
						setTimeout(() => {$("#type8.typeA .numbercount").html("3")}, 0);
						// 2초
						setTimeout(() => {$("#type8.typeA .numbercount").html("2")}, 1000);
						// 1초
						setTimeout(() => {$("#type8.typeA .numbercount").html("1")}, 2000);
						// 스타트
						setTimeout(() => {
							$("#type8.typeA .countbox").hide();
							boxfunction()
							$("#type8.typeA .arrow").show()
							$("#type8.typeA #box").css("z-index","10000000000")
							// box_bgm.play();
						}, 3000);
					})
			
				}
			
				// 게임 구성 요소 추가
				function setbox(){
			
				}
			
				// 트랙 움직임
				function checkForFail() {
					track_distance = track_distance + 7;
			
					if(gameclear == 1 && $("#type8.typeA .object").length == 0){
						if(answercount == 3){
							// 게임 성공
							answercount = 0; //카운트 초기화
							if(gameover == 0){
								console.log("게임 종료")
							
								// 게임을 완료했기때문에 방향키 숨김
								setTimeout(() => {
									$("#type8.typeA .arrow").hide()
								}, 0);
							
								// 트랙 멈춤, 게임 완료
								setTimeout(() => {
									trackbraek = 1;
								}, 1000);
							
								// 게임 완료 박스 켜기
								setTimeout(() => {
									bgm.pause();
									bgm.currentTime = 0; //BGM 처음으로 되감기
								
									$("#type8.typeA .countbox").fadeIn(300);
									$("#type8.typeA #box").css("z-index","1")
									$("#type8.typeA .countbox").css("background","url('../02/img/quiz/08/box_answer.png')")
									$("#type8.typeA .countbox").css("background-size","1280px")
									$("#type8.typeA .numbercount").html("")
									setTimeout(() => {
										$("#type8.typeA .countbox").css("background","url('../02/img/quiz/08/box_type8clear.png')")
										$("#type8.typeA .countbox").css("background-size","1280px")
										// 게임 재시작 버튼 세팅
										$("#type8.typeA .type8finish").off().on("click", function () {
											type8finish()
										})
										$("#type8.typeA .type8finish").fadeIn(300)
									}, 3000);
									box_bgmclear.play()
								}, 1500);
							
								gameclear ++;
							}
						}else{
							// 게임 실패 = 정답을 다 받지않음
							answercount = 0; //카운트 초기화
							gameoverevent()
						}
					}
			
					var objectnum1 = $("#type8.typeA .objectnum1").css("top");
					var objectnum2 = $("#type8.typeA .objectnum2").css("top");
					var objectnum3 = $("#type8.typeA .objectnum3").css("top");
					var objectnum4 = $("#type8.typeA .objectnum4").css("top");
					var objectnum5 = $("#type8.typeA .objectnum5").css("top");
					var objectnum6 = $("#type8.typeA .objectnum6").css("top");
					var number1 = parseInt(objectnum1, 10)
					var number2 = parseInt(objectnum2, 10)
					var number3 = parseInt(objectnum3, 10)
					var number4 = parseInt(objectnum4, 10)
					var number5 = parseInt(objectnum5, 10)
					var number6 = parseInt(objectnum6, 10)
					// 5만원권
					if(520 > number1 && number1 > 410){
						var num1 = $("#type8.typeA .objectnum1").attr("class")
						objectlocation = num1.slice(-1)
						if(playerlocation == objectlocation){
							$("#type8.typeA .objectnum1").hide()
							box_answer1 = 1;
							boximgchange() //상자 구성 변경
							setTimeout(() => {
								box_bgmright.play()
							}, 50);
							answercount ++ ;
						}
					}
					// 비싼 가방
					if(420 > number2 && number2 > 310){
						var num2 = $("#type8.typeA .objectnum2").attr("class")
						objectlocation = num2.slice(-1)
						if(playerlocation == objectlocation){
							$("#type8.typeA .objectnum2").hide()
							setTimeout(() => {
								$("#type8.typeA .object").hide()
							}, 2000);
							setTimeout(() => {
								box_bgmcrash.play()
							}, 50);
							gameoverevent()
						}
					}
					// 맥주
					if(490 > number3 && number3 > 380){
						var num3 = $("#type8.typeA .objectnum3").attr("class")
						objectlocation = num3.slice(-1)
						if(playerlocation == objectlocation){
							$("#type8.typeA .objectnum3").hide()
							box_answer2 = 1;
							boximgchange() //상자 구성 변경
							setTimeout(() => {
								box_bgmright.play()
							}, 50);
							answercount ++ ;
						}
					}
					// 비싼 자동차
					if(510 > number4 && number4 > 410){
						var num4 = $("#type8.typeA .objectnum4").attr("class")
						objectlocation = num4.slice(-1)
						if(playerlocation == objectlocation){
							$("#type8.typeA .objectnum4").hide()
							setTimeout(() => {
								$("#type8.typeA .object").hide()
							}, 2000);
							setTimeout(() => {
								box_bgmcrash.play()
							}, 50);
							gameoverevent()
						}
					}
					// 1만원 권
					if(520 > number5 && number5 > 410){
						var num5 = $("#type8.typeA .objectnum5").attr("class")
						objectlocation = num5.slice(-1)
						if(playerlocation == objectlocation){
							$("#type8.typeA .objectnum5").hide()
							box_answer3 = 1;
							boximgchange() //상자 구성 변경
							setTimeout(() => {
								box_bgmright.play()
							}, 50);
							answercount ++ ;
						}
					}
					// 15만원
					if(490 > number6 && number6 > 380){
						var num6 = $("#type8.typeA .objectnum6").attr("class")
						objectlocation = num6.slice(-1)
						if(playerlocation == objectlocation){
							$("#type8.typeA .objectnum6").hide()
							setTimeout(() => {
								$("#type8.typeA .object").hide()
							}, 2000);
							setTimeout(() => {
								box_bgmcrash.play()
							}, 50);
							gameoverevent()
						}
					}
				}

				function boximgchange(){
					if(box_answer1 == 1 && box_answer2 == 0 && box_answer3 == 0){ //1번 정답을 받았을경우
						$("#type8.typeA #box").css("background","url('../02/img/quiz/08/Box1.png')")
						$("#type8.typeA #box").css("background-size","262px")						
					}
					else if(box_answer1 == 1 && box_answer2 == 1 && box_answer3 == 0){ //1번, 2번 정답을 받았을경우
						$("#type8.typeA #box").css("background","url('../02/img/quiz/08/Box2.png')")
						$("#type8.typeA #box").css("background-size","262px")						
					}
					else if(box_answer1 == 1 && box_answer2 == 1 && box_answer3 == 1){ //1번, 2번, 3번 정답을 받았을경우 -> 완료
						$("#type8.typeA #box").css("background","url('../02/img/quiz/08/Box3.png')")
						$("#type8.typeA #box").css("background-size","262px")						
					}
					else if(box_answer1 == 0 && box_answer2 == 1 && box_answer3 == 0){ //1번놓치고 2번 정답을 받았을경우 -> 실패1
						$("#type8.typeA #box").css("background","url('../02/img/quiz/08/Box2_1.png')")
						$("#type8.typeA #box").css("background-size","262px")						
					}
					else if(box_answer1 == 0 && box_answer2 == 1 && box_answer3 == 1){ //1번놓치고 2번, 3번 정답을 받았을경우 -> 실패2
						$("#type8.typeA #box").css("background","url('../02/img/quiz/08/Box3_1.png')")
						$("#type8.typeA #box").css("background-size","262px")						
					}
					else if(box_answer1 == 0 && box_answer2 == 0 && box_answer3 == 1){ //1번, 2번놓치고 3번 정답을 받았을경우 -> 실패3
						$("#type8.typeA #box").css("background","url('../02/img/quiz/08/Box3_2.png')")
						$("#type8.typeA #box").css("background-size","262px")						
					}
				}
			
				// 좌우 이동 좌표
				function updatePlayerPosition() {
					var positions = ['calc(28% - 132px)', 'calc(39% - 132px)', 'calc(50% - 132px)', 'calc(61% - 132px)', 'calc(72% - 132px)'];
					$('#type8.typeA #box').css("left",positions[position]);
				}
			
				//장애물 추가
				function addobject() {
					if(!trackbraek){
						var objectPosition = Math.floor(Math.random() * 5); // 0: 맨왼쪽, 1: 왼쪽, 2: 중간, 3: 오른쪽, 4: 맨오른쪽
	
			
						if(objectroop == 7){
							objectroop = 1;
						}
						var positions;
						// 가방 위치
						if(objectroop == 2){
							positions = ['calc(22% - 55px)', 'calc(36% - 55px)', 'calc(50% - 55px)', 'calc(64% - 55px)', 'calc(78% - 55px)'];
						}
						// 맥주 위치
						else if(objectroop == 3){
							positions = ['calc(22% - 30px)', 'calc(36% - 30px)', 'calc(50% - 30px)', 'calc(64% - 30px)', 'calc(78% - 30px)'];
						}
						// 15만원 위치
						else if(objectroop == 6){
							positions = ['calc(22% - 100px)', 'calc(36% - 100px)', 'calc(50% - 100px)', 'calc(64% - 100px)', 'calc(78% - 100px)'];
						}
						// 5만원, 자동차, 1만원 위치
						else{
							positions = ['calc(22% - 80px)', 'calc(36% - 80px)', 'calc(50% - 80px)', 'calc(64% - 80px)', 'calc(78% - 80px)'];
						}
	
						var p = $('<div>', {
								class: 'object  objectnum' + objectroop + ' location' + objectPosition, // 클래스 추가
								css: { left: positions[objectPosition] } // 스타일 설정
						});
			
						objectroop ++;
				
						// 장애물을 .track 요소에 추가
						$('#type8.typeA .track').append(p);
						// 장애물이 떨어지는 속도
						p.animate({ top : "100%" },objectspeed*3)
						// 남은 장애물 체크
						if(gameover == 0){
							setTimeout(() => {
								remaining ++ //남은 장애물 카운트
								infoupdate()
							}, objectspeed*2);
						}
						setTimeout(() => {
							p.remove()
						}, objectspeed*3);
					}
				}
			
				// 장애물에 부딪힐 시 게임 종료
				function gameoverevent() {
					
					$("#type8.typeA .arrow").hide()
					trackbraek = 1;
					gameover = 1;
					console.log("게임 실패")
					setTimeout(() => {
						bgm.pause();
						bgm.currentTime = 0; //BGM 처음으로 되감기
						$("#type8.typeA .countbox").fadeIn(300);
						$("#type8.typeA #box").css("z-index","1")
						$("#type8.typeA .countbox").css("background","url('../02/img/quiz/08/box_wrong.png')")
						$("#type8.typeA .countbox").css("background-size","1280px")
						$("#type8.typeA .numbercount").html("")
						box_bgmover.play()
						setTimeout(() => {
							// 게임 재시작 버튼 세팅
							$("#type8.typeA .restart").off().on("click", function () {
								box_replay()
							})
							$("#type8.typeA .restart").fadeIn(300)
						}, 3000);
					}, 2000);
				}
			
				// 장애물 추가 함수 시간 간격두고 발생시키기
				function objectaction(){
					objectTimeouts.forEach(timeoutID => clearTimeout(timeoutID)); // 이전 타이머 제거
					objectTimeouts = [];  // 배열 초기화
					for (let i = 0; i < objectcount; i++) {
						let timeoutID = setTimeout(() => {
								if(trackbraek == 0){
									addobject()
									objectcount --;
									console.log("남은 장애물 개수 : " + objectcount)
			
									if(objectcount == 0){
										gameclear = 1;
									}
			
								}
							}, (i + 1)*objectdelay);
			
							objectTimeouts.push(timeoutID);  // 배열에 타이머 저장
			
							if (trackbraek == 1) {
								break; // for 루프 강제 종료
							}
					}
				}
			
				function boxfunction() {
			
					// 장애물 스타트
					objectaction();
			
					// 트랙 움직임 함수 반복 조건
					for (trackcount = 0; trackcount < 8000; trackcount++) {
						setTimeout(() => {
							if (!trackbraek) {
								checkForFail();
							}
						}, (trackcount + 1) * 20);
					}
			
			
					// 좌우 움직임 기능 터치
					document.querySelector('#type8.typeA .arrowL').addEventListener('click', function () {
						if (position > 0) {
							position--;
						}
						playerlocation = position;
						updatePlayerPosition();
					});
				
					document.querySelector('#type8.typeA .arrowR').addEventListener('click', function () {
						if (position < 4) {
							position++;
						}
						playerlocation = position;
						updatePlayerPosition();
					});
			
				}

				// 상자에 받기 게임 종료후 영상 재생
				function type8finish() {
					$("#type8").fadeOut(500)
					quizComplete1()
				}
			
				// 게임 재시작
				function box_replay() {
					console.log("게임을 재시작 합니다.")
			
					// 변수값 초기셋팅으로 초기화
					track_distance = 0;
					position = 2; // 0: 맨왼쪽, 1: 왼쪽, 2: 중간, 3: 오른쪽, 4: 맨오른쪽
					player = $("#box")
					positions = ['calc(20% - 25px)', 'calc(33% - 25px)', 'calc(50% - 25px)', 'calc(66% - 25px)', 'calc(80% - 25px)']; //캐릭터의 좌우 위치
					objectcount = firstobjectcount; //장애물 개수 셋팅
					playerlocation = 2; //플레이어 위치
					objectlocation; // 장애물 위치
					gameclear = 0; // 1 : 게임성공
					gameover = 0; // 1 : 게임오버
					objectdelay = firstobjectdelay; //장애물 간격 셋팅
					objectspeed = firstobjectspeed; //장애물 속도 셋팅
					objectroop = 1; //장애물 클래스명 지정 반복루프
					trackcount = 0; //트랙 반복 코드
					remaining = 0; //남은 장애물 개수 저장
					answercount = 0; //정답 개수
					box_answer1 = 0; //1번 정답을 받았는지 체크
					box_answer2 = 0; //2번 정답을 받았는지 체크
					box_answer3 = 0; //3번 정답을 받았는지 체크
			
					objectTimeouts.forEach(timeoutID => clearTimeout(timeoutID)); // 타이머 초기화
					objectTimeouts = [];  // 배열 초기화
			
					//구성요소 초기화
					$("#type8 .quiz").html("")
			
					//구성요소 재추가
					var boxStr = "";

					// 스타트 버튼
					boxStr += '	<div class="boxstart"></div>';

					// 게임 영역		
					boxStr += '		<div id="boxcontent">';
				
					boxStr += '		<div class="countbox">';
					boxStr += '			<h3 class="numbercount"></h3>';
					boxStr += '			<p class="restart"></p>';
					boxStr += '			<p class="type8finish"></p>';
					boxStr += '		</div>';
				
					boxStr += '		<div class="boxarea">';
				
					boxStr += '			<div class="track"></div>';
					boxStr += '  		<div id="box"></div>';
					boxStr += '  		<div class="crash"></div>';
					runStr += '  		<div class="gameover twinkling"></div>';
					boxStr += '  		<div class="arrow"><div><div class="arrowL"></div><div class="arrowR"></div></div></div>';
				
					boxStr += '		</div>';
					boxStr += '		</div>';
			
					boxStr += '	</div>';
			
			
					boxStr += '	</div>';
					$("#type8 .quiz").append(boxStr);
					$("#type8.typeA .arrow").hide()
					trackbraek = 1;
					$("#type8.typeA .boxstart").show()
					$("#type8.typeA .boxstart").off().on("click", function () {
						$(this).hide()
						$("#type8.typeA #boxcontent").show()
						$("#type8.typeA .countbox").css("background","none")
						$("#type8.typeA .countbox").css("background","rgba(0,0,0,0.3)")
						$("#type8.typeA .numbercount").html("")
						// 3초
						setTimeout(() => {$("#type8.typeA .numbercount").html("3")}, 0);
						// 2초
						setTimeout(() => {$("#type8.typeA .numbercount").html("2")}, 1000);
						// 1초
						setTimeout(() => {$("#type8.typeA .numbercount").html("1")}, 2000);
						// 스타트
						setTimeout(() => {
							$("#type8.typeA .countbox").hide();
							trackbraek = 0;
							boxfunction()
							$("#type8.typeA .arrow").show()
							$("#type8.typeA #box").css("z-index","10000000000")
							// box_bgm.play();
						}, 3000);
					})
				}
			}
	}
	else if(quizCategory == 9){ // 타입9 단순 클릭 이벤트 ////////////////////////////////////////////////////////////////////////


			// // 임시
			// quizAtoB9 = 1; //type9 A타입이 나왔으므로 B로 전환
			// // 임시

			// A타입 B타입 구분
			// A타입 퀴즈 스타트
			if(pageArray[curPage][2] == 1 && quizAtoB9 == 0){
				quizAtoB9 = 1; //type9 A타입이 나왔으므로 B로 전환
				// 일방 퀴즈 A타입 스타트
				var quizStr = "";
				
				quizStr += '	<div class="quizType typeA" id="type9" value="심플클릭">';
				quizStr += '		<div class="quiz">';
				quizStr += '			<div id="quiz1content">';
				quizStr += '				<div class="page1"></div>';
				quizStr += '				<div class="page2"></div>';
				quizStr += '				<div class="page3"></div>';
				quizStr += '				<div class="page4"></div>';

														// 퀴즈 구간
				quizStr += '				<div class="click"></div>';
				quizStr += '				<div class="resultbtn"></div>';

				quizStr += '			</div>';
				quizStr += '		</div>';
				quizStr += '	</div>';

				$("#htmlShow").append(quizStr);

				quiz9AOn()
				
				function quiz9AOn() {

					//변수
					var A9clickcount = 3; // 5개 누르면 완료 버튼띄우기

					$("#type9.typeA .click").on("click", function () {
						quiz9A_bgmclick.play()
						if(A9clickcount == 3){
							$(".page1").fadeOut(150)
						}
						else if(A9clickcount == 2){
							$(".page2").fadeOut(150)
						}
						else if(A9clickcount == 1){
							$(".page3").fadeOut(150)
							$(this).hide()
						}
						A9clickcount -- ; //남은 클릭 개수
						if(A9clickcount == 0){
							$("#type9.typeA .resultbtn").on("click", function () {
								// page3_event.pause()
								quiz9A_bgmclick.play()
								$("#type9.typeA").addClass("over")
								quizComplete1() //전용 마무리 코드
							})
							$("#type9.typeA .resultbtn").fadeIn(200)
							A9clickcount = 3; //클릭 카운트 초기화
						}else{
							console.log("남은 클릭 개수 : " + A9clickcount)
						}
					})
				
				
				}
			}
			// B타입 퀴즈 스타트
			else if(pageArray[curPage][2] == 2 || quizAtoB9 == 1){
				// 일방 퀴즈 B타입 스타트
				var quizStr = "";
				
				quizStr += '	<div class="quizType typeB" id="type9" value="심플클릭">';
				quizStr += '		<div class="quiz">';
				quizStr += '			<div id="quiz1content">';
				quizStr += '				<div class="page1"></div>';
				quizStr += '				<div class="page2"></div>';
				quizStr += '				<div class="page3"></div>';

														// 퀴즈 구간
				quizStr += '				<div class="start"></div>';
				quizStr += '				<div class="click"></div>';
				quizStr += '				<div class="resultbtn"></div>';

				quizStr += '			</div>';
				quizStr += '		</div>';
				quizStr += '	</div>';

				$("#htmlShow").append(quizStr);

				quiz9BOn()
				
				function quiz9BOn() {

					//변수
					var B9clickcount = 2; // 5개 누르면 완료 버튼띄우기
				  
					$("#type9.typeB .start").on("click", function () {
						$(this).hide()
						quiz9B_bgmclick.play()
						B9clickcount = 1;
						$(".page1").fadeOut(150)
						setTimeout(() => {
							$("#type9.typeB .click").fadeIn(500)
						}, 1000);
					})
					$("#type9.typeB .click").on("click", function () {
					quiz9B_bgmclick.play()
					if(B9clickcount == 1){
						$(".page2").fadeOut(150)
						$(this).hide()
					  }
					  B9clickcount -- ; //남은 클릭 개수
					  if(B9clickcount == 0){
						$("#type9.typeB .resultbtn").on("click", function () {
						  // page3_event.pause()
						  quiz9B_bgmclick.play()
						  $("#type9.typeB").addClass("over")
						  quizComplete1() //전용 마무리 코드
						})
						setTimeout(() => {
							$("#type9.typeB .resultbtn").fadeIn(200)
						}, 2000);
						
						B9clickcount = 1; //클릭 카운트 초기화
					  }else{
						console.log("남은 클릭 개수 : " + B9clickcount)
					  }
					})
				  
				  
				  }
			}
			// 타입 지정 오류
			else{
				console.log("pageArray 오류를 확인하세요.")
			}


	}
	else if(quizCategory == 10){ // 타입10 드래곤 공격 /////////////////////////////////////////////////////////////////////

		// 단일 타입
		if(pageArray[curPage][2] == 1){
			// 단일 퀴즈 A타입 스타트
			var quizStr = "";
			
			quizStr += '	<div class="quizType typeA" id="type10" value="드래곤 공격">';
			quizStr += '		<div class="attackbtn"></div>';
			quizStr += '	</div>';

			$("#htmlShow").append(quizStr);

			quiz10AOn()
			
			function quiz10AOn() {

			
			$("#type10.typeA .attackbtn").fadeIn(500)

			// setTimeout(() => {
			// 	quizComplete_simpleclick()
			// }, 14000);
			
			$("#type10.typeA .attackbtn").on("click", function () {
				sword.pause()
				Player.currentTime = 13.5; //용한테 공격으로 점프
			})
			
			}
		}
		// 타입 지정 오류
		else{
			console.log("pageArray 오류를 확인하세요.")
		}

	}
}

function quizComplete1() {
	levelup()
}
function quizComplete_simpleclick() { // 타입 9 심플클릭 전용 코드
	$("#htmlShow").hide();
	setPlay() //퀴즈 종료하고 영상 재생
	quizComplete2()
}

function quizComplete2() {
	
	if(quizNumber < quizTotal){
		quizNumber ++; //다음 퀴즈로
		console.log("다음 퀴즈 준비 시작")
	}
	else{
		console.log("모든 퀴즈가 완료되었습니다.")
	}
	if(Player.currentTime > (Player.duration - 2)){
		Player.currentTime = Player.duration //영상 강제 종료
		toolTipFlag = true;
		setTimeout(() => {
			handleNextClick() //퀴즈 종료하고 다음페이지로
		}, 500);
	}
	
}

function levelup() {
	top.close();
	quizComplete2()
}




// /////////////////////////////////////////////////////////////





