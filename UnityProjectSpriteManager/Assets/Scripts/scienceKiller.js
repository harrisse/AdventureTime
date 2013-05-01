var width: float = 10;
var height : float = 10;

function FixedUpdate () {
	var sciences = GameObject.FindGameObjectsWithTag("Science");
	for (var science : GameObject in sciences) {
		xDiff = Mathf.Abs(science.transform.position.x - gameObject.transform.position.x);
		yDiff = Mathf.Abs(science.transform.position.y - gameObject.transform.position.y);
		if (xDiff < (width/2 + 1) && yDiff < (height/2 + 1))
		{
			Destroy(gameObject);
			Destroy(science.gameObject);
			break;
		}
	}
}