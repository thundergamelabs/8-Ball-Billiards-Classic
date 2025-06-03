
var loadState  = new Object();



loadState.init = function(){

	this.loaderInfo = new Object();
	var loaderInfo = this.loaderInfo;

	loaderInfo.loaderProgress = 0;


	game.scale.setResizeCallback(this.onResize, this);

	
	loaderInfo.loaderCanvas = new Phaser.Group(game, game.stage, 'loaderCanvas');

	loaderInfo.loaderCanvas.alpha = 0;

	loaderInfo.loaderCanvas.x = game.width / 2;
	loaderInfo.loaderCanvas.y = game.height / 2;
	game.stage.addChild(loaderInfo.loaderCanvas);

	
	//loaderInfo.bgL = new Phaser.Sprite(game, 0, 0, 'bgL');
	//loaderInfo.loaderCanvas.addChild(loaderInfo.bgL);
	//loaderInfo.bgL.anchor = new Point(.5, .5);
	//loaderInfo.bgL.visible = false;

	//loaderInfo.bgP = new Phaser.Sprite(game, 0, 0, 'bgP');
	//loaderInfo.loaderCanvas.addChild(loaderInfo.bgP);
	//loaderInfo.bgP.anchor = new Point(.5, .5);
	//loaderInfo.bgP.visible = false;

	loaderInfo.title = new Phaser.Sprite(game, 0, 0, 'title');
	loaderInfo.loaderCanvas.addChild(loaderInfo.title);
	loaderInfo.title.anchor = new Point(.5, .5);

	loaderInfo.rack = new Phaser.Sprite(game, 0, 0, 'rack');
	loaderInfo.loaderCanvas.addChild(loaderInfo.rack);
	loaderInfo.rack.anchor = new Point(.5, .5);
	

	loaderInfo.loaderBase = new Phaser.Sprite(game, 0, 800, 'loaderBase');
	loaderInfo.loaderBase.anchor = new Point(.5, 0);
	loaderInfo.loaderCanvas.addChild(loaderInfo.loaderBase);
	loaderInfo.loaderFill = new Phaser.Sprite(game, 0, 800, 'loaderFill');
	loaderInfo.loaderFill.anchor = new Point(.5, 0);
	loaderInfo.loaderCanvas.addChild(loaderInfo.loaderFill);

	loaderInfo.graphics = game.add.graphics(0, 0);
	loaderInfo.graphics.beginFill(0xffffff);
	loaderInfo.loaderFill.mask = loaderInfo.graphics;

	loaderInfo.loaderHighlight = new Phaser.Sprite(game, 0, 80, 'loaderHighlight');
	loaderInfo.loaderHighlight.anchor = new Point(.5, 0);
	loaderInfo.loaderCanvas.addChild(loaderInfo.loaderHighlight);

	loaderInfo.progress = new Object();
	loaderInfo.progress.val = 0;


	this.resizeGame();
	var tween = game.add.tween(loaderInfo.loaderCanvas).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 500);


}

