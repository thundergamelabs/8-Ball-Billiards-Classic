function renderScreen() {
	
	var gameInfo = playState.gameInfo;

	
	
	for (var n = 0; n < gameInfo.ballArray.length; n ++) {
		var ball = gameInfo.ballArray[n];
		
		if(ball.active == true){
			//update ball mc positions
			ball.mc.x = ball.position.x * gameInfo.physScale;
			ball.mc.y = ball.position.y * gameInfo.physScale;

			//ball.shade.x = ball.mc.x;
			//ball.shade.y = ball.mc.y;

			
			
			ball.shadow.x = ball.mc.x + (0.7 * gameInfo.ballRadius * gameInfo.physScale) * (ball.mc.x / (300 * 2.4));
			ball.shadow.y = ball.mc.y + (0.7 * gameInfo.ballRadius * gameInfo.physScale) * (ball.mc.y / (150 * 2.4));

			ball.marker.x = ball.mc.x;
			ball.marker.y = ball.mc.y;

			if(n == 0){
				ball.mover.x = ball.mc.x;
				ball.mover.y = ball.mc.y;
			}
			

			
			//if(n != 8){
				ball.mc.updateRotation(ball.velocity.x * gameInfo.physScale * ball.grip, ball.velocity.y * gameInfo.physScale * ball.grip, ball.ySpin); 
			//}
		}
	}
}