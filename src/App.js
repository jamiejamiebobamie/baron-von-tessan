import React,{Component}  from 'react';
import './App.css';
// import _sketch from './scripts/uiClasses.js'
let p5 = require("p5")

// <div className="sketch-holder" id="sketch-holder"></div>
// <h1>{this.state.drawingDescriptor} {this.state.drawingData}</h1>

// import "./scripts/sketch";


class App extends Component {
    constructor(props){
        super(props)
        // testing
        this.state = {
            drawingDescriptor: "cow",
            drawingData: [1,2]
        }
        this.myRef = React.createRef()
        this.handleSubmitDrawing = this.handleSubmitDrawing.bind(this);
    }
    handleSubmitDrawing(drawingData) {
        this.setState({drawingData:drawingData})
        console.log(this.state.drawingData)
    }
    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }
    Sketch = (p) => {
        // the p5.js canvas
        let canvas;
        let sketchSide;
        let w, h;
        let fontStyle;

        let scope = this;

        let currentStroke = [];
        let strokes = [];

        let _ui = [];
        let drawingSpace;
        let buttons;
        let button1;
        let button2;
        let button3;
        let undoButton;
        let clearButton;
        let submitButton;

        // just for testing.
        let submittedStrokes = []
        let drawingData = []
        let doneOnce = false;

        let mouseIsClicked = false;

        p.preload = () => {
            fontStyle = p.loadFont('./fonts/PrintClearly.otf');
        }

        p.setup = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            canvas = p.createCanvas(w, h);
            canvas.parent('sketch-holder');
            p.frameRate(24);
            p.imageMode(p.CENTER);
            setUI();
        }

        p.draw = () => {
            p.background(255);
            for (let i = 0; i < _ui.length; i++){
                _ui[i].draw();
            }
            if (!doneOnce){
                // console.log(this.handleSubmitDrawing)
                console.log(this);
                doneOnce = true;
            }
        }

        p.mouseReleased = () => {
            if (mouseIsClicked){
                p.frameRate(24);
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

        p.mousePressed = () => {
            if (!mouseIsClicked){
                p.frameRate(70);
                mouseIsClicked = true;
                for (let i = 0; i < _ui.length; i++){
                    _ui[i].setClick(mouseIsClicked);
                }
            }
        }

        p.windowResized = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            p.resizeCanvas(w, h);
            setUI();
        }

        function setUI(){
            _ui = [];
            let drawingSpaceWidth = w > h ? w*(2/3) : w;
            let drawingSpaceHeight = w > h ? h : h*(2/3);
            sketchSide = w > h ? drawingSpaceHeight : drawingSpaceWidth;
            let longerSideOfScreen = w > h ? w : h;
            sketchSide = sketchSide > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : sketchSide;

            drawingSpace = new DrawingContainer({width:sketchSide,height:sketchSide,len:3,index:0,color:'lightgrey', mouseClickfunc:buildStroke})//,offsetX:offsetX,offsetY:offsetY})
            drawingSpace.setCurrentStroke(currentStroke);
            drawingSpace.setStrokes(strokes);
            drawingSpace.setFill(true)
            let performClickOnce = false;
            drawingSpace.setClickType(performClickOnce)
            drawingSpace.drawingData = drawingData;
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
            submitButton.setScope(scope);
            performClickOnce = true;
            submitButton.setClickType(performClickOnce)

            _ui.push(submitButton)
        }

        function buildStroke(){
            drawingSpace.currentStroke.push({x:p.mouseX/sketchSide,y:p.mouseY/sketchSide})
        }

        function clearStrokes(){
            strokes = []
            drawingSpace.strokes = []
        }

        function undoLastStroke(){
            strokes.pop()
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

        function submitStrokes(){this.scope.handleSubmitDrawing(strokes); console.log(this.scope.state)}//this.handleSubmitDrawing(strokes)}

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
                this.row = row != undefined ? row : p.windowWidth < p.windowHeight;
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
                        this.width = width || p.windowWidth;
                        this.height = height || p.windowHeight / this.len;
                        this.x = offsetX;
                        this.y = this.index * p.windowHeight / this.len + offsetY;
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
                        this.width = width || p.windowWidth / this.len;
                        this.height = height || p.windowHeight;
                        this.x = offsetX + this.index * p.windowWidth / this.len;
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
                this.scope = undefined
                // some UI_elements respond to a single click, others to a mouse press
                    // (a single click held down over a period of time.)
                this.growAmount = 1.1
                this.mouseOverWidthSize = this.width * this.growAmount
                this.mouseOverHeightSize = this.height * this.growAmount
            }
            setScope(scope){this.scope = scope}
            testForClick(){
                if (p.mouseX > this.x
                    && p.mouseX < this.x + this.width
                    && p.mouseY > this.y
                    && p.mouseY < this.y + this.height
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
            enlargeButton(){
                if (this.width < this.mouseOverWidthSize){
                    this.width = p.lerp(this.width, this.mouseOverWidthSize, 0.05);
                if (this.height < this.mouseOverHeightSize)
                    this.height = p.lerp(this.height, this.mouseOverHeightSize, 0.05);
                }
            }
            shrinkButton(){
                if (this.width > this.mouseOverWidthSize/1.5){
                    this.width = p.lerp(this.width, this.mouseOverWidthSize/1.5, 0.05);
                if (this.height > this.mouseOverHeightSize/1.5)
                    this.height = p.lerp(this.height, this.mouseOverHeightSize/1.5, 0.05);
                }
            }
            draw() {
                if(this.testForClick()){
                    if (this.clicked){
                        this.performClickFunctionality();
                    } else {
                        this.enlargeButton()
                    }
                }
                this.shrinkButton()
                this.hasStroke ? p.stroke(45) : p.noStroke();
                this.hasFill ? p.fill(45) : p.noFill();
                this.color ? p.fill(this.color) : p.noFill();
                p.rect(this.x,this.y,this.width,this.height)
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
                this.imageX = this.parent ? this.parent.x + this.parent.width/2 : p.windowWidth/2
                this.imageY = this.parent ? this.parent.y + this.parent.height/2 : p.windowHeight/2

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
            redrawImage() { p.image(this.loadedImg, this.imageX+this.offsetX, this.imageY+this.offsetY, this.imageWidth, this.imageHeight); }
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
                p.textSize(this.textSize);
                // alignement options cannot be set after instantiation.
                    // subclass to change the alignment:
                    // ( horizAlign: LEFT, CENTER, or RIGHT,
                    //   vertAlign:  TOP, BOTTOM, CENTER, or BASELINE )
                // this.align = [CENTER,CENTER]
                p.textAlign(p.CENTER,p.CENTER);
                this.fontStyle = undefined
            }
            // call this after instantiating the object to set the text
            setString(s) { this.text = s }
            // call this after instantiating the object to set the text color
            setTextColor(color) { this.textColor = color }
            setFontStyle(fontStyle){this.fontStyle=fontStyle}
            drawRotatedTextBox(){
                p.push();
                    super.draw()
                    p.translate(this.x,this.y)
                    p.rotate(p.radians(90))
                    if (this.text){
                        if (this.textColor){
                            p.fill(this.textColor)
                        }
                        if (this.fontStyle){
                            p.textFont(this.fontStyle)
                        }
                        p.text(this.text, 0, -this.width, this.height, this.width)
                    }
                p.pop();
            }
            drawNormalTextBox(){
                super.draw()
                if (this.text){
                    if (this.textColor){
                        p.fill(this.textColor)
                    }
                    if (this.fontStyle){
                        p.textFont(this.fontStyle)
                    }
                    p.text(this.text, this.x, this.y, this.width, this.height)
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
            enlargeButton(){}
            shrinkButton(){}

            draw() {
                super.draw()
                p.noStroke()
                if (this.submittedStrokes)
                {
                    // i want the time to draw the submitted drawings to the screen
                        // to be relative to the amount of time it takes for the baron
                        // to read what the drawing's description.
                    // 3/4 of the time drawing the strokes
                    // 1/4 of the time with a fully-formed drawing for viewing

                    p.fill(0)
                    for (let i = 0; i < this.strokes.length;i++){
                        for (let j = 0; j < this.strokes[i].length;j++){
                            p.ellipse(this.strokes[i][j].x*sketchSide+this.x, this.strokes[i][j].y*sketchSide+this.y, sketchSide*.03,sketchSide*.03)
                        }
                    }
                } else {
                    p.fill(100,0,0)
                    for (let i = 0; i < this.currentStroke.length;i++){
                        p.ellipse(this.currentStroke[i].x*sketchSide+this.x, this.currentStroke[i].y*sketchSide+this.y, sketchSide*.03,sketchSide*.03)
                    }
                    p.fill(0)
                    for (let i = 0; i < this.strokes.length;i++){
                        for (let j = 0; j < this.strokes[i].length;j++){
                            p.ellipse(this.strokes[i][j].x*sketchSide+this.x, this.strokes[i][j].y*sketchSide+this.y, sketchSide*.03,sketchSide*.03)
                        }
                    }
                }
            }
        }
    };
    render(){
        return (
          <div className="App">
              <div className="sketch-holder" id="sketch-holder" ref={this.myRef}></div>
          </div>
        );
    }
}

export default App;
// <div className="sketch-holder" id="sketch-holder"></div>
