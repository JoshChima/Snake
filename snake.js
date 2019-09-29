function keyPressed() {
    if (keyCode === UP_ARROW) {
            s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    }
}
function between(x, min, max) {
    return x >= min && x <= max;
  }
function Snake() {
    console.log(width, height)
    this.x = 0;
    this.y = 0
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;

    this.tail = [];


    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.death = function() {
        if (between((this.x + this.xspeed*scl), 0, width-scl) === false) {
            console.log('Starting over')
            this.total = 0;
            this.tail = [];
            this.x = (width)/2;
            this.y = (height)/2;
        }
        if (between((this.y + this.yspeed*scl), 0, height-scl) == false) {
            console.log('Starting over')
            this.total = 0;
            this.tail = [];
            this.x = (width)/2;
            this.y = (height)/2;
        }
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                console.log('Starting over')
                this.total = 0;
                this.tail = [];
                this.x = (width)/2;
                this.y = (height)/2;
            }
        }
        
    }

    this.update = function() {
        if (this.total == this.tail.length) {
            for (var i = 0; i < this.total-1; i++) {
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl;

        // this.x = constrain(this.x, 0, width-scl);
        // this.y = constrain(this.y, 0, height-scl);
    }

    this.show = function() {
        fill(255);
        for (var i=0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(255);
        rect(this.x, this.y, scl, scl);
    }
}