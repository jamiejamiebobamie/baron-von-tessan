let p5 = require("p5")
class UIElement{
    constructor(parameterObject){
        // null parameterObject
        let parameters = {
            p: undefined,
            windowWidth: undefined,
            windowHeight: undefined,
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
            p: p,
            windowWidth: windowWidth,
            windowHeight: windowHeight,
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

        // NEW PARAMS
        this.p = p ? p : new p5();
        this.windowWidth = windowWidth ? windowWidth : this.p.windowWidth;
        this.windowHeight = windowHeight ? windowHeight : this.p.windowHeight;

        // performed on mousePressed()
        // used for when you want to grab the value of something after having
            // clicked it or to set a draggable's 'isDragging' boolean to true.
        this.mouseClickfunc = mouseClickfunc;
        // performed on mouseReleased()
        // used for when you want to grab the value of something after having
            // finished dragging it or to set a draggable's 'isDragging' boolean to false.
        this.mouseDragfunc = mouseDragfunc;
        // the UIElement's index within the parent UIElement
        this.index = index !== undefined ? index : 0;
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
        this.row = row != undefined ? row : this.windowWidth < this.windowHeight;
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
                this.y = this.index * this.parent.height / this.len + this.parent.y - this.height / 2 * this.len + offsetY + this.height / 2;
            } else {
                // if row orientation and no parent
                this.width = width || this.windowWidth;
                this.height = height || this.windowHeight / this.len;
                this.x = offsetX + this.width / 2;
                this.y = this.index * this.windowHeight / this.len + offsetY + this.height / 2;
            }
        } else {
            if (parent) {
                // if column orientation and parent
                this.parent = parent;
                this.width = width || this.parent.width / this.len;
                this.height = height || this.parent.height;
                this.x = this.index * this.parent.width / this.len + this.parent.x - this.width / 2 * this.len + offsetX + this.width / 2;
                this.y = this.parent.y + offsetY;
            } else {
                // if column orientation and no parent
                this.width = width || this.windowWidth / this.len;
                this.height = height || this.windowHeight;
                this.x = offsetX + this.index * this.windowWidth / this.len + this.width / 2;
                this.y = offsetY + this.height / 2;
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

// class UIElement{
//     constructor(parameterObject){
//         // null parameterObject
//         let parameters = {
//             p: undefined,
//             windowWidth: undefined,
//             windowHeight: undefined,
//             offsetX: undefined,
//             offsetY: undefined,
//             parent: undefined,
//             row: undefined,
//             index: undefined,
//             len: undefined,
//             mouseClickfunc: undefined,
//             mouseDragfunc: undefined,
//             width: undefined,
//             height: undefined,
//             color: undefined,
//         };
//         // if a 'parameterObject' has been passed in, set the fields in the
//             // 'parameterObject' to the null parameter object 'parameters'.
//             // only accepts the fields defined above.
//         if (parameterObject){
//             parameters = parameterObject;
//         }
//         // destructure the object to get at the fields.
//             // begin to set the uiElements data members to field values
//         let {
//             p: p,
//             windowWidth: windowWidth,
//             windowHeight: windowHeight,
//             offsetX: offsetX,
//             offsetY: offsetY,
//             parent: parent,
//             row: row,
//             index: index,
//             len: len,
//             mouseClickfunc: mouseClickfunc,
//             mouseDragfunc: mouseDragfunc,
//             width: width,
//             height: height,
//             color: color,
//         } = parameters;
//
//         // NEW PARAMS
//         this.p = p ? p : new p5();
//         this.windowWidth = windowWidth ? windowWidth : this.p.windowWidth;
//         this.windowHeight = windowHeight ? windowHeight : this.p.windowHeight;
//
//         // performed on mousePressed()
//         // used for when you want to grab the value of something after having
//             // clicked it or to set a draggable's 'isDragging' boolean to true.
//         this.mouseClickfunc = mouseClickfunc;
//         // performed on mouseReleased()
//         // used for when you want to grab the value of something after having
//             // finished dragging it or to set a draggable's 'isDragging' boolean to false.
//         this.mouseDragfunc = mouseDragfunc;
//         // the UIElement's index within the parent UIElement
//         this.index = index !== undefined ? index : 0;
//         // the number of elements that are siblings to this UIElement in the
//             // parent.
//         // EXAMPLE:
//             // index:0, len:2 = a UIElement that is the first element of two in the parent.
//         this.len = len || 1;
//         // mostly used for testing / to see the bounds of the UIELement
//         this.color = color
//         // used to offset the UIElement's position.
//         // depending on the UIElement this offset is applied to the top-left
//             // corner (containers, sliders, icons, views) or to the middle of the
//             // UIElement (buttons).
//         offsetX = offsetX != undefined ? offsetX : 0;
//         offsetY = offsetY != undefined ? offsetY : 0;
//         // the orientation of the UIElement.
//             // true for row orientation
//             // false for column orientation.
//         // defaults to a changing orientation where:
//             // it is true if the screen's width is less than it's height
//             // (portrait mode) and false if the screen's width is greater than its
//             // height (landscape mode).
//         this.row = row != undefined ? row : this.windowWidth < this.windowHeight;
//         // given the relevant fields, positions the UIElement on the canvas.
//             // depends on: the orientation, the parent's bounds and placement,
//             // and the number of siblings and index of the UIElement.
//         if (this.row) {
//             if (parent){
//                 // if row orientation and parent
//                 this.parent = parent;
//                 this.width = width || this.parent.width;
//                 this.height = height || this.parent.height / this.len;
//                 this.x = this.parent.x + offsetX;
//                 this.y = this.index * this.parent.height / this.len + this.parent.y + offsetY;
//             } else {
//                 // if row orientation and no parent
//                 this.width = width || this.windowWidth;
//                 this.height = height || this.windowHeight / this.len;
//                 this.x = offsetX;
//                 this.y = this.index * this.windowHeight / this.len + offsetY;
//             }
//         } else {
//             if (parent) {
//                 // if column orientation and parent
//                 this.parent = parent;
//                 this.width = width || this.parent.width / this.len;
//                 this.height = height || this.parent.height;
//                 this.x = this.index * this.parent.width / this.len + this.parent.x + offsetX;
//                 this.y = this.parent.y + offsetY;
//             } else {
//                 // if column orientation and no parent
//                 this.width = width || this.windowWidth / this.len;
//                 this.height = height || this.windowHeight;
//                 this.x = offsetX + this.index * this.windowWidth / this.len;
//                 this.y = offsetY;
//             }
//         }
//         this.uiElements = []
//     }
//     // p5.js built-in methods
//     mouseOver(){}
//     mouseOut(){}
//     // abstract methods for subclasses
//     performClickFunctionality(){}
//     testForClick() {}
//     testForMouseOver() {}
//     performDragFunctionality(){}
//     // incorrect. will edit when parameters are finalized.
//     getParameterList(){
//          let parameters = {
//             offsetX: "the offset of the container's left corner along the X-axis. if none, index * windowWidth / len",
//             offsetY: "the offset of the container's left corner along the Y-axis. if none, index * windowHeight / len",
//             widthOfParent: "the width of the parent container, if none, the windowWidth of the canvas",
//             heightOfParent: "the height of the parent container, if none, the windowHeight of the canvas",
//             orientation: "the orientation of the container: row or column, if none, windowWidth < windowHeight of the canvas",
//             index: "the index of the container in the parent object, if none, 0",
//             len: "the number of siblings contained in the parent container. if none, 1.",
//             func: "a wildcard function. if none, nullFunction.",
//             width: "the width of the container. if none, the windowWidth / len.",
//             height: "the height of the container. if none, the windowHeight / len.",
//         };
//         return parameters
//     }
// }

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
        this.isInteractive = false;
        this.growAmount = 1.3
        this.mouseOverWidthSize = this.width * this.growAmount
        this.mouseOverHeightSize = this.height * this.growAmount
        this.screenHasSettled = false;
        setTimeout(()=>{this.screenHasSettled = true;},500);
    }
    // testForClick(){
    //     if (this.p.mouseX > this.x
    //         && this.p.mouseX < this.x + this.width
    //         && this.p.mouseY > this.y
    //         && this.p.mouseY < this.y + this.height
    //         ){
    //         return true;
    //     }
    // }
    testForClick(){
        if (this.p.mouseX > this.x - this.width / 2
            && this.p.mouseX < this.x + this.width / 2
            && this.p.mouseY > this.y - this.height / 2
            && this.p.mouseY < this.y + this.height / 2
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
                this.width = this.p.lerp(this.width, this.mouseOverWidthSize, 0.05);
            if (this.height < this.mouseOverHeightSize)
                this.height = this.p.lerp(this.height, this.mouseOverHeightSize, 0.05);
            }
        }
    }
    shrinkButton(shrinkSpeed){
        if (this.isInteractive){
            if (this.width > this.mouseOverWidthSize/1.5){
                this.width = this.p.lerp(this.width, this.mouseOverWidthSize/1.5, shrinkSpeed);
            if (this.height > this.mouseOverHeightSize/1.5)
                this.height = this.p.lerp(this.height, this.mouseOverHeightSize/1.5, shrinkSpeed);
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
        this.hasStroke ? this.p.stroke(45) : this.p.noStroke();
        this.hasFill ? this.p.fill(45) : this.p.noFill();
        this.color ? this.p.fill(this.color) : this.p.noFill();
        this.p.rect(this.x,this.y,this.width,this.height)
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
        this.imageX = this.parent ? this.parent.x + this.parent.width/2 : this.windowWidth/2
        this.imageY = this.parent ? this.parent.y + this.parent.height/2 : this.windowHeight/2

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
    redrawImage() { this.p.image(this.loadedImg, this.imageX+this.offsetX, this.imageY+this.offsetY, this.imageWidth, this.imageHeight); }
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
        this.p.textSize(this.textSize);
        this.fontStyle = undefined
    }
    // call this after instantiating the object to set the text
    setString(s) { this.text = s }
    // call this after instantiating the object to set the text color
    setTextColor(color) { this.textColor = color }
    setFontStyle(fontStyle){this.fontStyle=fontStyle}
    drawRotatedTextBox(){
        this.p.push();
            super.draw()
            this.p.translate(this.x,this.y)
            this.p.rotate(this.p.radians(90))
            if (this.text){
                if (this.textColor){
                    this.p.fill(this.textColor)
                }
                if (this.fontStyle){
                    this.p.textFont(this.fontStyle)
                }
                this.p.text(this.text, 0, -this.width, this.height, this.width)
            }
        this.p.pop();
    }
    drawNormalTextBox(){
        super.draw()
        if (this.text){
            if (this.textColor){
                this.p.fill(this.textColor)
            }
            if (this.fontStyle){
                this.p.textFont(this.fontStyle)
            }
            this.p.text(this.text, this.x, this.y, this.width, this.height)
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
        // false for eraserMode
        this.penMode = true;
        this.lengthOfDrawingSquare = 0
    }
    setLengthOfDrawingSquare(length){
        this.lengthOfDrawingSquare = length
    }
    setCurrentStroke(currentStroke){ this.currentStroke = currentStroke }
    setStrokes(strokes){ this.strokes = strokes; }
    getPenMode(){return this.penMode}
    setPenMode(penMode){this.penMode=penMode;}
    addCurrentStrokeToStrokesArray(){
        this.strokes.push(this.currentStroke)
        this.currentStroke = []
    }
    setClick(bool){
        let mouseClickReleased = !bool
        let userJustDrewAStroke = this.currentStroke.length && mouseClickReleased
        if (userJustDrewAStroke) {
            this.addCurrentStrokeToStrokesArray()
        }
        super.setClick(bool)
    }
    drawStrokes(){
        for (let i = 0; i < this.strokes.length;i++){
            for (let j = 0; j < this.strokes[i].length;j++){
                this.p.ellipse(this.strokes[i][j].x*this.lengthOfDrawingSquare+this.x, this.strokes[i][j].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        }
    }
    draw() {
        super.draw()
        this.p.noStroke()
        this.p.fill(100,0,0)
        for (let i = 0; i < this.currentStroke.length;i++){
            this.p.ellipse(this.currentStroke[i].x*this.lengthOfDrawingSquare+this.x, this.currentStroke[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
        this.p.fill(0)
        this.drawStrokes()
    }
}
class DisplayDrawingContainer extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.submittedStrokes = []
        this.submittedStrokeIndex = 0
        // loops the drawing animation
        this.loop = false;
        this.lengthOfDrawingSquare = 0
    }
    setLengthOfDrawingSquare(length){
        this.lengthOfDrawingSquare = length
    }
    setSubmittedStrokes(submittedStrokes,submittedStrokeIndex){
        this.submittedStrokes = submittedStrokes
        this.submittedStrokeIndex = submittedStrokeIndex ? submittedStrokeIndex : submittedStrokes.length
    }
    shouldLoopFinishedDrawing(){ this.loop = true; }
    drawSubmittedStrokes(){
        if (this.loop){
            for (let i = 0; i < this.submittedStrokeIndex; i++){
                if (i === this.submittedStrokeIndex) { i = 0; }
                this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare+this.x, this.submittedStrokes[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        } else {
            for (let i = 0; i < this.submittedStrokeIndex; i++){
                this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare+this.x, this.submittedStrokes[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        }
    }
    draw() {
        super.draw();
        this.p.noStroke();
        this.p.fill(0);
        this.drawSubmittedStrokes();
    }
}
class TextInput extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.text = undefined//"I drew a... (click me and finish the sentence)."
        this.height = this.width / 3;
        this.displayText = new TextBox({row:true,parent:this})

        // should enlarge when selected and shrink when deselected.
        this.displayText.setInteractivity(false)

        this.displayText.setStroke(true)
        this.displayText.setString(this.text)
        this.textBoxSelected = false;
        this.showCursor = false;
        // this.toggleShowCursor(this);
        // this.mouseClickfunc = this.toggleTextBoxSelected
        this.setTimeoutVariable = undefined
        this.setStroke(true)
        this.referenceToMobileKeyboard = new Container({width:0,height:0}) // dummy object
        this.referenceToAPP = undefined
    }
    setReferenceToAPP(APP){
        this.referenceToAPP = APP;
    }
    setDisplayText(text){
        // I'm not sure if I need a reference outside of this.displayText
        this.text = text
        this.displayText.setString(this.text)
    }
    setMobileKeyboardReference(ref){
        this.referenceToMobileKeyboard = ref
    }
    performClickFunctionality(){
        this.toggleTextBoxSelected(this.text)
        super.performClickFunctionality()
    }
    toggleShowCursor(scope){
        scope.showCursor = !scope.showCursor
        if (scope.showCursor){
            scope.text+="|"
            // console.log("show",scope.text)
        } else {
            scope.text = scope.text.replace("|","")
            // console.log("hide",scope.text)
        }
        scope.displayText.setString(scope.text)
        scope.setTimeoutVariable = setTimeout(function(){scope.toggleShowCursor(scope)},800)
    }
    // it works but it's ugly.
    // if the user clicks on the TextInputBox the cursor will begin to show
    // if the user clicks on the TextInputBox again. nothing changes.
    // if the user clicks off the TextInputBox, the cursor goes away.

        // need to rename methods and variables
            // this.testForClick() -> this.testForMouseOver
            // this.clicked -> this.userClickedOnScreen
            // etc.
    toggleTextBoxSelected(resetDisplayText){
        if (this.testForClick() && !this.textBoxSelected && this.setTimeoutVariable === undefined ){
            this.textBoxSelected = true;
            this.text = ""
            // start cursor playing
            this.toggleShowCursor(this);
        } else if (!this.testForClick() || resetDisplayText) {
                if (this.showCursor) {
                    this.showCursor = false;
                    this.text = this.text.replace("|","")
                    this.displayText.setString(this.text)
                }
                this.textBoxSelected = false;
                clearTimeout(this.setTimeoutVariable);
                this.setTimeoutVariable = undefined;
                if (resetDisplayText){
                    this.text = resetDisplayText
                } else {
                    this.text = "I drew a... \n(click to finish the sentence)."
                }
                this.displayText.setString(this.text)
            }
        }
    handleTyping(keyCode){
        const BACKSPACE = keyCode === 8
        const ENTER = keyCode === 13
        const SPACE = keyCode === 32
        if (ENTER) {
            let drawingDescriptor = this.text.replace("|","")
            this.APP.handleSubmitDescription_React(drawingDescriptor)
            this.toggleTextBoxSelected(drawingDescriptor)
            // this.mouseClickfunc = null;
        } else if (BACKSPACE) {
            this.text = this.text.replace("|","")
            this.text = this.text.substring(0, this.text.length - 1);
            this.displayText.setString(this.text)
        } else if (SPACE) {
            this.text = this.text.replace("|","") + " "
            this.displayText.setString(this.text)
        } else if (keyCode>=65 &&keyCode<=90) {
            if (this.text.length < 100){
                let newChar = String.fromCharCode(keyCode);
                this.text = this.text.replace("|","") + newChar.toLowerCase()
                this.displayText.setString(this.text)
            }
        }
    }
    draw() {
        super.draw()
        // toggle off if user clicks off the TextInputBox
        if ( this.clicked &&
            ( !this.testForClick() && !this.referenceToMobileKeyboard.testForClick() ) &&
            this.textBoxSelected) {
                let text = this.text.replace("|","")
                this.performClickFunctionality()
        }
        this.displayText.draw();
    }
}

class Keyboard extends TextBox{
    constructor(parameterObject){
        super(parameterObject)
        this.mouseClickfunc = this.searchClickedKey;
        this.setClickType(true); // doOnce
        this.referenceToInputTextBox = undefined

        this.rowsOfKeys = []
        {
            let row;
            for (let i = 0; i < 4; i++){
                row = new Container({parent:this,width:this.width-i*10,len:4,index:i,row:true, offsetX:i*10})
                // row.setStroke(true)
                this.rowsOfKeys.push(row)
            }
        }

        this.keyLetters = ["qwertyuiop","asdfghjkl","zxcvbnm"]
        {
            let doOnce = true;
            let parameters;
            let keyboardButton;
        for (let i = 0; i < this.keyLetters.length; i++){
            for (let j = 0; j < this.keyLetters[i].length; j++){
                parameters = {
                                   parent:this.rowsOfKeys[i],
                                   len:this.keyLetters[i].length,
                                   index:j,
                                   row:false,
                                   // color:"white"
                                 }
                keyboardButton = new KeyboardKey(parameters)
                keyboardButton.letter = this.keyLetters[i][j]
                keyboardButton.setClickType(doOnce)
                keyboardButton.setKeyLetterToDisplay(this.keyLetters[i][j])

                this.rowsOfKeys.push(keyboardButton)
            }
        }
        let controlButtons = ["SUBMIT","SPACE","BACKSPACE"]
        for (let i = 0; i < controlButtons.length; i++){
            parameters = {
                               parent:this.rowsOfKeys[3],
                               len:controlButtons.length,
                               index:i,
                               row:false,
                               // color:"white"
                             }
            keyboardButton = new KeyboardKey(parameters)
            keyboardButton.letter = controlButtons[i]
            keyboardButton.setClickType(doOnce)
            keyboardButton.setKeyLetterToDisplay(controlButtons[i])
            this.rowsOfKeys.push(keyboardButton)
        }
    }

    }
    setReferenceToInputBox(ref){
        this.referenceToInputTextBox = ref;
    }
    searchClickedKey(){
        let newChar = undefined
        // first 4 items of this.rowsOfKeys are the row containers.
            // skip.
        for (let i = 4; i < this.rowsOfKeys.length; i++){
            if(this.rowsOfKeys[i].testForClick()){
                newChar = this.rowsOfKeys[i].pressKey();
                // set interactivity click response function here:
                    // this.rowsOfKeys[i].displayText.myClickResponseFunc()
                this.rowsOfKeys[i].displayText.shrinkButton(1)

            }
        }
        if (this.referenceToInputTextBox){
            if (newChar){
                let keyCode;
                if (newChar.length === 1){
                    newChar = newChar.toUpperCase()
                    keyCode = newChar.charCodeAt(0);
                } else {
                    if (newChar === "SUBMIT"){
                        keyCode = 13
                    } else if (newChar === "SPACE"){
                        keyCode = 32
                    } else if (newChar === "BACKSPACE"){
                        keyCode = 8
                    }
                }
                this.referenceToInputTextBox.handleTyping(keyCode)
            }
        }
    }
    draw(){
        super.draw()
        for (let i = 0; i < this.rowsOfKeys.length; i++){
            this.rowsOfKeys[i].draw();
        }
    }
}
class KeyboardKey extends Container {
    constructor(parameterObject){
        super(parameterObject)
        this.letter = undefined;
        this.displayText = new TextBox({row:true,parent:this,color:"white"})
        this.displayText.setStroke(true)
        this.displayText.setInteractivity(true)
        this.mouseClickfunc = this.pressKey
    }
    setKeyLetterToDisplay(letter){
        this.letter = letter
        this.displayText.setString(letter)
    }
    pressKey(){
        return this.letter
    }
    draw(){
        super.draw()
        this.displayText.draw()
    }
}

class testCallBackButton extends Container {
    performClickFunctionality(){
        this.mouseClickfunc(this.index)
    }

}

export { testCallBackButton as default}
