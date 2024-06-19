let m = [];
let cam;
let row, depth, scl = 10;
let terrain = [];
let width = 500;
let heigth = 500;
function setup() {
    createCanvas(width, heigth, WEBGL);
    cam = createCamera();
    rows = width/scl;
    depth = height/scl;
    let xoff = 0;
    let zoff = 0;
    for (let z = 0; z < depth; z++) {    
        terrain.push([]);
        xoff = 0;
        for (let x = 0; x < rows; x++) {
            terrain[z].push(  map( noise(xoff, 0, zoff), 0,1,-50,50)  );
            xoff += 0.1;
        }
        zoff += 0.1;
    }
}

function draw() {
    
    background(100);
    orbitControl(2, 1, 0.05);
    ambientLight(50);
    // Shine a light in the direction the camera is pointing
    directionalLight(
        240, 240, 240,
        cam.centerX - cam.eyeX,
        cam.centerY - cam.eyeY,
        cam.centerZ - cam.eyeZ
    );
    translate(-width/2, 50, -height/2);
    // Draw the shape
    for (let z = 0; z < rows-1; z++) {   
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < depth; x++) {
            vertex(x*scl, terrain[x][z], z*scl);
            vertex(x*scl, terrain[x][z+1], (z+1)*scl);
        }
        endShape();
    }   
}