/***************************************************************************************************************
 Vector2D Class For Actionscript 3.0 
 ---------------------------------------------------------------------------------------------------------------
  method listing:
	  
    state-altering methods:
		
      Vector2D(x, y)    - create vector and set the components to x and y
      Vector2D(v)     - create vector and set the components to the components of vector v
      set(x, y)     - set the components to x and y
      set(v)        - set the components to the components of vector v
	  swap(v)       - swap the components of the vector and vector v (note: also alters vector v)
	   
	 state-safe methods:
	  
      plus(v1 ... vn)   - add the components of the given vectors to the components of the vector
      minus(v1 ... vn)  - subtract the components of given vectors from the components of the vector
      times(x, y)     - multiply the components of vector by x and y
      times(scalar)   - multiply the components of vector by number scalar
      times(v)      - multiply the components of vector by the components of vector v
      invert()      - invert (or reverse) the vector
	  normalize()    - converts vector into a unit vector in the same direction
      project(v)      - set the vector to be the projection of the vector onto vector v
      reflect(v)      - reflect the vector over vector v
      rotate(a)     - rotate the vector by angle a in degrees
     
    
      getLeftNormal()   - return a new vector which is left hand normal to the vector
      getRightNormal()  - return a new vector which is right hand normal to the vector
      cross(v)      - return the magnitude of the cross product of the vector and vector v
      dot(v)        - return the dot product of the vector and vector v
      angleBetween(v)   - return the angle between the vector and vector v
      angleBetweenCos(v)  - return the cosine of the angle between the vector and vector v
      angleBetweenSin(v)  - return the sine of the angle between the vector and vector v
    comparison methods:
      isEqualTo(v)    - test for equality between the vector and vector v
      isNormalTo(v)   - test for normality between the vector and vector v
    utility methods:
      paint(mc, color)  - draw vector in given movieclip using a given color
    private methods:
      fixNumber()     - convert all inputs to a number of fixed precision
      toString()      - override of built in method to provide meaningful output
	  
  property listing:
	  
    x     - virtual property representing the current x component of the vector  (get/set)
    y     - virtual property representing the current y component of the vector  (get/set)
    angle   - virtual property representing the current degree angle of the vector (get/set)
    magnitude - virtual property representing the current magnitude of the vector    (get/set)

  Feel free to use this code as you wish, Have Fun!
  Please send bug reports && ( gripes || praise ) to nick[at]zambetti[dot]com
***************************************************************************************************************/




var Vector2D = function(x, y){

      this.xValue = Maths.fixNumber(x);
      this.yValue = Maths.fixNumber(y);
    
}
  

// description: getters and setters
  Vector2D.prototype = {

      get x(){
        return this.xValue;
      },
      set x(newX){
        this.xValue = Maths.fixNumber(newX);
      },
       get y(){
        return this.yValue;
      },
      set y(newY){
        this.yValue = Maths.fixNumber(newY);
      },
      get angle(){
        return Maths.fixNumber(Math.atan2(this.yValue, this.xValue) * (180 / Math.PI));
      },
      set angle(newAngle){
        var angleRadians = 0;
        if (!isNaN(Number(newAngle))) {
          angleRadians = Number(newAngle) * (Math.PI / 180);
        }
        var currentMagnitude = Math.sqrt(Math.pow(this.xValue, 2) + Math.pow(this.yValue, 2));
        this.xValue = Maths.fixNumber(currentMagnitude * Math.cos(angleRadians));
        this.yValue = Maths.fixNumber(currentMagnitude * Math.sin(angleRadians));
      },
      get magnitude(){
        return Maths.fixNumber(Math.sqrt(this.xValue * this.xValue + this.yValue * this.yValue));
      },
      get magnitudeSquared(){
        return Maths.fixNumber(this.xValue * this.xValue + this.yValue * this.yValue);
      },
      set magnitude(newMagnitude){
        if (isNaN(Number(newMagnitude))) {
          this.xValue = this.yValue = 0;
        }
        var currentMagnitude = Math.sqrt(Math.pow(this.xValue, 2) + Math.pow(this.yValue, 2));
        if (0 < currentMagnitude) {
          this.times(Number(newMagnitude) / currentMagnitude);
        } else {
          this.yValue = 0;
          this.xValue = Maths.fixNumber(newMagnitude);
        }
      }





    }

