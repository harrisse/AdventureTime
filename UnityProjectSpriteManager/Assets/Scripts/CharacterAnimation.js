#pragma strict

var spriteManager : LinkedSpriteManager;
var animationType : String;
private var uvWidth : float;
private var uvHeight : float;
@System.NonSerialized
var sprite : Sprite;
private var lastDirection : String;
private var characterObject : GameObject;

function init(charObject : GameObject) {
	characterObject = charObject;

	var t : Texture;
	t = spriteManager.material.GetTexture("_MainTex");
	uvWidth = 64f / t.width;
	uvHeight = 64f / t.height;
	
	loadAnimationSet();
}

function loadAnimationSet() {
	var animationSet : Animations;
	if (animationType == "Finn") animationSet = new FinnAnimations(uvWidth, uvHeight);
	else if (animationType == "Jake") animationSet = new JakeAnimations(uvWidth, uvHeight);
	else if (animationType == "SmallJake") animationSet = new SmallJakeAnimations(uvWidth, uvHeight);
	else if (animationType == "LSP") animationSet = new LSPAnimations(uvWidth, uvHeight);
	else if (animationType == "PB") animationSet = new PBAnimations(uvWidth, uvHeight);
	else animationSet = new WormAnimations(uvWidth, uvHeight);

	if (sprite != null) spriteManager.RemoveSprite(sprite);
	sprite = spriteManager.AddSprite(characterObject, animationSet.scale, animationSet.scale, Vector2.zero, animationSet.size, animationSet.offset, false);
	
	sprite.AddAnimation(animationSet.runRight);
	sprite.AddAnimation(animationSet.runLeft);
	sprite.AddAnimation(animationSet.jumpRight);
	sprite.AddAnimation(animationSet.jumpLeft);
	sprite.AddAnimation(animationSet.standRight);
	sprite.AddAnimation(animationSet.standLeft);
	sprite.AddAnimation(animationSet.actionRight);
	sprite.AddAnimation(animationSet.actionLeft);
	forceStand();
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

// Only stand if we weren't already standing
function stand() {
	if (lastDirection != "standLeft" && lastDirection != "standRight") forceStand();
}

// Stand even if we were already standing -- useful when switching characters
function forceStand() {
	if (facingRight()) {
		sprite.PlayAnim("standRight");
		lastDirection = "standRight";
	} else {
		sprite.PlayAnim("standLeft");
		lastDirection = "standLeft";
	}
}

function action() {
	if (facingRight()) actionRight();
	else actionLeft();
}

function actionRight() {
	if (lastDirection != "actionRight") {
		sprite.PlayAnim("actionRight");
		lastDirection = "actionRight";
	}
}

function actionLeft() {
	if (lastDirection != "actionLeft") {
		sprite.PlayAnim("actionLeft");
		lastDirection = "actionLeft";
	}
}

function facingRight() : boolean {
	return lastDirection == "standRight" || lastDirection == "runRight" || lastDirection == "jumpRight" || lastDirection == "actionRight";
}

class Animations {
	var scale : int;
	var size : Vector2;
	var offset : Vector3;
	var runRight : UVAnimation;
	var runLeft : UVAnimation;
	var jumpRight : UVAnimation;
	var jumpLeft : UVAnimation;
	var standRight : UVAnimation;
	var standLeft : UVAnimation;
	var actionRight : UVAnimation;
	var actionLeft : UVAnimation;
	private var uvWidth : float;
	private var uvHeight : float;
	
	function Animations(width : float, height : float) {
		runRight = new UVAnimation();
		runLeft = new UVAnimation();
		jumpRight = new UVAnimation();
		jumpLeft = new UVAnimation();
		standRight = new UVAnimation();
		standLeft = new UVAnimation();
		actionRight = new UVAnimation();
		actionLeft = new UVAnimation();
		runRight.name="runRight";
		runLeft.name="runLeft";
		jumpRight.name="jumpRight";
		jumpLeft.name="jumpLeft";
		standRight.name="standRight";
		standLeft.name="standLeft";
		actionRight.name="actionRight";
		actionLeft.name="actionLeft";
		runRight.loopCycles=-1;
		runLeft.loopCycles=-1;
		standRight.loopCycles=-1;
		standLeft.loopCycles=-1;
		actionRight.loopCycles=-1;
		actionLeft.loopCycles=-1;
		offset = new Vector3(0,.74,0);
		scale = 4;
		uvWidth = width;
		uvHeight = height;
		size = new Vector2(width, height);
	}
	
	function getUV(x : float, y : float) {
		return new Vector2(x * uvWidth, (1 / uvHeight - y - 1) * uvHeight);
	}
}

class FinnAnimations extends Animations {
	function FinnAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(8, 2), size, 1, 3, 3, 7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(7, 2), size, 1, 3, 3, 7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(8, 3), size, 1, 1, 1, 7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(7, 3), size, 1, 1, 1, 7));
		jumpRight.SetAnim(jumpRight.BuildUVAnim(getUV(8, 3), size, 1, 1, 1, 7));
		jumpLeft.SetAnim(jumpLeft.BuildUVAnim(getUV(7, 3), size, 1, 1, 1, 7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(9, 3), size, 1, 4, 4, 14));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(6, 3), size, 1, 4, 4, 14));
		runRight.loopReverse = true;
		runLeft.loopReverse = true;
	}
}

class JakeAnimations extends Animations {
	function JakeAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(10, 0), size,1,1,1,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(5, 0), size,1,1,1,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(10, 0), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(5, 0), size,1,1,1,7));
		jumpRight.SetAnim(jumpRight.BuildUVAnim(getUV(10, 0), size, 1, 1, 1, 7));
		jumpLeft.SetAnim(jumpLeft.BuildUVAnim(getUV(5, 0), size, 1, 1, 1, 7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(10, 3), size,1,4,4,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(5, 3), size,1,4,4,7));
	}
}

class SmallJakeAnimations extends Animations {
	function SmallJakeAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(11, 3), size,1,2,2,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(4, 3), size,1,2,2,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(10, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(5, 3), size,1,1,1,7));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(10, 3), size, 1, 1, 1, 7));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(5, 3), size, 1, 1, 1, 7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(10, 3), size,1,4,4,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(5, 3), size,1,4,4,7));
		actionRight.loopCycles=1;
		actionLeft.loopCycles=1;
	}
}

class LSPAnimations extends Animations {
	function LSPAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(12, 3), size,1,1,1,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(3, 3), size,1,1,1,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(12, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(3, 3), size,1,1,1,7));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(12, 3), size, 1, 1, 1, 7));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(3, 3), size, 1, 1, 1, 7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(12, 3), size,1,1,1,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(3, 3), size,1,1,1,7));
	}
}

class PBAnimations extends Animations {
	function PBAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(13, 3), size,1,1,1,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(2, 3), size,1,1,1,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(13, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(2, 3), size,1,1,1,7));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(13, 3), size, 1, 1, 1, 7));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(2, 3), size, 1, 1, 1, 7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(13, 3), size,1,1,1,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(2, 3), size,1,1,1,7));
	}
}

class WormAnimations extends Animations {
	function WormAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(14, 2), size,1,2,2,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(1, 2), size,1,2,2,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(14, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(1, 3), size,1,1,1,7));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(14, 3), size, 1, 1, 1, 7));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(1, 3), size, 1, 1, 1, 7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(14, 3), size,1,1,1,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(1, 3), size,1,1,1,7));
		offset = new Vector3(0,1.3, 0);
	}
}

