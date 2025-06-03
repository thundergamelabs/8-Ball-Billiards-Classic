var menuState = {

	init: function(){

		window.famobi_analytics.trackScreen("SCREEN_HOME");

		this.menuInfo = new Object();

		game.scale.setResizeCallback(this.onResize, this);


		if(window.famobi.localStorage.getItem('guideOn') == null){

			projectInfo.guideOn = 1;
			try{
				window.famobi.localStorage.setItem('guideOn', 1)
			}catch(e){

			}

		}else{
			projectInfo.guideOn = window.famobi.localStorage.getItem('guideOn');


		}

		if(window.famobi.localStorage.getItem('aiRating') == null){
			//console.log("no data found - setting new data")
			projectInfo.aiRating = 2;
			try{
				window.famobi.localStorage.setItem('aiRating', 2)
			}catch(e){

			}

		}else{
			projectInfo.aiRating = window.famobi.localStorage.getItem('aiRating');
			//console.log("data found: " + projectInfo.bestScore)

		}


		if(window.famobi.localStorage.getItem('bestScore') == null){
			//console.log("no data found - setting new data")
			projectInfo.bestScore = 0;
			try{
				window.famobi.localStorage.setItem('bestScore', 0)
			}catch(e){
				if(projectInfo.alertSent == false){
					//alert('Sorry, your browser does not support the saving of data.  Your highscore will therefore not be saved.');
					//projectInfo.alertSent = true;
				}
			}

		}else{
			projectInfo.bestScore = window.famobi.localStorage.getItem('bestScore');
			//console.log("data found: " + projectInfo.bestScore)

		}

		if(window.famobi.localStorage.getItem('numGames') == null){
			//console.log("no data found - setting new data")
			projectInfo.numGames = 0;
			try{
				window.famobi.localStorage.setItem('numGames', 0)
			}catch(e){
				if(projectInfo.alertSent == false){
					//alert('Sorry, your browser does not support the saving of data.  Your highscore will therefore not be saved.');
					//projectInfo.alertSent = true;
				}
			}

		}else{
			projectInfo.numGames = window.famobi.localStorage.getItem('numGames');
			//console.log("data found: " + projectInfo.bestScore)

		}

		if(window.famobi.localStorage.getItem('bestTime') == null){
			//console.log("no data found - setting new data")
			projectInfo.bestTime = 0;
			try{
				window.famobi.localStorage.setItem('bestTime', 0)
			}catch(e){
				if(projectInfo.alertSent == false){
					//alert('Sorry, your browser does not support the saving of data.  Your highscore will therefore not be saved.');
					//projectInfo.alertSent = true;
				}
			}

		}else{
			projectInfo.bestTime = window.famobi.localStorage.getItem('bestTime');
			//console.log("data found: " + projectInfo.bestScore)

		}



	},



	 onResize: function(scale, bounds) {

	 	this.resizeGame(scale, bounds);

    },


	create: function(){



		var menuInfo = this.menuInfo;


		this.resizeGame = function(scale, bounds){


	    	//console.log("resized menu");
	        //this.resizeGame();
	        //game.state.resize(R.gameWidth, R.gameHeight);
	        var clientWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
			var clientHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

			//if(clientWidth < clientHeight){

			if(window.famobi.getOrientation() == "portrait"){


				//set to portrait mode
				//game.scale.setGameSize(690, 1024);
				game.scale.setGameSize(1080, 1920);
				//game.scale.maxHeight = clientHeight;
				//game.scale.maxWidth = clientHeight * 690 / 1024;

				//menuInfo.bgL.visible = false;
				//menuInfo.bgP.visible = true;

				menuInfo.playButton.x = 0;
				menuInfo.playButton.y = (game.height / 2) * 0.4;
				menuInfo.playButton.anchor = new Phaser.Point(0.5, 0);

				menuInfo.statsButton.x = -150;
				menuInfo.statsButton.y = (game.height / 2) * 0.4;
				menuInfo.statsButton.anchor = new Point(1, 0);

				menuInfo.helpButton.x = 150;
				menuInfo.helpButton.y = (game.height / 2) * 0.4;
				menuInfo.helpButton.anchor = new Point(0, 0);

				menuInfo.settingsButton.x = (game.width / 2) -100;
				menuInfo.settingsButton.y = -game.height / 2 + 100;
				menuInfo.settingsButton.anchor = new Point(1, 0);




				menuInfo.settingsWindow.y = 0;
				menuInfo.statsWindow.x = game.width / 2 + 0;
				menuInfo.statsWindow.y = game.height / 2;

				menuInfo.pVpButton.x = 0;
				menuInfo.pVpButton.y = game.height * .07;

				menuInfo.pVAIButton.x = 0;
				menuInfo.pVAIButton.y = -game.height * .07;

				menuInfo.famobiMoreGames.x = 0;
				menuInfo.famobiMoreGames.y = game.height / 2 * 0.9;
				menuInfo.famobiMoreGames.anchor = new Point(0.5, 1);

				menuInfo.title.y = -(game.height / 2) * 0.5;







			}else{

				//set to landscape mode
				//game.scale.setGameSize(1024, 690);
				game.scale.setGameSize(1920, 1080);
				//game.scale.maxHeight = clientHeight;
				//game.scale.maxWidth = clientHeight * 1024 / 690;
				//menuInfo.bgL.visible = true;
				//menuInfo.bgP.visible = false;

				menuInfo.playButton.x = 0;
				menuInfo.playButton.y = (game.height / 2) * 0.9;
				menuInfo.playButton.anchor = new Phaser.Point(0.5, 1);

				menuInfo.statsButton.x = -150;
				menuInfo.statsButton.y = (game.height / 2) * 0.9;
				menuInfo.statsButton.anchor = new Point(1, 1);

				menuInfo.settingsButton.x = (game.width / 2) -100;
				menuInfo.settingsButton.y = -game.height / 2 + 100;
				menuInfo.settingsButton.anchor = new Point(1, 0);

				menuInfo.helpButton.x = 150;
				menuInfo.helpButton.y = (game.height / 2) * 0.9;
				menuInfo.helpButton.anchor = new Point(0, 1);

				menuInfo.settingsWindow.y = 120;
				menuInfo.statsWindow.x = game.width / 2 + 0;
				menuInfo.statsWindow.y = game.height / 2 + 120;

				menuInfo.pVpButton.x = 0;
				menuInfo.pVpButton.y = game.height * .16;

				menuInfo.pVAIButton.x = 0;
				menuInfo.pVAIButton.y = -game.height * .05;

				menuInfo.famobiMoreGames.x = -game.width / 2 * 0.9;
				menuInfo.famobiMoreGames.y = game.height / 2 * 0.8;
				menuInfo.famobiMoreGames.anchor = new Point(0, 1);

				menuInfo.famobiMoreGames.y = menuInfo.copyright.y + (menuInfo.copyright.height * 0.5);

				menuInfo.title.y = -(game.height / 2) * 0.6;





			}

			//objects which need moving but take the same values regardless of orientation (eg. relative to other items which have changed)

			var margin = String(Math.abs(clientHeight - document.getElementById("mygame").clientHeight) / 2) + "px";
        	//document.getElementById("game").style.marginTop = margin;

        	menuInfo.menuCanvas.x = game.width / 2;
		    menuInfo.menuCanvas.y = game.height / 2;



			menuInfo.rack.y = (game.height / 2) * 0.1;

			menuInfo.copyright.x = game.width / 2 - 40;
			menuInfo.copyright.y = game.height / 2 - 40;










			//menuInfo.menuCanvas.x = game.width / 2;
			//menuInfo.menuCanvas.y = game.height / 2;

			//menuInfo.helpButton.x = game.width - 68;
			//menuInfo.helpButton.y = 68;

			//menuInfo.gamesButton.y = game.height / 2 - 20;


			//menuInfo.title.x = game.width / 2;
			//menuInfo.title.y = game.height / 12;
			//menuInfo.line.y = game.height / 2 - 140;


		}

		projectInfo.tutorial = false;
		projectInfo.clickedHelpButton = false;

		game.stage.backgroundColor = "#666666";

		menuInfo.menuCanvas = new Phaser.Group(game, game.stage, 'menuCanvas');
		menuInfo.menuCanvas.alpha = 0;
		menuInfo.menuCanvas.x = game.width / 2;
		menuInfo.menuCanvas.y = game.height / 2;

		menuInfo.menuVisible = true;


		menuInfo.copyright = new Phaser.Sprite(game, 0, 0, 'famobi');
		menuInfo.menuCanvas.addChild(menuInfo.copyright);
		menuInfo.copyright.anchor = new Point(1, 1);

		menuInfo.debugText = new Phaser.BitmapText(game, 20, 20, 'font6', projectInfo.version, 34);
		game.stage.addChild(menuInfo.debugText);
		menuInfo.debugText.anchor.x = 0;



		//menuInfo.bgL = new Phaser.Sprite(game, 0, 0, 'bgL');
		//menuInfo.menuCanvas.addChild(menuInfo.bgL);
		//menuInfo.bgL.anchor = new Point(.5, .5);
		//menuInfo.bgL.visible = false;

		//menuInfo.bgP = new Phaser.Sprite(game, 0, 0, 'bgP');
		//menuInfo.menuCanvas.addChild(menuInfo.bgP);
		//menuInfo.bgP.anchor = new Point(.5, .5);
		//menuInfo.bgP.visible = false;

		menuInfo.title = new Phaser.Sprite(game, 0, 0, 'title');
		menuInfo.menuCanvas.addChild(menuInfo.title);
		menuInfo.title.anchor = new Point(.5, .5);

		menuInfo.rack = new Phaser.Sprite(game, 0, 0, 'rack');
		menuInfo.menuCanvas.addChild(menuInfo.rack);
		menuInfo.rack.anchor = new Point(.5, .5);

		//menuInfo.title = new Phaser.Sprite(game, 0, 0, 'title');
		//menuInfo.menuCanvas.addChild(menuInfo.title);
		//menuInfo.title.anchor = new Point(.5, 0);
		//menuInfo.title.scale = new Point(.7, .7);

		menuInfo.playButton = new Phaser.Button(game, 0, 0, 'playButton', onPlayClick, this, 1, 0, 1, 0);
		menuInfo.menuCanvas.addChild(menuInfo.playButton);
		menuInfo.playButton.anchor = new Phaser.Point(0.5, 1);



		menuInfo.pVpButton = new Phaser.Button(game, 0, 0, 'pVpButton', onMode2Click, this, 1, 0, 1, 0);
		if(window.famobi.hasFeature("multiplayer_local"))menuInfo.menuCanvas.addChild(menuInfo.pVpButton);
		menuInfo.pVpButton.anchor = new Phaser.Point(0.5, 0);
		menuInfo.pVpButton.visible = false;

		menuInfo.pVAIButton = new Phaser.Button(game, 0, 0, 'pVAIButton', onMode1Click, this, 1, 0, 1, 0);
		menuInfo.menuCanvas.addChild(menuInfo.pVAIButton);
		menuInfo.pVAIButton.anchor = new Phaser.Point(0.5, 0);
		menuInfo.pVAIButton.visible = false;

		menuInfo.statsButton = new Phaser.Button(game, 0, 0, 'statsButton', onStatsClick, this, 1, 0, 1, 0);
		menuInfo.menuCanvas.addChild(menuInfo.statsButton);


		menuInfo.helpButton = new Phaser.Button(game, 0, 0, 'helpButton', onHelpClick, this, 1, 0, 1, 0);
		menuInfo.menuCanvas.addChild(menuInfo.helpButton);


		menuInfo.settingsButton = new Phaser.Button(game, 0, 0, 'settingsButton', onSettingsClick, this, 1, 0, 1, 0);
		menuInfo.menuCanvas.addChild(menuInfo.settingsButton);



		/*
		menuInfo.helpPanel = new Phaser.Sprite(game, 0, 0, 'panel');
		menuInfo.menuCanvas.addChild(menuInfo.helpPanel);
		menuInfo.helpPanel.anchor = new Point(.5, .5);
		var spr;

		if(!game.device.touch){
			spr = new Phaser.Sprite(game, 0, 0, 'helpMouse');
		}else{
			spr = new Phaser.Sprite(game, -20, 0, 'helpTouch');
		}

		menuInfo.helpPanel.addChild(spr);
		spr.anchor = new Point(.5, .5);

		menuInfo.helpPanel.visible = false;
		*/

		//=========================   Stats Window    =============================

		menuInfo.statsWindow = new Phaser.Group(game, menuInfo.menuCanvas, 'statsWindow', true);

		//menuInfo.menuCanvas.addChild(menuInfo.statsWindow);
		menuInfo.statsWindow.anchor = new Point(.5, .5);
		menuInfo.statsWindow.visible = false;

		var hsIcon = new Phaser.Sprite(game, -100, -120, 'highScore');
		hsIcon.anchor = new Point(.5, .5);
		menuInfo.statsWindow.addChild(hsIcon);

		var clockIcon = new Phaser.Sprite(game, -100, 0, 'clockIcon');
		clockIcon.anchor = new Point(.5, .5);
		menuInfo.statsWindow.addChild(clockIcon);

		var gameControllerIcon = new Phaser.Sprite(game, -100, 120, 'gameController');
		gameControllerIcon.anchor = new Point(.5, .5);
		menuInfo.statsWindow.addChild(gameControllerIcon);

		menuInfo.highscoreText = new Phaser.BitmapText(game, 100, -120, 'font6', projectInfo.bestScore, 77);
		menuInfo.highscoreText.anchor = new Point(.5, .5);
		menuInfo.statsWindow.addChild(menuInfo.highscoreText);

		var totalSeconds = Math.floor(projectInfo.bestTime / 60);
		var minutes = Math.floor(totalSeconds / 60);
		var seconds = Math.ceil(totalSeconds % 60);

		var secondsString = seconds.toString();
		if(seconds < 10){
			secondsString = "0" + seconds.toString();
		}

		var bestTimeString = minutes.toString() + ':' + secondsString;

		if(projectInfo.bestTime == 0){
			bestTimeString = "--:--";
		}

		menuInfo.bestTimeText = new Phaser.BitmapText(game, 100, 0, 'font6', bestTimeString, 77);
		menuInfo.bestTimeText.anchor = new Point(.5, .5);
		menuInfo.statsWindow.addChild(menuInfo.bestTimeText);

		menuInfo.numGamesText = new Phaser.BitmapText(game, 100, 120, 'font6', projectInfo.numGames, 77);
		menuInfo.numGamesText.anchor = new Point(.5, .5);
		menuInfo.statsWindow.addChild(menuInfo.numGamesText);

		menuInfo.quitStatsButton = new Phaser.Button(game, 0, 288, 'quitButton', onStatsQuitClick, this, 1, 0, 1, 0);
		menuInfo.quitStatsButton.anchor = new Point(.5, .5);
		menuInfo.statsWindow.addChild(menuInfo.quitStatsButton);


		//==============================  Settings window  ======================================



		menuInfo.settingsWindow = new Phaser.Sprite(game, 0, 0, 'panel4');
		menuInfo.menuCanvas.addChild(menuInfo.settingsWindow);
		menuInfo.settingsWindow.anchor = new Point(.5, .5);
		menuInfo.settingsWindow.visible = false;
		menuInfo.quitSettingsButton = new Phaser.Button(game, 0, 188, 'quitButton', onSettingsQuitClick, this, 1, 0, 1, 0);
		menuInfo.quitSettingsButton.anchor = new Point(.5, .5);
		menuInfo.settingsWindow.addChild(menuInfo.quitSettingsButton);

		//guide switch
		menuInfo.guideSwitch = new Phaser.Button(game, -295, 12, 'switch', onGuideClick, this, 0, 0, 0, 0);
		menuInfo.guideSwitch.anchor = new Point(.5, .5);
		menuInfo.settingsWindow.addChild(menuInfo.guideSwitch);
		if(projectInfo.guideOn == 0){
			menuInfo.guideSwitch.setFrames(1, 1, 1);
			window.famobi.log("setting switch off");
		}else{
			window.famobi.log("guideOn: " + projectInfo.guideOn);
		}


		//sound switch
		menuInfo.soundSwitch = new Phaser.Button(game, 295, 12, 'switch', onSoundClick, this, 0, 0, 0, 0);
		menuInfo.soundSwitch.anchor = new Point(.5, .5);
		menuInfo.settingsWindow.addChild(menuInfo.soundSwitch);
		if(Sound.on == false){
			menuInfo.soundSwitch.setFrames(1, 1, 1);
		}

		if(typeof window.famobi.audio !== "undefined" && !window.famobi.audio.hasControls()) {
			menuInfo.soundSwitch.visible = false;
		}

		//ai rating
		menuInfo.minusButton = new Phaser.Button(game, -100, 12, 'minusButton', onRatingDown, this, 1, 0, 1, 0);
		menuInfo.minusButton.anchor = new Point(.5, .5);
		menuInfo.settingsWindow.addChild(menuInfo.minusButton);

		menuInfo.ratingText = new Phaser.BitmapText(game, -5, 20, 'font6', projectInfo.aiRating.toString(), 56);
		menuInfo.ratingText.anchor = new Point(.5, .5);
		menuInfo.settingsWindow.addChild(menuInfo.ratingText);

		menuInfo.plusButton = new Phaser.Button(game, 100, 12, 'plusButton', onRatingUp, this, 1, 0, 1, 0);
		menuInfo.plusButton.anchor = new Point(.5, .5);
		menuInfo.settingsWindow.addChild(menuInfo.plusButton);


		menuInfo.plusButton.alpha = projectInfo.aiRating < 5 ? 1.0 : 0.5;
		menuInfo.minusButton.alpha = projectInfo.aiRating > 1 ? 1.0 : 0.5;

		if(typeof window.famobi.audio !== "undefined" && !window.famobi.audio.hasControls()) {
			let pos = 290;
			menuInfo.ratingText.x += pos;
			menuInfo.plusButton.x += pos;
			menuInfo.minusButton.x += pos;
		}
		//famobi more gmaes
		//console.log("image url: " + window.famobi.getMoreGamesButtonImage());
		//game.load.image('more_games',window.famobi.getMoreGamesButtonImage(true));




		//menuInfo.famobiMoreGames = new Phaser.Sprite(game, 60, 60, 'more_games');

		menuInfo.famobiMoreGames = new Phaser.Button(game, 0, 0, 'more_games', famobiMoreGamesClick, this, 0, 0, 0, 0);

		//console.log("sprite created");

		menuInfo.menuCanvas.addChild(menuInfo.famobiMoreGames);

		//console.log("sprite added");

		menuInfo.famobiMoreGames.scale.x = 0.6;
		menuInfo.famobiMoreGames.scale.y = 0.6;






		function famobiMoreGamesClick() {
			//console.log("clicked button");
		    window.famobi.moreGamesLink();
		}

		//console.log("click event added");




		this.resizeGame();

		var tween = game.add.tween(menuInfo.menuCanvas).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 500);

		function onRatingDown(){

			if(projectInfo.aiRating > 1){
				projectInfo.aiRating --;
				menuInfo.ratingText.text = projectInfo.aiRating.toString();

				try{
					window.famobi.localStorage.setItem('aiRating', projectInfo.aiRating);
				}catch(e){

				}
			}

			menuInfo.plusButton.alpha = projectInfo.aiRating < 5 ? 1.0 : 0.5;
			menuInfo.minusButton.alpha = projectInfo.aiRating > 1 ? 1.0 : 0.5;
		}

		function onRatingUp(){

			if(projectInfo.aiRating < 5){
				projectInfo.aiRating ++;
				menuInfo.ratingText.text = projectInfo.aiRating.toString();
				try{
					window.famobi.localStorage.setItem('aiRating', projectInfo.aiRating);
				}catch(e){

				}
			}

			menuInfo.plusButton.alpha = projectInfo.aiRating < 5 ? 1.0 : 0.5;
			menuInfo.minusButton.alpha = projectInfo.aiRating > 1 ? 1.0 : 0.5;
		}

		function onGuideClick(){

			if(projectInfo.guideOn == 0){

				projectInfo.guideOn = 1;
				menuInfo.guideSwitch.setFrames(0, 0, 0);
				try{
					window.famobi.localStorage.setItem('guideOn', 1)
				}catch(e){

				}
			}else{

				projectInfo.guideOn = 0;
				menuInfo.guideSwitch.setFrames(1, 1, 1);

				try{
					window.famobi.localStorage.setItem('guideOn', 0)
				}catch(e){

				}
			}
		}

		function onSoundClick(){




			if(Sound.on == false){
				Sound.on = true;

				menuInfo.soundSwitch.setFrames(0, 0, 0);

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
				menuInfo.soundSwitch.setFrames(1, 1, 1);

				window.famobi.localStorage.setItem("muted", true);

				window.famobi_analytics.trackEvent(
				    famobi_analytics.EVENT_VOLUMECHANGE,
				    {
				        bgmVolume: 0,
				        sfxVolume: 0

				    }
				)
			}
		}



		function onPlayClick(){

			hideMenuItems();

			menuInfo.pVpButton.alpha = 0;
			menuInfo.pVpButton.visible = true;
			game.add.tween(menuInfo.pVpButton).to( { alpha: 1}, 500, "Linear", true);

			menuInfo.pVAIButton.alpha = 0;
			menuInfo.pVAIButton.visible = true;
			game.add.tween(menuInfo.pVAIButton).to( { alpha: 1}, 500, "Linear", true);


			window.famobi_analytics.trackScreen("SCREEN_LEVELSELECT");
		}




		function onMode1Click(){

			projectInfo.mode = 1;
			projectInfo.levelName = "1player_" + projectInfo.aiRating.toString();
			var tween = game.add.tween(menuInfo.menuCanvas).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
			tween.onComplete.add(initGame, this);
		}

		function onMode2Click(){

			projectInfo.mode = 2;
			projectInfo.levelName = "2players";
			var tween = game.add.tween(menuInfo.menuCanvas).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
			tween.onComplete.add(initGame, this);
		}




		function initGame(){

			window.famobi_analytics.trackEvent("EVENT_LEVELSTART", {levelName: projectInfo.levelName}).then(function() {

				if(projectInfo.tutorialPlayed == false){
					//projectInfo.tutorial = true;
				}

			//temp set rating to between 1 and 5 in settings menu
				//projectInfo.aiRating = 1;

				projectInfo.lastBreaker = "none";
				game.state.start('play');

			}.bind(this));

		}




		//function onCreditsClick(){

			//menuInfo.creditsPanel.visible = true;


		//}



		function onHelpClick(){

			//menuInfo.helpPanel.visible = true;
			projectInfo.tutorial = true;
			projectInfo.mode = 2;
			projectInfo.clickedHelpButton = true;
			game.state.start('play');

			window.famobi_analytics.trackScreen("SCREEN_HELP");

		}

		function onStatsClick(){

			menuInfo.menuVisible = false;

			menuInfo.statsWindow.alpha = 0;
			menuInfo.statsWindow.visible = true;
			game.add.tween(menuInfo.statsWindow).to( { alpha: 1}, 500, "Linear", true);



			hideMenuItems();

			window.famobi_analytics.trackScreen("SCREEN_OTHER", "SCREEN_STATISTICS");
		}



		function onSettingsClick(){

			menuInfo.menuVisible = false;

			menuInfo.settingsWindow.alpha = 0;
			menuInfo.settingsWindow.visible = true;
			game.add.tween(menuInfo.settingsWindow).to( { alpha: 1}, 500, "Linear", true);



			hideMenuItems();

			window.famobi_analytics.trackScreen("SCREEN_SETTINGS");
		}

		function onSettingsQuitClick(){

			showMenuItems();
		}

		function onStatsQuitClick(){

			showMenuItems();
		}



		function hideMenuItems(){

			menuInfo.rack.visible = false;
			menuInfo.playButton.visible = false;
			//menuInfo.pVpButton.visible = false;
			//menuInfo.pVAIButton.visible = false;
			menuInfo.statsButton.visible = false;
			menuInfo.helpButton.visible = false;
			menuInfo.settingsButton.visible = false;
		}









	},

	update: function(){

		var menuInfo = this.menuInfo;

		//hide credits
		if (game.input.activePointer.isDown && menuInfo.statsWindow.visible == true){

			//showMenuItems();

			//if(menuInfo.creditsPanel.visible == true){
				//menuInfo.creditsPanel.visible = false;
			//}
			//if(menuInfo.helpPanel.visible == true){
				//menuInfo.helpPanel.visible = false;
			//}
		}



	},

	shutdown: function(){

		menuInfo = this.menuInfo;
		game.stage.removeChild(menuInfo.menuCanvas);
		menuInfo.menuCanvas.destroy();
		menuInfo = null;
	}



