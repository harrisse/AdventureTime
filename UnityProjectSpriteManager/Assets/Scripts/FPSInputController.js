private var motor : CharacterMotor;
private var graphics : UnityEngine.GameObject;

// How far you can fall before dieing.
var fallKillHeight : int = -20;

function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
}

function Update () {
	var direction = Input.GetAxis("Horizontal");
	motor.inputMoveDirection = new Vector2(direction, 0);
	motor.inputJump = Input.GetButton("Jump");
	
	if (motor.controller.transform.position.y < fallKillHeight) Application.LoadLevel(Application.loadedLevel);
}

@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
