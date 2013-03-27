using UnityEngine;
using System.Collections;

public class FinnTestStabbing : MonoBehaviour {
	public SpriteManager spriteManager;
	public Sprite sprite;
	public UVAnimation stabbing;
	
	// Use this for initialization
	void Start () {
		sprite = spriteManager.AddSprite(this.gameObject,2,2,new Vector2(.5f,.5f), new Vector2(.25f, .5f), new Vector3(0,0,0), true);
		stabbing = new UVAnimation();
		stabbing.name="stabbing";
		stabbing.SetAnim(stabbing.BuildUVAnim(new Vector2(.5f,.5f),new Vector2(.25f,.5f),2,2,3,2));
		stabbing.loopCycles=-1; // makes animation loop infinitely
		stabbing.loopReverse = true; // makes animation go in reverse after it's completed
		sprite.AddAnimation(stabbing);
		sprite.PlayAnim("stabbing");
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
