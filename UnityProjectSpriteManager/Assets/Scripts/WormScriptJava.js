private var motor : CharacterMotor;
private var graphics : UnityEngine.GameObject;
var leftTexture : UnityEngine.Texture;
var rightTexture : UnityEngine.Texture;

function Awake () {
	motor = GetComponent(CharacterMotor);
	graphics = GameObject.Find("Graphics");
}

function Update () {
	graphics.renderer.material.mainTexture = leftTexture;
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/WormScriptJava")