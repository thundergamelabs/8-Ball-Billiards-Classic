//each individual collision is reported here, one at a time, in order.


function onContact(data) {

	var gameInfo = playState.gameInfo;
	var collisionData =  data;

	//console.log("received event");
	//console.log("data: " + data.collisionType);

	/*
	collisionData (e.data) is an object with the following properties:

		collisionType:String (either "ball", "line", "vertex" or "pocket")
		ball:Object (The ball which has collided, which contains all the properties of a ball object like id, position, velocity etc.)
		target:Object (The target ball, line, vertex or pocket the ball has collided with)
		ballVelocity:vector2D (The post contact velocity vector of the ball)
		targetVelocity:vector2D (The post contact velocity vector of the target ball, if the collisionType is "ball")

		note - position data of the ball/target at the point of contact is stored within the ball/target object, although it needs to be exctracted here as it will likely change before the next frame
		     - additional information such as contact normal can be send from the billiardPhysics.as resolveCollision method to here if needed
	*/




	//For the presim, info about the contact is stored in an array and extracted later.  So we create a deep copy of contact objects to prevent weak referencing - ie to prevent sending the actual ball properties which change constantly, and instead sending a frozen copy of the properties as they are right now.  For contact data being passed to other functions right away (ie. below) it is safe to use the contactData as it is now.
	var ball = collisionData.ball;

	var collisionObject = new Object();

	collisionObject.position = ball.position;
	collisionObject.targetPosition = collisionData.target.position;
	collisionObject.velocity = collisionData.ballVelocity;
	collisionObject.collisionType = collisionData.collisionType;
	collisionObject.screw = ball.screw;

	if (collisionData.collisionType == "ball") {
		collisionObject.target = collisionData.target;
		collisionObject.targetVelocity = collisionData.targetVelocity;
		collisionObject.deltaScrew = collisionData.deltaScrew;
	}

	collisionObject.type = collisionData.collisionType;



	if (collisionData.collisionType == "ball") {




		//store ball on ball contact in the object ball's contact array
		ball.contactArray.push(collisionObject);
		//trace("contact: " + collisionObject.collisionType);

		if(gameInfo.trial == false){
			//play ball sound
			var closingSpeed = (collisionObject.velocity.minus(collisionObject.targetVelocity)).magnitude;
			var volume = closingSpeed / 6000;
			if (volume > 1) {
				volume = 1;
			}
			Sound.Play("ballHit", volume);
		}
	}
	if (collisionData.collisionType == "line" || collisionData.collisionType == "vertex") {

		//store ball on cushion contact in the object ball's contact array
		ball.contactArray.push(collisionObject);

		if(gameInfo.trial == false){
			//play cushion sound
			var closingSpeed = collisionData.normalVelocity.magnitude;
			var volume = closingSpeed / 3000;
			if (volume > 2) {
				volume = 2;
			}
			Sound.Play("cushionHit", volume);
		}



	}
	if (collisionData.collisionType == "pocket") {

		//if(ball.propelling == false){

			//moved from physics
			ball.active = false;
			ball.velocity = new Vector2D(0, 0);
			//console.log("inactive");

			ball.contactArray.push(collisionObject);

			if(gameInfo.trial == false){
				playPocketSound(collisionData);
				playPocketAnimation(collisionData);


				//if(gameInfo.turn == "player"){
				if(!projectInfo.tutorial){
					awardBonuses(collisionData);

				}
				//}
			}




			if (ball.id == 0) {

				gameInfo.scratched = true;
			}else {
				gameInfo.ballsRemaining --;
			}


		//}
	}





}




function playPocketSound(collisionData) {

	var closingSpeed = collisionData.speed;
	var volume = closingSpeed / 5000;
	if (volume > 1.5) {
		volume = 1.5;
	}
	if (volume < 0.3) {
		volume = 0.3;
	}
	Sound.Play("pocketHit", volume);

}

