var irobot = require('./irobot/index');
var robot = new irobot.Robot('/dev/ttyUSB0', { baudrate: 115200 });

var resetMotion = function() {
    //robot.fullMode();
    console.log("continuing straight");
    robot.drive({ left: '200', right: '200' });
}

robot.on('ready', function () {
    console.log('READY');
    resetMotion();

    robot.on('bump', function (e) {
        if(e.left) {
	    console.log("left bump");
            robot.drive({ left: '200', right: '-200' });	
        } else if (e.right) {
            robot.drive({ left: '-200', right: '200' }); 
            console.log("right bump");
        }
        setTimeout(resetMotion, 1000); // continue moving forward after turning for a second
    });
});

