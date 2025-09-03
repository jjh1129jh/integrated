function setIntro(){
	//console.log("intro.js 셋팅")
	var introStr = '';


	introStr += '	<section id="intro">';
	introStr += '		<div class="intro-inner">';
	introStr += '			<div class="chapter-name">';
	introStr += '				<span>'+ itostr(curChasi) +'</span>';
	introStr += '				<p>'+ leftChapterTitle +'</p>';
	introStr += '		</div>';
	introStr += '	</section>';

	$("#htmlShow").append(introStr);
}
