private var motor : CharacterMotor;
private var graphics : UnityEngine.GameObject;
private var controller : UnityEngine.CharacterController;
var leftTexture : UnityEngine.Texture;
var rightTexture : UnityEngine.Texture;

function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("Graphics");
	controller = GetComponent(CharacterController);
}

function Update () {
	var direction = Input.GetAxis("Horizontal");
	if (direction < 0) {
		graphics.renderer.material.mainTexture = leftTexture;
		controller.center.x = 0.4;
	} else if (direction > 0) {
		graphics.renderer.material.mainTexture = rightTexture;
		controller.center.x = -0.4;
	}
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = new Vector3(direction, 0, 0);
	motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
