class TriangleObject{
    constructor(x, y, radius, rotation){
        var ground_options = {
            isStatic: true,
            friction: 0
        }

        this.body = Bodies.polygon(x, y, 3, radius, ground_options);
        World.add(world, this.body);
        Matter.Body.rotate(this.body, rotation);
    }

    display(){
        var vertices = this.body.vertices;
        noStroke();
        fill(67, 78, 97);
        triangle(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y);
    }
}