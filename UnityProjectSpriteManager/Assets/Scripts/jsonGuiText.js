public var dialogFile:TextAsset;

private var distanceToActivate : float = .5;
private var jsonText;
private var index = 0;
private var stopIndex;
private var canIndex = true;
private var player : UnityEngine.GameObject;
private var hasLoaded = false;
private var isRunning = false;
private var hasRun = false;

function Awake()
{
	player = GameObject.FindGameObjectWithTag("Player");
}
 
function OnGUI()
{
	if (!hasRun && !isRunning && Mathf.Abs(player.transform.position.x - gameObject.transform.position.x) < distanceToActivate)
	{
		isRunning = true;
		player.GetComponent(CharacterMotor).canControl = false;
		//Time.timeScale = 0;
	}
	if (isRunning)
	{
		if (!hasLoaded)
		{
			jsonText = JSONUtils.ParseJSON(dialogFile.text);
			stopIndex = jsonText.Keys.Count;
			hasLoaded = true;
		}
		if (index < stopIndex)
		{
			
			var text : String = "";
			
			
			face = jsonText[index.ToString()]["face"];
			text = jsonText[index.ToString()]["text"]+"...(Press Space)";
			//if( GUI.Button( Rect( .45 * Screen.width, 0.45 * Screen.height, 0.1 * Screen.width, 0.1 * Screen.height ), "Next" ) )
			if (canIndex && Input.GetKeyUp(KeyCode.Space))
			{
				index++;
				canIndex = false;
				//var temp:Hashtable = JSONUtils.ParseJSON( textBefore );
				//Debug.Log( "Keys : " + temp.Keys.Count );
				//textAfter = JSONUtils.HashtableToJSON( temp );
			}
			if (Input.GetKeyDown(KeyCode.Space))
			{
				canIndex = true;
			}
			/*if (index < stopIndex)
			{*/
			
			/*}
			else
			{
				text = "";
			}*/
			//textBefore = GUI.TextField( Rect( 0, 0, Screen.width, 0.45 * Screen.height ), text);
			GUI.Label(Rect( .45 * Screen.width, 0.80 * Screen.height, 0.1 * Screen.width, 0.1 * Screen.height ), text);
			GUI.Label(Rect( .4 * Screen.width, 0.80 * Screen.height, 0.05 * Screen.width, 0.1 * Screen.height ), Resources.Load(face) as Texture2D);
			//GUI.Label(Rect( .45 * Screen.width, 0.90 * Screen.height, 0.1 * Screen.width, 0.1 * Screen.height ), index.ToString());
		}
		else
		{
			player.GetComponent(CharacterMotor).canControl = true;
			Time.timeScale = 1.0;
			isRunning = false;
			hasRun = true;
		}
	}
}