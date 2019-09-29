var s;
var scl = 10;

var food;
var obstacles;

function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    pickLocation();
}


function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
    
    // var validSpace = false;
    // var xPos = floor(random(cols)*scl);
    // var yPos = floor(random(rows)*scl);
    // if (s.total.length > 0) {
    //     for (var i=0; i < s.total; i++) {
    //         if (s.tail[i].equals(xPos, yPos)) {
    //             pickLocation();
    //         }
    //         else {
    //             food = createVector(xPos, yPos);
    //             validSpace = true;
    //             break;
    //         }
    //     }
    // } else {
    //     food = createVector(random(cols), random(rows));
    //     food.mult(scl)
    // }
}

function mousePressed() {
    s.total++;
}

function draw() {
    background(51);
    s.death();
    s.update();
    s.show();
    // console.log(s.x, s.y)

    if (s.eat(food)) {
        pickLocation()
    }

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}
