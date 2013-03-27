private var motor : CharacterMotor;
private var graphics : UnityEngine.GameObject;
private var time : int = 0;

function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("Graphics");
}

function Update () {
	var direction = Input.GetAxis("Horizontal");
	if (direction < 0) graphics.renderer.material.mainTextureOffset.x = 0.5;
	else if (direction > 0) graphics.renderer.material.mainTextureOffset.x = 0;
	
	if (time >= 20) {
		if (direction != 0) {
			if (graphics.renderer.material.mainTextureOffset.y >= 0.75) graphics.renderer.material.mainTextureOffset.y = .0;
			else graphics.renderer.material.mainTextureOffset.y += 0.25;
			time = 0;
		} else {
		graphics.renderer.material.mainTextureOffset.y = .0;
		}
	} 
	time++;
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = new Vector2(direction, 0);
	motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
