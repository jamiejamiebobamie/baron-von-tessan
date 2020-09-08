// the p5.js canvas
let canvas;
let sketchWidth;
let sketchHeight;
const sketchMarginRatio = 1.1;
let sketchSide;
let w, h;
let fontStyle;

let currentStroke = [];
let strokes = [];

let isDrawing = false;
let getStroke = false;
let strokeTimer;

let x = 0;
let y = 0;

let _ui = [];
let drawingSpace;
let buttonContainer;
let buttons;
let button1;
let button2;
let button3;
let undoButton;
let clearButton;
let submitButton;

// just for testing.
let submittedStrokes = []
let Test = "hi"

let mouseIsClicked = false;
let mouseIsReleased = false;


function preload(){
    fontStyle = loadFont('./fonts/PrintClearly.otf');
}

function setup() {
    w = windowWidth - (windowWidth/10)
    h = windowHeight - (windowHeight/10)
    canvas = createCanvas(w, h);
    canvas.parent('sketch-holder');
    frameRate(24);
    imageMode(CENTER);
    setUI();
}

function draw() {
    background(255);
    for (let i = 0; i < _ui.length; i++){
        _ui[i].draw();
    }
}

function mouseReleased() {
    if (mouseIsClicked){
        frameRate(24);
        mouseIsClicked = false;
        for (let i = 0; i < _ui.length; i++){
            _ui[i].setClick(mouseIsClicked);
        }
        if(drawingSpace.currentStroke.length){
            drawingSpace.strokes.push(drawingSpace.currentStroke)
            drawingSpace.currentStroke = []
        }
    }
}

function mousePressed() {
    if (!mouseIsClicked){
        frameRate(70);
        mouseIsClicked = true;
        for (let i = 0; i < _ui.length; i++){
            _ui[i].setClick(mouseIsClicked);
        }
    }
}

function windowResized() {
    w = windowWidth - (windowWidth/10)
    h = windowHeight - (windowHeight/10)
    resizeCanvas(w, h);
    setUI();
}

function setUI(){
    _ui = [];
    let drawingSpaceWidth = w > h ? w*(2/3) : w;
    let drawingSpaceHeight = w > h ? h : h*(2/3);
    sketchSide = w > h ? drawingSpaceHeight : drawingSpaceWidth;
    let longerSideOfScreen = w > h ? w : h;
    sketchSide = sketchSide > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : sketchSide;

    let offsetX = 0;//w > h ? (windowWidth*(2/3) - sketchSide)/2  : 0;
    let offsetY = 0;//h > w ? (windowHeight*(2/3) - sketchSide)/2  : 0;

    drawingSpace = new DrawingContainer({width:sketchSide,height:sketchSide,len:3,index:0,color:'lightgrey', mouseClickfunc:buildStroke})//,offsetX:offsetX,offsetY:offsetY})
    drawingSpace.setCurrentStroke(currentStroke);
    drawingSpace.setStrokes(strokes);
    drawingSpace.setFill(true)
    let performClickOnce = false;
    drawingSpace.setClickType(performClickOnce)
    _ui.push(drawingSpace)

    buttons = new Container({len:3,index:2,row:h>w,offsetX:w *.0063,offsetY:h *.05})//offsetX:-(w * (.05)), offsetY:-(h * (.05))
    _ui.push(buttons)

    button1 = new Container({parent:buttons,len:3,index:0,row:w>h})
    _ui.push(button1)
    undoButton = new TextBox({parent:button1,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:undoLastStroke});
    undoButton.setString("UNDO");
    undoButton.setFontStyle(fontStyle);
    undoButton.setTextColor("black")
    undoButton.setStroke(true)
    performClickOnce = true;
    undoButton.setClickType(performClickOnce)

    _ui.push(undoButton)

    button2 = new Container({parent:buttons,len:3,index:1,row:w>h})
    _ui.push(button2)
    clearButton = new TextBox({parent:button2,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:clearStrokes});
    clearButton.setString("CLEAR");
    clearButton.setTextColor("black")
    clearButton.setStroke(true)
    performClickOnce = true;
    clearButton.setClickType(performClickOnce)

    _ui.push(clearButton)

    button3 = new Container({parent:buttons,len:3,index:2,row:w>h})
    _ui.push(button3)
    submitButton = new TextBox({parent:button3,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:submitStrokes});
    submitButton.setString("SUBMIT");
    submitButton.setTextColor("black")
    submitButton.setStroke(true)
    performClickOnce = true;
    submitButton.setClickType(performClickOnce)

    _ui.push(submitButton)
}