//don't think we need a setter for the vector2D, as we can set x and y above anyway
/*
  //
  // description: sets the properties of the vector
  // parameters: x:Number, y:Number || v:Vector2D
  // returns: reference to the vector 
  set Vector2D(... args) = function
  {
    this.xValue = 0;
    this.yValue = 0;
    
    if (2 == args.length) {
      // x and y were passed
      this.xValue = Maths.fixNumber(args[0]);
      this.yValue = Maths.fixNumber(args[1]);
    } else if (1 == args.length) {
      if (args[0] is Vector2D) {
        // an existing vector was passed
        this.xValue = args[0].x;
        this.yValue = args[0].y;
      }
    }
    return this;
  }
*/
  
  
// description: adds given vectors to the vector
// parameters: v1:Vector2D ... vn;Vector2D
// returns: reference to the vector
Vector2D.prototype.plus = function(vector){
  
	var v = new Vector2D(this.xValue, this.yValue);
  
    
  v.xValue += vector.xValue;
  v.yValue += vector.yValue;
    
  
  v.xValue = Maths.fixNumber(v.xValue);
  v.yValue = Maths.fixNumber(v.yValue);
   
	
	return v;
}
  //
  // description: subtracts given vectors from the vector
  // parameters: v1:Vector2D ... vn:Vector2D
  // returns: reference to the vector
