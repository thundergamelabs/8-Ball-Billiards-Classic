var Stars = function(x, y){

	var gameInfo = playState.gameInfo;

	var emitter = game.add.emitter(x, y, 100);
	  
	emitter.makeParticles('bonusStar');
	 
	//emitter.maxParticles = 10;
	emitter.maxParticleScale = 0.2;
	emitter.setAlpha(0.3, 0, 2000);



	gameInfo.gameCanvas.addChild(emitter);
    emitter.start(true, 1000, null, 10);

    var starTween = game.add.tween(emitter);
    starTween.to({alpha: 0, }, 2000);
	starTween.onComplete.add(destroyStars, this);
	starTween.start();

	function destroyStars(){
		if(emitter){
			emitter.destroy();
		}
	}

}

function createBonusText(delay, text, font, x, y, size, sound){

	
	game.time.events.add(Phaser.Timer.SECOND * delay, createBonusTextAfterDelay, this);

	function createBonusTextAfterDelay(){

		var gameInfo = playState.gameInfo;

		if(sound == true){
			Sound.Play("ding", 1);
		}

		var bmt = new Phaser.BitmapText(game, x, y, font, text, size);

		gameInfo.gameCanvas.addChild(bmt);
		if(!gameInfo.landscape){
			bmt.angle = 90;
		}
		bmt.anchor = new Point(.5, .5);

		var tween = game.add.tween(bmt);
		if(!gameInfo.landscape){
			tween.to({alpha: 0, x: x + 40}, 2000);
		}else{
			tween.to({alpha: 0, y: y - 40}, 2000);
		}
		tween.onComplete.add(destroy, this);
		tween.start();

		//console.log("bonus");

		function destroy(){

			gameInfo.gameCanvas.removeChild(bmt);
			bmt = null;
			//console.log("destoyed");
		}
	}

}