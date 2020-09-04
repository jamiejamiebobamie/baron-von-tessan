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

function preload(){
    // fontStyle = loadFont('../fonts/ArchitectsDaughter-Regular.tff');
}

function setup() {
    w = windowWidth - (windowWidth/10)
    h = windowHeight - (windowHeight/10)
    // setSketchSide();
    canvas = createCanvas(w, h);
    canvas.parent('sketch-holder');
    frameRate(24);
    imageMode(CENTER);
    setUI();
}

function draw() {
    // 1.) background color
    background(255);

    // 2.) gif(s)
    for (let i = 0; i < _ui.length; i++){
        _ui[i].draw();
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
    // rect(0,.9*sketchSide,.1*sketchSide)

    // 5.) stand-in button for clearing the screen.
        // initalize 'strokes' to an empty array
    // rect(.45*sketchSide,.9*sketchSide,.1*sketchSide)

    // 6.) stand-in button for submitting drawing.
        // submit strokes to database.
        // bring-up the next window. (submit text descriptor of drawing).
    // rect(.9*sketchSide,.9*sketchSide,.1*sketchSide)
}

function mouseReleased() {
    isDrawing = false;
    if(currentStroke.length){
        strokes.push(currentStroke);
        drawingSpace.setStrokes = strokes;
        currentStroke = [];
    }
    for (let i = 0; i < _ui.length; i++){
        if (_ui[i].clickFuncPerformed){
            _ui[i].clickFuncPerformed = false;
        }
    }
    console.log(strokes)
    frameRate(24);
}

function mousePressed() {
    if (!isDrawing){
        isDrawing = true;
        frameRate(70);
        drawingSpace.setCurrentStroke(currentStroke);
    }
}

function buildStroke(){
    if (mouseX < sketchSide && mouseY < sketchSide){
        currentStroke.push({x:mouseX/sketchSide,y:mouseY/sketchSide})
    }
}

function windowResized() {
    w = windowWidth - (windowWidth/10)
    h = windowHeight - (windowHeight/10)
    // [w,h] = setSketchSide();
    // resizeCanvas(sketchSide, sketchSide);
    resizeCanvas(w, h);
    setUI();
}

function setUI(){
    _ui = [];
    // it has to be square...
    let drawingSpaceWidth = w > h ? w*(2/3) : w;
    let drawingSpaceHeight = w > h ? h : h*(2/3);
    sketchSide = w > h ? drawingSpaceHeight : drawingSpaceWidth;
    drawingSpace = new DrawingContainer({width:sketchSide,height:sketchSide,len:3,index:0,color:'lightgrey'})
    drawingSpace.setCurrentStroke(currentStroke);
    drawingSpace.setStrokes(strokes);
    drawingSpace.setFill(true)
    _ui.push(drawingSpace)

    buttons = new Container({len:3,index:2,row:h>w,offsetX:-(w * (.05)), offsetY:-(h * (.05))})
    _ui.push(buttons)

    button1 = new Container({parent:buttons,len:3,index:0,row:w>h,mouseClickfunc:undoLastStroke})
    _ui.push(button1)
    undoButton = new TextBox({parent:button1,row:true});
    undoButton.setString("Undo");
    undoButton.setTextColor("black")
    _ui.push(undoButton)

    button2 = new Container({parent:buttons,len:3,index:1,row:w>h,mouseClickfunc:clearStrokes})
    _ui.push(button2)
    clearButton = new TextBox({parent:button2,row:true});
    clearButton.setString("Clear");
    clearButton.setTextColor("black")
    _ui.push(clearButton)

    button3 = new Container({parent:buttons,len:3,index:2,row:w>h,mouseClickfunc:submitStrokes})
    _ui.push(button3)
    submitButton = new TextBox({parent:button3,row:true});
    submitButton.setString("Submit");
    submitButton.setTextColor("black")
    _ui.push(submitButton)
}

function clearStrokes(){
    strokes = []
    setUI();
}

function undoLastStroke(){
    strokes.pop()
}

function submitStrokes(){
    console.log("You're a cutie!")
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
        this.clickFuncPerformed = false;
    }
    testForClick(){
        if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height
            && isDrawing){
            return true;
        }
    }
    performClickFunctionality(){
        if (this.mouseClickfunc && !this.clickFuncPerformed){
            this.clickFuncPerformed = true;
            return this.mouseClickfunc()
        }
    }
    setStroke(bool){
        this.hasStroke = bool
    }
    setFill(bool){
        this.hasFill = bool
    }
    resetClick(){
        this.clickFuncPerformed = false;
    }
    draw() {
        if(this.testForClick()){
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
        this.textSize = this.row ? this.width / 10 : this.height / 20
        if (this.textSize * 2.5 > this.height && this.row){this.textSize = this.width / 20}
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
        this.strokes = []
    }
    setCurrentStroke(currentStroke){ this.currentStroke = currentStroke }
    setStrokes(strokes){ this.strokes = strokes; console.log(this.strokes) }
    draw() {
        super.draw()
        noStroke()
        fill(100,0,0)
        for (let i = 0; i < this.currentStroke.length;i++){
            ellipse(this.currentStroke[i].x*sketchSide, this.currentStroke[i].y*sketchSide, sketchSide*.03,sketchSide*.03)
        }
        fill(0)
        for (let i = 0; i < this.strokes.length;i++){
            for (let j = 0; j < this.strokes[i].length;j++){
                ellipse(this.strokes[i][j].x*sketchSide, this.strokes[i][j].y*sketchSide, sketchSide*.03,sketchSide*.03)
            }
        }
    }
}
// these make up the tictactoe board on the suggestion view.
class TicTacToeSpace extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.currentSymbol = new NullIcon({parent: this})
        this.symbols = [new NullIcon({parent: this}), new X({parent: this}), new O({parent: this})]
        this.symbolIndex = 0;

        this.mouseClickfunc = this.getSymbol
    }
    incrementSymbol(){
        this.symbolIndex < 2 ? this.symbolIndex++ : this.symbolIndex = 0
        this.currentSymbol = this.symbols[this.symbolIndex]
    }
    getSymbol(){
        this.incrementSymbol();
        const LOOKUP = {'00':0, '01':1, '02':2,
                  '10':3, '11':4, '12':5,
                  '20':6, '21':7, '22':8}
        let boardIndex = str(this.parent.index) + str(this.index)
        return [ [LOOKUP[boardIndex], this.currentSymbol.name] ]
    }
    setSymbol(symbol){
        const LOOKUP = {'!':0,
                        'x':1,
                        'o':2}
        symbol ? this.symbolIndex = LOOKUP[symbol] : this.symbolIndex = 0
    }
    userDrag(){}
    draw() {
        super.draw()
        // draw symbol / icon
        this.symbols[this.symbolIndex].draw()
    }
}
// these make up the tictactoe board on the play view.
class TicTacToeSpacePlay extends TicTacToeSpace{
    constructor(parameterObject){
        super(parameterObject)
        this.currentSymbol = new NullIcon({parent: this})
        this.symbols = [new NullIcon({parent: this}), new X({parent: this}), new O({parent: this})]
        this.symbolIndex = 0;
        this.boardState = ["!","!","!", "!","!","!", "!","!","!"]
        this.mouseClickfunc = this.playTurn
    }
    playTurn(){
        const LOOKUP = {'00':0, '01':1, '02':2,
                  '10':3, '11':4, '12':5,
                  '20':6, '21':7, '22':8}
        let key = str(this.parent.index) + str(this.index)
        let boardIndex = LOOKUP[key]
        // check to make sure the player has clicked on a valid space.
        if (this.boardState[boardIndex] == "!"){
        // commands are pushed into the array in reverse order that they occur
        let commands = []
        // query the backend to either generate a random move or an ai move
        let command = 'queryBackend'
        commands.push(command)
        // the ai player 'O' gets to go.
        command = 'o'
        commands.push(command)
        // user 'X' picks tictactoe square
        command = this.getSymbol(boardIndex)
        commands.push(command)
        return commands
        }
    }
    getSymbol(boardIndex){
        this.symbolIndex = 1
        this.currentSymbol = this.symbols[this.symbolIndex]
        return [boardIndex, this.currentSymbol.name]
    }
    setBoardState(boardState){
        this.boardState = boardState
    }
}
// this is the button to change the player's turn on the suggestion view.
class TicTacToePlayerTurnSelector extends TicTacToeSpace{
    constructor(parameterObject){
        super(parameterObject)
        this.currentSymbol = new X({parent: this})
        this.symbols = [new X({parent: this}), new O({parent: this})]
        this.symbolIndex = 0;
        this.mouseClickfunc = this.getSymbol
    }
    incrementSymbol(){
        this.symbolIndex < 1 ? this.symbolIndex++ : this.symbolIndex = 0
        this.currentSymbol = this.symbols[this.symbolIndex]
    }
    getSymbol(){
        this.incrementSymbol();
        return [ this.currentSymbol.name ]
    }
    setSymbol(symbol){
        const LOOKUP = {'x':0,
                        'o':1}
        symbol ? this.symbolIndex = LOOKUP[symbol] : this.symbolIndex = 0
    }
    userDrag(){}
    draw() {
        super.draw()
        this.symbols[this.symbolIndex].draw()
    }
}
// this is the menu button is drawn in the main draw function in sketch.js
class MenuButton extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.icon = new cycleViewIcon({parent:this})
    }
    draw(){
        super.draw();
        this.icon.draw()
    }
}
// spawned in the play view when the parameterObject.winner is set to anything except null
class ReplayWindow extends TextBox{
    constructor(parameterObject){
        super(parameterObject)
        this.message = undefined;
        this.context = undefined
        this.doOnce = true;
    }
    displayContent(){
        let replayScreenParams = {row:true, width:parent.width/1.5, color: 'white', height:parent.height/1.5, offsetX: parent.width/6, offsetY: parent.height/6}
        let replayScreen = new Container(replayScreenParams)
        replayScreen.setStroke(true)
        this.context.push(replayScreen)

        let gameOverMessageParams = {row:true, height:replayScreen.height*2/3, parent:replayScreen}
        let gameOverMessage = new TextBox(gameOverMessageParams)
        gameOverMessage.setString(this.message)
        gameOverMessage.setTextColor(30)
        this.context.push(gameOverMessage)

        let buttonsRowParams = {row:true, len:3, index:2, parent: replayScreen}
        let buttonRow = new Container(buttonsRowParams)
        this.context.push(buttonRow)

        let replayButtonContainerParams;
        let replayButtonContainer;
        for (let i =0; i < 2; i++){
            replayButtonContainerParams = {row:this.row, len:2, index:i, parent: buttonRow}
            replayButtonContainer = new Container(replayButtonContainerParams)
            this.context.push(replayButtonContainer)
        }

        let playAgainButtonContainer = this.context[this.context.length-2]
        let exitButtonContainer = this.context[this.context.length-1]

        let playAgainButtonParams = {row: true, offsetX: playAgainButtonContainer.width/6, offsetY: playAgainButtonContainer.height/4, width:playAgainButtonContainer.width/1.5, height:playAgainButtonContainer.height/2, parent:playAgainButtonContainer, mouseClickfunc:this.playAgain}
        let playAgainButton = new TextBox(playAgainButtonParams)
        playAgainButton.setString("play again")
        playAgainButton.setTextColor(30)
        playAgainButton.setStroke(true)
        this.context.push(playAgainButton)

        let exitButtonParams = {row: true, offsetX: exitButtonContainer.width/6, offsetY: exitButtonContainer.height/4, width:exitButtonContainer.width/1.5, height:exitButtonContainer.height/2, parent:exitButtonContainer, mouseClickfunc:this.exit}
        let exitButton = new TextBox(exitButtonParams)
        exitButton.setString("exit")
        exitButton.setTextColor(30)
        exitButton.setStroke(true)
        this.context.push(exitButton)
    }
    setContext(context){
        this.context = context
    }
    setMessage(parameterObject){
        let message;
        switch(parameterObject.winner){
            case 1:
            message = "you won";
            break;
            case 0:
            message = "the a.i. won";
            break;
            case -1:
            message = "tie";
            break;
            default:
            message = "wtf";
            break;
        }
        this.message = message;
    }
    playAgain(){
        return ["replay"]
    }
    exit(){
        return ["exit"]
    }
    draw(){
        super.draw();
        if (this.doOnce && this.context){
            this.displayContent()
            this.doOnce = false;
        }
    }
}
