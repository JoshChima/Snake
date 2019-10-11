var socket;
var s;
var scl = 20;
var now = new Date().getMilliseconds();
var c;
var img;
var fr = 10;

var AUTO = true;

// NN params
const NUM_INPUT = 2;
const NUM_HIDDEN = 5;
const NUM_OUTPUT = 1;

if (AUTO) {
    let nn = new NeuralNetwork(NUM_INPUT, NUM_HIDDEN, NUM_OUTPUT);
    console.table(nn.weights0.data);
    console.table(nn.weights1.data);
}

var food;
var obstacles;
var drawstamp = 0;

function setup() {
    c = createCanvas(600, 600);
    s = new Snake(AUTO);
    frameRate(fr);
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
            // console.log(s.tail);
            // console.log(food);
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
function state() {
    var data = {
        //m0: _m0.data,
        frame: drawstamp,
        score: s.data().score,
        x: s.data().x,
        y: s.data().y,
        xspeed: s.data().xspeed,
        yspeed: s.data().yspeed,
        isalive: s.data().isalive,
        imageData: saveFrames(drawstamp + 'frame', 'png', 1, 1, data => {
            return data;
        })
    }
    return data;
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
    
    //socket.emit('drawn', state());

    drawstamp++;
}
