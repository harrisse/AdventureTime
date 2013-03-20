private var motor : CharacterMotor;

function Awake () {
	motor = GetComponent(CharacterMotor);
}

function Update () {
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, 0);
	motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