loadState.resizeGame = function(scale, bounds){ 


		//console.log("resizing");
		var loaderInfo = this.loaderInfo;

        var clientWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
		var clientHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

		if(window.famobi.getOrientation() == "portrait"){

			//set to portrait mode
			//game.scale.setGameSize(690, 1024);
			game.scale.setGameSize(1080, 1920);
			loaderInfo.title.y = -(game.height / 2) * 0.5;

			//loaderInfo.bgL.visible = false;
			//loaderInfo.bgP.visible = true;
			

			//game.scale.maxHeight = clientHeight;
			//game.scale.maxWidth = clientHeight * 690 / 1024;




		}else{

			//set to landscape mode 
			//game.scale.setGameSize(1024, 690);
			game.scale.setGameSize(1920, 1080);
			loaderInfo.title.y = -(game.height / 2) * 0.6;
			//game.scale.maxHeight = clientHeight;
			//game.scale.maxWidth = clientHeight * 1024 / 690;

			//loaderInfo.bgL.visible = true;
			//loaderInfo.bgP.visible = false;

			
			
		}

		
		//objects which need moving but take the same values regardless of orientation (eg. relative to other items which have changed)
		
		
		var margin = String(Math.abs(clientHeight - document.getElementById("mygame").clientHeight) / 2) + "px";
    	//document.getElementById("game").style.marginTop = margin;
		
		loaderInfo.loaderCanvas.x = game.width / 2;
		loaderInfo.loaderCanvas.y = game.height / 2;
		//loaderInfo.bgL.x = 0;
		//loaderInfo.bgL.y = 0;
		loaderInfo.loaderBase.y = 0.6 * game.height / 2;
		loaderInfo.loaderFill.y = 0.6 * game.height / 2;
		loaderInfo.loaderHighlight.y = 0.6 * game.height / 2;
		
		loaderInfo.rack.y = (game.height / 2) * 0.1;

		//loaderInfo.graphics.clear();
		//loaderInfo.graphics.beginFill(0xffffff);
		//loaderInfo.graphics.drawRect( - 375/2, loaderInfo.loaderBase.y, game.load.progress * 3.75, 30);

		loaderInfo.graphics.clear();
	    loaderInfo.graphics.beginFill(0xffffff);
		//loaderInfo.graphics.drawRect(game.width / 2 - 375 / 2, game.height / 2, game.load.progress * 3.75, 30);
		//console.log("progress: " + loaderInfo.loaderProgress)
		loaderInfo.graphics.drawRect(game.width / 2 - 375 / 2, game.height / 2 + loaderInfo.loaderBase.y + 8, loaderInfo.loaderProgress * 3.75, 30);
		

		
		

}

loadState.onResize = function(scale, bounds) {

 	this.resizeGame(scale, bounds);
 	
}



