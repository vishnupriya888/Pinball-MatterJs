class Screw{
    constructor(body1, pointB, length, stiffness, offset){
        var screw_options = {
            bodyA: body1,
            pointB: pointB,
            length: length,
            stiffness: stiffness,
            pointA: {x: offset, y: 0}
        }

        this.screw = Constraint.create(screw_options);
        this.pointB = pointB;
        World.add(world, this.screw);
    }

    display(){
        stroke(143, 89, 46);
        strokeWeight(4);

        var pointA = this.screw.bodyA;
        var pointB = this.pointB;

        line(pointA.position.x, pointA.position.y, pointB.x, pointB.y);
    }
}