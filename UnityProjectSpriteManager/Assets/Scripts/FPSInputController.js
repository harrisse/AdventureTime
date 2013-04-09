private var motor : CharacterMotor;
private var graphics : UnityEngine.GameObject;

// How far you can fall before dying.
var fallKillHeight : int = -20;

function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
}

function Update () {
	var direction = Input.GetAxis("Horizontal");
	motor.inputMoveDirection = new Vector2(direction, 0);
	motor.inputJump = Input.GetButton("Jump");
	if (Input.GetButton("Finn") && motor.characterAnimation.animationType != "Finn") {
		motor.characterAnimation.animationType = "Finn";
		motor.characterAnimation.loadAnimationSet();
	} else if (Input.GetButton("Jake") && motor.characterAnimation.animationType != "Jake") {
		motor.characterAnimation.animationType = "Jake";
		motor.characterAnimation.loadAnimationSet();
	} else if (Input.GetButton("LSP") && motor.characterAnimation.animationType != "LSP") {
		motor.characterAnimation.animationType = "LSP";
		motor.characterAnimation.loadAnimationSet();
	} else if (Input.GetButton("PB") && motor.characterAnimation.animationType != "PB") {
		motor.characterAnimation.animationType = "PB";
		motor.characterAnimation.loadAnimationSet();
	}
	
	if (motor.controller.transform.position.y < fallKillHeight) Application.LoadLevel(Application.loadedLevel);
}

@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
