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
    drawTerrain();
}

function drawTerrain() {
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
        stroke(0);
        beginShape(TRIANGLE_STRIP);
        
        for (let x = 0; x < depth; x++) {
            if((terrain[x][z]+terrain[x][z+1])/2<5){
                fill(255,255,255);
            }else if((terrain[x][z]+terrain[x][z+1])/2>20){
                fill(100,100,255);
            }else{
                fill(100,200,100);
            }
            console.log((terrain[x][z]+terrain[x][z+1])/2)
            vertex(x*scl, terrain[x][z], z*scl);
            vertex(x*scl, terrain[x][z+1], (z+1)*scl);
        }
        endShape();
    }
}