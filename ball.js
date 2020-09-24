class Ball{
    constructor(x, y){
        var ball_options = {
            restitution: 0,
            density: 0.006,
            airFriction: 0
        }

        this.body = Bodies.circle(x, y, 10, ball_options);
        this.width = 10;
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        rectMode(CENTER);
        fill(180, 0, 250);
        translate(pos.x, pos.y);
        rotate(angle);
        ellipseMode(RADIUS);
        circle(0, 0, this.width);
        pop();
    }
}