function buildStroke(){
    drawingSpace.currentStroke.push({x:mouseX/sketchSide,y:mouseY/sketchSide})
}


// isDrawing = false;
// if(currentStroke.length){
//     strokes.push(currentStroke);
//     drawingSpace.setStrokes = strokes;
//     currentStroke = [];
// }
// for (let i = 0; i < _ui.length; i++){
//     _ui[i].resetClick();
// }
// if (isDrawing){
//     buildStroke();
// }
// if (!isDrawing){
//     isDrawing = true;
//     drawingSpace.setCurrentStroke(currentStroke);
// }

//
// setCurrentStroke(currentStroke){ this.currentStroke = currentStroke }
// setStrokes(strokes){ this.strokes = strokes; console.log(this.strokes) }
// // just for testing.
// setSubmittedStrokes(submittedStrokes){ this.submittedStrokes = submittedStrokes }

function clearStrokes(){
    drawingSpace.strokes = []
    // setUI();
}

function undoLastStroke(){
    drawingSpace.strokes.pop()
}

function redrawStrokes(){
    if (drawingSpace.submittedStrokeIndex < drawingSpace.submittedStrokes.length ) {
        drawingSpace.strokes.push(drawingSpace.submittedStrokes[drawingSpace.submittedStrokeIndex])
        drawingSpace.submittedStrokeIndex += 1
        setTimeout(function(){redrawStrokes();}, 200);
    }
}

// I should pass in the strokes to draw as a parameter
// just testing functionality.
function beginRedrawingStrokes(){
    submittedStrokes = strokes
    clearStrokes()
    drawingSpace.setSubmittedStrokes(submittedStrokes)
    redrawStrokes()
}

function submitStrokes(){}

// test for slideshow functionality
// function replayStrokes(){
//     for strokes
// }

