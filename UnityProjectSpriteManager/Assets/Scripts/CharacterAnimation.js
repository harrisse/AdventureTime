#pragma strict

var spriteManager : LinkedSpriteManager;
var animationType : String;
private var uvWidth : float;
private var uvHeight : float;
private var sprite : Sprite;
private var lastDirection : String;
private var characterObject : GameObject;

function init(charObject : GameObject) {
	characterObject = charObject;

	var t : Texture;
	t = spriteManager.material.GetTexture("_MainTex");
	uvWidth = 64f / t.width;
	uvHeight = 64f / t.height;

	lastDirection = "standStill";
	
	loadAnimationSet();
}

function loadAnimationSet() {
	var animationSet : Animations;
	if (animationType == "Finn") animationSet = new FinnAnimations(uvWidth, uvHeight);
	else animationSet = new WormAnimations(uvWidth, uvHeight);

	if (sprite != null) spriteManager.RemoveSprite(sprite);
	sprite = spriteManager.AddSprite(characterObject, animationSet.scale, animationSet.scale, animationSet.start, animationSet.size, animationSet.offset, false);
	
	sprite.AddAnimation(animationSet.runRight);
	sprite.AddAnimation(animationSet.runLeft);
	sprite.AddAnimation(animationSet.jumpRight);
	sprite.AddAnimation(animationSet.jumpLeft);
	sprite.AddAnimation(animationSet.standRight);
	sprite.AddAnimation(animationSet.standLeft);
	lastDirection = "";
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
	private var uvWidth : float;
	private var uvHeight : float;
	
	function Animations(width : float, height : float) {
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
		uvWidth = width;
		uvHeight = height;
		size = new Vector2(width, height);
	}
	
	function getUV(x : float, y : float) {
		return new Vector2(x * uvWidth, (y + 1) * uvHeight);
	}
}

class FinnAnimations extends Animations {
	function FinnAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(8, 2), size, 1, 3, 3, 7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(7, 2), size, 1, 3, 3, 7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(8, 3), size, 1, 1, 1, 7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(7, 3), size, 1, 1, 1, 7));
		runRight.loopCycles=-1;
		runLeft.loopCycles=-1;
		standRight.loopCycles=-1;
		standLeft.loopCycles=-1;
		runRight.loopReverse = true;
		runLeft.loopReverse = true;
		standRight.loopReverse = false;
		standLeft.loopReverse = false;
		start = getUV(0, 0);
		offset = new Vector3(0,.74,0);
	}
}

class WormAnimations extends Animations {
	function WormAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(12, 3), size,1,1,1,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(3, 3), size,1,1,1,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(12, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(3, 3), size,1,1,1,7));
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

