#pragma strict
private var graphics : UnityEngine.GameObject;
private var play : UnityEngine.GameObject;
public var moveSpeed : float = 10f;

function Start () {
	play = GameObject.FindGameObjectWithTag("Player");
}

function Update () { 
    if(play.transform.position.x > transform.position.x)
        transform.Translate(Time.deltaTime*3, 0, 0, null);
    
    else//(play.transform.position.x < transform.position.x)
        transform.Translate(-Time.deltaTime*3,0,0,null);
 
}
