#pragma strict
private var graphics : UnityEngine.GameObject;
private var play : UnityEngine.GameObject;
private var motor : CharacterMotor;
private var following : int;
private var invincible : int;
var xSpeed : float;
var ySpeed : float;
var time : int;

private var temp : int;

function Awake () {
	invincible = 0;
	following = 0;
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
	play = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	if(invincible != 0){
		invincible--;
	}
	if (temp >= time) temp = -time;
	temp++;
	if(Mathf.Abs(play.transform.position.x - transform.position.x) < 0.6 && Mathf.Abs(play.transform.position.y - transform.position.y) < 2.5 && invincible == 0){
		play.gameObject.GetComponent(FPSInputController).takeDamage();
		invincible = 10;
	}
	if (temp > 0) {
		transform.position.x += xSpeed;
		transform.position.y += ySpeed;
	} else{
		transform.position.x -= xSpeed;
		transform.position.y -= ySpeed;
	}
}
	/*if (Mathf.Abs(play.transform.position.x - transform.position.x) < 10){
		following = 1;
	} else if (Mathf.Abs(play.transform.position.x - transform.position.x) > 30) {
		following = 0;
	}

	if (Mathf.Abs(play.transform.position.x - transform.position.x) > 0.1 && following == 1) {
		motor.inputMoveDirection = (new Vector2(play.transform.position.x - transform.position.x, 0)).normalized;
	}
	else motor.inputMoveDirection = Vector2.zero;
	
	if (!motor.inputJump && Mathf.Abs(play.transform.position.x - transform.position.x) < 5) motor.inputJump = play.transform.position.y - transform.position.y > 1;
	else motor.inputJump = false;
}*/

@script RequireComponent (CharacterMotor)
