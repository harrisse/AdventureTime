#pragma strict

@System.NonSerialized
var characterAnimation : CharacterAnimation;

function Start () {

}

function Update () {

}

function Awake() {
	// CharacterAnimation.init(object, scale, uvStart, uvSize, offset)
	characterAnimation = GetComponent(CharacterAnimation);
	characterAnimation.init(gameObject);
	characterAnimation.stand();

}