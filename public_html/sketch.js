//var spawn = require('child_process').spawn;
//var py = spawn('python', ['../RL_snake.py']);

var priorMove = [];

var s;
var scl = 20;
var now = new Date().getMilliseconds();
var c;
var fr = 10;
var paused = true;


var food;
var obstacles;
var drawstamp = 0;

var AUTO = false

var img;
function preload() { }



function setup() {
    c = createCanvas(600, 600);
    c.parent('jumbo-canvas')
    tf.setBackend('gpu');
    resetSketch();
    pixelDensity(1)
    var pauseButton = createButton("pause");
    pauseButton.parent('jumbo-canvas');
    pauseButton.mousePressed(pause);

    var resetButton = createButton("reset");
    resetButton.parent('jumbo-canvas');
    resetButton.mousePressed(resetSketch);
}

function resetSketch() {
    s = new Snake();
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
    // loadPixels()
    img = get()
    img.resize(50,50)


    push()
    console.log(img.length)

    img = image(img, 0,0, 200, 200)

    // filter(GRAY);
    pop()

    // var imglst = []
    // for (let y = 0; y < height; y++) {
    //     for (let x = 0; x < width; x++) {
    //         // var index = (x + y * width) * 4;
    //         // for (let i = 0; i < 4; i++) {
    //         //     img.push(pixels[index+i])
    //         // }
    //         imglst.push(get(x, y))
            
    //     }        
    // }
    // // img = pixels[];
    // console.log(imglst)
}

// function serverPlug() {
//     noLoop()

// }


function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);

    if (s.tail.length > 0) {
        for (var i = 0; i < s.total; i++) {
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

// function mousePressed() {
//     s.total++;
// }

function botPressed(move) {
    switch (move) {
        case 'Up':
            if (s.getdiry() === 1) { } else {
                s.dir(0, -1);
                // if (SERVER_ON) {socket.emit('move', s.data());}
            }
            break;
        case 'Down':
            if (s.getdiry() === -1) { } else {
                s.dir(0, 1);
                // if (SERVER_ON) {socket.emit('move', s.data());}
            }
            break;
        case 'Left':
            if (s.getdirx() === 1) { } else {
                s.dir(-1, 0);
                // if (SERVER_ON) {socket.emit('move', s.data());}
            }
            break;
        case 'Right':
            if (s.getdirx() === -1) { } else {
                s.dir(1, 0);
                // if (SERVER_ON) {socket.emit('move', s.data());}
            }
            break;
        default:
            break;
    }
}

function pause() {
    if (paused) {
        loop();
        paused = false;
    } else {
        noLoop();
        paused = true;
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (s.getdiry() === 1) { } else {
            s.dir(0, -1);
        }
    } else if (keyCode === DOWN_ARROW) {
        if (s.getdiry() === -1) { } else {
            s.dir(0, 1);
        }
    } else if (keyCode === LEFT_ARROW) {
        if (s.getdirx() === 1) { } else {
            s.dir(-1, 0);
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (s.getdirx() === -1) { } else {
            s.dir(1, 0);
        }
    } else if (event.key === "p") {
        pause()
    }
}