function awardBonuses(collisionData) {

	var gameInfo = playState.gameInfo;
	/*
	var delay = 0;
	var ball = collisionData.ball;
	var pocket = collisionData.target;


	var effect = new ParticleExplosion("star_mc", 15, 0.5, 0, 0.01, 0, 1)
	gameCanvas.addChild(effect);
	effect.x = pocket.position.x * physScale;
	effect.y = pocket.position.y * physScale;#
	effect.Start();
	*/



	if(collisionData.ball.id != 0){

		var pocket = collisionData.target;


		gameInfo.numBalls --;
		gameInfo.pottedBallArray.push(collisionData.ball.id);
        checkLevelComplete();
        gameInfo.ballPotted = true;


		if(projectInfo.mode == 1 && gameInfo.turn == "p1" || projectInfo.mode == 2){

			if(gameInfo.turn == "p1"){
				createBonusText(0, String(gameInfo.multiplier * 10), 'font6', pocket.dropPosition.x * gameInfo.physScale, pocket.dropPosition.y * gameInfo.physScale, 56, false);
			}else{
				createBonusText(0, String(gameInfo.multiplier2 * 10), 'font6', pocket.dropPosition.x * gameInfo.physScale, pocket.dropPosition.y * gameInfo.physScale, 56, false);
			}
			game.time.events.add(Phaser.Timer.SECOND * 1.5, updateScoreAndMultiplier, this);
		}



        function updateScoreAndMultiplier(){

	        //also update score and best score at the same time
	        if(gameInfo.turn == "p1"){

	        	projectInfo.score += gameInfo.multiplier * 10;

	        	window.famobi_analytics.trackEvent("EVENT_LIVESCORE", {liveScore: projectInfo.score});

	        	if(projectInfo.score > gameInfo.bestScore){
					gameInfo.bestScore = projectInfo.score;
					try{
						window.famobi.localStorage.setItem('bestScore', gameInfo.bestScore);
						//console.log("new highscore saved");
					}catch(e){
						//console.log("save failed");
					}

				}

		        gameInfo.multiplier ++;
		        gameInfo.multiplierText.text = "x" + gameInfo.multiplier;
	        }else{

	        	projectInfo.score2 += gameInfo.multiplier2 * 10;

	        	if(projectInfo.score2 > gameInfo.bestScore){
					gameInfo.bestScore = projectInfo.score2;
					try{
						window.famobi.localStorage.setItem('bestScore', gameInfo.bestScore);
						//console.log("new highscore saved");
					}catch(e){
						//console.log("save failed");
					}

				}

		        gameInfo.multiplier2 ++;
		        gameInfo.multiplierText.text = "x" + gameInfo.multiplier2;
	        }




	        //gameInfo.bonusText.alpha = 1;

	        //var streakTween = game.add.tween(gameInfo.bonusText);
			//streakTween.to({alpha: 0}, 2000);
			//streakTween.start();

			var streakTween = game.add.tween(gameInfo.multiplierText);
			streakTween.from({size: 42}, 2000);
			streakTween.start();
	    }




		//console.log("score" + gameInfo.score);


		/*
		if(gameInfo.bonusStars[pocket.id].visible == true){

			gameInfo.bonusStars[pocket.id].visible = false;
			gameInfo.bonusStarOn = false;

			var stars = new Stars(pocket.dropPosition.x * gameInfo.physScale, pocket.dropPosition.y * gameInfo.physScale);

			//bonus time text
			createBonusText(0, "+10s", 'font5', 0, 0, 70, true);

			increaseTime();
			gameInfo.timerText.text = Math.ceil(gameInfo.timeRemaining / 60);


		}


		if(gameInfo.bonusStarOn == false){

			//var starNumber = Math.floor(Math.random() * 6);
			gameInfo.bonusStarOn = true;
			game.time.events.add(Phaser.Timer.SECOND * 1, addStar, this);

			function addStar(){
				gameInfo.bonusStars[gameInfo.starNumber].visible = true;


				var starAlphaTween = game.add.tween(gameInfo.bonusStars[gameInfo.starNumber]);
				starAlphaTween.from({alpha: 0}, 2000);
				starAlphaTween.start();

				var starScaleTween = game.add.tween(gameInfo.bonusStars[gameInfo.starNumber].scale);
				starScaleTween.from({x: 5, y: 5}, 2000);
				starScaleTween.start();

				Sound.Play("shimmer", .3);

				gameInfo.starNumber ++;

				if(gameInfo.starNumber == 1 || gameInfo.starNumber == 4){
					gameInfo.starNumber ++;
				}

				if(gameInfo.starNumber > 5){
					gameInfo.starNumber = 0;
				}
			}

		}

		*/




	}else{
		//cue ball potted
		gameInfo.fouled = true;
	}





}




function checkLevelComplete(){

	var gameInfo = playState.gameInfo;

		if(gameInfo.numBalls <= 1){

			//gameInfo.timer.running = false;
			//gameInfo.timer.stop();
			projectInfo.levelComplete = true;


		}
	}


