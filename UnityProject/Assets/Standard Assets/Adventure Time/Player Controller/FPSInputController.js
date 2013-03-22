private var motor : CharacterMotor;
private var graphics : UnityEngine.GameObject;

function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("Graphics");
}

function Update () {
	var direction = Input.GetAxis("Horizontal");
	if (direction < 0) graphics.renderer.material.mainTextureOffset.x = 0.5;
	else if (direction > 0) graphics.renderer.material.mainTextureOffset.x = 0;
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = new Vector2(direction, 0);
	motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
