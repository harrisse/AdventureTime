var acceleration : float = 1.0;
var maxSpeed : float = 10;
var friction : float = 1.0;
var mass : float = 1.0;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;
var groundNormal : Vector2 = Vector2.zero;

private var speed : Vector2 = Vector2.zero;
function Update() {
    var controller : CharacterController = GetComponent(CharacterController);
    
    var forward : Vector2 = Vector2.one - groundNormal;
    
    speed += forward * Input.GetAxis("Horizontal") * acceleration;

    if (speed.x > maxSpeed) speed.x = maxSpeed;
    if (speed.x < - maxSpeed) speed.x = - maxSpeed;
    
    if (Input.GetButton ("Jump")) {
        speed.y = jumpSpeed;
    }
    
    speed.y -= gravity * Time.deltaTime;
    
    controller.Move(speed * Time.deltaTime);
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	if (hit.normal.y > 0 && hit.moveDirection.y < 0) {
		groundNormal = hit.normal;
	}
}

@script RequireComponent (CharacterController)