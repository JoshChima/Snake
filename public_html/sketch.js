var socket;
var s;
var scl = 20;
var now = new Date().getMilliseconds();
var c;
var img;
var fr = 10;



var food;
var obstacles;
var drawstamp = 0;

function setup() {
    c = createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    pickLocation();

    socket = io.connect('http://localhost:3000');

}


function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    // food = createVector(floor(random(cols)), floor(random(rows)));
    // food.mult(scl);
    
    // var xPos = floor(random(cols)*scl);
    // var yPos = floor(random(rows)*scl);
    if (s.tail.length > 0) {
        for (var i=0; i < s.total; i++) {
            food = createVector(floor(random(cols)), floor(random(rows)));
            console.log(s.tail);
            console.log(food);
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
