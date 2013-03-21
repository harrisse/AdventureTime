// private var motor : CharacterMotor;
private var motor : NewMotor;
private var graphics : UnityEngine.GameObject;
var leftTexture : UnityEngine.Texture;
var rightTexture : UnityEngine.Texture;

function Awake () {
	//motor = GetComponent(CharacterMotor);
	motor = GetComponent(NewMotor);
	graphics = GameObject.Find("Graphics");
}

function Update () {
	var direction = Input.GetAxis("Horizontal");
	if (direction < 0) graphics.renderer.material.mainTexture = leftTexture;
	else if (direction > 0) graphics.renderer.material.mainTexture = rightTexture;
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = new Vector2(direction, 0);
	motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
// @script RequireComponent (CharacterMotor)
@script RequireComponent (NewMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