loadState.preload = function(){


	
	//load all game assets
	this.load.spritesheet('muteButton', 'assets/img/muteButton.png', 183, 183);
	this.load.spritesheet('playButton', 'assets/img/playButton.png', 232, 233);
	this.load.spritesheet('playButtonSmall', 'assets/img/playButtonSmall.png', 182, 183);
	this.load.spritesheet('quitButton', 'assets/img/quitButton.png', 183, 183);
	this.load.spritesheet('replayButton', 'assets/img/replayButton.png', 183, 183);
	this.load.spritesheet('helpButton', 'assets/img/helpButton.png', 183, 183);
	this.load.spritesheet('statsButton', 'assets/img/statsButton.png', 183, 183);
	this.load.spritesheet('settingsButton', 'assets/img/settingsButton.png', 183, 183);

	//this.load.spritesheet('creditsButton', 'assets/img/creditsButton.png', 100, 100);
	this.load.spritesheet('menuButton', 'assets/img/menuButton.png', 131, 131);
	this.load.spritesheet('solidsSpriteSheet', 'assets/img/solidsSpriteSheet.png', 48, 48, 9);
	this.load.spritesheet('ballSpriteSheet9', 'assets/img/ballSpriteSheet9.png', 50, 50, 41);
	this.load.spritesheet('ballSpriteSheet10', 'assets/img/ballSpriteSheet10.png', 50, 50, 41);
	this.load.spritesheet('ballSpriteSheet11', 'assets/img/ballSpriteSheet11.png', 50, 50, 41);
	this.load.spritesheet('ballSpriteSheet12', 'assets/img/ballSpriteSheet12.png', 50, 50, 41);
	this.load.spritesheet('ballSpriteSheet13', 'assets/img/ballSpriteSheet13.png', 50, 50, 41);
	this.load.spritesheet('ballSpriteSheet14', 'assets/img/ballSpriteSheet14.png', 50, 50, 41);
	this.load.spritesheet('ballSpriteSheet15', 'assets/img/ballSpriteSheet15.png', 50, 50, 41);
	this.load.spritesheet('spotSpriteSheet', 'assets/img/spotSpriteSheet.png', 38, 38, 16);
	this.load.spritesheet('bonusStarSpriteSheet', 'assets/img/bonusStar.png', 59, 67, 1.5);
	this.load.spritesheet('mouseSprite', 'assets/img/mouseSprite.png', 132,116);
	this.load.spritesheet('humanIcon', 'assets/img/humanIcon.png', 119,118);
	this.load.spritesheet('aiIcon', 'assets/img/aiIcon.png', 120,120);
	this.load.spritesheet('guiSolids', 'assets/img/guiSolids.png', 102,102);
	this.load.spritesheet('guiStripes', 'assets/img/guiStripes.png', 101,102);
	this.load.spritesheet('turnArrow', 'assets/img/turnArrow.png', 69,76);
	this.load.spritesheet('pVpButton', 'assets/img/pVpButton.png', 470,211);
	this.load.spritesheet('pVAIButton', 'assets/img/pVAIButton.png', 468,210);
	this.load.spritesheet('aiLevel', 'assets/img/aiLevel.png', 98,97);
	this.load.spritesheet('illegalContacts', 'assets/img/illegalContacts.png', 345,137);
	this.load.spritesheet('illegalShots', 'assets/img/illegalShots.png', 324, 324);
	this.load.spritesheet('switch', 'assets/img/switch.png', 152, 55);
	this.load.spritesheet('plusButton', 'assets/img/plusButton.png', 113, 112);
	this.load.spritesheet('minusButton', 'assets/img/minusButton.png', 113, 112);

	


	

	this.load.atlas('marker', 'assets/img/marker.png', 'assets/img/marker.json');
	


	game.load.bitmapFont('font1', 'assets/fonts/font1.png', 'assets/fonts/font1.fnt');
	game.load.bitmapFont('font2', 'assets/fonts/font2.png', 'assets/fonts/font2.fnt'); 
	game.load.bitmapFont('font3', 'assets/fonts/font3.png', 'assets/fonts/font3.fnt');
	//game.load.bitmapFont('font4', 'assets/fonts/font4.png', 'assets/fonts/font4.fnt');
	game.load.bitmapFont('font5', 'assets/fonts/font5.png', 'assets/fonts/font5.fnt');
	game.load.bitmapFont('font6', 'assets/fonts/font6.png', 'assets/fonts/font6.fnt');

	this.load.image('more_games', window.famobi.getMoreGamesButtonImage());
    //this.load.image('line', 'assets/img/line.png');
	this.load.image('pockets', 'assets/img/pockets.png');
	this.load.image('cloth', 'assets/img/cloth.png');
	this.load.image('tableTop', 'assets/img/tableTop.png');
	this.load.image('shade', 'assets/img/shade.png');
	this.load.image('shadow', 'assets/img/shadow.png');
	this.load.image('cue', 'assets/img/cue.png');
	this.load.image('cueShadow', 'assets/img/cueShadow.png');
	//this.load.image('guiBar', 'assets/img/guiBar.png');
	this.load.image('bonusDisc', 'assets/img/bonusDisc.png');
	this.load.image('powerBarBase', 'assets/img/powerBarBase.png');
	this.load.image('powerBarTop', 'assets/img/powerBarTop.png');
	this.load.image('powerBarBG', 'assets/img/powerBarBG.png');


	//this.load.image('backgroundImageL', 'assets/img/bgLandscape2.png');
	//this.load.image('backgroundImageP', 'assets/img/bgPortrait2.png');
	this.load.image('bonusStar', 'assets/img/bonusStar2.png');
	//this.load.image('box', 'assets/img/box.png');
	this.load.image('panel', 'assets/img/panel.png');
	this.load.image('panel2', 'assets/img/panel2.png');
	this.load.image('panel3', 'assets/img/panel3.png');
	this.load.image('panel4', (typeof window.famobi.audio == "undefined" || window.famobi.audio.hasControls()) ? 'assets/img/panel4b.png' : 'assets/img/panel4b_.png');
	//this.load.image('phaserLogo', 'assets/img/phaserLogo.png');
	//this.load.image('andromedusLogo', 'assets/img/andromedusLogo.jpg');
	this.load.image('helpMouse', 'assets/img/helpMouse.png');
	this.load.image('helpTouch', 'assets/img/helpTouch.png');
	this.load.image('guiPanel1', 'assets/img/guiPanel1.png');
	this.load.image('guiPanel2', 'assets/img/guiPanel2.png');
	this.load.image('score', 'assets/img/score.png');
	this.load.image('highScore', 'assets/img/highscore.png');
	this.load.image('success', 'assets/img/success.png');
	this.load.image('hand', 'assets/img/hand.png');
	this.load.image('dottedLine', 'assets/img/dottedLine.png');
	this.load.image('rackBG', 'assets/img/rackBG.png');
	this.load.image('mover', 'assets/img/mover.png');
	this.load.image('8ball', 'assets/img/8ball.png');
	this.load.image('spinSetterSmall', 'assets/img/spinSetterLarge.png');
	this.load.image('cueBallSpot', 'assets/img/cueBallSpot.png');
	this.load.image('spinSetterZoom', 'assets/img/spinSetterZoom.png');
	this.load.image('cueBallSpotZoom', 'assets/img/cueBallSpotZoom.png');
	this.load.image('clockIcon', 'assets/img/clockIcon.png');
	this.load.image('aiWin', 'assets/img/aiWin.png');
	this.load.image('playerWin', 'assets/img/playerWin.png');
	this.load.image('rosette', 'assets/img/rosette.png');
	this.load.image('illegalBreak', 'assets/img/illegalBreak.png');
	this.load.image('foulDisplay', 'assets/img/foulDisplay.png');
	this.load.image('foulHighlight', 'assets/img/foulHighlight.png');
	this.load.image('cross', 'assets/img/cross.png');
	this.load.image('tick', 'assets/img/tick.png');
	this.load.image('gameController', 'assets/img/gameController.png');
	this.load.image('famobi', 'assets/img/famobi.png');


	this.load.audio('ballHit', ['assets/audio/ballHit2.wav', 'assets/audio/ballHit2.mp3']);
	this.load.audio('cushionHit', ['assets/audio/cushionHit.wav', 'assets/audio/cushionHit.mp3']);
	this.load.audio('pocketHit', ['assets/audio/pocketHit.wav', 'assets/audio/pocketHit.mp3']);
	this.load.audio('cueHit', ['assets/audio/cueHit.wav', 'assets/audio/cueHit.mp3']);
	this.load.audio('shimmer', ['assets/audio/shimmer.wav', 'assets/audio/shimmer.mp3']);
	this.load.audio('ding', ['assets/audio/ding.wav', 'assets/audio/ding.mp3']);
	this.load.audio('cheer', ['assets/audio/cheer.wav', 'assets/audio/cheer.mp3']);

	game.load.onFileComplete.add(this.updateProgressBar, this);

}

