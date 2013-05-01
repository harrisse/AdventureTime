#pragma strict
private var graphics : UnityEngine.GameObject;
private var motor : CharacterMotor;

var hp : int = 3;
var invulnTime : int = 30;
private var invulnCounter : int = 0;

// Initialize variables
function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("PlayerGraphics");
}

// Use FixedUpdate here or else our worms will travel further as FPS decreases
function FixedUpdate () {
	if (invulnCounter > 0) invulnCounter--;
}

function takeDamage() {
	if (invulnCounter == 0) {
		invulnCounter = invulnTime;
		hp--;
		if (hp <= 0) {
			motor.characterAnimation.spriteManager.RemoveSprite(motor.characterAnimation.sprite);
			Destroy(gameObject);
		}
	}
}

@script RequireComponent (CharacterMotor)
