



		
var Ball = function(radius, spotNumber) {

	//private vars
	this.ballRotation = new Array(1,0,0,0); //y, x, z, amount
	this.rX = 0;
	this.rY = 0;
	this.rZ = 0;
	this.circRad = 0;
	this.ballCanvas;
	this.ball;
	this.canvas;
	this.spot;
	this.spotHolder;
	this._mask;
	this.shading;
	this.highlightCanvas;
	this.highlight;
	this.ballColor;
	this.ballType; //stripe = 0, solid = 1
	
	this.circRad = radius;
	
	
	var spriteSheet;
	if (spotNumber <= 8) {
		this.ballType = 0; 
		spriteSheet = "solidsSpriteSheet";

	}else {
		this.ballType = 1;
		spriteSheet = "ballSpriteSheet" + String(spotNumber);
		//console.log("type 1");
	}



	
    //bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
	

	//main canvas
	

    

    Phaser.Group.call(this, game, this, 'ball');



	this.sprite = new Phaser.Sprite(game, 0, 0, spriteSheet);
	this.sprite.width = this.circRad * 2;
	this.sprite.height = this.circRad * 2;
	this.sprite.anchor = new Phaser.Point(0.5, 0.5);
	this.addChild(this.sprite);
	//this.tint = color;
	//this.addChild(ballCanvas);
	
	//white base on stripes and cueball, coloured base on solids
	
	//var base = new MovieClip();
	//ballCanvas.addChild(base);
	if(this.ballType == 1){
		//base.graphics.beginFill(0xffffff);
		//base.graphics.drawCircle(0, 0, circRad);
		//base.graphics.endFill();
	}else {

		this.sprite.frame = spotNumber;
		//base.graphics.beginFill(ballColor);
		//base.graphics.drawCircle(0, 0, circRad);
		//base.graphics.endFill();
	}
	
	//base = Rasterize.convertToRaster(base);

	//ball
	//ball = new Sprite();
	//ballCanvas.addChild(ball);
	//canvas = ball.graphics;

	//spot
	
	//spotHolder = new Sprite();
	//ball.addChild(spotHolder);
	this.spotHolder = new Phaser.Group(game, this, 'spotHolder'); //creates group and adds it to display list 
	
	this.spot = new Phaser.Sprite(game, 0, 0, 'spotSpriteSheet');
	this.spot.anchor = new Phaser.Point(0.5, 0.5);	
	this.spotHolder.addChild(this.spot);
	this.spot.frame = spotNumber; // setting frame has to be done after adding child
	
	
	//spot = Rasterize.convertToRaster(spotSource);
	
	this.spot.alpha = 1;
	//this.sprite.addChild(spot);

/*
	if(spotNumber == 8){

		this.sprite = new Phaser.Sprite(game, 0, 0, 'bonusDisc');
		this.sprite.width = this.circRad * 2;
		this.sprite.height = this.circRad * 2;
		this.sprite.anchor = new Phaser.Point(.5, .5);
		this.addChild(this.sprite);
	}
*/
	
	
	

	//shading
	
	/*
	shading = new Sprite();
	ballCanvas.addChild(shading);
	var mat= new Matrix();
	var colors=[0xFFFFFF,0x000000];
	var alphas=[1,1];
	var ratios=[0,255];
	mat.createGradientBox(2*circRad,2*circRad,0,-circRad - circRad * 0.2,-circRad - circRad * 0.2);
	shading.graphics.lineStyle();
	shading.graphics.beginGradientFill(GradientType.RADIAL,colors,alphas,ratios,mat);
	shading.graphics.drawCircle(0,0,circRad);
	shading.graphics.endFill();
	shading.alpha = 0.8;
	shading.blendMode = BlendMode.MULTIPLY;

	//highlight
	highlightCanvas = new Sprite();
	ballCanvas.addChild(highlightCanvas);
	highlight = new highlight_mc();
	highlight = Rasterize.convertToRaster(highlight);
	highlightCanvas.addChild(highlight);

	highlight.x = 0;
	highlight.y = 0;
	highlightCanvas.scaleX = circRad / 100;
	highlightCanvas.scaleY = circRad / 100;

	highlight.alpha = 0.4;
	highlightCanvas.blendMode = BlendMode.SCREEN;
	*/
	
	/*
	var shade = new Phaser.Sprite(game, 0, 0, 'shade');
	this.addChild(shade);
	shade.width = this.circRad * 2.2;
	shade.height = this.circRad * 2.2;
	shade.anchor = new Phaser.Point(0.5, 0.5);	
    */

    this.shade = new Phaser.Sprite(game, 0, 0, "shade");
	this.addChild(this.shade);
	this.shade.anchor = new Point(0.5, 0.5);
	this.shade.width = radius * 2.1;
	this.shade.height = radius * 2.1;

	if(spotNumber == 8){
		//this.shade.visible = false;
	}
	
	//mask
	 
	//_mask = new Sprite();
	//_mask.graphics.beginFill(0xff00ff);
	//_mask.graphics.drawCircle(0, 0, circRad);
	//_mask = Rasterize.convertToRaster(_mask);
	//ballCanvas.addChild(_mask);
	//ballCanvas.mask = _mask;
	
	this.updateRotation(Math.random()* 10 - 5, Math.random()* 10 - 5, Math.random()* 10 - 5); //ensures balls are rendered once before they start moving.  0 isn't big enough to exceed the rendering threshold
}

