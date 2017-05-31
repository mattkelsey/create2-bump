var create = require('create2')

var s = 200; //speed
var t = 1000; //time for which to turn

create.open("/dev/ttyUSB0", function(robot) {
    robot.full();
    robot.driveSpeed(s, s);
    
    robot.onChange = function(changed) {
	if(changed.bumpLeft && robot.data.bumpRight == true && changed.bumpRight && robot.data.bumpLeft == true) {
            console.log("left");
	    robot.driveSpeed(s, -s); // +-
	    setTimeout(() => { robot.driveSpeed(s, s); console.log("returning straight"); }, t);
        } else if (changed.bumpRight && robot.data.bumpRight == true) {
	    robot.driveSpeed(-s, s); // - +
	    setTimeout(() => { robot.driveSpeed(s, s); console.log("returning straight"); }, t);
	} else if (changed.bumpLeft && robot.data.bumpLeft == true) {
	    robot.driveSpeed(s, -s);
            setTimeout(() => { robot.driveSpeed(s, s) }, t*1.5);
	}
    };
})
