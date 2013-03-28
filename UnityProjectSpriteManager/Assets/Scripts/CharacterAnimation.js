#pragma strict

var spriteManager : LinkedSpriteManager;
var sprite : Sprite;
var animationType : String;
var lastDirection : String;

function init(characterObject : GameObject) {
	lastDirection = "standStill";
	
	var animationSet : Animations;
	if (animationType == "Finn") animationSet = new FinnAnimations();
	else animationSet = new WormAnimations();
	
	sprite = spriteManager.AddSprite(characterObject, animationSet.scale, animationSet.scale, animationSet.start, animationSet.size, animationSet.offset, false);
	
	sprite.AddAnimation(animationSet.runRight);
	sprite.AddAnimation(animationSet.runLeft);
	sprite.AddAnimation(animationSet.jumpRight);
	sprite.AddAnimation(animationSet.jumpLeft);
	sprite.AddAnimation(animationSet.standRight);
	sprite.AddAnimation(animationSet.standLeft);
}

function runRight() {
	if (lastDirection != "runRight") {
		sprite.PlayAnim("runRight");
		lastDirection = "runRight";
	}
}

function runLeft() {
	if (lastDirection != "runLeft") {
		sprite.PlayAnim("runLeft");
		lastDirection = "runLeft";
	}
}

function jumpRight() {
	if (lastDirection != "jumpRight") {
		sprite.PlayAnim("jumpRight");
		lastDirection = "jumpRight";
	}
}

function jumpLeft() {
	if (lastDirection != "jumpLeft") {
		sprite.PlayAnim("jumpLeft");
		lastDirection = "jumpLeft";
	}
}

function stand() {
	if (lastDirection != "standLeft" && lastDirection != "standRight") {
		if (lastDirection == "runRight" || lastDirection == "jumpRight") {
			sprite.PlayAnim("standRight");
			lastDirection = "standRight";
		} else {
			sprite.PlayAnim("standLeft");
			lastDirection = "standLeft";
		}
	}
}

class Animations {
	var scale : int;
	var start : Vector2;
	var size : Vector2;
	var offset : Vector3;
	var runRight : UVAnimation;
	var runLeft : UVAnimation;
	var jumpRight : UVAnimation;
	var jumpLeft : UVAnimation;
	var standRight : UVAnimation;
	var standLeft : UVAnimation;
	
	function Animations() {
		runRight = new UVAnimation();
		runLeft = new UVAnimation();
		jumpRight = new UVAnimation();
		jumpLeft = new UVAnimation();
		standRight = new UVAnimation();
		standLeft = new UVAnimation();
		runRight.name="runRight";
		runLeft.name="runLeft";
		jumpRight.name="jumpRight";
		jumpLeft.name="jumpLeft";
		standRight.name="standRight";
		standLeft.name="standLeft";
		scale = 4;
		size = new Vector2(.5, .25);
	}
}

class FinnAnimations extends Animations {
	function FinnAnimations() {
		super();
		runRight.SetAnim(runRight.BuildUVAnim(new Vector2(.5,.75), size,1,3,3,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(new Vector2(0,.75), size,1,3,3,7));
		standRight.SetAnim(standRight.BuildUVAnim(new Vector2(.5,.75), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(new Vector2(0,.75), size,1,1,1,7));
		runRight.loopCycles=-1;
		runLeft.loopCycles=-1;
		standRight.loopCycles=-1;
		standLeft.loopCycles=-1;
		runRight.loopReverse = true;
		runLeft.loopReverse = true;
		standRight.loopReverse = false;
		standLeft.loopReverse = false;
		start = new Vector2(0, .25);
		offset = new Vector3(0,.74,0);
	}
}

class WormAnimations extends Animations {
	function WormAnimations() {
		super();
		runRight.SetAnim(runRight.BuildUVAnim(new Vector2(.5,1), size,1,1,1,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(new Vector2(0,1), size,1,1,1,7));
		standRight.SetAnim(standRight.BuildUVAnim(new Vector2(.5,1), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(new Vector2(0,1), size,1,1,1,7));
		runRight.loopCycles=-1;
		runLeft.loopCycles=-1;
		standRight.loopCycles=-1;
		standLeft.loopCycles=-1;
		runRight.loopReverse = false;
		runLeft.loopReverse = false;
		standRight.loopReverse = false;
		standLeft.loopReverse = false;
		start = new Vector2(0, 1);
		offset = new Vector3(0,1.3, 0);
	}
}