function playPocketAnimation(collisionData) {

	var gameInfo = playState.gameInfo;

	if(gameInfo.trial == false){

		var ball = collisionData.ball;
		var pocket = collisionData.target;
		var closingSpeed = collisionData.speed;



		ball.pocketTweenComplete = false;

		//swap canvases and tween mc into pocket - this should really go in a different class eventually

		if(ball.id != 0){

		//if(1==0){
			ball.shadow.parent.removeChild(ball.shadow); //null object error thrown here
			ball.shadow = null;
		}else {
			ball.shadow.visible = false;
		}

		var tweenSpeed = 0.1;

		if (closingSpeed < 5000) {
			tweenSpeed = 0.2;
		}

		if (closingSpeed < 3000) {
			tweenSpeed = 0.3;
		}
		if (closingSpeed < 2000) {
			tweenSpeed = 0.4;
		}
		if (closingSpeed < 1000) {
			tweenSpeed = 0.5;
		}

		tweenSpeed *= 300;

		//ball.mc.scaleX = 0.9;
		//ball.mc.scaleY = 0.9;


		var pocketTween = game.add.tween(ball.mc);
		pocketTween.to({x: pocket.dropPosition.x * gameInfo.physScale, y: pocket.dropPosition.y * gameInfo.physScale}, tweenSpeed);
		pocketTween.onComplete.add(swapCanvas, this);
		pocketTween.start();


		var pocketTween2 = game.add.tween(ball.mc);
		pocketTween2.to({x: 0.7 * pocket.dropPosition.x * gameInfo.physScale, y: 0.7 * pocket.dropPosition.y * gameInfo.physScale}, tweenSpeed * 1.2, Phaser.Easing.Linear.In);

		if(ball.id != 0){


		//if(1==0){
			pocketTween2.onComplete.add(function(){removeMC(ball)}, this);

		}else{
			pocketTween2.onComplete.add(function(){returnCueBall()}, this);
		}

		function swapCanvas(){


			var _x = ball.mc.x;
			var _y = ball.mc.y;
			//var canvas = ball.lowerCanvas;
			gameInfo.ballCanvas.removeChild(ball.mc);
			gameInfo.tunnelCanvas.addChild(ball.mc);
			ball.mc.x = _x;
			ball.mc.y = _y;
			//ball.mc.scaleX = 0.9;
			//ball.mc.scaleY = 0.9;

			pocketTween2.start();

		}


		function returnCueBall(){

			/*
			//switch pockets - so cue ball comes out of opposite pocket
			pocket = gameInfo.pocketArray[5 - pocket.id]


			var pocketTween = game.add.tween(ball.mc);
			pocketTween.to({x: pocket.position.x * gameInfo.physScale, y: pocket.position.y * gameInfo.physScale}, tweenSpeed);
			pocketTween.onComplete.add(swapCanvasBack, this);
			pocketTween.start();
			*/

			//for 8 ball, place cue ball back on correct canvas, set tween complete and keep hidden until start of next turn

			gameInfo.tunnelCanvas.removeChild(ball.mc);
			gameInfo.ballCanvas.addChild(ball.mc);
			ball.pocketTweenComplete = true;
			ball.mc.visible = false;

		}

		function swapCanvasBack(){


			var _x = ball.mc.x;
			var _y = ball.mc.y;

			gameInfo.tunnelCanvas.removeChild(ball.mc);
			gameInfo.ballCanvas.addChild(ball.mc);
			ball.mc.x = _x;
			ball.mc.y = _y;

			ball.position.x = _x / gameInfo.physScale;
			ball.position.y = _y / gameInfo.physScale;

			ball.shadow.visible = true;

			//propel ball from pocket
			//var vx = 0 - ball.mc.x;
			//var vy = 0 - ball.mc.y;
			//var vUnit = new Vector2D(vx, vy).normalize();
			//var v = vUnit.times(200);

			//ball.velocity = v;

			//ball.velocity = new Vector2D(0.8 * pocket.position.x - pocket.position.x, 0.8 * pocket.position.y - pocket.position.y).normalize().times(200);

			ball.velocity = new Vector2D(0.8 * pocket.position.x - pocket.position.x, 0.8 * pocket.position.y - pocket.position.y).normalize().times(200);


			//console.log("vx: " + v.x);
			//console.log("vy: " + v.y);
			//console.log("propelling: shotRunning = " + gameInfo.shotRunning);

			ball.pocketTweenComplete = true;
			ball.active = true;
			//ball.propelling = true;

			//var timer = game.time.events.add(Phaser.Timer.SECOND * .5, resetFlag, this);

			//function resetFlag(){

			 //ball.propelling = false;

				//console.log("propelling: " + ball.propelling);
				//console.log("v: " + ball.velocity.x);

			//}



		}








		function removeMC(ball){


			if(ball.id != 0){
				gameInfo.tunnelCanvas.removeChild(ball.mc);
				ball.pocketTweenComplete = true;
			}else {


				/*
				ball.mc.visible = false;
				setTimeout(showCueBall, 1000);

				function showCueBall() {
					gameInfo.tunnelCanvas.removeChild(ball.mc);
					gameInfo.ballCanvas.addChild(ball.mc);
					ball.mc.visible = true;
					ball.mc.scaleX = 1;
					ball.mc.scaleY = 1;
					ball.pocketTweenComplete = true;
					ball.shadow.visible = true;
					ball.active = true;
					var ballPositionArray = setBallPositions(gameInfo);
					ball.position = new Vector2D(ballPositionArray[0].x, ballPositionArray[0].y);
					renderScreen();
				}
				*/



			}
		}
	}





/*
    emitter = game.add.emitter(pocket.dropPosition.x * gameInfo.physScale, pocket.dropPosition.y * gameInfo.physScale, 100);

	emitter.makeParticles('bonusStar');

	//emitter.maxParticles = 10;
	emitter.maxParticleScale = 0.2;
	emitter.setAlpha(1, 0, 2000);



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
	*/


}
