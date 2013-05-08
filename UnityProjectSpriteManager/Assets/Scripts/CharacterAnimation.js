#pragma strict

var spriteManager : LinkedSpriteManager;
var animationType : String;
private var uvWidth : float;
private var uvHeight : float;
@System.NonSerialized
var sprite : Sprite;
private var lastDirection : String;
private var characterObject : GameObject;
private var actionReverse : boolean;

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
	else if (animationType == "Snail") animationSet = new SnailAnimations(uvWidth, uvHeight);
	else if (animationType == "Horse") animationSet = new HorseAnimations(uvWidth, uvHeight);
	else if (animationType == "Ricardio") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "IceKing") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "BusinessMan1") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "BusinessMan2") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "BusinessMan3") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "BMO") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "Gunter") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "LumpyPerson1") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "LumpyPerson2") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "LumpyPerson3") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "Penguin") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else if (animationType == "Butterfly") animationSet = new RicardioAnimations(uvWidth, uvHeight);
	else animationSet = new WormAnimations(uvWidth, uvHeight);

	if (sprite != null) spriteManager.RemoveSprite(sprite);
	sprite = spriteManager.AddSprite(characterObject, animationSet.xScale, animationSet.yScale, Vector2.zero, animationSet.size, animationSet.offset, false);
	
	actionReverse = animationSet.actionReverse;
	
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
		if (actionReverse) sprite.PlayAnimInReverse("actionRight");
		else sprite.PlayAnim("actionRight");
		lastDirection = "actionRight";
	}
}

function actionLeft() {
	if (lastDirection != "actionLeft") {
		if (actionReverse) sprite.PlayAnimInReverse("actionLeft");
		else sprite.PlayAnim("actionLeft");
		lastDirection = "actionLeft";
	}
}

function facingRight() : boolean {
	return lastDirection == "standRight" || lastDirection == "runRight" || lastDirection == "jumpRight" || lastDirection == "actionRight";
}

class Animations {
	var xScale : int;
	var yScale : int;
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
	var actionReverse : boolean = false;
	
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
		xScale = 4;
		yScale = 4;
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
		runRight.SetAnim(runRight.BuildUVAnim(getUV(13, 0), size,1,3,3,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(12, 0), size,1,3,3,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(13, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(12, 3), size,1,1,1,7));
		jumpRight.SetAnim(jumpRight.BuildUVAnim(getUV(13, 3), size,1,1,1,7));
		jumpLeft.SetAnim(jumpLeft.BuildUVAnim(getUV(12, 3), size,1,1,1,7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(14, 0), size,1,4,4,14));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(11, 0), size,1,4,4,14));
		runRight.loopReverse = true;
		runLeft.loopReverse = true;
	}
}

class JakeAnimations extends Animations {
	function JakeAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(15, 0), size,1,1,1,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(10, 0), size,1,1,1,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(15, 0), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(10, 0), size,1,1,1,7));
		jumpRight.SetAnim(jumpRight.BuildUVAnim(getUV(15, 0), size,1,1,1,7));
		jumpLeft.SetAnim(jumpLeft.BuildUVAnim(getUV(10, 0), size,1,1,1,7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(15, 0), size,1,4,4,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(10, 0), size,1,4,4,7));
		actionRight.loopCycles=0;
		actionLeft.loopCycles=0;
		actionReverse = true;
	}
}

class SmallJakeAnimations extends Animations {
	function SmallJakeAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(16, 2), size,1,2,2,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(9, 2), size,1,2,2,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(15, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(10, 3), size,1,1,1,7));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(15, 3), size,1,1,1,7));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(10, 3), size,1,1,1,7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(15, 0), size,1,4,4,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(10, 0), size,1,4,4,7));
		actionRight.loopCycles=0;
		actionLeft.loopCycles=0;
	}
}

class LSPAnimations extends Animations {
	function LSPAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(17, 3), size,1,1,1,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(8, 3), size,1,1,1,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(17, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(8, 3), size,1,1,1,7));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(17, 3), size,1,1,1,7));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(8, 3), size,1,1,1,7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(17, 3), size,1,1,1,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(8, 3), size,1,1,1,7));
	}
}

class PBAnimations extends Animations {
	function PBAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(18, 3), size,1,1,1,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(7, 3), size,1,1,1,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(18, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(7, 3), size,1,1,1,7));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(18, 3), size,1,1,1,7));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(7, 3), size,1,1,1,7));
		actionRight.SetAnim(actionRight.BuildUVAnim(getUV(18, 3), size,1,1,1,7));
		actionLeft.SetAnim(actionLeft.BuildUVAnim(getUV(7, 3), size,1,1,1,7));
	}
}

class WormAnimations extends Animations {
	function WormAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(19, 1), size,1,2,2,7));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(6, 1), size,1,2,2,7));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(19, 3), size,1,1,1,7));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(6, 3), size,1,1,1,7));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(19, 3), size,1,1,1,7));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(6, 3), size,1,1,1,7));
		offset = new Vector3(0,1.3, 0);
	}
}

