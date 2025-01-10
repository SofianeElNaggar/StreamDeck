import robot  from 'kbm-robot';


export function raccourci(raccourci){
    const keys = raccourci.split("+");
    robot.startJar();
    for(var r of keys){
        robot.press(r)
    }
    robot.sleep(100);
    for(var r of keys){
        robot.release(r)
    }
    robot.sleep(100);
    robot.go()
        .then(robot.stopJar);
}