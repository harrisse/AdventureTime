#pragma strict

function Start () {

}

function Update () {

}

function OnGUI () {
	if (GUI.Button(Rect( 0, 0, .33 * Screen.width, .33 * Screen.height ), "Tree House 1")) Application.LoadLevel(0);
	if (GUI.Button(Rect( .33 * Screen.width, 0, .34 * Screen.width, .33 * Screen.height ), "World 1")) Application.LoadLevel(1);
	if (GUI.Button(Rect( .67 * Screen.width, 0, .33 * Screen.width, .33 * Screen.height ), "Poo-Brained Horse")) Application.LoadLevel(2);
	if (GUI.Button(Rect( 0, .33 * Screen.height, .33 * Screen.width, .34 * Screen.height ), "Tree House 2")) Application.LoadLevel(3);
	if (GUI.Button(Rect( .33 * Screen.width, .33 * Screen.height, .34 * Screen.width, .34 * Screen.height ), "World 2")) Application.LoadLevel(4);
	if (GUI.Button(Rect( .67 * Screen.width, .33 * Screen.height, .33 * Screen.width, .34 * Screen.height ), "Ricardio")) Application.LoadLevel(5);
	if (GUI.Button(Rect( 0, .67 * Screen.height, .33 * Screen.width, .33 * Screen.height ), "World 3")) Application.LoadLevel(6);
	if (GUI.Button(Rect( .33 * Screen.width, .67 * Screen.height, .34 * Screen.width, .33 * Screen.height ), "Business Men")) Application.LoadLevel(7);
	if (GUI.Button(Rect( .67 * Screen.width, .67 * Screen.height, .33 * Screen.width, .33 * Screen.height ), "World 4")) Application.LoadLevel(8);
}