class SnailAnimations extends Animations {
	function SnailAnimations(width : float, height : float) {
		super(width, height);
		standRight.SetAnim(standRight.BuildUVAnim(getUV(20, 2), size,1,2,2,3));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(5, 2), size,1,2,2,3));
		offset = new Vector3(0,1.3, 0);
	}
}

class HorseAnimations extends Animations {
	function HorseAnimations(width : float, height : float) {
		super(width, height);
		standRight.SetAnim(standRight.BuildUVAnim(getUV(19, 0), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(5, 0), size,1,1,1,1));
		offset = new Vector3(0,1.3, 0);
		size = new Vector2(2 * width, height);
		xScale = 8;
	}
}

class RicardioAnimations extends Animations {
	function RicardioAnimations(width : float, height : float) {
		super(width, height);
		standRight.SetAnim(standRight.BuildUVAnim(getUV(17, 0), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(8, 0), size,1,1,1,1));
		offset = new Vector3(0,1.3, 0);
	}
}

class IceKingAnimations extends Animations {
	function IceKingAnimations(width : float, height : float) {
		super(width, height);
		standRight.SetAnim(standRight.BuildUVAnim(getUV(15, 1), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(10, 1), size,1,1,1,3));
		offset = new Vector3(0,1.3, 0);
	}
}

class Business1Animations extends Animations {
	function Business1Animations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(25, 1), size,1,3,3,1));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(0, 1), size,1,3,3,3));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(25, 0), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(0, 0), size,1,1,1,3));
		offset = new Vector3(0,1.3, 0);
	}
}

class Business2Animations extends Animations {
	function Business2Animations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(24, 1), size,1,3,3,1));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(1, 1), size,1,3,3,3));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(24, 0), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(1, 0), size,1,1,1,3));
		offset = new Vector3(0,1.3, 0);
	}
}

class Business3Animations extends Animations {
	function Business3Animations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(23, 1), size,1,3,3,1));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(2, 1), size,1,3,3,3));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(23, 0), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(2, 0), size,1,1,1,3));
		offset = new Vector3(0,1.3, 0);
	}
}

class BMOAnimations extends Animations {
	function BMOAnimations(width : float, height : float) {
		super(width, height);
		standRight.SetAnim(standRight.BuildUVAnim(getUV(17, 2), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(8, 2), size,1,1,1,1));
		offset = new Vector3(0,1.3, 0);
	}
}

class GunterAnimations extends Animations {
	function GunterAnimations(width : float, height : float) {
		super(width, height);
		standRight.SetAnim(standRight.BuildUVAnim(getUV(22, 0), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(3, 0), size,1,1,1,1));
		offset = new Vector3(0,1.3, 0);
		size = new Vector2(2 * width, 3 * height);
		xScale = 8;
		yScale = 12;
	}
}

class Lumpy1Animations extends Animations {
	function Lumpy1Animations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(18, 0), size,1,1,1,1));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(7, 0), size,1,1,1,3));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(18, 0), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(7, 0), size,1,1,1,3));
		offset = new Vector3(0,1.3, 0);
	}
}

class Lumpy2Animations extends Animations {
	function Lumpy2Animations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(18, 1), size,1,1,1,1));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(7, 1), size,1,1,1,3));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(18, 1), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(7, 1), size,1,1,1,3));
		offset = new Vector3(0,1.3, 0);
	}
}

class Lumpy3Animations extends Animations {
	function Lumpy3Animations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(18, 2), size,1,1,1,1));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(7, 2), size,1,1,1,3));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(18, 2), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(7, 2), size,1,1,1,3));
		offset = new Vector3(0,1.3, 0);
	}
}

class PenguinAnimations extends Animations {
	function PenguinAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(17, 1), size,1,1,1,1));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(8, 1), size,1,1,1,3));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(17, 1), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(8, 1), size,1,1,1,3));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(17, 1), size,1,1,1,1));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(8, 1), size,1,1,1,1));
		offset = new Vector3(0,1.3, 0);
	}
}

class ButterflyAnimations extends Animations {
	function ButterflyAnimations(width : float, height : float) {
		super(width, height);
		runRight.SetAnim(runRight.BuildUVAnim(getUV(16, 1), size,1,1,1,1));
		runLeft.SetAnim(runLeft.BuildUVAnim(getUV(9, 1), size,1,1,1,3));
		standRight.SetAnim(standRight.BuildUVAnim(getUV(16, 1), size,1,1,1,1));
		standLeft.SetAnim(standLeft.BuildUVAnim(getUV(9, 1), size,1,2,2,3));
		jumpRight.SetAnim(standRight.BuildUVAnim(getUV(16, 1), size,1,1,1,1));
		jumpLeft.SetAnim(standLeft.BuildUVAnim(getUV(9, 1), size,1,1,1,1));
		offset = new Vector3(0,1.3, 0);
	}
}