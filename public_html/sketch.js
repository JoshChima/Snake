//var spawn = require('child_process').spawn;
//var py = spawn('python', ['../RL_snake.py']);
var priorMove = [];

var socket;
var s;
var scl = 20;
var now = new Date().getMilliseconds();
var c;
var fr = 10;
var paused = true;


var food;
var obstacles;
var drawstamp = 0;

function preload() {}

function setup() {
    c = createCanvas(600, 600);
    s = new Snake(AUTO);
    frameRate(fr);
    pickLocation();
    noLoop()
}

function draw() {
    background(51);

    s.death();
    s.update();
    s.show();

    if (s.eat(food)) {
        pickLocation()
    }

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
    drawstamp++;
}


function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    
    if (s.tail.length > 0) {
        for (var i=0; i < s.total; i++) {
            food = createVector(floor(random(cols)), floor(random(rows)));
            food.mult(scl);
            if (food.equals(s.tail[i])) {
                pickLocation();
            }
        }
    } else {
        food = createVector(floor(random(cols)), floor(random(rows)));
        food.mult(scl)
    }
}

function mousePressed() {
    s.total++;
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (s.getdiry() === 1) { }
        else { s.dir(0, -1); }
    } else if (keyCode === DOWN_ARROW) {
        if (s.getdiry() === -1) { }
        else { s.dir(0, 1); }
    } else if (keyCode === LEFT_ARROW) {
        if (s.getdirx() === 1) { }
        else { s.dir(-1, 0); }
    } else if (keyCode === RIGHT_ARROW) {
        if (s.getdirx() === -1) { }
        else { s.dir(1, 0); }
    } else if (event.key === "p") {
        if (paused) {
            loop();
            paused = false;
        } else {
            noLoop();
            paused = true;
        }
        // logImage(saveFrames("dummy", "png", 1, 1, data => {
        //     return data;
        // }))
        //saveCanvas(c, "frame_test", "png");
    }
}


