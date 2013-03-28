#pragma strict

var spriteManager : LinkedSpriteManager;
var sprite : Sprite;

function init(characterObject : GameObject, animationSet : Animations) {
	sprite = spriteManager.AddSprite(characterObject,4,4,new Vector2(0, .25), new Vector2(.5, .25), new Vector3(0,1,0), true);
	sprite.AddAnimation(animationSet.running);
}

function run() {
	sprite.PlayAnim("running");
}

function jump() {
	sprite.PlayAnim("jumping");
}

function Awake() {

}

function Update() {

}

class Animations {
	var scale : int;
	var running : UVAnimation;
	var jumping : UVAnimation;
	
	function Animations() {
		running = new UVAnimation();
		jumping = new UVAnimation();
		running.name="running";
		jumping.name="jumping";
	}
}

class FinnAnimations extends Animations {
	function FinnAnimations() {
		super();
		running.SetAnim(running.BuildUVAnim(new Vector2(0,.75f),new Vector2(.5f,.25f),1,3,3,2));
		running.loopCycles=-1; // makes animation loop infinitely
		running.loopReverse = true; // makes animation go in reverse after it's completed
	}
}