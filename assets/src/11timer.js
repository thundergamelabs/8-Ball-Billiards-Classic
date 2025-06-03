

//new timer functions based on frames rather than seconds.

		function updateTimer(){

		var gameInfo = playState.gameInfo;


			//console.log("timerRunning");

			if(gameInfo.timerStarted){
				

					if(projectInfo.tutorial == false){

						var time;

						if(gameInfo.turn == "p1"){
							gameInfo.time ++;
							time = gameInfo.time;
						}else{
							gameInfo.time2 ++;
							time = gameInfo.time2;
						}
						
						

						
						var totalSeconds = Math.floor(time / 60);
						var minutes = Math.floor(totalSeconds / 60);
						var seconds = Math.ceil(totalSeconds % 60);

						var secondsString = seconds.toString();
						if(seconds < 10){
							secondsString = "0" + seconds.toString();
						}


						gameInfo.timerText.text = minutes.toString() + ':' + secondsString;
						
					}

					
				//}
			}
		}

		function startTimer(){

			var gameInfo = playState.gameInfo;

			
			//gameInfo.timer = game.time.create();
	        //gameInfo.timerEvent = gameInfo.timer.add(projectInfo.startTime * 1000, endTimer, this);
	        //gameInfo.addedTime = projectInfo.startTime;
	        
	        //gameInfo.timer.start();

	        gameInfo.time = 0; //at 60 fps, time remaining will decrease by 60 each second, so projectInfo.startTime is in seconds
	        gameInfo.time2 = 0;
	       
	    }

	    function endTimer(){

	    	var gameInfo = playState.gameInfo;

			//var gameInfo = playState.gameInfo;
			if(gameInfo.gameRunning == true){

				//gameInfo.timer.stop();
				//console.log("time up");
				gameInfo.timerText.scale = new Point(.5, .5);
				gameInfo.timerText.text = "";
				gameInfo.gameOver = true;
			}
			
		}

		function increaseTime(){

			var gameInfo = playState.gameInfo;

			//var timeRemaining = gameInfo.addedTime - gameInfo.timer.seconds;
			//gameInfo.timer.destroy();

			//gameInfo.timer = game.time.create();
	        
	        //gameInfo.addedTime = timeRemaining + 10;
	        //gameInfo.timerEvent = gameInfo.timer.add(gameInfo.addedTime * 1000, endTimer, this);

	        //gameInfo.timer.start();
	        //console.log("timer restarted");

	        gameInfo.timeRemaining += 10 * 60;
	    }