Ball.prototype = Object.create(Phaser.Group.prototype);
Ball.prototype.constructor = Ball;


Ball.prototype.updateRotation = function(vx, vy, r) {
	
	
	var dx = -vx; // vx is the change in the balls x position in screen coordinates
	var dy = r; //y rotation (y axis is looking straight down on the ball)
	var dz = vy; // vy is the change in the balls y position in screen coordinates x
	
	
	var len = Math.sqrt(dx*dx + dy*dy + dz*dz);
	if (len > 0.01){
		this.ballRotation = this.rotateQuat(this.ballRotation, dy/len, dx/len, dz/len, len / (this.circRad));
		this.ballRotation = this.normalize(this.ballRotation);
		this.renderBall(this.ballRotation);
	}
	
}

Ball.prototype.renderBall = function(q){


	
	//ballRotation is a quaternion - x,y,z,w
	
	//convert quaternion to Euler
	
	var qy = q[0];
	var qx = q[1];
	var qz = q[2];
	var qw = q[3];

	//console.log("qy: " + qy + ", qx: " + qx + ", qz: " + qz + ", qw: " + qw);
	
	var rotationY = Math.atan2(2 * qy * qw - 2 * qx * qz , 1 - 2 * qy * qy - 2 * qz * qz) + Math.PI;
	var rotationX = Math.asin(2 * qx * qy + 2 * qz * qw) + Math.PI;
	var rotationZ = Math.atan2(2 * qx * qw - 2 * qy * qz , 1 - 2 * qx * qx - 2 * qz * qz) + Math.PI;
	
	var test = qx*qy + qz*qw;
	
	if (test > 0.499) { // singularity at north pole
		//rotationX = 2 * Math.atan2(qx, qw) + Math.PI; // glitch here
		//rotationY = Math.PI/2 + Math.PI;
		//rotationZ = 0 + Math.PI;
		return;
	}
	if (test < -0.499) { // singularity at south pole
		//rotationX = -2 * Math.atan2(qx,qw) + Math.PI;
		//rotationY = - Math.PI/2 + Math.PI;
		//rotationZ = 0 + Math.PI;
		return;
	}
	
	this.angle = (180 / Math.PI) * rotationY;
	this.shade.angle = -this.angle;
	
	//trace(rotationX);
	
	//canvas.clear();
	//canvas.lineStyle(1, 0x000000, 0);
	//canvas.drawCircle(0, 0, circRad);

	//console.log("ballType: " + this.ballType);
	
	if (this.ballType == 1) {

		/*
		
		//=====================================
		//draw stripe
		//=====================================
	
		//ellipse 1
		var _y1a = circRad * Math.sin(rotationX + Math.PI / 4); //top point of ellipse
		var _y2a = circRad * Math.sin(rotationX + 3 * Math.PI / 4); //base of ellipse - 90 degrees further around the sphere than the top edge (PI/2)
		var _ha = _y2a - _y1a;
		
		var tangents:uint = 0;
		
		if(_y1a > 0 && _y2a > 0 || _y1a < 0 && _y2a < 0){
			var tangentA = findTangent(circRad * 0.7, Math.abs(_ha / 2), _y1a + (_ha / 2));
			if(tangentA < circRad){
				tangents ++;
			}
		}
		
		//ellipse 2 - 180 degrees (PI radians) out of phase with other ellipse
		var _y1b = circRad * Math.sin(rotationX + 5 * Math.PI / 4);
		var _y2b = circRad * Math.sin(rotationX + 7 * Math.PI / 4);
		var _hb = _y2b - _y1b;
		
		if(_y1b > 0 && _y2b > 0 || _y1b < 0 && _y2b < 0){
			var tangentB = findTangent(circRad * 0.7, Math.abs(_hb / 2), _y1b + (_hb / 2));
			if(tangentB > -100){
				tangents ++;
			}
		}
		
		//canvas.beginFill(0xffffff);
		//canvas.drawCircle(0, 0, circRad);
		//canvas.endFill();
		
		if(tangents == 2){
			
			canvas.beginFill(ballColor);
			
			if(rotationX >= Math.PI){
				canvas.drawRect( -circRad, tangentA, circRad * 2, tangentB - tangentA);
			}else {
				canvas.drawRect( -circRad, tangentB, circRad * 2, tangentA - tangentB);
			}
			canvas.endFill();
			
			if(rotationX >= Math.PI){
				canvas.beginFill(ballColor);
			}else {
				canvas.beginFill(0xffffff);
			}
			canvas.drawEllipse( -circRad * 0.7, _y1a, circRad * 0.7 * 2, _ha);
			canvas.endFill();
			
			if(rotationX < Math.PI){
				canvas.beginFill(ballColor);
			}else {
				canvas.beginFill(0xffffff);
			}
			
			canvas.drawEllipse( -circRad * 0.7, _y1b, circRad * 0.7 * 2, _hb);
			canvas.endFill();
			
		}else{
			canvas.beginFill(ballColor);
			canvas.drawCircle(0, 0, circRad);
			canvas.endFill();
			
			canvas.beginFill(0xffffff);
			if(rotationX >= Math.PI){
				canvas.drawEllipse( -circRad * 0.7, _y1b, circRad * 0.7 * 2, _hb);
			}else {
				canvas.drawEllipse( -circRad * 0.7, _y1a, circRad * 0.7 * 2, _ha);
			}
			canvas.endFill();
		}

		*/

		//NEW FOR PHASER, set spritesheet frame to corresponding rotationX value

		//range of rotationX is PI/2 to 3PI/2.  No idea why, but it is.

		var v = (rotationX - 0.5 * Math.PI) / (Math.PI); // gives rotation as a value between 0 and 1 given the range using (n-n1)/(n2-n1)

		this.sprite.frame = 41 - Math.round(41 * v);



		//console.log("rotationX: " + rotationX);
		//console.log("setting frame: " + this.sprite.frame);

	}
	


	//=====================================
	//draw spot
	//=====================================
	
	this.spotHolder.x = 0;
	this.spotHolder.y = 0;
	this.spotHolder.angle = 0;
	
	
	this.spot.x = 0;
	this.spot.y = 0;
	this.spot.angle = 0;
	//spot.width = 80 * circRad / 100;
	//spot.height = 80 * circRad / 100;
	
	this.spot.width = this.circRad * 1;
	this.spot.height = this.circRad * 1;


	
	
	if (rotationX < Math.PI / 2 || rotationX > 3 * Math.PI / 2) {
		if (rotationZ > Math.PI / 2 && rotationZ < 3 * Math.PI / 2) {
			this.spotHolder.y =  this.circRad * Math.cos(rotationZ) * Math.sin(rotationX);
			this.spotHolder.x =  this.circRad * Math.sin(rotationZ);
		}else {
			this.spotHolder.y = - this.circRad * Math.cos(rotationZ) * Math.sin(rotationX);
			this.spotHolder.x = - this.circRad * Math.sin(rotationZ);
		}
	}else {
		if (rotationZ > Math.PI / 2 && rotationZ < 3 * Math.PI / 2) {
			this.spotHolder.y = - this.circRad * Math.cos(rotationZ) * Math.sin(rotationX);
			this.spotHolder.x = - this.circRad * Math.sin(rotationZ);
		}else {
			this.spotHolder.y = this.circRad * Math.cos(rotationZ) * Math.sin(rotationX);
			this.spotHolder.x = this.circRad * Math.sin(rotationZ);
		}
		
	}
	
	
	
	var dist = Math.sqrt(this.spotHolder.x * this.spotHolder.x + this.spotHolder.y * this.spotHolder.y);
	var distRatio = dist / this.circRad;
	var scaleY = Math.cos(distRatio * Math.PI / 2);
	var spotDir = Math.atan2(this.spotHolder.y, this.spotHolder.x);
	
	this.spotHolder.scale = new Point(1, scaleY);
	//this.spotHolder.scaleY = scaleY;
	this.spotHolder.angle =  (180 / Math.PI) * spotDir + 90;
	this.spot.angle = -this.spotHolder.angle;

	this.spot.alpha = scaleY + 0.2;
	
	//==================================
	
	
}



