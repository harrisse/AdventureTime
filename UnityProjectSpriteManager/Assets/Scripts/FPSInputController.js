private var motor : CharacterMotor;
private var nameText : GUIText;
private var hpText : GUIText;
private var graphics : UnityEngine.GameObject;
private var invulnerabilityTime : int = 0;
private var characterCollider : CapsuleCollider;
private var controller : CharacterController;
var frozenTime : int = 0;

// How far you can fall before dying.
var fallKillHeight : int = -20;
var hp : int = 3;
var invulnerabilityAfterDamage = 60;

function Awake () {
	motor = GetComponent(CharacterMotor);
	characterCollider = GetComponent(CapsuleCollider);
	controller = GetComponent(CharacterController);
	graphics = GameObject.Find("PlayerGraphics");
	nameText = GameObject.Find("GUI_NameText").GetComponent(GUIText);
	hpText = GameObject.Find("GUI_HPText").GetComponent(GUIText);
}

function Update () {
	if (invulnerabilityTime > 0) invulnerabilityTime--;

	if (Input.GetKey("escape")) Application.Quit();
	
	if (frozenTime <= 0) {
		var direction = Input.GetAxis("Horizontal");
		motor.inputMoveDirection = new Vector2(direction, 0);
		if (!(motor.characterAnimation.animationType == "LSP"))
			motor.inputJump = Input.GetButton("Jump");
		motor.inputAction = Input.GetButton("Action");
		if (getCharacterButton("Finn")) {
			motor.characterAnimation.animationType = "Finn";
			motor.characterAnimation.loadAnimationSet();
			controller.height = 2.5;
			characterCollider.height = 2.5;
			controller.center.y = 0;
			characterCollider.center.y = 0;
			controller.radius = .6;
			characterCollider.radius = .6;
			nameText.text = "FINN THE HUMAN";
		} else if (getCharacterButton("Jake")) {
			motor.characterAnimation.animationType = "Jake";
			motor.characterAnimation.loadAnimationSet();
			controller.height = 1.7;
			characterCollider.height = 1.7;
			controller.center.y = -.4;
			characterCollider.center.y = -.4;
			controller.radius = .6;
			characterCollider.radius = .6;
			nameText.text = "JAKE THE DOG";
		} else if (Input.GetButton("Action") && motor.characterAnimation.animationType == "Jake") {
			motor.characterAnimation.animationType = "SmallJake";
			motor.characterAnimation.loadAnimationSet();
			controller.height = .65;
			characterCollider.height = .65;
			controller.center.y = -.925;
			characterCollider.center.y = -.925;
			controller.radius = .3;
			characterCollider.radius = .3;
			frozenTime = 3 / (7 * Time.fixedDeltaTime);
			motor.inputMoveDirection = Vector2.zero;
			motor.inputJump = false;
		} else if (Input.GetButton("Action") && motor.characterAnimation.animationType == "SmallJake") {
			motor.characterAnimation.animationType = "Jake";
			motor.characterAnimation.loadAnimationSet();
			controller.height = 1.7;
			characterCollider.height = 1.7;
			controller.center.y = -.4;
			characterCollider.center.y = -.4;
			controller.radius = .6;
			characterCollider.radius = .6;
			frozenTime = 3 / (7 * Time.fixedDeltaTime);
			motor.inputMoveDirection = Vector2.zero;
			motor.inputJump = false;
		} else if (getCharacterButton("PB")) {
			motor.characterAnimation.animationType = "PB";
			motor.characterAnimation.loadAnimationSet();
			nameText.text = "PRINCESS BUBBLEGUM";
		} else if (getCharacterButton("LSP")) {
			motor.characterAnimation.animationType = "LSP";
			motor.characterAnimation.loadAnimationSet();
			nameText.text = "LUMPY SPACE PRINCESS";
		}
	}
	
	if (motor.controller.transform.position.y < fallKillHeight) Application.LoadLevel(Application.loadedLevel);
}

function FixedUpdate() {
	if (frozenTime > 0) frozenTime--;
}

function getCharacterButton(character : String) : boolean {
	var ret : boolean = Input.GetButton(character) && motor.characterAnimation.animationType != character;
	var characters = new Array("Finn", "Jake", "PB", "LSP");
	for (var otherCharacter : String in characters) {
		if (otherCharacter != character) ret = ret && !Input.GetButton(otherCharacter);
	}
	return ret;
}

function takeDamage() {
	if (invulnerabilityTime == 0) {
		invulnerabilityTime = invulnerabilityAfterDamage;
		hp--;
		hpText.text = "HP: " + hp;
		if (hp == 0) Application.LoadLevel(Application.loadedLevel);
	}
}

@script RequireComponent (CharacterMotor)
@script RequireComponent (CharacterController)
@script RequireComponent (CapsuleCollider)
@script AddComponentMenu ("Character/FPS Input Controller")
