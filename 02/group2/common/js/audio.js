/*
  2017. 02. 21
  Creator : woojung

	오디오 객체
*/
// var soundPath = "./common/sound/";
// var soundType = ".mp3";
var soundContainerNum = [];
// $("#st-container").append('<div id="audioObj" ></div>')
function audio(){
	this.soundPath = "../common/sound/";
	this.soundType = ".mp3";
}

audio.prototype = {
	init : function($id,url){
		
		this.audio_tag = $('<audio id='+$id+' width="0px" height="0px" >Your browser does not support HTML5 video.</audio>');
		$("#audioObj").append(this.audio_tag);
		this.audio_tag.controls=false;
		this.getSrc($id,url);
	},

	getSrc : function($id, $url){
		var path = this.soundPath + $url + this.soundType;
		//this.audio_tag.src = path;
		
		var id = document.getElementById($id)
		////console.log(id)
		id.src = path;
		id.play();
		//alert($(this.audio_tag).attr("src"));
		//this.audio_tag.oncanplaythrough = function (){
				
		//}

		$(this.audio_tag).on("ended", function (e) {
			//console.log(e);
			$(e.target).remove();
			soundContainerNum.pop();
			//console.log(soundContainerNum);
		});
	}
}


// 오디오 플레이어
function writeEffectAudio(){
	$("#fs-container").append('<div id="audioObj" ></div>')
	return;
	
	// $("#audioObj").append('<audio id="audioPlayer" width="0px" height="0px" autoplay >Your browser does not support HTML5 video.</audio>')
	// audio = document.getElementById("audioPlayer");
	// audio.controls=false;
}

function playSound(url){
	var _audio = new audio();
	soundContainerNum.push(_audio);
	_audio.init("audioPlayer_"+soundContainerNum.length,url);
	//_audio.getSrc(url);
}