//perlin noise 3d map generator
const WIDTH = 500;
const HEIGHT = 500;
let goff = 0;
const pixelSize = 2;
function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(1020);
}

function draw() {
    background(0);
    let yoff = 0;
    for (let y = 0; y < HEIGHT; y += pixelSize) {
        let xoff = 0;
        for (let x = 0; x < WIDTH; x += pixelSize) {
            let z = noise(xoff, yoff, goff) * 255;
            fill(z);
            noStroke();
            rect(x, y, pixelSize, pixelSize);
            xoff += 0.1;
        }
        yoff += 0.1;
    }
    goff += 0.03;
    console.log(goff);
}