loadState.updateProgressBar = function() {   

	var loaderInfo = this.loaderInfo;
	
	
	//console.log("loader: " + game.load.progress);
	loaderInfo.loaderProgress = game.load.progress;
	

	//loaderInfo.graphics.drawRect(loaderInfo.loaderCanvas.x - 375/2, loaderInfo.loaderCanvas.y, game.load.progress * 3.75, 30);
	//loaderInfo.graphics.drawRect(loaderInfo.loaderCanvas.x + loaderInfo.loaderBase.x - (375/2), loaderInfo.loaderCanvas.y + loaderInfo.loaderBase.y + 8, loaderInfo.progress.val, 30);
	
	loaderInfo.graphics.clear();
    loaderInfo.graphics.beginFill(0xffffff);
	loaderInfo.graphics.drawRect(game.width / 2 - 375 / 2, game.height / 2 + loaderInfo.loaderBase.y + 8, loaderInfo.loaderProgress * 3.75, 30);
	

	//tween = game.add.tween(loaderInfo.progress).to({val: game.load.progress * 3.75}, 3000, Phaser.Easing.Linear.None,true);
}



loadState.render = function(){

	//var loaderInfo = this.loaderInfo;
	//loaderInfo.graphics.drawRect(loaderInfo.loaderBase.x - (375/2), loaderInfo.loaderBase.y + 8, loaderInfo.progress.val, 30);
}

loadState.create = function(){

	var loaderInfo = this.loaderInfo;

	//console.log("loaded");
	game.time.events.add(Phaser.Timer.SECOND * 2, fadeLoader, this);

	function fadeLoader(){

		//initMenu();
		var tween = game.add.tween(loaderInfo.loaderCanvas).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
		tween.onComplete.add(initMenu, this);
	}

	function initMenu(){

		//console.log("tween complete");
		initProjectInfo(); 
		game.state.start('mainMenu');


		function initProjectInfo(){

			//one time initiation routine after game load and before main menu
			projectInfo.levelComplete = false;
		}
	}



	
}



loadState.update = function(){

	//console.log("updating");




}

loadState.shutdown = function(){

	var loaderInfo = this.loaderInfo;

	//console.log("cleaning loader");
	game.stage.removeChild(loaderInfo.loaderCanvas);
	loaderInfo.loaderCanvas = null;
	loaderInfo = null;
}


	
  

