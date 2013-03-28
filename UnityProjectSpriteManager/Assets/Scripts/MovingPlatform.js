#pragma strict
var xSpeed : float = 0.02;
var ySpeed : float = 0.02;
var time : int = 10;

private var temp : int = 0;

function Start () {
	
}

function FixedUpdate () {
	if (temp >= time) temp = -time;
	temp++;
	
	if (temp > 0) {
		transform.position.x += xSpeed;
		transform.position.y += ySpeed;
	} else {
		transform.position.x -= xSpeed;
		transform.position.y -= ySpeed;
	}
}