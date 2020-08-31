// the p5.js canvas
let canvas;
let sketchWidth;
let sketchHeight;
const sketchMarginRatio = 1.1;
let sketchSide;
let fontStyle;

let stroke = [];
let strokes = [];

let isDrawing = false;
let getStroke = false;
let strokeTimer;

let x = 0;
let y = 0;

function preload(){
    // fontStyle = loadFont('../fonts/ArchitectsDaughter-Regular.tff');
}

function setup() {
    setSketchSide();
    canvas = createCanvas(sketchSide, sketchSide);
    canvas.parent('sketch-holder');
    frameRate(24);
    imageMode(CENTER);
}

function draw() {
    // 1.) background color
    background(240, 240, 240);

    noStroke()
    // 2.) gif(s)

    fill(100,0,0)

    for (let i = 0; i < stroke.length;i++){
        ellipse(stroke[i].x*sketchSide, stroke[i].y*sketchSide, sketchSide*.03,sketchSide*.03)
    }

    fill(0)

    for (let i = 0; i < strokes.length;i++){
        for (let j = 0; j < strokes[i].length;j++){
            ellipse(strokes[i][j].x*sketchSide, strokes[i][j].y*sketchSide, sketchSide*.03,sketchSide*.03)
        }
    }
    // 3.) button to initiate sequence.
    // placeholder:
        // textFont(fontStyle)
        // offset the textbox / button by half the width of the textbox
        // text("click me.", sketchSide/2, sketchSide-sketchSide/7)
    if (isDrawing){
        buildStroke();
    }

    // 4.) stand-in button for undoing the last stroke.
        // pop last stroke from 'strokes' array.
    rect(0,.9*sketchSide,.1*sketchSide)

    // 5.) stand-in button for clearing the screen.
        // initalize 'strokes' to an empty array
    rect(.45*sketchSide,.9*sketchSide,.1*sketchSide)

    // 6.) stand-in button for submitting drawing.
        // submit strokes to database.
        // bring-up the next window. (submit text descriptor of drawing).
    rect(.9*sketchSide,.9*sketchSide,.1*sketchSide)
}

function mouseReleased() {
    isDrawing = false;
    strokes.push(stroke);
    console.log(strokes)

    stroke = [];

    frameRate(24);

    x = mouseX;
    y = mouseY;
}

function mousePressed() {
    if (!isDrawing){
        isDrawing = true;
        frameRate(70);
    }
}

function buildStroke(){
    stroke.push({x:mouseX/sketchSide,y:mouseY/sketchSide})
}

function windowResized() {
    setSketchSide();
    resizeCanvas(sketchSide, sketchSide);
}

function setSketchSide(){
    sketchWidth = windowWidth / sketchMarginRatio;
    sketchHeight = windowHeight / sketchMarginRatio;
    sketchSide = sketchWidth < sketchHeight ? sketchWidth : sketchHeight;
}
