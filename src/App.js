import React,{Component}  from 'react';
import './App.css';
let p5 = require("p5")

class App extends Component {
    constructor(props){
        super(props)
        // testing
        this.state = {
            drawingDescriptor: "cow",
            drawingData: [1,2],
            response:[]
        }
        this.myRef = React.createRef()
        this.handleSubmitDrawing = this.handleSubmitDrawing.bind(this);
        this.handleAddToResponseArrayForTesting = this.handleAddToResponseArrayForTesting.bind(this);

    }
    handleSubmitDrawing(drawingData) {
        this.setState({drawingData:drawingData})
    }
    handleAddToResponseArrayForTesting(response) {
        this.setState({response:[...this.state.response, response]})
        console.log(this.state.response)
    }
    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }
    Sketch = (p) => {
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
        let button0;
        let button1;
        let button2;
        let button3;
        let button4;
        let eraserOrPenButton;
        let undoButton;
        let clearButton;
        let submitButton;
        let descriptionContainer;
        let description;
        let shouldDisplayDrawingView = true;

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
            p.rectMode(p.CORNER);

            setUI(shouldDisplayDrawingView);
        }

        p.draw = () => {
            p.background(255);
            for (let i = 0; i < _ui.length; i++){
                _ui[i].draw();
            }
            if (!doneOnce){
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
            setUI(shouldDisplayDrawingView);
        }

        function setUI(shouldDisplayDrawingView){
            _ui = [];

            button0 = new Container({row:w>h, len:10, index: 7, width:100,height:100})
            _ui.push(button0)
            let test = new TextBox({parent:button0,row:true,color:"white",mouseClickfunc:beginRedrawingStrokes});
            test.setString("test slideshow");
            test.setTextColor("black")
            test.setFontStyle(fontStyle);
            test.setInteractivity(true);
            test.setStroke(true)
            let performClickOnce = true;
            test.setClickType(performClickOnce)

            _ui.push(test)

            if (shouldDisplayDrawingView){
                let drawingSpaceWidth = w > h ? w*(2/3) : w;
                let drawingSpaceHeight = w > h ? h : h*(2/3);
                sketchSide = w > h ? drawingSpaceHeight : drawingSpaceWidth;
                let longerSideOfScreen = w > h ? w : h;
                sketchSide = sketchSide > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : sketchSide;
                let drawingMode = true;
                if (drawingSpace) {
                    drawingMode = drawingSpace.getPenMode()
                }
                drawingSpace = new DrawingContainer({width:sketchSide,height:sketchSide,len:3,index:0,color:'lightgrey', mouseClickfunc:buildStroke})//,offsetX:offsetX,offsetY:offsetY})
                drawingSpace.setCurrentStroke(currentStroke);
                drawingSpace.setStrokes(strokes);
                drawingSpace.setFill(true)
                performClickOnce = false;
                drawingSpace.setClickType(performClickOnce)
                drawingSpace.drawingData = drawingData;
                if (drawingMode){
                    drawingSpace.setPenMode(drawingMode);
                }
                _ui.push(drawingSpace)

                buttons = new Container({len:3,index:2,row:h>w,offsetX:w *.0063,offsetY:h *.05})
                _ui.push(buttons)
                let buttonsInteractOffsetX = h > w ? buttons.width*(.01) : buttons.width*(.01);
                let buttonsInteractHOffsetY = h > w ? buttons.height*(.01) : buttons.height*(.01);
                let buttonsInteractWidth = h > w ? buttons.width*(2/3) : 0;
                let buttonsInteractHeight = h > w ? 0 : buttons.height*(2/3);
                let buttonsInteract = new Container({len:3,index:0,row:w>h, offsetX:buttonsInteractOffsetX,offsetY:buttonsInteractHOffsetY, width:buttonsInteractWidth, height:buttonsInteractHeight, parent:buttons})
                _ui.push(buttonsInteract)

                let buttonsSubmit = new Container({len:3,index:2,row:w>h, offsetX:buttonsInteractOffsetX,offsetY:buttonsInteractHOffsetY, parent:buttons})
                _ui.push(buttonsSubmit)

                button1 = new Container({parent:buttonsInteract,len:3,index:0,row:w>h})
                _ui.push(button1)
                eraserOrPenButton = new TextBox({parent:button1,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:toggleTool});
                let buttonString = drawingSpace.penMode ? "ERASER" : "PEN";
                eraserOrPenButton.setString(buttonString);
                eraserOrPenButton.setTextColor("black")
                eraserOrPenButton.setFontStyle(fontStyle);
                eraserOrPenButton.setInteractivity(true);
                eraserOrPenButton.setStroke(true)
                performClickOnce = true;
                eraserOrPenButton.setClickType(performClickOnce)

                _ui.push(eraserOrPenButton)

                button2 = new Container({parent:buttonsInteract,len:3,index:1,row:w>h})
                _ui.push(button2)
                undoButton = new TextBox({parent:button2,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:undoLastStroke});
                undoButton.setString("UNDO");
                undoButton.setFontStyle(fontStyle);
                undoButton.setTextColor("black")
                undoButton.setInteractivity(true);
                undoButton.setStroke(true)
                undoButton.setClickType(performClickOnce) // true

                _ui.push(undoButton)

                button3 = new Container({parent:buttonsInteract,len:3,index:2,row:w>h})
                _ui.push(button3)
                clearButton = new TextBox({parent:button3,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:clearStrokes});
                clearButton.setString("CLEAR");
                clearButton.setFontStyle(fontStyle);
                clearButton.setTextColor("black")
                clearButton.setInteractivity(true);
                clearButton.setStroke(true)
                clearButton.setClickType(performClickOnce) // true

                _ui.push(clearButton)

                button4 = new Container({parent:buttonsSubmit,row:w>h})
                _ui.push(button4)
                submitButton = new TextBox({parent:button4,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:submitStrokes});
                submitButton.setString("SUBMIT");
                submitButton.setFontStyle(fontStyle);
                submitButton.setTextColor("black")
                submitButton.setInteractivity(true);
                submitButton.setStroke(true)
                submitButton.setScope(scope);
                submitButton.setClickType(performClickOnce) // true

                _ui.push(submitButton)
            } else {
                let drawingSpaceWidth = w > h ? w*(2/3) : w;
                let drawingSpaceHeight = w > h ? h : h*(2/3);
                sketchSide = w > h ? drawingSpaceHeight : drawingSpaceWidth;
                let longerSideOfScreen = w > h ? w : h;
                sketchSide = sketchSide > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : sketchSide;
                drawingSpace = new DrawingContainer({width:sketchSide,height:sketchSide,len:2,index:0,color:'lightgrey', mouseClickfunc:buildStroke})//,offsetX:offsetX,offsetY:offsetY})
                drawingSpace.setCurrentStroke(currentStroke);
                drawingSpace.setStrokes(strokes);
                drawingSpace.setFill(true)
                let performClickOnce = false;
                drawingSpace.setClickType(performClickOnce)
                drawingSpace.drawingData = drawingData;
                _ui.push(drawingSpace)
                let offsetX = w>h ? w * .0063: -w * .0063;
                let offsetY= w>h ? 0 : h-sketchSide;
                descriptionContainer = new DisplayDescriptionContainer({len:3,index:2,row:h>w,offsetX:offsetX,offsetY:offsetY, height:h-sketchSide, width:(w-sketchSide)/2.5})
                descriptionContainer.setStroke(true)
                _ui.push(descriptionContainer)
                description = new TextBox({parent:descriptionContainer, row:true, color:"white"});
                description.setString("how much text can be written in this box before it becomes too much text? i wonder. what a fun thing i am doing.");
                description.setTextColor("black")
                description.setFontStyle(fontStyle);
                _ui.push(description)
            }
        }

        function buildStroke(){
            drawingSpace.currentStroke.push({x:p.mouseX/sketchSide,y:p.mouseY/sketchSide})
        }

        function removeStroke(){
            for (let i = 0; i < drawingSpace.strokes.length; i++ ){
                for (let j = 0; j < drawingSpace.strokes[i].length; j++ ){
                    if ( p.mouseX > drawingSpace.strokes[i][j].x*sketchSide-sketchSide*.01
                        && p.mouseX < drawingSpace.strokes[i][j].x*sketchSide+sketchSide*.01
                        && p.mouseY > drawingSpace.strokes[i][j].y*sketchSide-sketchSide*.01
                        && p.mouseY < drawingSpace.strokes[i][j].y*sketchSide+sketchSide*.01 ){
                            console.log("Should erase.")
                            drawingSpace.strokes[i].splice(j,1)
                        }
                }
            }
        }

        function clearStrokes(){
            drawingSpace.strokes = []
        }

        function undoLastStroke(){
            drawingSpace.strokes.pop()
        }

        function redrawStrokes(pauseBetweenDrawings){
            // parameter 'pauseBetweenDrawings' signals to recursive function
                // that there has just been a pause after completing a drawing
                // and that the variables need to be reset.
            if (pauseBetweenDrawings) {
                drawingSpace.submittedStrokeIndex = 0;
                drawingSpace.responseIndex += 1;
                // if (drawingSpace.responseIndex < scope.state.response.length){
                    submittedStrokes = scope.state.response[drawingSpace.responseIndex]
                    drawingSpace.setSubmittedStrokes(submittedStrokes)
                // }
            }
            // check to make sure this isn't the first call to the redrawStrokes method
            if (drawingSpace.submittedStrokes){
                if (drawingSpace.submittedStrokeIndex < drawingSpace.submittedStrokes.length) {
                    drawingSpace.submittedStrokeIndex += 1
                    setTimeout(function(){redrawStrokes(false);}, 1000/drawingSpace.submittedStrokes.length);
                } else {
                    if (drawingSpace.responseIndex < scope.state.response.length){
                        setTimeout(function(){redrawStrokes(true);}, 1500);
                    }
                }
            // if it is the first call to the method, set the drawingSpace.submittedStrokes
                // member variable. this is the current drawing to be drawn to the drawing space.
            } else {
                if (drawingSpace.responseIndex < scope.state.response.length){
                    submittedStrokes = scope.state.response[drawingSpace.responseIndex]
                    drawingSpace.setSubmittedStrokes(submittedStrokes)
                    redrawStrokes(false)
                }
            }
        }

        function beginRedrawingStrokes(){
            clearStrokes() // maybe unnecessary...
            redrawStrokes()
        }

        function addToAPIResponseArrayForTesting(scope,submittedStrokes){
            scope.handleAddToResponseArrayForTesting(submittedStrokes);
        }

        function toggleTool(){
            drawingSpace.penMode = !drawingSpace.penMode;
            let buttonString = drawingSpace.penMode ? "ERASER" : "PEN";
            eraserOrPenButton.setString(buttonString);
            drawingSpace.mouseClickfunc = drawingSpace.penMode ? buildStroke : removeStroke;
        }

        function submitStrokes(){
            let submittedStrokes = [];
            for (let i = 0; i<drawingSpace.strokes.length; i++) {
                for (let j = 0; j<drawingSpace.strokes[i].length; j++) {
                    submittedStrokes.push(drawingSpace.strokes[i][j])
                }
            }
            this.scope.handleSubmitDrawing(submittedStrokes);
            clearStrokes()
            addToAPIResponseArrayForTesting(this.scope,submittedStrokes);
        }

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
                this.isInteractive = false;
                this.growAmount = 1.3
                this.mouseOverWidthSize = this.width * this.growAmount
                this.mouseOverHeightSize = this.height * this.growAmount
                this.screenHasSettled = false;
                setTimeout(()=>{this.screenHasSettled = true;},500);
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
            setInteractivity(bool){
                this.isInteractive = bool;
            }
            enlargeButton(){
                if (this.isInteractive){
                    if (this.width < this.mouseOverWidthSize){
                        this.width = p.lerp(this.width, this.mouseOverWidthSize, 0.05);
                    if (this.height < this.mouseOverHeightSize)
                        this.height = p.lerp(this.height, this.mouseOverHeightSize, 0.05);
                    }
                }
            }
            shrinkButton(shrinkSpeed){
                if (this.isInteractive){
                    if (this.width > this.mouseOverWidthSize/1.5){
                        this.width = p.lerp(this.width, this.mouseOverWidthSize/1.5, shrinkSpeed);
                    if (this.height > this.mouseOverHeightSize/1.5)
                        this.height = p.lerp(this.height, this.mouseOverHeightSize/1.5, shrinkSpeed);
                    }
                }
            }
            draw() {
                if(this.testForClick()){
                    if (this.clicked){
                        this.performClickFunctionality();
                        this.shrinkButton(.5)
                    } else {
                        this.enlargeButton()
                    }
                }
                if (this.screenHasSettled){
                    this.shrinkButton(.1)
                }
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
            // enlargeButton(){}
            // shrinkButton(){}
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
                this.responseIndex = 0;
                this.penMode = undefined; // false for eraserMode
            }
            setCurrentStroke(currentStroke){ this.currentStroke = currentStroke }
            setStrokes(strokes){ this.strokes = strokes; }
            // just for testing.
            setSubmittedStrokes(submittedStrokes){
                this.submittedStrokes = submittedStrokes
            }
            getPenMode(){return this.penMode}
            setPenMode(penMode){this.penMode=penMode;}
            enlargeButton(){}
            shrinkButton(){}
            drawStrokes(){
                for (let i = 0; i < this.strokes.length;i++){
                    for (let j = 0; j < this.strokes[i].length;j++){
                        p.ellipse(this.strokes[i][j].x*sketchSide+this.x, this.strokes[i][j].y*sketchSide+this.y, sketchSide*.025,sketchSide*.025)
                    }
                }
            }
            drawSubmittedStrokes(){
                for (let i = 0; i < this.submittedStrokeIndex; i++){
                    p.ellipse(this.submittedStrokes[i].x*sketchSide+this.x, this.submittedStrokes[i].y*sketchSide+this.y, sketchSide*.025,sketchSide*.025)
                }
            }
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
                    this.drawSubmittedStrokes()
                } else {
                    p.fill(100,0,0)
                    for (let i = 0; i < this.currentStroke.length;i++){
                        p.ellipse(this.currentStroke[i].x*sketchSide+this.x, this.currentStroke[i].y*sketchSide+this.y, sketchSide*.025,sketchSide*.025)
                    }
                    p.fill(0)
                    this.drawStrokes()
                }
            }
        }
        class DisplayDescriptionContainer extends Container{
            constructor(parameterObject){ super(parameterObject) }
            enlargeButton(){}
            shrinkButton(){}
            draw() { super.draw() }
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