Ball.prototype.rotateQuat = function(q, _x, _y, _z, angle) {

//_x, _y, _z are numbers between 0 and 1 that make up the direction vector xyz
//rotates the quaternion q by angle, in radians along the axis given by vector xyz

	//magnitude of direction vector xyz
	var n = Math.sqrt(_x * _x + _y * _y + _z * _z);
	
	//unit vectors
	var nx = _x / n;
	var ny = _y / n;
	var nz = _z / n;
	
	var s = Math.sin(0.5*angle);
	
	var q2x = nx * s;
	var q2y = ny * s;
	var q2z = nz * s;
	var q2w = Math.cos(0.5 * angle);
	
	var q1x = q[0];
	var q1y = q[1];
	var q1z = q[2];
	var q1w = q[3];
	
	var dx =  q1x * q2w + q1y * q2z - q1z * q2y + q1w * q2x;
	var dy = -q1x * q2z + q1y * q2w + q1z * q2x + q1w * q2y;
	var dz =  q1x * q2y - q1y * q2x + q1z * q2w + q1w * q2z;
	var dw = -q1x * q2x - q1y * q2y - q1z * q2z + q1w * q2w;
	
	var q_ = new Array();
	q_[0] = dx;
	q_[1] = dy;
	q_[2] = dz;
	q_[3] = dw;
	
	return q_;
}

Ball.prototype.normalize = function(q){
	
	var len = Math.sqrt(q[0]*q[0] + q[1]*q[1] + q[2]*q[2] + q[3]*q[3]);
	
	var q_ = new Array();

	q_[0] = q[0] / len;
	q_[1] = q[1] / len;
	q_[2] = q[2] / len;
	q_[3] = q[3] / len;

	return q_;
}
	
