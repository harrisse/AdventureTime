#pragma strict
var nextLevel : int = 0;
var isBossLevel : boolean = false;

function Start () {

}

function OnTriggerEnter() {
	if (!isBossLevel || GameObject.FindGameObjectsWithTag("Enemy").Length == 0) Application.LoadLevel(nextLevel);
}

function OnTriggerStay() {
	if (!isBossLevel || GameObject.FindGameObjectsWithTag("Enemy").Length == 0) Application.LoadLevel(nextLevel);
}

function Update () {
	
}