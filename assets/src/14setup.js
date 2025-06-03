


var playState = new Object();

playState.init = function(){

	this.menuInfo = new Object();

}






playState.create = function(){

	window.famobi.onOrientationChange(function() {
		//console.log(window.famobi.getOrientation(), window.innerWidth, window.innerHeight); // Output example: landscape 732 480
		resizeGame();


		//game.scale.setResizeCallback(onResize, this);

		//onResize = function(scale, bounds) {
		 	//this.resizeGame(scale, bounds);

		//}


	});



	resizeGame = function(scale, bounds){


		//console.log("resized game");
	    //this.resizeGame();
	    //game.state.resize(R.gameWidth, R.gameHeight);
	    var clientWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
		var clientHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);



		if(window.famobi.getOrientation() == "portrait"){

			//set to portrait mode
			gameInfo.landscape = false;
			//game.scale.setGameSize(690, 1024);
			game.scale.setGameSize(1080, 1920);

			gameInfo.gameCanvas.x = game.width / 2 + 30;
			gameInfo.gameCanvas.y = game.height / 2 - 50;

			//rotate table
			gameInfo.gameCanvas.angle = -90;


			//tutorial
			if(projectInfo.tutorial){

				if(game.device.touch){
					//if(gameInfo.tutStage <= 4){
						gameInfo.hand.scale.x = -1;
					//}

					if(gameInfo.tutStage >= 6){
						gameInfo.hand.angle = 0;

						gameInfo.pointerStart = gameInfo.pointerStartP;
						gameInfo.pointerEnd = gameInfo.pointerEndP;
					}

					if(gameInfo.tutStage == 6 || gameInfo.tutStage == 7){

						gameInfo.hand.x = gameInfo.pointerStart.x;
						gameInfo.hand.y = gameInfo.pointerStart.y;
					}

					if(gameInfo.tutStage >= 8){

						gameInfo.hand.x = gameInfo.pointerStart.x - gameInfo.pointerProgress;
						gameInfo.hand.y = gameInfo.pointerStart.y;

						gameInfo.powerBarMask.x = 0;
						gameInfo.powerBarMask.y = gameInfo.pointerProgress;

					}
				}



			}



			gameInfo.guiPanel1.x = game.width / 2 - gameInfo.guiPanel2.width / 2 - 20 + 25;
			gameInfo.guiPanel1.y = 90 + 10;

			gameInfo.guiPanel2.x = game.width / 2 + 25;
			gameInfo.guiPanel2.y = 90 + 10;

			gameInfo.guiPanel3.x = game.width / 2 + gameInfo.guiPanel2.width / 2 + 20 + 25;
			gameInfo.guiPanel3.y = 90 + 10;

			gameInfo.timerText.x = gameInfo.guiPanel3.x + gameInfo.guiPanel3.width / 2;
			gameInfo.timerText.y = 90 + 10;

			gameInfo.scoreText.x = game.width / 2 + 25,
			gameInfo.scoreText.y = 90 + 10;

			gameInfo.multiplierText.x = gameInfo.guiPanel1.x - gameInfo.guiPanel1.width / 2;
			gameInfo.multiplierText.y = 90 + 10;






			gameInfo.menuButton.x = game.width - 65;
			gameInfo.menuButton.y = 5;
			gameInfo.menuButton.scale = new Point(.9, .9);



			//power bar

			if(game.device.touch){
				gameInfo.powerBar.angle = -90;
				gameInfo.powerBar.x = 60;
				gameInfo.powerBar.y = game.height / 2;
				gameInfo.powerBarCueMask.clear();
				gameInfo.powerBarCueMask.beginFill(0xffffff);
				gameInfo.powerBarCueMask.drawRect(gameInfo.powerBar.x, gameInfo.powerBar.y - 250, 26, 500);

				gameInfo.powerBarMask.clear();
				gameInfo.powerBarMask.beginFill(0xff0000);
				gameInfo.powerBarMask.drawRect(gameInfo.powerBar.x - 26, gameInfo.powerBar.y - 750, 26, 500);
			}


			gameInfo.successIcon.angle = 90;

			gameInfo.gameOverPanel.x = game.width / 2 + 35;
			gameInfo.gameOverPanel.y = game.height / 2;
			gameInfo.gameOverPanelBG.angle = -90;
			gameInfo.GOhighScoreIcon.x = 80;
			gameInfo.GOhighScoreIcon.y = -346;
			gameInfo.gameOverPanel.text2.x = 170;
			gameInfo.gameOverPanel.text2.y = -349;
			gameInfo.playerWin.x = -240;
			gameInfo.playerWin.y = -390;
			gameInfo.aiWin.x = -240;
			gameInfo.aiWin.y = -390;
			gameInfo.p1Icon.x = -240;
			gameInfo.p1Icon.y = -390;
			gameInfo.p2Icon.x = -240;
			gameInfo.p2Icon.y = -390;



			gameInfo.popUpPanel.x = game.width / 2 + 25;
			gameInfo.popUpPanel.y = game.height / 2;
			//gameInfo.popUpPanelBG.scale.x = 0.6;
			gameInfo.popUpPanelBG.angle = -90;

			gameInfo.quitButtonPU.x = 0;
			gameInfo.replayButtonPU.x = 0;
			gameInfo.playButtonPU.x = 0;
			gameInfo.muteButtonPU.x = 0;

			gameInfo.quitButtonPU.y = -80;
			gameInfo.replayButtonPU.y = -240;
			gameInfo.playButtonPU.y = 240;
			gameInfo.muteButtonPU.y = 80;


			//icons
			gameInfo.humanIcon.x = 170;
			gameInfo.humanIcon.y = game.height - 95;
			gameInfo.humanIcon.scale = new Point(.9, .9);


			gameInfo.aiIcon.x = 170;
			gameInfo.aiIcon.y = game.height - 0;
			gameInfo.aiIcon.anchor = new Point(0, 1);
			gameInfo.aiIcon.scale = new Point(.9, .9);

			gameInfo.turnArrow1.x = 125;
			gameInfo.turnArrow1.y = game.height - 110;

			gameInfo.turnArrow2.x = 125;
			gameInfo.turnArrow2.scale = new Point(1, 1);
			gameInfo.turnArrow2.y = game.height - 20;

			//racks
			gameInfo.rackSolids.x = game.width / 2 + 25;
			gameInfo.rackSolids.y = game.height - 100;

			gameInfo.rackStripes.x = game.width / 2 + 25;
			gameInfo.rackStripes.y = game.height - 10;

			//if target types have already been set, may need to swap racks accordingly
			if(gameInfo.p1TargetType == "SOLIDS" ){
				gameInfo.rackStripes.y = game.height - 10;
				gameInfo.rackSolids.y = game.height - 100;
			}

			if(gameInfo.p1TargetType == "STRIPES" ){
				gameInfo.rackSolids.y = game.height - 10;
				gameInfo.rackStripes.y = game.height - 100;
			}

			gameInfo.spinSetter.x = game.width - 135;
			gameInfo.spinSetter.y = game.height - 105;

			gameInfo.spinSetterZoom.x = game.width / 2 + 30;
			gameInfo.spinSetterZoom.y = game.height / 2 - 50;

			gameInfo.foulWindow.x = game.width / 2 + 25;
			gameInfo.foulWindow.y = game.height / 2;

			if(typeof window.famobi.audio !== "undefined" && !window.famobi.audio.hasControls()) {
				gameInfo.muteButtonPU.visible = false;
				gameInfo.quitButtonPU.y += 80;
			}


		}else{

			//set to landscape mode
			gameInfo.landscape = true;
			//game.scale.setGameSize(1024, 690);
			game.scale.setGameSize(1920, 1080);

			gameInfo.gameCanvas.x = game.width / 2;
			gameInfo.gameCanvas.y = game.height / 2 - 75;



			//tutorial
			if(projectInfo.tutorial){

				if(game.device.touch){

					gameInfo.hand.scale.x = 1;
					gameInfo.hand.scale.y = 1;



					if(gameInfo.tutStage >= 6){
						gameInfo.hand.angle = 180;

						gameInfo.pointerStart = gameInfo.pointerStartL;
						gameInfo.pointerEnd = gameInfo.pointerEndL;
					}

					if(gameInfo.tutStage == 6 || gameInfo.tutStage == 7){

						gameInfo.hand.x = gameInfo.pointerStart.x;
						gameInfo.hand.y = gameInfo.pointerStart.y;
					}

					if(gameInfo.tutStage >= 8){

						gameInfo.hand.x = gameInfo.pointerStart.x - gameInfo.pointerProgress;
						gameInfo.hand.y = gameInfo.pointerStart.y;

						gameInfo.powerBarMask.y = 0;
						gameInfo.powerBarMask.x = -gameInfo.pointerProgress;
					}
				}


			}


			//racks
			gameInfo.rackSolids.x = game.width / 4;
			gameInfo.rackSolids.y = game.height - 40;

			gameInfo.rackStripes.x = 3 * game.width / 4;
			gameInfo.rackStripes.y = game.height - 40;

			//if target types have already been set, may need to swap racks accordingly
			if(gameInfo.p1TargetType == "SOLIDS" ){
				gameInfo.rackSolids.x = game.width / 4;
				gameInfo.rackStripes.x = 3 * game.width / 4;
			}

			if(gameInfo.p1TargetType == "STRIPES" ){
				gameInfo.rackSolids.x = 3 * game.width / 4;
				gameInfo.rackStripes.x = game.width / 4;
			}

			//top panels

			/*
			gameInfo.guiPanel1.x = game.width / 2 - gameInfo.guiPanel2.width / 2 - 20;
			gameInfo.guiPanel1.y = 20;

			gameInfo.guiPanel2.x = game.width / 2;
			gameInfo.guiPanel2.y = 20;

			gameInfo.guiPanel3.x = game.width / 2 + gameInfo.guiPanel2.width / 2 + 20;
			gameInfo.guiPanel3.y = 20;

			gameInfo.timerText.x = gameInfo.guiPanel3.x + gameInfo.guiPanel3.width / 2;
			gameInfo.timerText.y = 40;

			gameInfo.scoreText.x = game.width / 2,
			gameInfo.scoreText.y = 40;

			gameInfo.multiplierText.x = gameInfo.guiPanel1.x - gameInfo.guiPanel1.width / 2;
			gameInfo.multiplierText.y = 40;
			*/

			gameInfo.guiPanel1.x = game.width / 2 - gameInfo.guiPanel2.width / 2 - 20;
			gameInfo.guiPanel1.y = game.height - 40;

			gameInfo.guiPanel2.x = game.width / 2;
			gameInfo.guiPanel2.y = game.height - 40;

			gameInfo.guiPanel3.x = game.width / 2 + gameInfo.guiPanel2.width / 2 + 20;
			gameInfo.guiPanel3.y = game.height - 40;

			gameInfo.timerText.x = gameInfo.guiPanel3.x + gameInfo.guiPanel3.width / 2;
			gameInfo.timerText.y = game.height - 40;

			gameInfo.scoreText.x = game.width / 2,
			gameInfo.scoreText.y = game.height - 40;

			gameInfo.multiplierText.x = gameInfo.guiPanel1.x - gameInfo.guiPanel1.width / 2;
			gameInfo.multiplierText.y = game.height - 40;




			//rotate table
			gameInfo.gameCanvas.angle = 0;




			//icons
			gameInfo.humanIcon.x = 120;
			gameInfo.humanIcon.y = game.height - 20;
			gameInfo.humanIcon.anchor = new Point(0, 1);
			gameInfo.humanIcon.scale = new Point(1, 1);

			gameInfo.aiIcon.x = game.width - 120 - gameInfo.aiIcon.width;
			gameInfo.aiIcon.y = game.height - 20;
			gameInfo.aiIcon.anchor = new Point(0, 1);
			gameInfo.aiIcon.scale = new Point(1, 1);

			gameInfo.turnArrow1.x = 75;
			gameInfo.turnArrow1.y = game.height - 40;

			gameInfo.turnArrow2.x = game.width - 75;
			gameInfo.turnArrow2.y = game.height - 40;
			gameInfo.turnArrow2.scale = new Point(-1, 1);







			//buttons
			gameInfo.menuButton.x = game.width - 80;
			gameInfo.menuButton.y = 20;
			gameInfo.menuButton.scale = new Point(1, 1);

			gameInfo.spinSetter.x = game.width - 80;
			gameInfo.spinSetter.y = game.height / 2;

			gameInfo.spinSetterZoom.x = game.width / 2;
			gameInfo.spinSetterZoom.y = game.height / 2 - 75;


			//gameInfo.menuButton.scale = new Point(.5, .5);

			//gameInfo.muteButton.x = gameInfo.quitButton.x + gameInfo.quitButton.width + 5;
			//gameInfo.muteButton.y = game.height - 30;
			//gameInfo.muteButton.scale = new Point(.5, .5);

			//power bar
			/*
			if(game.device.touch){
				gameInfo.powerBar.angle = 0;
				gameInfo.powerBar.x = game.width / 2;
				gameInfo.powerBar.y = game.height - 100;
				gameInfo.powerBarCueMask.clear();
				gameInfo.powerBarCueMask.beginFill(0xffffff);
				gameInfo.powerBarCueMask.drawRect(gameInfo.powerBar.x - 250, gameInfo.powerBar.y, 500, 26);

				gameInfo.powerBarMask.clear();
				gameInfo.powerBarMask.beginFill(0xff0000);
				gameInfo.powerBarMask.drawRect(gameInfo.powerBar.x + 250, gameInfo.powerBar.y - 26, 500, 26);
			}
			*/

			if(game.device.touch){
				gameInfo.powerBar.angle = -90;
				gameInfo.powerBar.x = 100;
				gameInfo.powerBar.y = game.height / 2;
				gameInfo.powerBarCueMask.clear();
				gameInfo.powerBarCueMask.beginFill(0xffffff);
				gameInfo.powerBarCueMask.drawRect(gameInfo.powerBar.x, gameInfo.powerBar.y - 250, 26, 500);

				gameInfo.powerBarMask.clear();
				gameInfo.powerBarMask.beginFill(0xff0000);
				gameInfo.powerBarMask.drawRect(gameInfo.powerBar.x - 26, gameInfo.powerBar.y - 750, 26, 500);
			}


			gameInfo.successIcon.angle = 0;


			gameInfo.gameOverPanel.x = game.width / 2;
			gameInfo.gameOverPanel.y = game.height / 2 - 10 - 75;
			gameInfo.gameOverPanelBG.angle = 0;
			gameInfo.GOhighScoreIcon.x = 220;
			gameInfo.GOhighScoreIcon.y = -246;
			gameInfo.gameOverPanel.text2.x = 300;
			gameInfo.gameOverPanel.text2.y = -249;
			gameInfo.playerWin.x = -433;
			gameInfo.playerWin.y = -272;
			gameInfo.aiWin.x = -433;
			gameInfo.aiWin.y = -272;
			gameInfo.p1Icon.x = -393;
			gameInfo.p1Icon.y = -252;
			gameInfo.p2Icon.x = -393;
			gameInfo.p2Icon.y = -252;

			gameInfo.popUpPanel.x = game.width / 2;
			gameInfo.popUpPanel.y = game.height / 2 - 75;
			gameInfo.popUpPanelBG.angle = 0;


			gameInfo.quitButtonPU.x = -80;
			gameInfo.replayButtonPU.x = -240;
			gameInfo.playButtonPU.x = 240;
			gameInfo.muteButtonPU.x = 80;

			gameInfo.quitButtonPU.y = 0;
			gameInfo.replayButtonPU.y = 0;
			gameInfo.playButtonPU.y = 0;
			gameInfo.muteButtonPU.y = 0;

			gameInfo.foulWindow.x = game.width / 2;
			gameInfo.foulWindow.y = game.height / 2 - 75;

			if(typeof window.famobi.audio !== "undefined" && !window.famobi.audio.hasControls()) {
				gameInfo.muteButtonPU.visible = false;
				gameInfo.quitButtonPU.x += 80;
			}

		}

		//objects which need moving but take the same values regardless of orientation (eg. relative to other items which have changed)

		//console.log("window height: " + window.innerHeight);
		//console.log("game height: " + document.getElementById("game").clientHeight);


		var margin = String(Math.abs(window.innerHeight - document.getElementById("mygame").clientHeight) / 2) + "px";
		//document.getElementById("game").style.marginTop = margin;

		gameInfo.debugText.x = game.width - 25;
		gameInfo.debugText.y = 30;

		gameInfo.successIcon.x = 0;
		gameInfo.successIcon.y = 0;







	}


	this.gameInfo = new Object(); //gameInfo is a property of playState
	var gameInfo = this.gameInfo;

	initGameInfo();
	initLevel();
	initScoreAndTime();
	initCanvases();
	initBG();
	initTable();
	initBonusStar();
	initBalls();
	initGuide();
	initGUI();
	initCue();
	initContactListener();
	initPhysics();
	renderScreen();
	initTimer();
	initLevelText();
	initTutorial();
	setTurn();
	resizeGame();


	gameInfo.gameRunning = true;



	window.addEventListener('blur', pause);
	window.addEventListener('focus', unpause);

	window.onblur = function(){
		pause();
	}
	window.onfocus = function(){
		unpause();
	}

	function handleVisibilityChange() {
	  if (document.hidden) {
	    pause();
	  } else  {
	    unpause();
	  }
	}

	document.addEventListener("visibilitychange", handleVisibilityChange, false);


	function pause(){

		if(gameInfo.paused != true){

			gameToPopUpMenu();

			//audioContext = game.sound.context;

			//console.log("pausing audio: context:", audioContext);

			//if (game.sound.state==='running' && UrlUtil.isSafariOrIOS(game.scene.getScene('Main'))) {
				//console.log('suspending audio');
				//audioContext.suspend();
			//}

			gameInfo.paused = true;

			game.sound.stopAll();
			game.sound.removeAll();
			//game.sound.destroy();
		}

	}


	function unpause(){

		//var audioContext = new ((window).AudioContext || (window).webkitAudioContext)();
		//game.sound = audioContext;  //chrome didn't like us doing this.

		game.sound.setTouchLock();
		game.sound.unlock();
		//


		setTimeout(function(){



			//if (game.sound.state==='suspended' && UrlUtil.isSafariOrIOS(game.scene.getScene('Main'))) {

				//var audioContext = new ((window).AudioContext || (window).webkitAudioContext)();
				//game.sound = new Phaser.SoundManager(game);
				//game.sound.context = audioContext;

				//audioContext = game.sound.context;
				//console.log('resuming audio')
				//audioContext.resume();

			//}
		}, 1000);

		gameInfo.paused = false;

	}






	function setTurn(){

		if(projectInfo.lastBreaker == "none"){

			if(Math.random() < 0.5){
				gameInfo.turn = "p1";
				gameInfo.turnArrow1.frame = 1;
				gameInfo.turnArrow2.frame = 0;

			}else{

				gameInfo.turn = "p2";
				gameInfo.turnArrow1.frame = 0;
				gameInfo.turnArrow2.frame = 1;
			}
		}else{
			//this is a re-rack due to a foul, so switch turns
			if(projectInfo.lastBreaker == "p2"){
				gameInfo.turn = "p1";
				gameInfo.turnArrow1.frame = 1;
				gameInfo.turnArrow2.frame = 0;
			}else{
				gameInfo.turn = "p2";
				gameInfo.turnArrow1.frame = 0;
				gameInfo.turnArrow2.frame = 1;
			}
		}
	}


	function initTutorial(){

		//tutorial
		if(projectInfo.tutorial == true){

			if(game.device.touch){
				gameInfo.hand = new Phaser.Sprite(game, 0, 0, 'hand');
				gameInfo.tutCanvas.addChild(gameInfo.hand);
				gameInfo.hand.alpha = 0;
				//gameInfo.hand.anchor = new Point(.5, .5);
				//gameInfo.hand.angle = -45;


			}else{
				gameInfo.mouseSprite = new Phaser.Sprite(game, 0, 0, 'mouseSprite');
				gameInfo.tutCanvas.addChild(gameInfo.mouseSprite);
				gameInfo.mouseSprite.alpha = 0;
				gameInfo.mouseSprite.anchor = new Point(1, -0.5);
				//gameInfo.mouseSprite.angle = -45;
			}

		}
	}

	function initLevel(){

		if(projectInfo.levelComplete == false){
			projectInfo.level = 1;
		}else{

			//if(projectInfo.level < gameInfo.numLevels){
				projectInfo.level ++;
			//}
		}

		if(projectInfo.tutorial == false){

			window.famobi_analytics.trackScreen("SCREEN_LEVEL");

		}

		window.famobi_analytics.trackEvent("EVENT_LIVESCORE", {liveScore: 0});
	}







	function initScoreAndTime(){

		if(projectInfo.levelComplete == false){
			projectInfo.score = 0;
			projectInfo.score2 = 0
		}else{
			projectInfo.levelComplete = false;
		}


		switch(projectInfo.level){

			case 1: projectInfo.startTime = 50; break;
			case 2: projectInfo.startTime = 60; break;
			case 3: projectInfo.startTime = 80; break;
			case 4: projectInfo.startTime = 90; break;
			case 5: projectInfo.startTime = 100; break;

		}

		if(projectInfo.level >= gameInfo.numLevels){

			projectInfo.startTime -= 10;
		}
	}

	function initGameInfo(){



		//var gameInfo = new Object(); //already defined globally in boot.js, this is here to reset it.
		//set gameInfo properties

		gameInfo.adjustmentScale = 2.3; //converts many variables throughout the code to account for a change in the original table size of 60000x30000 physics units or 600x300 pixels
		gameInfo.settingSpin = false;

		gameInfo.pointerStartL = new Point(-850, -200);
		gameInfo.pointerStartP = new Point(100, -450);
		gameInfo.pointerEndL = new Point(-850, -50);
		gameInfo.pointerEndP = new Point(-80, -450);
		gameInfo.pointerProgress = 0;


		gameInfo.numLevels = 6;
		gameInfo.ballRadius = gameInfo.adjustmentScale * 1000;//1.4 * 1000 * 1.7; //800
		gameInfo.physScale = 0.01; //physics values are 100 times bigger than screen values.  Helps increase precision without increasing number of decimal places
		gameInfo.friction = 1.5;
		gameInfo.gameOver = false;
		gameInfo.counter = 0;
		gameInfo.transferCounter = 0;
		gameInfo.bonusStarOn = false;
		gameInfo.starNumber = 2;
		gameInfo.timerStarted = false;
		gameInfo.ballPotted = false;
		gameInfo.ballsPotted = 0;
		gameInfo.fouled = false;
		gameInfo.multiplier = 1;
		gameInfo.multiplier2 = 1;
		gameInfo.frictionSpeedThreshold = 85;
		gameInfo.pocketRadius = 2250;
		gameInfo.minVelocity = 2;
		gameInfo.cushionRestitution = .60; //.56
		gameInfo.ballRestitution = .94; //.91
		gameInfo.maxPower = 5000;
		gameInfo.trial = false;
		gameInfo.overlap = false; // debugging
		gameInfo.cueBallInHand = true;
		gameInfo.preventAim = false;
		gameInfo.preventSetPower = false;
		gameInfo.preventUpdateCue = false;
		gameInfo.cueSet = false;
		gameInfo.shotRunning = false;
		gameInfo.settingPower = false;
		gameInfo.executeStrike = false;
		gameInfo.beginStrike = false;
		gameInfo.cueTweenComplete = false;
		gameInfo.firstTouch = false;
		gameInfo.tutStage = 0;
		gameInfo.shotComplete = false;
		gameInfo.rulingsApplied = false;
		gameInfo.shotNum = 0;
		gameInfo.scratched = false;
		gameInfo.trial = false;
		gameInfo.pottedBallArray = new Array();
		gameInfo.time = 0;
		gameInfo.time2 = 0;
		gameInfo.scratchFoulShown = false;

		//added from bb5
		gameInfo.p1TargetType = "ANY";
		gameInfo.p2TargetType = "ANY";
		gameInfo.scratch = false;
		gameInfo.foulMessage = "";
		gameInfo.shotNum = 0; //increased when either play
		gameInfo.turnExtended = false;
		gameInfo.ballsPottedSameType = false;
		gameInfo.typesPotted = "";
		gameInfo.trial = false;
		gameInfo.initVars = false;
		gameInfo.shotReset = true;

		gameInfo.drawGuide = true;
		gameInfo.allowTransferPoints = false;
		gameInfo.placedInCenter = false;
		gameInfo.foulDisplayComplete = true;
		gameInfo.transfer1Complete = true;
		gameInfo.transfer2Complete = true;





		gameInfo.aimDirectionVector = new Vector2D(1, 0).normalize();






	}

	function initLevelText(){


		gameInfo.levelText = new Phaser.BitmapText(game, 0, -100, 'font1', projectInfo.level, 48);
		gameInfo.timerCanvas.addChild(gameInfo.levelText);
		gameInfo.levelText.anchor.x = 0.5;
		gameInfo.levelText.anchor.y = 0.5;
		gameInfo.levelText.alpha = 0.2;

		gameInfo.successIcon = new Phaser.Sprite(game, 0, 0, "success");
		gameInfo.timerCanvas.addChild(gameInfo.successIcon);
		gameInfo.successIcon.visible = false;
		gameInfo.successIcon.anchor = new Point(.5, .5);
		gameInfo.successIcon.alpha = 0.25;

		if(projectInfo.tutorial == true){
			gameInfo.levelText.visible = false;
		}

		gameInfo.levelText.visible = false;

	}


	function initTimer(){

		//moved to initGUI and timer text now placed on gui canvas
	}

	function initBonusStar(){

		//bonus star which appears in various pockets
		/*

		gameInfo.bonusStars = new Array();

		for(var n = 0; n < 6; n ++){
			gameInfo.bonusStars[n] = new Phaser.Sprite(game, 0, 0, 'bonusDisc', 1);
			gameInfo.tableCanvas.addChild(gameInfo.bonusStars[n]);
			gameInfo.bonusStars[n].x = gameInfo.pocketArray[n].starPosition.x * gameInfo.physScale;
			gameInfo.bonusStars[n].y = gameInfo.pocketArray[n].starPosition.y * gameInfo.physScale;
			gameInfo.bonusStars[n].anchor = new Point(.5, .5);
			gameInfo.bonusStars[n].scale.x = .8;
			gameInfo.bonusStars[n].scale.y = .8;
			gameInfo.bonusStars[n].visible = false;

		}
		*/


	}

	function initBG(){




	}



	function initGUI(){



		//debug
		gameInfo.debugText = new Phaser.BitmapText(game, game.width - 1, 20, 'font6', "", 34);
		gameInfo.guiCanvas.addChild(gameInfo.debugText);
		gameInfo.debugText.anchor.x = 1;

		gameInfo.debugText.visible = false;

		gameInfo.spinSetter = new Phaser.Sprite(game, 0, 0, 'spinSetterSmall');
		gameInfo.guiCanvas.addChild(gameInfo.spinSetter);
		gameInfo.spinSetter.anchor = new Point(.5, .5);
		gameInfo.spinSetter.inputEnabled = true;
		gameInfo.spinSetter.ignoreChildInput = true;
		gameInfo.cueBallSpot = new Phaser.Sprite(game, 0, 0, 'cueBallSpot');
		gameInfo.spinSetter.addChild(gameInfo.cueBallSpot);
		gameInfo.cueBallSpot.anchor = new Point(.5, .5);

		gameInfo.spinSetterZoom = new Phaser.Sprite(game, 0, 0, 'spinSetterZoom');
		gameInfo.guiCanvas.addChild(gameInfo.spinSetterZoom);
		gameInfo.spinSetterZoom.anchor = new Point(.5, .5);
		gameInfo.spinSetterZoom.inputEnabled = true;
		gameInfo.spinSetterZoom.ignoreChildInput = true;
		gameInfo.cueBallSpotZoom = new Phaser.Sprite(game, 0, 0, 'cueBallSpotZoom');
		gameInfo.spinSetterZoom.addChild(gameInfo.cueBallSpotZoom);
		gameInfo.cueBallSpotZoom.anchor = new Point(.5, .5);
		gameInfo.spinSetterZoom.visible = false;


		gameInfo.rackSolids = new Phaser.Group(game, gameInfo.guiCanvas, 'rackSolids');
		gameInfo.rackBGSolids = new Phaser.Sprite(game, 0, 0, 'rackBG');
		gameInfo.rackSolids.addChild(gameInfo.rackBGSolids);
		gameInfo.rackBGSolids.x = 1;
		gameInfo.rackBGSolids.y = 0;
		gameInfo.rackBGSolids.anchor = new Point(0.5, 1);
		gameInfo.rackBGSolids.alpha = 0.6;

		gameInfo.rackSolidsArray = new Array();

		gameInfo.rackSpotNumberArray = new Array(); //allows us to store all the balls in both racks as a single array where the index is the spot number

		for(var n = 0; n < 7; n ++){

			//var ballString = "guiSolid" + n;
			//gameInfo[ballString] = new Phaser.Sprite(game, 0, 0, 'guiSolids', n);

			gameInfo.rackSolidsArray[n] = new Phaser.Sprite(game, 0, 0, 'guiSolids', n);

			gameInfo.rackSolids.addChild(gameInfo.rackSolidsArray[n]);
			gameInfo.rackSolidsArray[n].x = -200 + n * 50;
			gameInfo.rackSolidsArray[n].y = 7;
			gameInfo.rackSolidsArray[n].anchor = new Point(0, 1);
			gameInfo.rackSolidsArray[n].visible = false;

			gameInfo.rackSpotNumberArray[n + 1] = gameInfo.rackSolidsArray[n]


		}

		gameInfo.rackSolids8ball = new Phaser.Sprite(game, 0, 0, '8ball');
		gameInfo.rackSolids.addChild(gameInfo.rackSolids8ball);
		gameInfo.rackSolids8ball.x = -185;
		gameInfo.rackSolids8ball.y = -11;
		gameInfo.rackSolids8ball.anchor = new Point(0, 1);
		gameInfo.rackSolids8ball.visible = false;

		//gameInfo.guiSolid5.visible = false;
		//gameInfo.guiSolid2.visible = false;


		gameInfo.rackStripes = new Phaser.Group(game, gameInfo.guiCanvas, 'rackStripes');
		gameInfo.rackBGStripes = new Phaser.Sprite(game, 0, 0, 'rackBG');
		gameInfo.rackStripes.addChild(gameInfo.rackBGStripes);
		gameInfo.rackBGStripes.x = 1;
		gameInfo.rackBGStripes.y = 0;
		gameInfo.rackBGStripes.anchor = new Point(0.5, 1);
		gameInfo.rackBGStripes.alpha = 0.6;

		gameInfo.rackStripesArray = new Array();

		for(var n = 0; n < 7; n ++){

			var ballString = "guiStripe" + n;
			gameInfo.rackStripesArray[n] = new Phaser.Sprite(game, 0, 0, 'guiStripes', n);
			gameInfo.rackStripes.addChild(gameInfo.rackStripesArray[n]);
			gameInfo.rackStripesArray[n].x = -200 + n * 50;
			gameInfo.rackStripesArray[n].y = 7;
			gameInfo.rackStripesArray[n].anchor = new Point(0, 1);
			gameInfo.rackStripesArray[n].visible = false;

			gameInfo.rackSpotNumberArray[n + 9] = gameInfo.rackStripesArray[n]
		}

		gameInfo.rackStripes8ball = new Phaser.Sprite(game, 0, 0, '8ball');
		gameInfo.rackStripes.addChild(gameInfo.rackStripes8ball);
		gameInfo.rackStripes8ball.x = -185;
		gameInfo.rackStripes8ball.y = -11;
		gameInfo.rackStripes8ball.anchor = new Point(0, 1);
		gameInfo.rackStripes8ball.visible = false;

		//gameInfo.guiStripe4.visible = false;
		//gameInfo.guiStripe6.visible = false;

		gameInfo.turnArrow1 = new Phaser.Sprite(game, 0, 0, 'turnArrow');
		gameInfo.guiCanvas.addChild(gameInfo.turnArrow1);
		gameInfo.turnArrow1.anchor = new Point(0.5, 1);

		gameInfo.turnArrow2 = new Phaser.Sprite(game, 0, 0, 'turnArrow');
		gameInfo.guiCanvas.addChild(gameInfo.turnArrow2);
		gameInfo.turnArrow2.anchor = new Point(0.5, 1);
		gameInfo.turnArrow2.scale = new Point(-1, 1);


		gameInfo.humanIcon = new Phaser.Sprite(game, 0, 0, 'humanIcon');
		if(projectInfo.mode == 2){
			var p1Text = new Phaser.BitmapText(game, 45, 25 - gameInfo.humanIcon.height, 'font6', '1', 43);
			p1Text.tint = 0;
			gameInfo.humanIcon.addChild(p1Text);
		}
		gameInfo.guiCanvas.addChild(gameInfo.humanIcon);
		gameInfo.humanIcon.anchor = new Point(0, 1);


		if(projectInfo.mode == 1){
			gameInfo.aiIcon = new Phaser.Sprite(game, 0, 0, 'aiIcon');
		}else{
			gameInfo.aiIcon = new Phaser.Sprite(game, 0, 0, 'humanIcon');
			var p2Text = new Phaser.BitmapText(game, 45, 25 - gameInfo.humanIcon.height, 'font6', '2', 43);
			p2Text.tint = 0;
			gameInfo.aiIcon.addChild(p2Text);
		}
		gameInfo.guiCanvas.addChild(gameInfo.aiIcon);
		gameInfo.aiIcon.anchor = new Point(1, 1);



		gameInfo.guiPanel1 = new Phaser.Sprite(game, 0, 0, 'guiPanel1');
		gameInfo.guiBaseCanvas.addChild(gameInfo.guiPanel1);
		gameInfo.guiPanel1.anchor.x = 1;
		gameInfo.guiPanel1.anchor.y = 1;

		gameInfo.guiPanel2 = new Phaser.Sprite(game, 0, 0, 'guiPanel1');
		gameInfo.guiBaseCanvas.addChild(gameInfo.guiPanel2);
		gameInfo.guiPanel2.anchor.x = 0.5;
		gameInfo.guiPanel2.anchor.y = 1;

		gameInfo.guiPanel3 = new Phaser.Sprite(game, 0, 0, 'guiPanel1');
		gameInfo.guiBaseCanvas.addChild(gameInfo.guiPanel3);
		gameInfo.guiPanel3.anchor.x = 0;
		gameInfo.guiPanel3.anchor.y = 1;


		gameInfo.timerText = new Phaser.BitmapText(game, 0, 0, 'font6', "0:00", 56);
		gameInfo.guiCanvas.addChild(gameInfo.timerText);
		gameInfo.timerText.anchor.x = 0.5;
		gameInfo.timerText.anchor.y = 1;
		//gameInfo.timerText.alpha = 0.2;




		//gameInfo.timerText.visible = false;



		//score
		//gameInfo.scoreIcon = new Phaser.Sprite(game, 0, 0, 'score');
		//gameInfo.guiCanvas.addChild(gameInfo.scoreIcon);
		//gameInfo.scoreIcon.anchor.x = 0;
		//gameInfo.scoreIcon.anchor.y = 0;
		//gameInfo.scoreIcon.alpha = 0.8;
		//gameInfo.scoreIcon.scale = new Point(.35, .35);

		gameInfo.scoreText = new Phaser.BitmapText(game, 0, 0, 'font6', projectInfo.score, 56);
		gameInfo.guiCanvas.addChild(gameInfo.scoreText);
		gameInfo.scoreText.anchor.x = 0.5;
		gameInfo.scoreText.anchor.y = 1;




		//gameInfo.scoreText.alpha = 0.8;

		//gameInfo.highScoreIcon = new Phaser.Sprite(game, 0, 0, 'highScore');
		//gameInfo.guiCanvas.addChild(gameInfo.highScoreIcon);
		//gameInfo.highScoreIcon.anchor.x = 1;
		//gameInfo.highScoreIcon.anchor.y = 0;
		//gameInfo.highScoreIcon.alpha = 0.9;
		//gameInfo.highScoreIcon.scale = new Point(.35, .35);

		//projectInfo.bestScoreText = new Phaser.BitmapText(game, 0, 0, 'font3', projectInfo.bestScore, 28);
		//gameInfo.guiCanvas.addChild(projectInfo.bestScoreText);
		//projectInfo.bestScoreText.anchor.x = 0;
		//projectInfo.bestScoreText.anchor.y = 0;
		//projectInfo.bestScoreText.alpha = 0.8;

		//multiplier



		//gameInfo.box = new Phaser.Sprite(game, 0, 0, "box");
		//gameInfo.guiCanvas.addChild(gameInfo.box);
		//gameInfo.box.anchor = new Point(1, 1);
		//gameInfo.box.alpha = 0;

		//gameInfo.bonusText = new Phaser.BitmapText(game, 0, 0, 'font3', "STREAK", 22);
		//gameInfo.bonusText.blendMode = 14;
		//gameInfo.guiCanvas.addChild(gameInfo.bonusText);
		//gameInfo.bonusText.anchor.x = 1;
		//gameInfo.bonusText.anchor.y = 1;
		//gameInfo.bonusText.alpha = 0;




		gameInfo.multiplierText = new Phaser.BitmapText(game, 0, 0, 'font6', "x" + gameInfo.multiplier, 56);
		gameInfo.guiCanvas.addChild(gameInfo.multiplierText);
		gameInfo.multiplierText.anchor.x = 0.5;
		gameInfo.multiplierText.anchor.y = 1;
		//gameInfo.multiplierText.alpha = 0.8;

		//restart game

		if(projectInfo.mode == 2){
			//gameInfo.timerText.visible = false;
			//gameInfo.scoreText.visible = false;
			//gameInfo.multiplierText.visible = false;
		}


		gameInfo.menuButton = new Phaser.Button(game, 0, 0, 'menuButton', gameToPopUpMenu, this, 1, 0, 1);
		gameInfo.guiCanvas.addChild(gameInfo.menuButton);
		gameInfo.menuButton.anchor = new Phaser.Point(.5, 0);
		//gameInfo.menuButton.scale = new Point(.6, .6);




		//power bar on touch devices
		if(game.device.touch){

			//gameInfo.gameCanvas.x -= 30;

			gameInfo.powerBar = new Phaser.Group(game, gameInfo.guiCanvas, 'powerBar');

			gameInfo.powerBarBG = new Phaser.Sprite(game, 0, 0,'powerBarBG');
			//gameInfo.powerBarBG.x = 0;
			//gameInfo.powerBarBG.y = 0;
			gameInfo.powerBarBG.anchor = new Point(.5, .5);
			gameInfo.powerBar.addChild(gameInfo.powerBarBG);

			gameInfo.powerBarBase = new Phaser.Sprite(game, 0, -13,'powerBarBase');
			gameInfo.powerBarBase.anchor = new Point(.5, .5);
			gameInfo.powerBar.addChild(gameInfo.powerBarBase);

			gameInfo.powerBarMask = game.add.graphics(gameInfo.powerBar.x, gameInfo.powerBar.y);
		    gameInfo.powerBarBase.mask = gameInfo.powerBarMask;

			gameInfo.powerBarTop = new Phaser.Sprite(game, 0, -13,'powerBarTop');
			gameInfo.powerBarTop.anchor = new Point(.5, .5);
			gameInfo.powerBar.addChild(gameInfo.powerBarTop);

			gameInfo.powerBarCue = new Phaser.Sprite(game, 250, 13, 'cue');
			gameInfo.powerBar.addChild(gameInfo.powerBarCue);
			gameInfo.powerBarCue.anchor = new Point(1, .5);

			gameInfo.powerBarCueMask = game.add.graphics(gameInfo.powerBar.x, gameInfo.powerBar.y);
		    gameInfo.powerBarCue.mask = gameInfo.powerBarCueMask;


		}

		//game over panel



		gameInfo.gameOverPanel = new Phaser.Group(game, gameInfo.guiCanvas, 'gameOverPanel');
		gameInfo.gameOverPanel.anchor = new Point(.5, .5);

		gameInfo.gameOverPanel.visible = false;


		gameInfo.gameOverPanelBG = new Phaser.Sprite(game, 0, 0, 'panel3');
		gameInfo.gameOverPanelBG.anchor = new Point(.5, .5);
		gameInfo.gameOverPanel.addChild(gameInfo.gameOverPanelBG);

		gameInfo.gameOverWindow = new Phaser.Sprite(game, -180, -201, 'guiPanel2');
		gameInfo.gameOverPanel.addChild(gameInfo.gameOverWindow);

		gameInfo.aiWin = new Phaser.Sprite(game, -463, -242, 'aiWin');
		gameInfo.gameOverPanel.addChild(gameInfo.aiWin);
		gameInfo.aiWin.visible = false;

		gameInfo.playerWin = new Phaser.Sprite(game, -463, -242, 'playerWin');
		gameInfo.gameOverPanel.addChild(gameInfo.playerWin);
		gameInfo.playerWin.visible = false;

		gameInfo.GOscoreIcon = new Phaser.Sprite(game, -78, -186, 'score');
		gameInfo.gameOverPanel.addChild(gameInfo.GOscoreIcon);

		gameInfo.GOhighScoreIcon = new Phaser.Sprite(game, 270, -216, 'highScore');
		gameInfo.gameOverPanel.addChild(gameInfo.GOhighScoreIcon);

		gameInfo.GOaiLevel = new Phaser.Sprite(game, 35, -49, 'aiLevel');
		gameInfo.gameOverPanel.addChild(gameInfo.GOaiLevel);

		gameInfo.GOclockIcon = new Phaser.Sprite(game, -194, -43, 'clockIcon');
		gameInfo.gameOverPanel.addChild(gameInfo.GOclockIcon);

		gameInfo.p1Icon = new Phaser.Sprite(game, -158, -119, 'humanIcon');
		gameInfo.gameOverPanel.addChild(gameInfo.p1Icon);
		var p1Text = new Phaser.BitmapText(game, 45, 25, 'font6', '1', 43);
		p1Text.tint = 0;
		gameInfo.p1Icon.addChild(p1Text);
		var rosette = new Phaser.Sprite(game, -35, -12, 'rosette');
		gameInfo.p1Icon.addChild(rosette);
		gameInfo.p1Icon.rosette = rosette;
		//gameInfo.p1Icon.rosette.visible = false;
		gameInfo.p1Icon.visible = false;

		gameInfo.p2Icon = new Phaser.Sprite(game, 42, -119, 'humanIcon');
		gameInfo.gameOverPanel.addChild(gameInfo.p2Icon);
		var p2Text = new Phaser.BitmapText(game, 45, 25, 'font6', '2', 43);
		p2Text.tint = 0;
		gameInfo.p2Icon.addChild(p2Text);
		var rosette = new Phaser.Sprite(game, -35, -12, 'rosette');
		gameInfo.p2Icon.addChild(rosette);
		gameInfo.p2Icon.rosette = rosette;
		//gameInfo.p2Icon.rosette.visible = false;
		gameInfo.p2Icon.visible = false;





		//gameInfo.GOrosette = new Phaser.Sprite(game, -313, -42, 'rosette');
		//gameInfo.gameOverPanel.addChild(gameInfo.GOrosette);

		gameInfo.gameOverPanel.text1 = new Phaser.BitmapText(game, 31, -183, 'font6', 'xxx', 56);
		gameInfo.gameOverPanel.text2 = new Phaser.BitmapText(game, 360, -209, 'font6', 'xxx', 56);
		gameInfo.gameOverPanel.text3 = new Phaser.BitmapText(game, -110, -28, 'font6', 'xxx', 56);
		gameInfo.gameOverPanel.text4 = new Phaser.BitmapText(game, 135, -28, 'font6', 'xxx', 56);
		//gameInfo.gameOverPanel.text5 = new Phaser.BitmapText(game, 256, -28, 'font6', 'xxx', 56);

		gameInfo.gameOverPanel.addChild(gameInfo.gameOverPanel.text1);
		gameInfo.gameOverPanel.addChild(gameInfo.gameOverPanel.text2);
		gameInfo.gameOverPanel.addChild(gameInfo.gameOverPanel.text3);
		gameInfo.gameOverPanel.addChild(gameInfo.gameOverPanel.text4);
		//gameInfo.gameOverPanel.addChild(gameInfo.gameOverPanel.text5);

		//return to main menu
		gameInfo.quitButton2 = new Phaser.Button(game,  9, 70, 'quitButton', gameToMenu, this, 1, 0, 1);
		gameInfo.gameOverPanel.addChild(gameInfo.quitButton2);

		//restart game
		gameInfo.replayButton = new Phaser.Button(game, -181, 70, 'replayButton', replayGame, this, 1, 0, 1);
		gameInfo.gameOverPanel.addChild(gameInfo.replayButton);

		gameInfo.quitButton2.input.enabled = false;
		gameInfo.replayButton.input.enabled = false;


		//========================================= pop up menu ===========================================

		gameInfo.popUpPanel = new Phaser.Group(game, gameInfo.guiCanvas, 'popUpPanel');
		gameInfo.popUpPanel.anchor = new Point(.5, .5);

		gameInfo.popUpPanel.visible = false;

		gameInfo.popUpPanelBG = new Phaser.Sprite(game, 0, 0, 'panel');
		gameInfo.popUpPanelBG.anchor = new Point(.5, .5);
		gameInfo.popUpPanel.addChild(gameInfo.popUpPanelBG);

		//return to main menu
		gameInfo.quitButtonPU = new Phaser.Button(game,  -57, 0, 'quitButton', gameToMenu, this, 1, 0, 1, 0);
		gameInfo.popUpPanel.addChild(gameInfo.quitButtonPU);
		gameInfo.quitButtonPU.anchor = new Phaser.Point(.5, .5);

		//restart game
		gameInfo.replayButtonPU = new Phaser.Button(game, -170, 0, 'replayButton', replayGame, this, 1, 0, 1, 0);
		gameInfo.popUpPanel.addChild(gameInfo.replayButtonPU);
		gameInfo.replayButtonPU.anchor = new Phaser.Point(.5, .5);

		//resume game
		gameInfo.playButtonPU = new Phaser.Button(game, 170, 0, 'playButtonSmall', resume, this, 1, 0, 1, 0);
		gameInfo.popUpPanel.addChild(gameInfo.playButtonPU);
		gameInfo.playButtonPU.anchor = new Phaser.Point(.5, .5);

		//mute button
		gameInfo.muteButtonPU = new Phaser.Button(game, 57, 0, 'muteButton', toggleSound, this, 1, 0, 1, 0);
		gameInfo.popUpPanel.addChild(gameInfo.muteButtonPU);
		gameInfo.muteButtonPU.anchor = new Phaser.Point(.5, .5);

		if(typeof window.famobi.audio !== "undefined" && !window.famobi.audio.hasControls()) {
			gameInfo.muteButtonPU.visible = false;
		}

		if(Sound.on == true){
			gameInfo.muteButtonPU.setFrames(1, 0, 1, 0);
		}else{
			gameInfo.muteButtonPU.setFrames(3, 2, 3, 2);
		}



		gameInfo.quitButtonPU.input.enabled = false;
		gameInfo.replayButtonPU.input.enabled = false;
		gameInfo.playButtonPU.input.enabled = false;
		gameInfo.muteButtonPU.input.enabled = false;

		//=========================================================================================





		//===================   FOULD WINDOW   =======================================

		gameInfo.foulWindow = new Phaser.Group(game, gameInfo.guiCanvas, 'foulWindow');
		gameInfo.foulWindow.visible = false;

		gameInfo.foulWindow.background = new Phaser.Sprite(game, 0, 0, 'foulDisplay');
		gameInfo.foulWindow.addChild(gameInfo.foulWindow.background);
		gameInfo.foulWindow.background.anchor = new Point(.5, .5);


		gameInfo.foulWindow.display1 = new Phaser.Sprite(game, -172, -126, 'illegalContacts');
		gameInfo.foulWindow.addChild(gameInfo.foulWindow.display1);
		var cross = new Phaser.Sprite(game, gameInfo.foulWindow.display1.width / 2, gameInfo.foulWindow.display1.height / 2 + 20, 'cross');
		cross.anchor = new Point(.5, 0);
		gameInfo.foulWindow.display1.addChild(cross);

		gameInfo.foulWindow.display2 = new Phaser.Sprite(game, -172, 30, 'illegalContacts');
		gameInfo.foulWindow.addChild(gameInfo.foulWindow.display2);
		var tick = new Phaser.Sprite(game, gameInfo.foulWindow.display2.width / 2, gameInfo.foulWindow.display2.height / 2 + 20, 'tick');
		tick.anchor = new Point(.5, 0);
		gameInfo.foulWindow.display2.addChild(tick);

		gameInfo.foulWindow.display3 = new Phaser.Sprite(game, 0, 0, 'illegalShots');
		gameInfo.foulWindow.addChild(gameInfo.foulWindow.display3);
		gameInfo.foulWindow.display3.anchor = new Point(.5, .5);

		gameInfo.foulWindow.display4 = new Phaser.Sprite(game, 0, 0, 'illegalBreak');
		gameInfo.foulWindow.addChild(gameInfo.foulWindow.display4);
		gameInfo.foulWindow.display4.anchor = new Point(.5, .5);

		gameInfo.foulWindow.highlight = new Phaser.Sprite(game, -262, -237, 'foulHighlight');
		gameInfo.foulWindow.addChild(gameInfo.foulWindow.highlight);






		//============================================================================


		if(projectInfo.tutorial == true){

			if(!game.device.touch){
				//gameInfo.guiPanel1.visible = false;
			}

			gameInfo.menuButton.visible = false;
			gameInfo.turnArrow1.visible = false;
			gameInfo.turnArrow2.visible = false;
			gameInfo.humanIcon.visible = false;
			gameInfo.aiIcon.visible = false;
			gameInfo.rackSolids.visible = false;
			gameInfo.rackStripes.visible = false;
			gameInfo.spinSetter.visible = false;


		}

	}

	function resume(){
		playState.resumeGame();
	}

	function toggleSound(){

		if(Sound.on == false){
			Sound.on = true;

			gameInfo.muteButtonPU.setFrames(1, 0, 1, 0);

			window.famobi.localStorage.removeItem("muted");

			window.famobi_analytics.trackEvent(
			    famobi_analytics.EVENT_VOLUMECHANGE,
			    {
			        bgmVolume: 0,
			        sfxVolume: 1

			    }
			)

		}else{
			Sound.on = false;
			gameInfo.muteButtonPU.setFrames(3, 2, 3, 2);

			window.famobi.localStorage.setItem("muted", true);

			window.famobi_analytics.trackEvent(
			    famobi_analytics.EVENT_VOLUMECHANGE,
			    {
			        bgmVolume: 0,
			        sfxVolume: 0

			    }
			)
		}

		playState.resumeGame();
	}


	function gameToPopUpMenu(){

		if(gameInfo.foulWindow.visible != true && gameInfo.gameOver == false){

			window.famobi_analytics.trackScreen("SCREEN_PAUSE");

			gameInfo.gameRunning = false;
			gameInfo.popUpPanel.visible = true;

			gameInfo.quitButtonPU.input.enabled = true;
			gameInfo.replayButtonPU.input.enabled = true;
			gameInfo.playButtonPU.input.enabled = true;
			gameInfo.muteButtonPU.input.enabled = true;

			gameInfo.muteInterval = setInterval(function() {
				try{
					Sound.on ? gameInfo.muteButtonPU.setFrames(1, 0, 1, 0) : gameInfo.muteButtonPU.setFrames(3, 2, 3, 2);
				} catch(e) {
					clearInterval(gameInfo.muteInterval);
				}
			}, 250);
		}
	}





	function gameToMenu(){

		//console.log("game to menu");

		var tween1 = game.add.tween(gameInfo.guiCanvas).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
		var tween3 = game.add.tween(gameInfo.guiBaseCanvas).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
		var tween2 = game.add.tween(gameInfo.gameCanvas).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
		tween2.onComplete.add(initMenu, this);

		function initMenu(){

			gameInfo.muteInterval && clearInterval(gameInfo.muteInterval);

			if(gameInfo.gameOver) {
				game.state.start('mainMenu');
				return;
			}

			window.famobi_analytics.trackEvent("EVENT_LEVELFAIL", {levelName: projectInfo.levelName, reason: "quit"}).then(
				function() {
					game.state.start('mainMenu');
				},
				function() {
					game.state.start('mainMenu');
				}
			);
		}
	}

	function replayGame(){

		projectInfo.lastBreaker = "none";
		//gameInfo.muteInterval && clearInterval(gameInfo.muteInterval);

		if(gameInfo.gameOver) {

			window.famobi_analytics.trackEvent("EVENT_LEVELRESTART", {levelName: projectInfo.levelName}).then(
					function() {
						game.state.start('play');
					},
					function() {
						game.state.start('play');
					});
			return;
		}

		Promise.all([
			window.famobi_analytics.trackEvent("EVENT_LEVELFAIL", {levelName: projectInfo.levelName, reason: "quit"}),
			window.famobi_analytics.trackEvent("EVENT_LEVELRESTART", {levelName: projectInfo.levelName})
			]).then(
				function() {
					game.state.start('play');
				},
				function() {
					game.state.start('play');
				}
		);
	}





	function initCanvases(){

		gameInfo.bgCanvas = new Phaser.Group(game, game.stage, 'bgCanvas');
		gameInfo.guiBaseCanvas = new Phaser.Group(game, game.stage, 'guiBaseCanvas');
		gameInfo.gameCanvas = new Phaser.Group(game, game.stage, 'gameCanvas'); //creates game canvas and adds it to the stage

		gameInfo.gameCanvas.x = game.width / 2;
		gameInfo.gameCanvas.y = game.height / 2 - 15;
		//gameInfo.gameCanvas.scale = new Point(1.4, 1.4);
		gameInfo.tableCanvas = new Phaser.Group(game, gameInfo.gameCanvas, 'tableCanvas');
		gameInfo.tableCanvas.y += 2;
		gameInfo.timerCanvas = new Phaser.Group(game, gameInfo.gameCanvas, 'timerCanvas');
		gameInfo.ballCanvas = new Phaser.Group(game, gameInfo.gameCanvas, 'ballCanvas');
		gameInfo.guiCanvas = new Phaser.Group(game, game.stage, 'guiCanvas');
		gameInfo.cueBaseCanvas = new Phaser.Group(game, gameInfo.gameCanvas, 'cueCanvas');
		//gameInfo.cueBaseCanvas.x = gameInfo.gameCanvas.x
		//gameInfo.cueBaseCanvas.y = gameInfo.gameCanvas.y
		//gameInfo.cueBaseCanvas.scale = gameInfo.gameCanvas.scale;
		gameInfo.cueCanvas = new Phaser.Group(game, gameInfo.cueBaseCanvas, 'cueCanvas');


		gameInfo.guideCanvas = new Phaser.Group(game, gameInfo.gameCanvas, 'guideCanvas');

		gameInfo.tutCanvas = new Phaser.Group(game, gameInfo.gameCanvas, 'tutCanvas');



		var tween = game.add.tween(gameInfo.cueBaseCanvas).from({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 500);
		var tween = game.add.tween(gameInfo.guiCanvas).from({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 500);
		var tween = game.add.tween(gameInfo.guiBaseCanvas).from({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 500);
		var tween = game.add.tween(gameInfo.gameCanvas).from({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 500);

		//gameInfo.gameCanvas.add(gameInfo.ballCanvas);

	}

	function initGuide(){

		//gameInfo.guide = gameInfo.guideCanvas.add.graphics();
		gameInfo.guide = new Phaser.Graphics(game);
		gameInfo.guideCanvas.addChild(gameInfo.guide);
		//graphics.beginFill(0xFF3300);



	}

	function initTable(){

		//create table sprites

		gameInfo.pockets = new Phaser.Sprite(game, 0, 0, 'pockets');
		gameInfo.pockets.anchor = new Phaser.Point(0.5, 0.5);
		gameInfo.tableCanvas.add(gameInfo.pockets);

		gameInfo.tunnelCanvas = new Phaser.Group(game, gameInfo.tableCanvas, 'tunnels'); //balls are switched to this canvas after being potted

		gameInfo.cloth = new Phaser.Sprite(game, 0, 0, 'cloth');
		gameInfo.cloth.anchor = new Phaser.Point(0.5, 0.5);
		gameInfo.tableCanvas.add(gameInfo.cloth);

		gameInfo.shadowCanvas = new Phaser.Group(game, gameInfo.tableCanvas, 'shadows'); //balls are switched to this canvas after being potted

		gameInfo.tableTop = new Phaser.Sprite(game, 0, 0, 'tableTop');
		gameInfo.tableTop.anchor = new Phaser.Point(0.5, 0.5);
		gameInfo.tableCanvas.add(gameInfo.tableTop);





		//create table physics

		//note, a line going from left to right will detect collisions from below, so make sure lines are drawn in the right direction.  Draw all lines clockwise around the table

		//table playing area is 600 x 300 pixels.  Physics values are x100, so table area in physics is 60,000 x 30,000.

		var tableScale = gameInfo.adjustmentScale * 600; //allows conversion from inches (assuming a 100" by 50" playing surface, standard for a 9' table) to physics values (60,000 x 30,000)
		// ^ additional multiple of 1.4 applied after we scaled up the table in flash by multiplying dimensions of all layers by 1.4


		var line;
		var vertex;
		var pocket;

		gameInfo.pocketArray = new Array();
		gameInfo.vertexArray = new Array();
		gameInfo.lineArray = new Array();


		pocket = new Object();
		pocket.position = new Vector2D( -50 * tableScale - gameInfo.pocketRadius / 2, -25 * tableScale - gameInfo.pocketRadius / 4);
		pocket.dropPosition = new Vector2D( -51 * tableScale - gameInfo.pocketRadius/2, -26 * tableScale - gameInfo.pocketRadius/4);
		pocket.starPosition = new Vector2D( -50.4 * tableScale - gameInfo.pocketRadius/2, -25.8 * tableScale - gameInfo.pocketRadius/4);
		pocket.id = 0;
		gameInfo.pocketArray.push(pocket);

		pocket = new Object();
		pocket.position = new Vector2D( 0 * tableScale, -25 * tableScale - gameInfo.pocketRadius);
		pocket.dropPosition = new Vector2D( 0 * tableScale, -25.5 * tableScale - gameInfo.pocketRadius);
		pocket.starPosition = new Vector2D( -0.2 * tableScale, -25.5 * tableScale - gameInfo.pocketRadius);
		pocket.id = 1;
		gameInfo.pocketArray.push(pocket);

		pocket = new Object();
		pocket.position = new Vector2D( 50 * tableScale + gameInfo.pocketRadius / 2, -25 * tableScale - gameInfo.pocketRadius / 4);
		pocket.dropPosition = new Vector2D( 51 * tableScale + gameInfo.pocketRadius/2, -26 * tableScale - gameInfo.pocketRadius/4);
		pocket.starPosition = new Vector2D( 50 * tableScale + gameInfo.pocketRadius/2, -26 * tableScale - gameInfo.pocketRadius/4);
		pocket.id = 2;
		gameInfo.pocketArray.push(pocket);

		pocket = new Object();
		pocket.position = new Vector2D( -50 * tableScale - gameInfo.pocketRadius / 2, 25 * tableScale + gameInfo.pocketRadius / 4);
		pocket.dropPosition = new Vector2D( -51 * tableScale - gameInfo.pocketRadius/2, 26 * tableScale + gameInfo.pocketRadius/4);
		pocket.starPosition = new Vector2D( -50.3 * tableScale - gameInfo.pocketRadius/2, 25.5 * tableScale + gameInfo.pocketRadius/4);
		pocket.id = 3;
		gameInfo.pocketArray.push(pocket);

		pocket = new Object();
		pocket.position = new Vector2D( 0 * tableScale, 25 * tableScale + gameInfo.pocketRadius);
		pocket.dropPosition = new Vector2D( 0 * tableScale, 25.5 * tableScale + gameInfo.pocketRadius);
		pocket.starPosition = new Vector2D( -0.2 * tableScale, 25.3 * tableScale + gameInfo.pocketRadius);
		pocket.id = 4;
		gameInfo.pocketArray.push(pocket);

		pocket = new Object();
		pocket.position = new Vector2D( 50 * tableScale + gameInfo.pocketRadius / 2, 25 * tableScale + gameInfo.pocketRadius / 4);
		pocket.dropPosition = new Vector2D( 51 * tableScale + gameInfo.pocketRadius/2, 26 * tableScale + gameInfo.pocketRadius/4);
		pocket.starPosition = new Vector2D( 50 * tableScale + gameInfo.pocketRadius/2, 27 * tableScale - gameInfo.pocketRadius/4);
		pocket.id = 5;
		gameInfo.pocketArray.push(pocket);

		//start at top left adding vertices and lines - see diagram


		//    A                  D  E                  H
		//     \                /    \                /
		//      B--------------C      F--------------G
		// X                                               I
		//  \                                             /
		//   W                                           J
		//   |                                           |
		//   |                                           |
		//   |                                           |
		//   V                                           K
		//  /                                             \
		// U                                               L
		//      S--------------R      O--------------N
		//     /                \    /                \
		//    T                  Q  P                  M


		var mouth = 4;
		var throat = 2;

		//line AB
		line = new Object();
		line.name = "AB";
		line.p1 = new Vector2D( -50 * tableScale, -(25 + mouth) * tableScale);
		line.p2 = new Vector2D( -(50 - mouth) * tableScale, -25 * tableScale);
		gameInfo.lineArray.push(line);

		//vertexB
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "B";
		gameInfo.vertexArray.push(vertex);

		//line BC
		line = new Object();
		line.name = "BC";
		line.p1 = new Vector2D( -(50 - mouth) * tableScale, -25 * tableScale);
		line.p2 = new Vector2D( -mouth * tableScale, -25 * tableScale);
		gameInfo.lineArray.push(line);

		//vertex C
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "C";
		gameInfo.vertexArray.push(vertex);

		//line CD
		line = new Object();
		line.name = "CD";
		line.p1 = new Vector2D( -mouth * tableScale, -25 * tableScale);
		line.p2 = new Vector2D( -throat * tableScale, -(25 + mouth) * tableScale);
		gameInfo.lineArray.push(line);

		//line EF
		line = new Object();
		line.name = "EF";
		line.p1 = new Vector2D( throat * tableScale, -(25 + mouth) * tableScale);
		line.p2 = new Vector2D( mouth * tableScale, -25 * tableScale);
		gameInfo.lineArray.push(line);

		//vertex F
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "F";
		gameInfo.vertexArray.push(vertex);

		//line FG
		line = new Object();
		line.name = "FG";
		line.p1 = new Vector2D( mouth * tableScale, -25 * tableScale);
		line.p2 = new Vector2D( (50 - mouth) * tableScale, -25 * tableScale);
		gameInfo.lineArray.push(line);

		//vertex G
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "G";
		gameInfo.vertexArray.push(vertex);

		//line GH
		line = new Object();
		line.name = "GH";
		line.p1 = new Vector2D( (50 - mouth) * tableScale, -25 * tableScale);
		line.p2 = new Vector2D( 50 * tableScale, -(25 + mouth) * tableScale);
		gameInfo.lineArray.push(line);

		//line IJ
		line = new Object();
		line.name = "IJ";
		line.p1 = new Vector2D( (50 + mouth) * tableScale, -25 * tableScale);
		line.p2 = new Vector2D( 50 * tableScale, -(25 - mouth) * tableScale);
		gameInfo.lineArray.push(line);

		//vertex J
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "J";
		gameInfo.vertexArray.push(vertex);

		//line JK
		line = new Object();
		line.name = "JK";
		line.p1 = new Vector2D( 50 * tableScale, -(25 - mouth) * tableScale);
		line.p2 = new Vector2D( 50 * tableScale, (25 - mouth) * tableScale);
		gameInfo.lineArray.push(line);

		//vertex K
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "K";
		gameInfo.vertexArray.push(vertex);

		//line KL
		line = new Object();
		line.name = "KL";
		line.p1 = new Vector2D( 50 * tableScale, (25 - mouth) * tableScale);
		line.p2 = new Vector2D( (50 + mouth) * tableScale, 25 * tableScale);
		gameInfo.lineArray.push(line);

		//line MN
		line = new Object();
		line.name = "MN";
		line.p1 = new Vector2D( 50 * tableScale, (25 + mouth) * tableScale);
		line.p2 = new Vector2D( (50 - mouth) * tableScale, 25 * tableScale);
		gameInfo.lineArray.push(line);

		//vertex N
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "N";
		gameInfo.vertexArray.push(vertex);

		//line NO
		line = new Object();
		line.name = "NO";
		line.p1 = new Vector2D( (50 - mouth) * tableScale, 25 * tableScale);
		line.p2 = new Vector2D( mouth * tableScale, 25 * tableScale);
		gameInfo.lineArray.push(line);

		//vertex O
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "O";
		gameInfo.vertexArray.push(vertex);

		//line OP
		line = new Object();
		line.name = "OP";
		line.p1 = new Vector2D( mouth * tableScale, 25 * tableScale);
		line.p2 = new Vector2D( throat * tableScale, (25 + mouth) * tableScale);
		gameInfo.lineArray.push(line);

		//line QR
		line = new Object();
		line.name = "QR";
		line.p1 = new Vector2D( -throat * tableScale, (25 + mouth) * tableScale);
		line.p2 = new Vector2D( -mouth * tableScale, 25 * tableScale);
		gameInfo.lineArray.push(line);

		//vertex R
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "R";
		gameInfo.vertexArray.push(vertex);

		//line RS
		line = new Object();
		line.name = "RS";
		line.p1 = new Vector2D( -mouth * tableScale, 25 * tableScale);
		line.p2 = new Vector2D( -(50 - mouth) * tableScale, 25 * tableScale);
		gameInfo.lineArray.push(line);

		//vertex S
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "S";
		gameInfo.vertexArray.push(vertex);

		//line ST
		line = new Object();
		line.name = "ST";
		line.p1 = new Vector2D( -(50 - mouth) * tableScale, 25 * tableScale);
		line.p2 = new Vector2D( -50 * tableScale, (25 + mouth) * tableScale);
		gameInfo.lineArray.push(line);

		//line UV
		line = new Object();
		line.name = "UV";
		line.p1 = new Vector2D( -(50 + mouth) * tableScale, 25 * tableScale);
		line.p2 = new Vector2D( -50 * tableScale, (25 - mouth) * tableScale);
		gameInfo.lineArray.push(line);

		//vertex V
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "V";
		gameInfo.vertexArray.push(vertex);

		//line VW
		line = new Object();
		line.name = "VW";
		line.p1 = new Vector2D( -50 * tableScale, (25 - mouth) * tableScale);
		line.p2 = new Vector2D( -50 * tableScale, -(25 - mouth) * tableScale);
		gameInfo.lineArray.push(line);

		//vertex W
		vertex = new Object();
		vertex.position = new Vector2D(line.p2.x, line.p2.y);
		vertex.name = "W";
		gameInfo.vertexArray.push(vertex);

		//line WX
		line = new Object();
		line.name = "WX";
		line.p1 = new Vector2D( -50 * tableScale, -(25 - mouth) * tableScale);
		line.p2 = new Vector2D( -(50 + mouth) * tableScale, -25 * tableScale);
		gameInfo.lineArray.push(line);


		var graphics = game.add.graphics(gameInfo.gameCanvas.x,  gameInfo.gameCanvas.y);
		// set a fill and line style
	    //graphics.beginFill(0xFFFFFF);








		//for each line, store the direction vector, normal vector and projection (p3 and p4) of line by distance r (see notes)
		for (var n = 0; n < gameInfo.lineArray.length; n ++) {

			var line = gameInfo.lineArray[n];

			//unit direction vector of line
			line.direction = new Vector2D(line.p2.x - line.p1.x, line.p2.y - line.p1.y).normalize();
			//unit normal vector of line (right handed/clockwise)
			line.normal = line.direction.getLeftNormal();
			var extendedNormal = line.normal.times(gameInfo.ballRadius);
			line.p3 = line.p1.plus(extendedNormal);
			line.p4 = line.p2.plus(extendedNormal);

			var extendedNormal2 = line.normal.times(gameInfo.ballRadius * 0.8);
			line.p5 = line.p1.plus(extendedNormal2);
			line.p6 = line.p2.plus(extendedNormal2);


			//debug drawings
			/*
			graphics.lineStyle(1, 0xffffff, 1);
			graphics.moveTo(gameInfo.lineArray[n].p1.x * gameInfo.physScale, gameInfo.lineArray[n].p1.y * gameInfo.physScale);
			graphics.lineTo(gameInfo.lineArray[n].p2.x * gameInfo.physScale, gameInfo.lineArray[n].p2.y * gameInfo.physScale);

			graphics.lineStyle(1, 0x000000, 1);
			graphics.moveTo(gameInfo.lineArray[n].p3.x * gameInfo.physScale, gameInfo.lineArray[n].p3.y * gameInfo.physScale);
			graphics.lineTo(gameInfo.lineArray[n].p4.x * gameInfo.physScale, gameInfo.lineArray[n].p4.y * gameInfo.physScale);
			*/

		}

		/*
		for(var n = 0; n < gameInfo.vertexArray.length; n ++){

			var vertex = gameInfo.vertexArray[n];
			graphics.drawCircle(vertex.position.x * gameInfo.physScale, vertex.position.y * gameInfo.physScale, gameInfo.ballRadius * 2 * gameInfo.physScale);
		}
		*/





	}



	function initBalls(){


		//create balls

		gameInfo.ballArray = new Array();
		var ballPositionArray = setBallPositions(gameInfo);
		gameInfo.numBalls = ballPositionArray.length;

		//console.log("numBalls: " + gameInfo.numBalls);

		//console.log(Phaser.Animation.generateFrameNames('marker', 1, 60, "", 4));

		for(var n = 0; n < gameInfo.numBalls; n ++){



			var ball = new Object();

			//shadow
			ball.shadow = new Phaser.Sprite(game, 0, 0, "shadow");
			gameInfo.shadowCanvas.add(ball.shadow);
			ball.shadow.anchor = new Point(0.5, 0.5);
			ball.shadow.width = gameInfo.ballRadius * gameInfo.physScale * 4;
			ball.shadow.height = gameInfo.ballRadius * gameInfo.physScale * 4;
			ball.shadow.alpha = 0.7;

			//marker
			ball.marker = new Phaser.Sprite(game, 0, 0, 'marker');
			gameInfo.ballCanvas.addChild(ball.marker);
			ball.marker.anchor = new Point(.5, .5);



			ball.marker.animations.add('markerAnim', Phaser.Animation.generateFrameNames('marker', 1, 60, "", 4), 60, true);
			ball.marker.visible = false;

			//ball mc
			var s;
			switch(n){

				case 0: s = 0; break;
				case 1: s = 12; break;
				case 2: s = 13; break;
				case 3: s = 8; break;
				case 4: s = 14; break;
				case 5: s = 3; break;
				case 6: s = 11; break;
				case 7: s = 4; break;
				case 8: s = 15; break;
				case 9: s = 5; break;
				case 10: s = 1; break;
				case 11: s = 6; break;
				case 12: s = 10; break;
				case 13: s = 7; break;
				case 14: s = 9; break;
				case 15: s = 2; break;

			}
			ball.mc = new Ball(gameInfo.ballRadius * gameInfo.physScale, n);
			gameInfo.ballCanvas.add(ball.mc);

			if(n == 0){
				ball.mover = new Phaser.Sprite(game, 0, 0, 'mover');
				gameInfo.ballCanvas.add(ball.mover);
				ball.mover.anchor = new Point(.5, .5);
				ball.mover.inputEnabled = true;
				ball.mover.visible = false;
			}


			//highlight/shading
			/*
			ball.shade = new Phaser.Sprite(game, 0, 0, "shade");
			gameInfo.ballCanvas.add(ball.shade);
			ball.shade.anchor = new Point(0.5, 0.5);
			ball.shade.width = gameInfo.ballRadius * gameInfo.physScale * 2.2;
			ball.shade.height = gameInfo.ballRadius * gameInfo.physScale * 2.2;
			ball.shade.alpha = 0.75;
			*/

			//ball properties

			if (n < 8 && n != 0) {
				ball.targetType = "SOLIDS";
			}
			if (n > 8) {
				ball.targetType = "STRIPES";
			}
			if (n == 8) {
				ball.targetType = "8 BALL";
			}

			ball.position = new Vector2D(ballPositionArray[n].x, ballPositionArray[n].y);
			ball.velocity = new Vector2D(0, 0);
			ball.lastCollisionObject = null;
			ball.id = n;
			ball.active = true;
			ball.firstContact = false;
			ball.contactArray = new Array();
			if (n == 0) {
				ball.screw = 0; //amount of scew applied to cue ball when it is struck - will take value between -1 (topspin) and 1 (backspin)
				ball.english = 0; //will take value between -1 (left side spin) and 1 (right side spin)
				ball.deltaScrew = new Vector2D(0, 0); //velocity applied to the cue ball each frame after contact due to screw - will take a vector which will decay to 0.
			}
			ball.grip = 1; //value between 0 and 1. 0: ball slides without rolling.  1: ball rolls without sliding
			ball.ySpin = 0;
			//grip and spin have no consequence on physics.  They only have graphical effects on rotation
			ball.pocketTweenComplete = true;
			ball.propelling = false;

			gameInfo.ballArray.push(ball);

		}
	}

	function initCue(){

		gameInfo.cueShadow = new Phaser.Sprite(game, 0, 0, 'cueShadow');
		gameInfo.cueCanvas.addChild(gameInfo.cueShadow);
		gameInfo.cueShadow.anchor = new Point(1.0, 8/53);

		gameInfo.cue = new Phaser.Sprite(game, 0, 0, 'cue');
		gameInfo.cueCanvas.addChild(gameInfo.cue);
		gameInfo.cue.anchor = new Point(1, 0.5);
	}


	function initContactListener(){


		this.contactEvent = new Phaser.Signal();
		this.contactEvent.add(onContact, this);



	}


	function initPhysics() {

		gameInfo.phys = new billiardPhysics(this.contactEvent, gameInfo.ballArray, gameInfo.lineArray, gameInfo.vertexArray, gameInfo.pocketArray, 0);
		gameInfo.phys.friction = gameInfo.friction;
		gameInfo.phys.ballRadius = gameInfo.ballRadius;
		gameInfo.phys.pocketRadius = gameInfo.pocketRadius;
		gameInfo.phys.physScale = gameInfo.physScale;
		gameInfo.phys.minVelocity = gameInfo.minVelocity;
		gameInfo.phys.cushionRestitution = gameInfo.cushionRestitution;
		gameInfo.phys.ballRestitution = gameInfo.ballRestitution;

	}





}


playState.resumeGame = function(){

	var gameInfo = this.gameInfo;

	if(gameInfo.gameOver != true){
		window.famobi_analytics.trackScreen("SCREEN_LEVEL");
		gameInfo.gameRunning = true;
	}

	gameInfo.popUpPanel.visible = false;

	gameInfo.quitButtonPU.input.enabled = false;
	gameInfo.replayButtonPU.input.enabled = false;
	gameInfo.playButtonPU.input.enabled = false;
	gameInfo.muteButtonPU.input.enabled = false;

	gameInfo.muteInterval && clearInterval(gameInfo.muteInterval);
	gameInfo.paused = false;
}

playState.shutdown = function(){

	//console.log("cleaning");

	var gameInfo = this.gameInfo;

	gameInfo.gameCanvas.destroy();
	gameInfo.guiCanvas.destroy();
	gameInfo.guiBaseCanvas.destroy();
	gameInfo.cueBaseCanvas.destroy();


}

/*
playState.resize = function (width, height) {

	console.log("resizing game");

	var gameInfo = this.gameInfo;



	gameInfo.playButton.x = width / 2;
	gameInfo.playButton.y = height;

	gameInfo.gameCanvas.x = width / 2;
	gameInfo.gameCanvas.y = height / 2;
}
*/

/*
playState.resize = function (width, height) {

	var gameInfo = this.gameInfo;

		console.log("width: " + width);
		console.log("height: " + height);

		if(width > 800 || height > 600){
			game.scale.setGameSize(800, 600);
		}


		projectInfo.quitButton.x = width / 2;
		projectInfo.quitButton.y = height;

		gameInfo.gameCanvas.x = width / 2;
		gameInfo.gameCanvas.y = height / 2;
	}
*/


