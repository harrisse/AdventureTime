private var motor : CharacterMotor;
private var graphics : UnityEngine.GameObject;

function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
}

function Update () {
	var direction = Input.GetAxis("Horizontal");
	motor.inputMoveDirection = new Vector2(direction, 0);
	motor.inputJump = Input.GetButton("Jump");
}

@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
