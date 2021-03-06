#pragma strict
private var graphics : UnityEngine.GameObject;
private var motor : CharacterMotor;
private var temp : int = 0;

// Whether the enemy should jump constantly.
var isJumper : boolean = false;

// Whether we should go left to start or right to start.
var goLeft : boolean = false;

// Time is in seconds to travel each direction.
var time : float = 3f;

// Initialize variables
function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
	if (goLeft) temp = time / Time.fixedDeltaTime;
}

// Use FixedUpdate here or else our worms will travel further as FPS decreases
function FixedUpdate () {
	if (temp >= 2 * time / Time.fixedDeltaTime) temp = 0;
	temp++;
	
	if (temp > time / Time.fixedDeltaTime) motor.inputMoveDirection = -Vector2.right;
	else motor.inputMoveDirection = Vector2.right;
}

function Update() {
	if (motor.IsGrounded() && isJumper) motor.inputJump = true;
	else motor.inputJump = false;
}

// Turn around when we hit a wall in front of us.
function OnControllerColliderHit(hit : ControllerColliderHit) {
	if (hit.normal == Vector3.right) temp = 0;
	else if (hit.normal == -Vector3.right) temp = time / Time.fixedDeltaTime;
}

function takeDamage() {
	motor.characterAnimation.spriteManager.RemoveSprite(motor.characterAnimation.sprite);
	Destroy(gameObject);
}

@script RequireComponent (CharacterMotor)
