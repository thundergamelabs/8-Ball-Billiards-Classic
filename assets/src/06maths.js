
var Maths = function() {

}
	

var Point = function(x, y){

	this.x = x;
	this.y = y;

}

Point.interpolate = function(p1, p2, f){

	//precise method
	var x = Maths.fixNumber((1-f)*p1.x + f*p2.x);
	var y = Maths.fixNumber((1-f)*p1.y + f*p2.y);

	//imprecise method
	//var x = p1.x + (p2.x - p1.x) * f;
	//var y = p1.y + (p2.y - p1.y) * f;

	return new Point(x, y);
}

Point.prototype.equals = function(toCompare){

	if(this.x == toCompare.x && this.y == toCompare.y){
		return true;
	}
	return false;
}

	


//---------------------------------------------------------------
//Checks for intersection of Segment if as_seg is true. By Keith Hair
//Checks for intersection of Line if as_seg is false.
//Return intersection of Segment AB and Segment EF as a Point
//Return null if there is no intersection
//---------------------------------------------------------------

Maths.lineIntersectLine2 = function(a, b, c, d){

	var distAB, cos, sin, newX, ABpos;
	if ((a.x == b.x && a.y == b.y) || (c.x == d.x && c.y == d.y)) return null;

	//if ( a == c || a == d || b == c || b == d ) return null;

	//b = b.clone();
	//c = c.clone();
	//d = d.clone();

	var _b = new Point(b.x - a.x, b.y - a.y);
	var _c = new Point(c.x - a.x, c.y - a.y);
	var _d = new Point(d.x - a.x, d.y - a.y);
	// a is now considered to be (0,0)

	distAB = Maths.fixNumber(Math.sqrt(_b.x * _b.x + _b.y * _b.y));
	cos = Maths.fixNumber(_b.x / distAB);
	sin = Maths.fixNumber(_b.y / distAB);

	__c = new Point(_c.x * cos + _c.y * sin, _c.y * cos - _c.x * sin);
	__d = new Point(_d.x * cos + _d.y * sin, _d.y * cos - _d.x * sin);

	if ((__c.y < 0 && __d.y < 0) || (__c.y >= 0 && __d.y >= 0)) return null;

	ABpos = Maths.fixNumber(__d.x + (__c.x - __d.x) * __d.y / (__d.y - __c.y)); // what.
	if (ABpos < 0 || ABpos > distAB) return null;

	return new Point(a.x + ABpos * cos, a.y + ABpos * sin);			
}








Maths.lineIntersectLine = function(/*Point*/A, B, E, F, as_seg) {

	as_seg = true;

	var ip; //point
	var a1; //numbers
	var a2;
	var b1;
	var b2;
	var c1;
	var c2;
 
	a1= B.y-A.y;
	b1= A.x-B.x;
	c1= B.x*A.y - A.x*B.y;
	a2= F.y-E.y;
	b2= E.x-F.x;
	c2= F.x*E.y - E.x*F.y;
 
	var denom = a1*b2 - a2*b1;
	if (denom == 0) {
		return null; //collinear lines - counted as not intersecting
	}
	ip = new Point();
	ip.x=(b1*c2 - b2*c1)/denom;
	ip.y = (a2 * c1 - a1 * c2) / denom;
	
	//rounding to fixed point
	ip.x = Maths.fixNumber(ip.x);
	ip.y = Maths.fixNumber(ip.y);
 
	//---------------------------------------------------
	//Do checks to see if intersection to endpoints
	//distance is longer than actual Segments.
	//Return null if it is with any.
	//---------------------------------------------------
	if ( as_seg ) {

		var e = 0;
		if (  ( ip.x - A.x ) * ( ip.x - B.x ) > e  ||  ( ip.y - A.y ) * ( ip.y - B.y ) > e  ||  ( ip.x - E.x ) * ( ip.x - F.x ) > e  ||  ( ip.y - E.y ) * ( ip.y - F.y ) > e){
			return null ;
		}
	}
	return ip;
}

		
Maths.lineIntersectCircle2 = function(A, B, C, r){

	var result = new Object ();
	result.inside = false;
	result.tangent = false;
	result.intersects = false;
	result.enter=null;
	result.exit=null;

	var VA = new Vector2D(A.x, A.y);
	var VB = new Vector2D(B.x, B.y);
	var VC = new Vector2D(C.x, C.y);

	var d = VB.minus(VA);
	var f = VA.minus(VC);

	var a = d.dot( d ) ;
	var b = 2*f.dot( d ) ;
	var c = f.dot( f ) - r*r ;

	var discriminant = b*b-4*a*c;
	if( discriminant < 0 )
	{
	  return result; // no intersection
	}
	else
	{
	  // ray didn't totally miss sphere,
	  // so there is a solution to
	  // the equation.

	  discriminant = Maths.fixNumber(Math.sqrt(discriminant));

	  if(discriminant == 0){
	  		//t1 will equal t2, so it's a tangent and we can ignore the contact
	  		result.tangent = true;
	  		console.log("! TANGENT !");
	  		return result;
	  }

	  // either solution may be on or off the ray so need to test both
	  // t1 is always the smaller value, because BOTH discriminant and
	  // a are nonnegative.
	  var t1 = Maths.fixNumber((-b - discriminant)/(2*a));
	  var t2 = Maths.fixNumber((-b + discriminant)/(2*a));

	  // 3x HIT cases:
	  //          -o->             --|-->  |            |  --|->
	  // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit), 

	  // 3x MISS cases:
	  //       ->  o                     o ->              | -> |
	  // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

	  if(t1 > 1 && t2 > 1){
	  	return result;
	  }
	  if(t1 < 0 && t2 < 0){
	  	return result;
	  }

	  if(t1<0 && t2>1){
	  	result.inside = true;
	  	return result;
	  }


	  if( t1 >= 0 && t1 <= 1 )
	  {
	    // t1 is the intersection, and it's closer than t2
	    // (since t1 uses -b - discriminant)
	    // Impale, Poke
	    result.enter = Point.interpolate (A, B, t2);
		result.enter = new Point(Maths.fixNumber(result.enter.x), Maths.fixNumber(result.enter.y));
		result.intersects = true;
	    return result ;
	  }

	  // here t1 didn't intersect so we are either started
	  // inside the sphere or completely past it
	  if( t2 >= 0 && t2 <= 1 )
	  {
	    // ExitWound
	    result.exit = Point.interpolate (A, B, t1);
		result.exit = new Point(Maths.fixNumber(result.exit.x), Maths.fixNumber(result.exit.y));
		result.intersects = true;
	    return result;
	  }

	  // no intn: FallShort, Past, CompletelyInside
	  return result  ;
	}
}

