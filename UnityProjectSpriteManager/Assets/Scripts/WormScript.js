#pragma strict
private var graphics : UnityEngine.GameObject;
private var play : UnityEngine.GameObject;
private var motor : CharacterMotor;

function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
	play = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	if (Mathf.Abs(play.transform.position.x - transform.position.x) > 0.1) motor.inputMoveDirection = (new Vector2(play.transform.position.x - transform.position.x, 0)).normalized;
	else motor.inputMoveDirection = Vector2.zero;
}

@script RequireComponent (CharacterMotor)