public var asset:TextAsset;


private var jsonText;
private var index;
private var stopIndex;

function Awake()
{
	jsonText = JSONUtils.ParseJSON(asset.text);
	index = 0;
	gameObject.GetComponent(GUIText).guiText.pixelOffset.x = .5 * Screen.width;
	gameObject.GetComponent(GUIText).guiText.pixelOffset.y = .6 * Screen.height;
	stopIndex = jsonText.Keys.Count;
}
 
function OnGUI()
{
	if (index < stopIndex+1)
	{
		//textBefore = GUI.TextField( Rect( 0, 0, Screen.width, 0.45 * Screen.height ), textBefore );
		if( GUI.Button( Rect( .45 * Screen.width, 0.45 * Screen.height, 0.1 * Screen.width, 0.1 * Screen.height ), "Next" ) )
		{
			if (index < stopIndex)
			{
				gameObject.GetComponent(GUIText).guiText.text = jsonText[index.ToString()].ToString();
			}
			else
			{
				gameObject.GetComponent(GUIText).guiText.text = "";
			}
			index++;
			//var temp:Hashtable = JSONUtils.ParseJSON( textBefore );
			//Debug.Log( "Keys : " + temp.Keys.Count );
			//textAfter = JSONUtils.HashtableToJSON( temp );
		}
	}
}
 
function SerializeObject()
{
	var object = {
		"sequence" : [
			{
				"parallel" : [
					{
						"functionType" : "iTween",
						"functionName" : "MoveFrom",
						"functionParameters" : {
								"y" : 5.0,
								"easeType" : "easeInCubic",
								"isLocal" : true,
								"time" : 1.0,
								"delay" : 0.0
							}
						},
					{
						"functionType" : "self",
						"functionName" : "SendMessageUpwards",
						"functionParameters" : {
							"message" : "WaitAndDust",
							"delay" : 0.0
							}
						},
					{
						"functionType" : "self",
						"functionName" : "PlayAnimation",
						"functionParameters" : {
							"animationName" : "Fall",
							"ownerTag" : "ROBOT",
							"waitTime" : 1.0,
							"delay" : 0.8
							}
						}
					]
				},
			{
				"functionType" : "self",
				"functionName" : "PlayAnimation",
				"functionParameters" : {
					"animationName" : "Spin",
					"ownerTag" : "ROBOT",
					"waitTime" : 2.0,
					"delay" : 0.0
					}
				}
		]
	};
	Debug.Log( "object : "+object );
	Debug.Log( "keys : "+object.Keys );
	for( var test in object.Keys )
	{
		Debug.Log( "Object["+test+"] : "+object[test] );
	}
	textAfter = JSONUtils.ObjectToJSON( object );
}