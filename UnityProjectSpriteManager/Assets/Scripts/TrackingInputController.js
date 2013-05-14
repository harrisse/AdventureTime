#pragma strict
private var graphics : UnityEngine.GameObject;
private var play : UnityEngine.GameObject;
private var motor : CharacterMotor;
private var following : int;

private var temp : int;

function Awake () {
	following = 0;
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
	play = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	// If the player is closer than 10, start following. If the player is farther than 30, stop following.
	if (Mathf.Abs(play.transform.position.x - transform.position.x) < 10) following = 1;
	else if (Mathf.Abs(play.transform.position.x - transform.position.x) > 30) following = 0;
	// If the player is more than .1 away, and we're following the player, move toward the player, else stop.
	if (Mathf.Abs(play.transform.position.x - transform.position.x) > 0.1 && following == 1) motor.inputMoveDirection = (new Vector2(play.transform.position.x - transform.position.x, 0)).normalized;
	else motor.inputMoveDirection = Vector2.zero;
	// If we're not jumping and the player is within 5 horizontally and is more than 1 above us, jump, else don't jump.
	if (!motor.inputJump && Mathf.Abs(play.transform.position.x - transform.position.x) < 5) motor.inputJump = play.transform.position.y - transform.position.y > 1;
	else motor.inputJump = false;
}

function takeDamage() {
	motor.characterAnimation.spriteManager.RemoveSprite(motor.characterAnimation.sprite);
	Destroy(gameObject);
}

@script RequireComponent (CharacterMotor)
