var bulletSpeed : float = 15;
@System.NonSerialized
var goLeft : boolean;
private var distanceTraveled: float = 0;

function FixedUpdate () {
	distanceTraveled += bulletSpeed;
	if (goLeft)
		transform.Translate(-bulletSpeed,0,0);
	else
		transform.Translate(bulletSpeed,0,0);
		
	if (distanceTraveled > 60)
		Destroy(gameObject);
}