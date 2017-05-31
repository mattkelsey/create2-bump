var create = require('create2')

create.open("/dev/ttyUSB0", function(robot) {
    robot.safe();
})
