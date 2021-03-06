

function between(x, min, max) {
    return x >= min && x <= max;
}
function Snake(auto) {
    console.log(width, height)
    this.x = (width) / 2;
    this.y = (height) / 2;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.livingscore = 0.5;
    this.brain;

    this.score = 0;
    this.fitness = 0;
    if (auto) {
        // this.brain = auto.copy();
    } else {
        this.brain = new NeuralNetwork();
    }

    this.isalive = true;

    this.tail = [];

    this.dispose = function () {
        this.brain.dispose();
    }

    this.mutate = function () {
        this.brain.mutate(0.1);
    }

    this.think = function (inputs) {

        let output = this.brain.predict(inputs);
        let outputs = [
            {dir: 'Up', val: output[0]},
            {dir: 'Down', val: output[1]},
            {dir: 'Left', val: output[2]},
            {dir: 'Right', val: output[3]},
            {dir: 'Not', val: output[4]}
        ]
        console.log(outputs)
        let max = _.max(outputs, function(o){ return o.dir; }).dir;
        // botPressed(max)
    }

    this.data = function () {
        var data = {
            score: this.score,
            x: this.x,
            y: this.y,
            xspeed: this.xspeed,
            yspeed: this.yspeed,
            isalive: this.isalive
        }
        return data
    }

    this.eat = function (pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            this.score = this.score + 100;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.getdirx = function () {
        return this.xspeed
    }
    this.getdiry = function () {
        return this.yspeed
    }

    this.reset = function () {
        console.log('Starting over')
        drawstamp = 0;
        this.total = 0;
        this.tail = [];
        this.x = (width) / 2;
        this.y = (height) / 2;
        this.score = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.isalive = true;
    }

    this.death = function () {
        if (between((this.x + this.xspeed * scl), 0, width - scl) === false) {
            this.isalive = false;
            this.reset()
        }
        if (between((this.y + this.yspeed * scl), 0, height - scl) == false) {
            this.isalive = false;
            this.reset()
        }
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.isalive = false;
                this.reset()
            }
        }

    }

    this.update = function () {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.total - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.score = this.score + this.livingscore;

        // this.x = constrain(this.x, 0, width-scl);
        // this.y = constrain(this.y, 0, height-scl);
    }

    this.show = function () {
        fill(255);
        for (var i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(255);
        rect(this.x, this.y, scl, scl);
    }
}