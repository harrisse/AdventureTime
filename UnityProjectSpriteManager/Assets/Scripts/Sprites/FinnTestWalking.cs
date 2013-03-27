using UnityEngine;
using System.Collections;

public class FinnTestWalking : MonoBehaviour {
	public SpriteManager spriteManager;
	public Sprite sprite;
	public UVAnimation walking;
	
	// Use this for initialization
	void Start () {
		sprite = spriteManager.AddSprite(this.gameObject,2,2,new Vector2(0,.5f), new Vector2(.25f, .5f), new Vector3(0,0,0), true);
		walking = new UVAnimation();
		walking.name="walking";
		walking.SetAnim(walking.BuildUVAnim(new Vector2(0,.5f),new Vector2(.25f,.5f),2,2,3,2));
		walking.loopCycles=-1; // makes animation loop infinitely
		walking.loopReverse = true; // makes animation go in reverse after it's completed
		sprite.AddAnimation(walking);
		sprite.PlayAnim("walking");
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