class UIElement{
    constructor(parameterObject){
        // null parameterObject
        let parameters = {
            offsetX: undefined,
            offsetY: undefined,
            parent: undefined,
            row: undefined,
            index: undefined,
            len: undefined,
            mouseClickfunc: undefined,
            mouseDragfunc: undefined,
            width: undefined,
            height: undefined,
            color: undefined,
        };
        // if a 'parameterObject' has been passed in, set the fields in the
            // 'parameterObject' to the null parameter object 'parameters'.
            // only accepts the fields defined above.
        if (parameterObject){
            parameters = parameterObject;
        }
        // destructure the object to get at the fields.
            // begin to set the uiElements data members to field values
        let {
            offsetX: offsetX,
            offsetY: offsetY,
            parent: parent,
            row: row,
            index: index,
            len: len,
            mouseClickfunc: mouseClickfunc,
            mouseDragfunc: mouseDragfunc,
            width: width,
            height: height,
            color: color,
        } = parameters;
        // performed on mousePressed()
        // used for when you want to grab the value of something after having
            // clicked it or to set a draggable's 'isDragging' boolean to true.
        this.mouseClickfunc = mouseClickfunc;
        // performed on mouseReleased()
        // used for when you want to grab the value of something after having
            // finished dragging it or to set a draggable's 'isDragging' boolean to false.
        this.mouseDragfunc = mouseDragfunc;
        // the UIElement's index within the parent UIElement
        this.index = index != undefined ? index : 0;
        // the number of elements that are siblings to this UIElement in the
            // parent.
        // EXAMPLE:
            // index:0, len:2 = a UIElement that is the first element of two in the parent.
        this.len = len || 1;
        // mostly used for testing / to see the bounds of the UIELement
        this.color = color
        // used to offset the UIElement's position.
        // depending on the UIElement this offset is applied to the top-left
            // corner (containers, sliders, icons, views) or to the middle of the
            // UIElement (buttons).
        offsetX = offsetX != undefined ? offsetX : 0;
        offsetY = offsetY != undefined ? offsetY : 0;
        // the orientation of the UIElement.
            // true for row orientation
            // false for column orientation.
        // defaults to a changing orientation where:
            // it is true if the screen's width is less than it's height
            // (portrait mode) and false if the screen's width is greater than its
            // height (landscape mode).
        this.row = row != undefined ? row : windowWidth < windowHeight;
        // given the relevant fields, positions the UIElement on the canvas.
            // depends on: the orientation, the parent's bounds and placement,
            // and the number of siblings and index of the UIElement.
        if (this.row) {
            if (parent){
                // if row orientation and parent
                this.parent = parent;
                this.width = width || this.parent.width;
                this.height = height || this.parent.height / this.len;
                this.x = this.parent.x + offsetX;
                this.y = this.index * this.parent.height / this.len + this.parent.y + offsetY;
            } else {
                // if row orientation and no parent
                this.width = width || windowWidth;
                this.height = height || windowHeight / this.len;
                this.x = offsetX;
                this.y = this.index * windowHeight / this.len + offsetY;
            }
        } else {
            if (parent) {
                // if column orientation and parent
                this.parent = parent;
                this.width = width || this.parent.width / this.len;
                this.height = height || this.parent.height;
                this.x = this.index * this.parent.width / this.len + this.parent.x + offsetX;
                this.y = this.parent.y + offsetY;
            } else {
                // if column orientation and no parent
                this.width = width || windowWidth / this.len;
                this.height = height || windowHeight;
                this.x = offsetX + this.index * windowWidth / this.len;
                this.y = offsetY;
            }
        }
        this.uiElements = []
    }
    // p5.js built-in methods
    mouseOver(){}
    mouseOut(){}
    // abstract methods for subclasses
    performClickFunctionality(){}
    testForClick() {}
    testForMouseOver() {}
    performDragFunctionality(){}
    // incorrect. will edit when parameters are finalized.
    getParameterList(){
         let parameters = {
            offsetX: "the offset of the container's left corner along the X-axis. if none, index * windowWidth / len",
            offsetY: "the offset of the container's left corner along the Y-axis. if none, index * windowHeight / len",
            widthOfParent: "the width of the parent container, if none, the windowWidth of the canvas",
            heightOfParent: "the height of the parent container, if none, the windowHeight of the canvas",
            orientation: "the orientation of the container: row or column, if none, windowWidth < windowHeight of the canvas",
            index: "the index of the container in the parent object, if none, 0",
            len: "the number of siblings contained in the parent container. if none, 1.",
            func: "a wildcard function. if none, nullFunction.",
            width: "the width of the container. if none, the windowWidth / len.",
            height: "the height of the container. if none, the windowHeight / len.",
        };
        return parameters
    }
}

class Container extends UIElement{
    constructor(parameterObject) {
        super(parameterObject);
        this.hasStroke = false;
        this.hasFill = false;
        this.clicked = false;
        this.clickPerformed = false;
        this.doOnce = false;
        // some UI_elements respond to a single click, others to a mouse press
            // (a single click held down over a period of time.)
    }
    testForClick(){
        if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height
            ){
            return true;
        }
    }
    performClickFunctionality(){
        if (this.mouseClickfunc){
            if (this.doOnce && !this.clickPerformed) {
                this.clickPerformed = true;
                return this.mouseClickfunc()
            } else if (!this.doOnce) {
                return this.mouseClickfunc()
            }
        }
    }
    setStroke(bool){
        this.hasStroke = bool
    }
    setFill(bool){
        this.hasFill = bool
    }
    setClick(bool){
        this.clicked = bool;
        if (!this.clicked){
            this.clickPerformed = false;
        }
    }
    setClickType(bool){
        this.doOnce = bool;
    }
    draw() {
        if(this.testForClick() && this.clicked){
            this.performClickFunctionality();
        }
        this.hasStroke ? stroke(45) : noStroke();
        this.hasFill ? fill(45) : noFill();
        this.color ? fill(this.color) : noFill();
        rect(this.x,this.y,this.width,this.height)
        for (let i = 0; i < this.uiElements.length; i++){
            if (this.uiElements[i].draw){
                this.uiElements[i].draw();
            }
        }
    }
}

