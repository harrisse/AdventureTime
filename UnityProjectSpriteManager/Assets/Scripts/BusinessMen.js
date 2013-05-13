#pragma strict
private var player : GameObject;
private var graphics : UnityEngine.GameObject;
private var motor : CharacterMotor;
var hp : int = 3;
var invulnTime : int = 30;
private var invulnCounter : int = 0;

// max and min locations can move to in x direction
var maxX : float;
var minX : float;

var framesBetweenRandom : int = 30;
var jumpFrequency : float = .01;

// Whether the enemy should jump constantly.
var isJumper : boolean = false;

// Whether we should go left to start or right to start.
private var goLeft : boolean = false;

private var moveFrames : int = 0;

// Initialize variables
function Awake() {
	motor = GetComponent(CharacterMotor);
	player = GameObject.Find("Player");
	graphics = GameObject.Find("PlayerGraphics");
}

// Use FixedUpdate here or else our worms will travel further as FPS decreases
function FixedUpdate() {
	if (invulnCounter > 0) invulnCounter--;
	moveFrames --;
	if (moveFrames < 0)
	{
		moveFrames = framesBetweenRandom;
		if (Random.value < .5)
			goLeft = true;
		else
			goLeft = false;
	}
	if (motor.transform.position.x < minX) goLeft = false;
	if (motor.transform.position.x > maxX) goLeft = true;
	
	if (goLeft) motor.inputMoveDirection = -Vector2.right;
	else motor.inputMoveDirection = Vector2.right;
	
	if (motor.IsGrounded() && isJumper && Random.value < jumpFrequency) motor.inputJump = true;
	else motor.inputJump = false;
}

function Update() {
	
}

// Turn around when we hit a wall in front of us.
function OnControllerColliderHit(hit : ControllerColliderHit) {
	if (hit.normal == Vector3.right) goLeft = true;
	else if (hit.normal == -Vector3.right) goLeft = false;
}

function takeDamage() {
		if (invulnCounter == 0) {
		invulnCounter = invulnTime;
		hp--;
		if (hp <= 0) {
			motor.characterAnimation.spriteManager.RemoveSprite(motor.characterAnimation.sprite);
			Destroy(gameObject);
		}
	}
}

@script RequireComponent (CharacterMotor)
