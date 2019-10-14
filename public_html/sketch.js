var socket;
var s;
var scl = 20;
var now = new Date().getMilliseconds();
var c;
var fr = 10;
var paused = true;
//var img;

var AUTO = false;

var SERVER_ON = false;

// NN params
// const NUM_INPUT = 2;
// const NUM_HIDDEN = 5;
// const NUM_OUTPUT = 1;
// const NUM_SAMPLES = 1000000;
// const OUTPUT_UP = 8; //E(Output) for UP
// const OUTPUT_DOWN = 2; //E(Output) for DOWN
// const OUTPUT_RIGHT = 6; //E(Output) for RIGHT
// const OUTPUT_LEFT = 4; //E(Output) for LEFT


// if (AUTO) {
//     let nn = new NeuralNetwork(NUM_INPUT, NUM_HIDDEN, NUM_OUTPUT);
//     //console.table(nn.weights0.data);
//     //console.table(nn.weights1.data);
// }

var food;
var obstacles;
var drawstamp = 0;

function preload() {
    //img = loadImage('test.png')
}

function setup() {
    c = createCanvas(600, 600);
    s = new Snake(AUTO);
    frameRate(fr);
    pickLocation();
    //image(img, 0, 0);
    //image(img, 50, 0, 40, 20, 50, 50, 50, 50);
    if (SERVER_ON) {socket = io.connect('http://localhost:3000');}
    
    //noLoop() is always the last line in the setup block
    noLoop();
}

function draw() {

    background(51);

    //image(img, 0, 0)

    s.death();
    s.update();
    s.show();
    
    if (s.eat(food)) {
        pickLocation()
    }

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
    
    
    if (AUTO) {
        let fname = "frame_" + drawstamp;
        //saveCanvas(c, fname, "png");
        if (SERVER_ON) {socket.emit('AUTO_Move', fname);}
        if (SERVER_ON) {socket.on('AUTO_Move', movement);}

    }

    drawstamp++;
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
    // let _m0 = new Matrix(floor(width/scl), floor(height/scl))
    // _m0.data[s.data().x/scl][s.data().y/scl] = 1;
    // s.tail.forEach(part => {
    //     _m0.data[part.x/scl][part.y/scl] = 1;
    // });
    // _m0.data[food.x/scl][food.y/scl] = 5;

    //_m0 = Matrix.transpose(_m0);

    //console.table(Matrix.convertFromArray(_m0.data).data);
    var data = {
        //m0: _m0.data,
        frame: drawstamp,
        score: s.data().score,
        x: s.data().x,
        y: s.data().y,
        xspeed: s.data().xspeed,
        yspeed: s.data().yspeed,
        isalive: s.data().isalive,
        // imageData: saveFrames(drawstamp + 'frame', 'png', 1, 1, data => {
        //     return data;
        // })
    }
    return data;
}

function mousePressed() {
    s.total++;
}

function movement() {
    fs.readFileSync('transfer.json', data => {
        let move = JSON.parse(data).move
        console.log(move);
        botPressed(move);
    })
    
}

function keyPressed() {
    if (s.AUTOMATION_ON == true) {}
    else {
        if (keyCode === UP_ARROW) {
            if (s.getdiry() === 1) {}
            else {s.dir(0, -1);}
        } else if (keyCode === DOWN_ARROW) {
            if (s.getdiry() === -1) {}
            else {s.dir(0, 1);}
        } else if (keyCode === LEFT_ARROW) {
            if (s.getdirx() === 1) {}
            else {s.dir(-1, 0);}
        } else if (keyCode === RIGHT_ARROW) {
            if (s.getdirx() === -1) {}
            else {s.dir(1, 0);}
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
        
        if (SERVER_ON) {socket.emit('move', s.data());}
    }
}
function botPressed(move) {
    if (s.AUTOMATION_ON === false) {
        switch(move) {
        case UP:
            if (s.getdiry() === 1) {}
            else {
                s.dir(0, -1);
                if (SERVER_ON) {socket.emit('move', s.data());}}
            break;
        case DOWN:
            if (s.getdiry() === -1) {}
            else {
                s.dir(0, 1);
                if (SERVER_ON) {socket.emit('move', s.data());}}
            break;
        case LEFT:
            if (s.getdirx() === 1) {}
            else {
                s.dir(-1, 0);
                if (SERVER_ON) {socket.emit('move', s.data());}}
            break;
        case RIGHT:
            if (s.getdirx() === -1) {}
            else {
                s.dir(1, 0);
                if (SERVER_ON) {socket.emit('move', s.data());}}
            break;
        default:
            break;
        }
    } else {}
}