class ImageContainer extends Container{
    constructor(paramsObject){
        super(paramsObject)
        this.loadedImg = undefined
        this.imageWidth = undefined
        this.imageHeight = undefined
        this.imageX = this.parent ? this.parent.x + this.parent.width/2 : windowWidth/2
        this.imageY = this.parent ? this.parent.y + this.parent.height/2 : windowHeight/2

        this.offsetX = 0;
        this.offsetY = 0;
    }
    // images can exceed the bounds of their container
    setImageProps(loadedImg,imageWidth,imageHeight){
        this.loadedImg = loadedImg
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
    }
    setImageOffsets(offsetX,offsetY){
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    // needs to be called every frame.
    redrawImage() { image(this.loadedImg, this.imageX+this.offsetX, this.imageY+this.offsetY, this.imageWidth, this.imageHeight); }
    draw() {
        if (this.loadedImg){
            this.redrawImage()
        }
    }
}

class TextBox extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.text = undefined
        this.textColor = undefined;
        // this.row determines the orientation of the font.
        // use the orientation of the parent container for aligning
            // normally-oriented text, vertically.
        this.textSize = this.row ? this.width / 5 : this.height / 10
        if (this.textSize * 2.5 > this.height && this.row){this.textSize = this.width / 10}
        textSize(this.textSize);
        // alignement options cannot be set after instantiation.
            // subclass to change the alignment:
            // ( horizAlign: LEFT, CENTER, or RIGHT,
            //   vertAlign:  TOP, BOTTOM, CENTER, or BASELINE )
        this.align = [CENTER,CENTER]
        textAlign(this.align[0],this.align[1]);
        this.fontStyle = undefined
    }
    // call this after instantiating the object to set the text
    setString(s) { this.text = s }
    // call this after instantiating the object to set the text color
    setTextColor(color) { this.textColor = color }
    setFontStyle(fontStyle){this.fontStyle=fontStyle}
    drawRotatedTextBox(){
        push();
            super.draw()
            translate(this.x,this.y)
            rotate(radians(90))
            if (this.text){
                if (this.textColor){
                    fill(this.textColor)
                }
                if (this.fontStyle){
                    textFont(this.fontStyle)
                }
                text(this.text, 0, -this.width, this.height, this.width)
            }
        pop();
    }
    drawNormalTextBox(){
        super.draw()
        if (this.text){
            if (this.textColor){
                fill(this.textColor)
            }
            if (this.fontStyle){
                textFont(this.fontStyle)
            }
            text(this.text, this.x, this.y, this.width, this.height)
        }
    }
    draw() {
        this.row ? this.drawNormalTextBox() : this.drawRotatedTextBox()
    }
}

class DrawingContainer extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.currentStroke = []
        this.strokes = [];

        this.submittedStrokes = undefined
        this.submittedStrokeIndex = 0
    }

    setCurrentStroke(currentStroke){ this.currentStroke = currentStroke }
    setStrokes(strokes){ this.strokes = strokes; console.log(this.strokes) }
    // just for testing.
    setSubmittedStrokes(submittedStrokes){
        this.submittedStrokes = submittedStrokes
    }

    draw() {
        super.draw()
        noStroke()
        if (this.submittedStrokes)
        {
            // i want the time to draw the submitted drawings to the screen
                // to be relative to the amount of time it takes for the baron
                // to read what the drawing's description.
            // 3/4 of the time drawing the strokes
            // 1/4 of the time with a fully-formed drawing for viewing

            fill(0)
            for (let i = 0; i < this.strokes.length;i++){
                for (let j = 0; j < this.strokes[i].length;j++){
                    ellipse(this.strokes[i][j].x*sketchSide+this.x, this.strokes[i][j].y*sketchSide+this.y, sketchSide*.03,sketchSide*.03)
                }
            }
        } else {
            fill(100,0,0)
            for (let i = 0; i < this.currentStroke.length;i++){
                ellipse(this.currentStroke[i].x*sketchSide+this.x, this.currentStroke[i].y*sketchSide+this.y, sketchSide*.03,sketchSide*.03)
            }
            fill(0)
            for (let i = 0; i < this.strokes.length;i++){
                for (let j = 0; j < this.strokes[i].length;j++){
                    ellipse(this.strokes[i][j].x*sketchSide+this.x, this.strokes[i][j].y*sketchSide+this.y, sketchSide*.03,sketchSide*.03)
                }
            }
        }
    }
}
