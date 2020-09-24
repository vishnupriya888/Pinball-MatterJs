class FlexableRectObj{
    constructor(x, y, width, height){
        var rectOptions = {
            friction: 0,
            frictionAir: 0.01,
            density: 0.001
        }
        this.body = Bodies.rectangle(x, y, width, height, rectOptions);
        this.width = width;
        this.height = height;
        World.add(world, this.body);
        //Matter.Body.rotate(this.body,1);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        noStroke();
        fill(67, 78, 97);
        rect(0, 0, this.width, this.height);
        pop();
    }
}