Maths.circleIntersectCircle = function(x1, y1, r1, x2, y2, r2){

	var result = new Object();

	if(r1 < 0 || r2 < 0){
		result = null;
		return result;
	} 

    var a = r2;
    var b = r1;
    var c = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

    if(c > r1 + r2){
    	result = null;
		return result;
    }

    var d = (b*b+c*c-a*a)/(2*c);
    var h = Math.sqrt(b*b-d*d);
    //console.log(a,b,c,d,h);
    result.x3 = (x2-x1)*d/c + (y2-y1)*h/c +  x1;
    result.y3 = (y2-y1)*d/c - (x2-x1)*h/c +  y1;
    result.x4 = (x2-x1)*d/c - (y2-y1)*h/c +  x1;
    result.y4 = (y2-y1)*d/c + (x2-x1)*h/c +  y1;

    return result;

}


Maths.lineIntersectCircle = function(A, B, C, r) {

	//A and B are any two points on the line
	//C is centre point of circle
	//r is circle radius
	
	var result = new Object ();
	result.inside = false;
	result.tangent = false;
	result.intersects = false;
	result.enter=null;
	result.exit=null;
	var a = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
	var b = 2 * ((B.x - A.x) * (A.x - C.x) +(B.y - A.y) * (A.y - C.y));
	var cc = C.x * C.x + C.y * C.y + A.x * A.x + A.y * A.y - 2 * (C.x * A.x + C.y * A.y) - r * r;
	var deter = Maths.fixNumber(b * b - 4 * a * cc);
	
	if (deter <= 0 ) {
		result.inside = false;
	} else {
		var e = Maths.fixNumber(Math.sqrt (deter));
		var u1 = Maths.fixNumber(( - b + e ) / (2 * a ));
		var u2 = Maths.fixNumber(( - b - e ) / (2 * a ));
		if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
			if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
				result.inside = false;
			} else {
				result.inside = true;
			}
		} else {
			if (0 <= u2 && u2 <= 1) {
				
				result.enter = Point.interpolate (A, B, u2);
				result.enter = new Point(Maths.fixNumber(result.enter.x), Maths.fixNumber(result.enter.y));
			}
			if (0 <= u1 && u1 <= 1) {
				result.exit = Point.interpolate (A, B, u1);
				result.exit = new Point(Maths.fixNumber(result.exit.x), Maths.fixNumber(result.exit.y));
			}
			result.intersects = true;
			if (result.exit != null && result.enter != null && result.exit.equals(result.enter)) {
				result.tangent = true;
			}
		}
	}
	return result;
}


Maths.findBearing = function(x, y){
	
	var bearing = (180 / Math.PI) * Math.atan2(y,x);
	return Maths.fixNumber(bearing);
}


Maths.angleDiff = function(bearing1, bearing2){
	
	var diff = Maths.wrapValue(bearing1 + 180 - bearing2) - 180;
	return Maths.fixNumber(diff);
	
	

}



Maths.wrapValue = function (input){
	
	
	if(input > 360){
		input -= 360;
	}
	if(input < 0){
		input += 360;
	}
	return input;
}

Maths.wrapInfinite = function (input){


}

Maths.fixNumber = function(numberValue) {

	// description: converts all numeric inputs to a number of fixed precision
    // parameters: numberValue:Number
    // returns: number rounded to a fixed precision
	
	return isNaN(Number(numberValue)) ? 0 : Math.round(Number(numberValue) * 10000) / 10000;
	//return numberValue;
}
		  
Maths.createVectorFrom2Points = function(point1, point2) {
	 
	var vector = new Vector2D(point2.x - point1.x, point2.y - point1.y);
	return vector;
}

Maths.checkObjectsConverging = function(p1, p2, v1, v2){

	//takes the position and velocity vectors of two objects and determines whether they are converging
	
	//consider the target to be stationary, by using the target's frame of reference - so start by subtracting it from the object's velocity vector

	var v2Rel = v2.minus(v1);
	//find the normal - ie. the unit vector in the direction of the line which joins the two objects' centres

	var normal = p2.minus(p1).normalize();

	//check the angle between the two vectors
	var ang = v2Rel.angleBetween(normal);

	if(ang > 90 ){
		return true;
	}
	return false;


}
	

 
 