/*
	resize: function (width, height) {

		console.log("width: " + width);
		console.log("height: " + height);

		if(width > 800 || height > 600){
			game.scale.setGameSize(800, 600);
		}


		menuInfo.playButton.x = width / 2;
		menuInfo.playButton.y = height;
	}
*/

}

function showMenuItems(){


	var menuInfo = menuState.menuInfo;

	menuInfo.settingsWindow.visible = false;
	menuInfo.statsWindow.visible = false;


	menuInfo.rack.visible = true;
	menuInfo.rack.alpha = 0;
	game.add.tween(menuInfo.rack).to( { alpha: 1}, 500, "Linear", true);

	menuInfo.playButton.visible = true;
	menuInfo.playButton.alpha = 0;
	game.add.tween(menuInfo.playButton).to( { alpha: 1}, 500, "Linear", true);


	menuInfo.statsButton.visible = true;
	menuInfo.statsButton.alpha = 0;
	game.add.tween(menuInfo.statsButton).to( { alpha: 1}, 500, "Linear", true);

	menuInfo.helpButton.visible = true;
	menuInfo.helpButton.alpha = 0;
	game.add.tween(menuInfo.helpButton).to( { alpha: 1}, 500, "Linear", true);

	menuInfo.settingsButton.visible = true;
	menuInfo.settingsButton.alpha = 0;
	game.add.tween(menuInfo.settingsButton).to( { alpha: 1}, 500, "Linear", true);

	menuInfo.menuVisible = true;

	window.famobi_analytics.trackScreen("SCREEN_HOME");

}
