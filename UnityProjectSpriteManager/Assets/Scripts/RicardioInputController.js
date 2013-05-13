#pragma strict
private var motor : CharacterMotor;
private var player : GameObject;

var hp : int = 3;
var invulnTime : int = 30;
private var invulnCounter : int = 0;
var pillarSpawnChance : float = 0.02f;
private var pillar : GameObject;

// Initialize variables
function Awake () {
	motor = GetComponent(CharacterMotor);
	player = GameObject.Find("Player");
	pillar = GameObject.Find("DistroyablePillar");
}

// Use FixedUpdate here or else our worms will travel further as FPS decreases
function FixedUpdate () {
	if (invulnCounter > 0) invulnCounter--;
	if (Random.value < pillarSpawnChance) {
		Instantiate(pillar, Vector3(10 * Mathf.Round((Random.value - .5) * 10), 22, 0), Quaternion.identity);
	}
}

function takeDamage() {
	if (invulnCounter == 0) {
		invulnCounter = invulnTime;
		hp--;
		if (hp <= 0) {
			motor.characterAnimation.spriteManager.RemoveSprite(motor.characterAnimation.sprite);
			Destroy(gameObject);
		}
		else
		{
			player.transform.position.x-=30;
		}
	}
}

@script RequireComponent (CharacterMotor)
