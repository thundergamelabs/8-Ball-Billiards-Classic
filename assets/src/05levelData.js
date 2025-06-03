var setBallPositions = function(gameInfo){

	//console.log("setBallPositions");
	//console.log("projectInfo: " + projectInfo);
	//console.log("level: " + projectInfo.level);
	
	
	var ballPositionArray = new Array();
	var px = 15000 * gameInfo.adjustmentScale; 
	var spacingX = 0.05 + Math.random() * 0.05; //0.05
	var spacingY = 0.05 + Math.random() * 0.05; //0.05
	var j = 1 + spacingY;
	var k = 1.732 + spacingX; //1.732 spacing
	
	var level = projectInfo.level;
	if(level > gameInfo.numLevels){
		level = gameInfo.numLevels;
	}

	if(projectInfo.tutorial == true){
		level = 100;
	}

	level = 15;
	
	
	switch(level) {
		
		case 1:
			
			
			ballPositionArray[0] = new Point( -px, 0);
			
			ballPositionArray[1] = new Point( px, 0);
			
			ballPositionArray[2] = new Point(px + k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[3] = new Point(px + k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			

		break;



		case 2:
			
			
			ballPositionArray[0] = new Point( -px, 0);
			
			ballPositionArray[1] = new Point( px, 0);
			
			ballPositionArray[2] = new Point(px + k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[3] = new Point(px + k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			
			ballPositionArray[4] = new Point(px + 2 * k * gameInfo.ballRadius, 0);
			

			
			

		break;

		case 3:


			ballPositionArray[0] = new Point( -px, 0);
			
			ballPositionArray[1] = new Point( px, 0);
			
			ballPositionArray[2] = new Point(px + k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[3] = new Point(px + k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			

			ballPositionArray[4] = new Point(px + 2 * k * gameInfo.ballRadius, 2 * gameInfo.ballRadius * j);
			ballPositionArray[5] = new Point(px + 2 * k * gameInfo.ballRadius, - 2 * gameInfo.ballRadius * j);
			ballPositionArray[6] = new Point(px + 2 * k * gameInfo.ballRadius, 0);
		break;


		case 4:

			ballPositionArray[0] = new Point( -px, 0);
			
			ballPositionArray[1] = new Point( px, 0);
			
			ballPositionArray[2] = new Point(px + k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[3] = new Point(px + k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			
			ballPositionArray[6] = new Point(px + 2 * k * gameInfo.ballRadius, 0);
			ballPositionArray[4] = new Point(px + 2 * k * gameInfo.ballRadius, 2 * gameInfo.ballRadius * j);
			ballPositionArray[5] = new Point(px + 2 * k * gameInfo.ballRadius, - 2 * gameInfo.ballRadius * j);

			ballPositionArray[7] = new Point(px + 3 * k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			ballPositionArray[8] = new Point(px + 3 * k * gameInfo.ballRadius, gameInfo.ballRadius * j);


		break;

		case 5:


			//nine ball setup
			ballPositionArray[0] = new Point( -px, 0);
			
			ballPositionArray[1] = new Point( px, 0);
			
			ballPositionArray[2] = new Point(px + k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[3] = new Point(px + k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			
			ballPositionArray[9] = new Point(px + 2 * k * gameInfo.ballRadius, 0);
			ballPositionArray[4] = new Point(px + 2 * k * gameInfo.ballRadius, 2 * gameInfo.ballRadius * j);
			ballPositionArray[5] = new Point(px + 2 * k * gameInfo.ballRadius, - 2 * gameInfo.ballRadius * j);
			
			ballPositionArray[6] = new Point(px + 3 * k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[7] = new Point(px + 3 * k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			
			ballPositionArray[8] = new Point(px + 4 * k * gameInfo.ballRadius, 0);



		break;

		case 6:


			//nine ball setup
			ballPositionArray[0] = new Point( -px, 0);
			
			ballPositionArray[1] = new Point( px, 0);
			
			ballPositionArray[2] = new Point(px + k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[3] = new Point(px + k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			
			ballPositionArray[9] = new Point(px + 2 * k * gameInfo.ballRadius, 0);
			ballPositionArray[4] = new Point(px + 2 * k * gameInfo.ballRadius, 2 * gameInfo.ballRadius * j);
			ballPositionArray[5] = new Point(px + 2 * k * gameInfo.ballRadius, - 2 * gameInfo.ballRadius * j);
			
			ballPositionArray[6] = new Point(px + 3 * k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[7] = new Point(px + 3 * k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			
			ballPositionArray[8] = new Point(px + 4 * k * gameInfo.ballRadius, 0);



		break;


		

		case 15:

			//15 ball setup
			ballPositionArray[0] = new Point( -px, 0);
			ballPositionArray[1] = new Point( px, 0);
			ballPositionArray[2] = new Point(px + k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			ballPositionArray[15] = new Point(px + k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			ballPositionArray[8] = new Point(px + 2 * k * gameInfo.ballRadius, 0);
			ballPositionArray[5] = new Point(px + 2 * k * gameInfo.ballRadius, 2 * gameInfo.ballRadius * j);
			ballPositionArray[10] = new Point(px + 2 * k * gameInfo.ballRadius, - 2 * gameInfo.ballRadius * j);
			ballPositionArray[7] = new Point(px + 3 * k * gameInfo.ballRadius, 1 * gameInfo.ballRadius * j);
			ballPositionArray[4] = new Point(px + 3 * k * gameInfo.ballRadius, 3 * gameInfo.ballRadius * j);
			ballPositionArray[9] = new Point(px + 3 * k * gameInfo.ballRadius, -1 * gameInfo.ballRadius * j);
			ballPositionArray[6] = new Point(px + 3 * k * gameInfo.ballRadius, -3 * gameInfo.ballRadius * j);
			ballPositionArray[11] = new Point(px + 4 * k * gameInfo.ballRadius, 0);
			ballPositionArray[12] = new Point(px + 4 * k * gameInfo.ballRadius, 2 * gameInfo.ballRadius * j);
			ballPositionArray[13] = new Point(px + 4 * k * gameInfo.ballRadius, - 2 * gameInfo.ballRadius * j);
			ballPositionArray[14] = new Point(px + 4 * k * gameInfo.ballRadius, 4 * gameInfo.ballRadius * j);
			ballPositionArray[3] = new Point(px + 4 * k * gameInfo.ballRadius, - 4 * gameInfo.ballRadius * j);
			
		break;


		case 100:
			
			
			ballPositionArray[0] = new Point( -px, 0);
			
			ballPositionArray[1] = new Point( px + 10000, -10000);
			
			//ballPositionArray[2] = new Point(px + k * gameInfo.ballRadius, gameInfo.ballRadius * j);
			//ballPositionArray[3] = new Point(px + k * gameInfo.ballRadius, - gameInfo.ballRadius * j);
			

		break;


	
	}
	
	
	return ballPositionArray;

}