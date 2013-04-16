#pragma strict
private var graphics : UnityEngine.GameObject;
private var play : UnityEngine.GameObject;
private var motor : CharacterMotor;
private var following : int = 0;
private var temp : int = 0;
// Whether we should go left to start or right to start.
var goLeft : boolean = false;
// Time is in seconds to travel each direction.
var time : float = 3f;
// Initialize variables
function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
	play = GameObject.FindGameObjectWithTag("Player");
	if (goLeft) temp = time / Time.fixedDeltaTime;
}
// Use FixedUpdate here or else our worms will travel further as FPS decreases
function FixedUpdate () {
	if (temp >= 2 * time / Time.fixedDeltaTime) temp = 0;
	temp++;
	
	if (temp > time / Time.fixedDeltaTime) motor.inputMoveDirection = -Vector2.right;
	else motor.inputMoveDirection = Vector2.right;
}

@script RequireComponent (CharacterMotor)