Vector2D.prototype.minus = function(vector){
  
	var v = new Vector2D(this.xValue, this.yValue);
   
     
    v.xValue -= vector.xValue;
    v.yValue -= vector.yValue;
      
    
    v.xValue = Maths.fixNumber(v.xValue);
    v.yValue = Maths.fixNumber(v.yValue);
    return v;
}
  //
  // description: multiplies the components by the x and y args or by the given vector
  // parameters: x:number, y:number || scalar:number || v:Vector2D
  // returns: reference to the vector
  Vector2D.prototype.times = function(input)
  {
	var v = new Vector2D(this.xValue, this.yValue);
    
      if (input instanceof Vector2D) {
        v.xValue *= input.xValue;
        v.yValue *= input.yValue;
      } else {
          //assume input is a number
          v.xValue *= input;
          v.yValue *= input;
      }
      
    
    v.xValue = Maths.fixNumber(v.xValue);
    v.yValue = Maths.fixNumber(v.yValue);
    return v;
  }
  //
  // description: rotates the vector by the given angle (in degrees)
  // parameters: rotationAngle:Number
  // returns: reference to the vector
  Vector2D.prototype.rotate = function(rotationAngle)
  {
	  var v = new Vector2D(this.xValue, this.yValue);
    if (isNaN(Number(rotationAngle))) {
      return v;
    }
    var currentMagnitude = Math.sqrt(Math.pow(v.xValue, 2) + Math.pow(v.yValue, 2));
    var newAngleRadians = ((Math.atan2(v.yValue, v.xValue) * (180 / Math.PI)) + Number(rotationAngle)) * (Math.PI / 180);
    v.xValue = Maths.fixNumber(currentMagnitude * Math.cos(newAngleRadians));
    v.yValue = Maths.fixNumber(currentMagnitude * Math.sin(newAngleRadians));
    return v;
  }
  //
  // description: inverts the vector
  // parameters: none
  // returns: reference to the vector
  Vector2D.prototype.invert = function()
  {
	var v = new Vector2D(this.xValue, this.yValue);
    v.xValue *= -1;
    v.yValue *= -1;
    return v;
  }
  
  
  //converts vector into a unit vector
  Vector2D.prototype.normalize = function()
  {
	var v = new Vector2D(this.xValue, this.yValue);
    v = v.times(1 / v.magnitude);
    return v;
  }
  
  
  
  
  //
  // description: projects the vector onto vector v
  // parameters: v:Vector2D
  // returns: reference to the vector
  Vector2D.prototype.project = function(v)
  {
	var n = new Vector2D(this.xValue, this.yValue);
    if (v instanceof Vector2D) {
      var scalar = n.dot(v) / Math.pow(v.magnitude, 2);
      //n.set(v);
      n.x = v.x;
      n.y = v.y;
      n = n.times(scalar);
    }
    return n;
  }
  //
  // description: relects the vector over vector v
  // parameters: v:Vector2D
  // returns: reference to the vector
  Vector2D.prototype.reflect = function(v)
  {
	var n = new Vector2D(this.xValue, this.yValue);
    if (v instanceof Vector2D) {
      var vAfterHorizReflect = new Vector2D(v.yValue, -v.xValue);
      var rotationAngle = 2 * n.angleBetween(v);
      if (0 >= n.angleBetweenCos(vAfterHorizReflect)) {
        rotationAngle *= -1;
      }
      n = n.rotate(rotationAngle);
    }
    return n;
  }
  //
  // description: calculates the dot product of the vector and vector v
  // parameters: v:Vector2D
  // returns: number
  Vector2D.prototype.dot = function(v)
  {
    if (v instanceof Vector2D) {
      return Maths.fixNumber((this.xValue * v.xValue) + (this.yValue * v.yValue));
    }
    return 0;
  }
  //
  // description: calculates the cross product of the vector and vector v
  // parameters: v:Vector2D
  // returns: number (representing the magnitude of the theoretical vector result)
  Vector2D.prototype.cross = function(v)
  {
    if (v instanceof Vector2D) {
      return Math.abs(Maths.fixNumber((this.xValue * v.yValue) - (this.yValue * v.xValue)));
    }
    return 0;
  }
  //
  // description: calculates the the angle between the vector and vector v in degrees
  // parameters: v:Vector2D
  // returns: number
  Vector2D.prototype.angleBetween = function(v)
  {
    if (v instanceof Vector2D) {
      return Maths.fixNumber(Math.acos(this.dot(v) / (this.magnitude * v.magnitude)) * (180 / Math.PI));
    }
    return 0;
  }
  //
  // description: calculates the sine of the angle between the vector and vector v
  // parameters: v:Vector2D
  // returns: number
  Vector2D.prototype.angleBetweenSin = function(v)
  {
    if (v instanceof Vector2D) {
      return Maths.fixNumber(this.cross(v) / (this.magnitude * v.magnitude));
    }
    return 0;
  }
  //
  // description: calculates the cosine of the angle between the vector and vector v
  // parameters: v:Vector2D
  // returns: number
  Vector2D.prototype.angleBetweenCos = function(v)
  {
    if (v instanceof Vector2D) {
      return Maths.fixNumber(this.dot(v) / (this.magnitude * v.magnitude));
    }
    return 0;
  }
  //
  // description: exchanges data of the vector and the given vector
  // parameters: v:Vector2D
  // returns: reference to the vector
  Vector2D.prototype.swap = function(v)
  {
    if (v instanceof Vector2D) {
      var tempX = this.xValue;
      var tempY = this.yValue;
      this.xValue = v.xValue;
      this.yValue = v.yValue;
      v.xValue = tempX;
      v.yValue = tempY;
    }
    return this;
  }
  //
  // description: creates a new vector which is normal (clockwise) to the vector
  // parameters: none
  // returns: reference to the newly created vector
  
  Vector2D.prototype.getRightNormal = function()
  {
    return new Vector2D(this.yValue, -this.xValue);
  }
  //
  // description: creates a new vector which is normal (anti-clockwise) to the vector
  // parameters: none
  // returns: reference to the newly created vector
  Vector2D.prototype.getLeftNormal = function()
  {
    return new Vector2D(-this.yValue, this.xValue);
  }
  //
  // description: tests if two vectors are normal to each other
  // parameters: v:Vector2D
  // returns: boolean indicating normality
  Vector2D.prototype.isNormalTo = function(v)
  {
    if (v instanceof Vector2D) {
      return (this.dot(v) === 0);
    } else {
      return false;
    }
  }
  //
  // description: tests if two vectors are equal to each other
  // parameters: v:Vector2D
  // returns: boolean indicating equality
  Vector2D.prototype.isEqualTo = function(v)
  {
    if (v instanceof Vector2D) {
      if ((this.xValue === v.xValue) && (this.yValue === v.yValue)) {
        return true;
      }
    }
    return false;
  }
  


  // description: override of toString() that produces meaningful output
  // parameters: none
  // returns: string
  /*
  public function toString():String
  {
    return "[" + this.xValue + "," + this.yValue + "]";
  }
  */


