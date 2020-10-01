import TextBox from '../../uiClasses/TextBox'
import Container from '../../uiClasses/Container'
import DisplayDrawingContainer from '../../uiClasses/DisplayDrawingContainer'
import TextInput from '../../uiClasses/TextInput'

export default class EnterDescriptionView {
    constructor(){
        this.displayDrawingSpace = undefined;
        this.inputTextBox = undefined;
    }
    getUI(){ return this; }
    setUI(p,w,h,REACT_APP, windowResized, previousUI){
        let _ui = []

        let drawingSpaceWidth = w > h ? w*(2/3) : w;
        let drawingSpaceHeight = w > h ? h : h*(2/3);
        let lengthOfDrawingSquare = w > h ? drawingSpaceHeight : drawingSpaceWidth;
        let longerSideOfScreen = w > h ? w : h;
        lengthOfDrawingSquare = lengthOfDrawingSquare > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : lengthOfDrawingSquare;
        this.displayDrawingSpace = new DisplayDrawingContainer({p:p,w:w,h:h,width:lengthOfDrawingSquare,height:lengthOfDrawingSquare,len:3,index:0,color:'lightgrey'})//len:2,index:0,
        this.displayDrawingSpace.setFill(true)
        this.displayDrawingSpace.setLengthOfDrawingSquare(lengthOfDrawingSquare)
        let submittedStrokes = REACT_APP.state.drawingData
        this.displayDrawingSpace.setSubmittedStrokes(submittedStrokes)
        // this.displayDrawingSpace.setLoopToTrueToLoopFinishedDrawing()

        let beginRedrawingStrokesFunc = () => {
            this.displayDrawingSpace.setSubmittedStrokeIndex(0)
            let redrawStrokes = (timeOutVar) => {
                if (this.displayDrawingSpace.drawingHasBeenDrawn){
                    if (this.displayDrawingSpace.loop){
                        this.displayDrawingSpace.drawingHasBeenDrawn = false;
                        this.displayDrawingSpace.submittedStrokeIndex = 0;
                        clearTimeout(timeOutVar)
                    } else {
                        return;
                    }
                }
                if (this.displayDrawingSpace.submittedStrokeIndex < this.displayDrawingSpace.submittedStrokes.length) {
                    this.displayDrawingSpace.submittedStrokeIndex += 1
                    timeOutVar = setTimeout(redrawStrokes, 1,timeOutVar);
                } else {
                    this.displayDrawingSpace.drawingHasBeenDrawn = true;
                    // pause three seconds to display drawing.
                        // then loop if this.displayDrawingSpace.loop
                        // is set to true otherwise return.
                    timeOutVar = setTimeout(redrawStrokes, 3000,timeOutVar);
                }
            }
            redrawStrokes();
        }
        if (!windowResized){
            beginRedrawingStrokesFunc();
        }
        _ui.push(this.displayDrawingSpace)

        let width = w>h ? w/3.5 : w*.8 ;
        let descriptionOffsetX = w>h ? w*(-.05) : w*(.10);
        let descriptionOffsetY = w>h ? h*(-.1) : h*(-.05);
        let descriptionContainer = new Container({p:p,w:w,h:h,width:width, offsetX:descriptionOffsetX,offsetY:descriptionOffsetY,len:3,index:2,row:h>w})
        _ui.push(descriptionContainer)


        let previouslySubmittedText = null;
        let previouslySelected = null;

        if (previousUI){
            if (previousUI.inputTextBox) {
                if (previousUI.inputTextBox.text !== undefined) {
                        previouslySubmittedText = previousUI.inputTextBox.text
                    }
                    if (previousUI.inputTextBox.textBoxSelected !== false){
                        previouslySelected = true
                    }
                }

            }
        let toggleKeyboardForMobile = () => {
            let previousUI = this.getUI()
            // true stops the the timeout function from being called again.
            let windowRedrawn = true;
            this.setUI(p,w,h,REACT_APP, windowRedrawn, previousUI)
        }
        this.inputTextBox = new TextInput({p:p,w:w,h:h,parent:descriptionContainer,row:w>h,color:"white",mouseClickfunc:toggleKeyboardForMobile})//offsetY:descriptionOffsetY,offsetX:descriptionOffsetX,
        let performClickOnce = true;
        this.inputTextBox.setClickType(performClickOnce)
        this.inputTextBox.setInteractivity(false)

        if (previouslySubmittedText){
            this.inputTextBox.setDisplayText(previouslySubmittedText)
        } else {
            this.inputTextBox.setDisplayText("I drew a... \n(click to finish the sentence).")
        }

        if (previouslySelected){
            this.inputTextBox.textBoxSelected = true;
        }
        this.inputTextBox.setReferenceToAPP(REACT_APP)

        _ui.push(this.inputTextBox)

        // let backButton = new TextBox({parent:inputTextBox,row:true,width:inputTextBox.width,height:inputTextBox.height/2,color:"white",offsetY:inputTextBox.height*1.1,mouseClickfunc:returnToDrawingView});
        // backButton.setString(" << BACK");
        // backButton.setFontStyle(fontStyle);
        // backButton.setTextColor("black")
        // backButton.setInteractivity(false);
        // backButton.setStroke(true)
        // backButton.setClickType(performClickOnce) // true
        // _ui.push(backButton)
        //
        // if (isMobile && inputTextBox.textBoxSelected){
        //     let mobileKeyboard = new Keyboard({row:true,len:4,index:2,height:h/3,width:w-w*.05,})
        //     mobileKeyboard.setReferenceToInputBox(inputTextBox)
        //     _ui.push(mobileKeyboard)
        //     inputTextBox.setMobileKeyboardReference(mobileKeyboard)
        // }
        return _ui;
    }
}

//
//     function setUI(shouldDisplayDrawingView){
//         _ui = [];
//         let performClickOnce = true;
//         if (shouldDisplayDrawingView){
//             let drawingSpaceWidth = w > h ? w*(2/3) : w;
//             let drawingSpaceHeight = w > h ? h : h*(2/3);
//             sketchSide = w > h ? drawingSpaceHeight : drawingSpaceWidth;
//             let longerSideOfScreen = w > h ? w : h;
//             sketchSide = sketchSide > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : sketchSide;
//
//             let drawingMode = true;
//             let currentStroke = [];
//             let strokes = [];
//             if (drawingSpace) {
//                 drawingMode = drawingSpace.getPenMode()
//                 currentStroke = drawingSpace.currentStroke
//                 strokes = drawingSpace.strokes
//             }
//             drawingSpace = new DrawingContainer({width:sketchSide,height:sketchSide,len:3,index:0,color:'lightgrey', mouseClickfunc:buildStroke})//,offsetX:offsetX,offsetY:offsetY})
//             drawingSpace.setCurrentStroke(currentStroke);
//             drawingSpace.setStrokes(strokes);
//             drawingSpace.setFill(true)
//             performClickOnce = false;
//             drawingSpace.setClickType(performClickOnce)
//             if (drawingMode){
//                 drawingSpace.setPenMode(drawingMode);
//             }
//             _ui.push(drawingSpace)
//
//             let buttons = new Container({len:3,index:2,row:h>w,offsetX:w *.0063,offsetY:h *.05})
//             _ui.push(buttons)
//             let buttonsInteractOffsetX = h > w ? buttons.width*(.01) : buttons.width*(.01);
//             let buttonsInteractHOffsetY = h > w ? buttons.height*(.01) : buttons.height*(.01);
//             let buttonsInteractWidth = h > w ? buttons.width*(2/3) : 0;
//             let buttonsInteractHeight = h > w ? 0 : buttons.height*(2/3);
//             let buttonsInteract = new Container({len:3,index:0,row:w>h, offsetX:buttonsInteractOffsetX,offsetY:buttonsInteractHOffsetY, width:buttonsInteractWidth, height:buttonsInteractHeight, parent:buttons})
//             _ui.push(buttonsInteract)
//
//             let buttonsSubmit = new Container({len:3,index:2,row:w>h, offsetX:buttonsInteractOffsetX,offsetY:buttonsInteractHOffsetY, parent:buttons})
//             _ui.push(buttonsSubmit)
//
//             let button1 = new Container({parent:buttonsInteract,len:3,index:0,row:w>h})
//             _ui.push(button1)
//             eraserOrPenButton = new TextBox({parent:button1,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:toggleTool});
//             let buttonString = drawingSpace.penMode ? "ERASER" : "PEN";
//             eraserOrPenButton.setString(buttonString);
//             eraserOrPenButton.setTextColor("black")
//             eraserOrPenButton.setFontStyle(fontStyle);
//             eraserOrPenButton.setInteractivity(true);
//             eraserOrPenButton.setStroke(true)
//             performClickOnce = true;
//             eraserOrPenButton.setClickType(performClickOnce)
//
//             _ui.push(eraserOrPenButton)
//
//             let button2 = new Container({parent:buttonsInteract,len:3,index:1,row:w>h})
//             _ui.push(button2)
//             let undoButton = new TextBox({parent:button2,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:undoLastStroke});
//             undoButton.setString("UNDO");
//             undoButton.setFontStyle(fontStyle);
//             undoButton.setTextColor("black")
//             undoButton.setInteractivity(true);
//             undoButton.setStroke(true)
//             undoButton.setClickType(performClickOnce) // true
//
//             _ui.push(undoButton)
//
//             let button3 = new Container({parent:buttonsInteract,len:3,index:2,row:w>h})
//             _ui.push(button3)
//             let clearButton = new TextBox({parent:button3,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:clearStrokes});
//             clearButton.setString("CLEAR");
//             clearButton.setFontStyle(fontStyle);
//             clearButton.setTextColor("black")
//             clearButton.setInteractivity(true);
//             clearButton.setStroke(true)
//             clearButton.setClickType(performClickOnce) // true
//
//             _ui.push(clearButton)
//
//             let button4 = new Container({parent:buttonsSubmit,row:w>h})
//             _ui.push(button4)
//             let submitButton = new TextBox({parent:button4,row:true,width:button1.width/1.5,height:button1.height/3,color:"white",mouseClickfunc:handleSubmitDrawing_p5});
//             submitButton.setString("SUBMIT");
//             submitButton.setFontStyle(fontStyle);
//             submitButton.setTextColor("black")
//             submitButton.setInteractivity(true);
//             submitButton.setStroke(true)
//             submitButton.setClickType(performClickOnce) // true
//
//             _ui.push(submitButton)
//         } else {
//
//
//             let drawingSpaceWidth = w > h ? w*(2/3) : w;
//             let drawingSpaceHeight = w > h ? h : h*(2/3);
//             sketchSide = w > h ? drawingSpaceHeight : drawingSpaceWidth;
//             let longerSideOfScreen = w > h ? w : h;
//             sketchSide = sketchSide > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : sketchSide;
//             let submittedStrokes = APP.state.drawingData;
//             let storeStrokeIndex = drawingSpace.submittedStrokeIndex
//             drawingSpace = new DisplayDrawingContainer({width:sketchSide,height:sketchSide,len:2,index:0,color:'lightgrey'})
//             drawingSpace.setSubmittedStrokes(submittedStrokes,storeStrokeIndex)
//             drawingSpace.setFill(true)
//             drawingSpace.shouldLoopFinishedDrawing();
//             let shouldLoopFinishedDrawing = false;
//             beginRedrawingStrokes(shouldLoopFinishedDrawing)
//             _ui.push(drawingSpace)
//
//             let descriptionContainer = new Container({len:3,index:2,row:h>w})
//             _ui.push(descriptionContainer)
//             let descriptionOffsetX = h > w ? descriptionContainer.width*(.1) : descriptionContainer.width*(-.15);
//             let descriptionOffsetY = h > w ? descriptionContainer.height*(-.1) : descriptionContainer.height*(.1);
//             let previouslySubmittedText = null;
//             let previouslySelected = null;
//
//             if (inputTextBox){
//                 if (inputTextBox.text !== undefined) {
//                     previouslySubmittedText = inputTextBox.text
//                 }
//                 if (inputTextBox.textBoxSelected !== false){
//                     previouslySelected = true
//                 }
//             }
//             inputTextBox = new TextInput({parent:descriptionContainer,row:w>h,color:"white",width:descriptionContainer.width*.7,offsetY:descriptionOffsetY,offsetX:descriptionOffsetX,mouseClickfunc:toggleKeyboardForMobile})
//             inputTextBox.setClickType(performClickOnce)
//             inputTextBox.setInteractivity(false)
//
//             if (previouslySubmittedText){
//                 inputTextBox.setDisplayText(previouslySubmittedText)
//             } else {
//                 inputTextBox.setDisplayText("I drew a... \n(click to finish the sentence).")
//             }
//
//             if (previouslySelected){
//                 inputTextBox.textBoxSelected = true;
//             }
//
//             _ui.push(inputTextBox)
//
//             let backButton = new TextBox({parent:inputTextBox,row:true,width:inputTextBox.width,height:inputTextBox.height/2,color:"white",offsetY:inputTextBox.height*1.1,mouseClickfunc:returnToDrawingView});
//             backButton.setString(" << BACK");
//             backButton.setFontStyle(fontStyle);
//             backButton.setTextColor("black")
//             backButton.setInteractivity(false);
//             backButton.setStroke(true)
//             backButton.setClickType(performClickOnce) // true
//             _ui.push(backButton)
//
//             if (isMobile && inputTextBox.textBoxSelected){
//                 let mobileKeyboard = new Keyboard({row:true,len:4,index:2,height:h/3,width:w-w*.05,})
//                 mobileKeyboard.setReferenceToInputBox(inputTextBox)
//                 _ui.push(mobileKeyboard)
//                 inputTextBox.setMobileKeyboardReference(mobileKeyboard)
//             }
//             // let button5 = new Container({row:true})
//             // _ui.push(button5)
//
//
//
//             // _ui.push(backButton)
//         }
//     }
//
//     function returnToDrawingView(){
//         shouldDisplayDrawingView = true;
//         setUI(shouldDisplayDrawingView);
//     }
//
//     function buildStroke(){
//         drawingSpace.currentStroke.push({x:p.mouseX/sketchSide,y:p.mouseY/sketchSide})
//     }
//
//     function removeStroke(){
//         for (let i = 0; i < drawingSpace.strokes.length; i++ ){
//             for (let j = 0; j < drawingSpace.strokes[i].length; j++ ){
//                 if ( p.mouseX > drawingSpace.strokes[i][j].x*sketchSide-sketchSide*.01
//                     && p.mouseX < drawingSpace.strokes[i][j].x*sketchSide+sketchSide*.01
//                     && p.mouseY > drawingSpace.strokes[i][j].y*sketchSide-sketchSide*.01
//                     && p.mouseY < drawingSpace.strokes[i][j].y*sketchSide+sketchSide*.01 ){
//                         drawingSpace.strokes[i].splice(j,1)
//                     }
//             }
//         }
//     }
//
//     function toggleKeyboardForMobile(){
//         setUI(shouldDisplayDrawingView);
//     }
//
//     function clearStrokes(){
//         drawingSpace.strokes = []
//     }
//
//     function undoLastStroke(){
//         drawingSpace.strokes.pop()
//     }
//
//     function redrawStrokes(pauseBetweenDrawings,shouldLoop){
//         // this loops the drawing that the user just submitted as they enter the
//             // a description of the drawing. it be nice if there was a pause...
//         if (shouldLoop){
//             if (APP.state.drawingData.length === drawingSpace.submittedStrokeIndex){
//                 drawingSpace.submittedStrokeIndex = 0;
//             }
//         }
//         // parameter 'pauseBetweenDrawings' signals to recursive function
//             // that there has just been a pause after completing a drawing
//             // and that the variables need to be reset.
//         let submittedStrokes = []
//         if (pauseBetweenDrawings) {
//             drawingSpace.submittedStrokeIndex = 0;
//             drawingSpace.responseIndex += 1;
//             submittedStrokes = APP.state.response[drawingSpace.responseIndex]
//             drawingSpace.setSubmittedStrokes(submittedStrokes)
//         }
//         // check to make sure this isn't the first call to the redrawStrokes method
//         if (drawingSpace.submittedStrokes){
//             if (drawingSpace.submittedStrokeIndex < drawingSpace.submittedStrokes.length) {
//                 drawingSpace.submittedStrokeIndex += 1
//                 setTimeout(function(){redrawStrokes(false,shouldLoop);}, 1000/drawingSpace.submittedStrokes.length);
//             } else {
//                 if (drawingSpace.responseIndex < APP.state.response.length){
//                     setTimeout(function(){redrawStrokes(true,shouldLoop);}, 1500);
//                 }
//             }
//         // if it is the first call to the method, set the drawingSpace.submittedStrokes
//             // member variable. this is the current drawing to be drawn to the drawing space.
//         } else {
//             if (drawingSpace.responseIndex < APP.state.response.length){
//                 submittedStrokes = APP.state.response[drawingSpace.responseIndex]
//                 drawingSpace.setSubmittedStrokes(submittedStrokes)
//                 redrawStrokes(false,shouldLoop)
//             }
//         }
//     }
//
//     function beginRedrawingStrokes(shouldLoop){
//         clearStrokes() // maybe unnecessary...
//         let pauseBetweenDrawings = false;
//         redrawStrokes(pauseBetweenDrawings,shouldLoop)
//     }
//
//     function addToAPIResponseArrayForTesting(submittedStrokes){
//         APP.handleAddToResponseArrayForTesting(submittedStrokes);
//     }
//
//     function toggleTool(){
//         drawingSpace.penMode = !drawingSpace.penMode;
//         let buttonString = drawingSpace.penMode ? "ERASER" : "PEN";
//         eraserOrPenButton.setString(buttonString);
//         drawingSpace.mouseClickfunc = drawingSpace.penMode ? buildStroke : removeStroke;
//     }
//
//     function handleSubmitDrawing_p5(){
//         submitStrokes()
//         shouldDisplayDrawingView = false;
//         setUI(shouldDisplayDrawingView);
//     }
//
//     function submitStrokes(){
//         let submittedStrokes = [];
//         for (let i = 0; i<drawingSpace.strokes.length; i++) {
//             for (let j = 0; j<drawingSpace.strokes[i].length; j++) {
//                 submittedStrokes.push(drawingSpace.strokes[i][j])
//             }
//         }
//         APP.handleSubmitDrawing_React(submittedStrokes);
//         clearStrokes()
//
//         // testing
//         addToAPIResponseArrayForTesting(submittedStrokes);
//     }
//     class UIElement{
//         constructor(parameterObject){
//             // null parameterObject
//             let parameters = {
//                 offsetX: undefined,
//                 offsetY: undefined,
//                 parent: undefined,
//                 row: undefined,
//                 index: undefined,
//                 len: undefined,
//                 mouseClickfunc: undefined,
//                 mouseDragfunc: undefined,
//                 width: undefined,
//                 height: undefined,
//                 color: undefined,
//             };
//             // if a 'parameterObject' has been passed in, set the fields in the
//                 // 'parameterObject' to the null parameter object 'parameters'.
//                 // only accepts the fields defined above.
//             if (parameterObject){
//                 parameters = parameterObject;
//             }
//             // destructure the object to get at the fields.
//                 // begin to set the uiElements data members to field values
//             let {
//                 offsetX: offsetX,
//                 offsetY: offsetY,
//                 parent: parent,
//                 row: row,
//                 index: index,
//                 len: len,
//                 mouseClickfunc: mouseClickfunc,
//                 mouseDragfunc: mouseDragfunc,
//                 width: width,
//                 height: height,
//                 color: color,
//             } = parameters;
//             // performed on mousePressed()
//             // used for when you want to grab the value of something after having
//                 // clicked it or to set a draggable's 'isDragging' boolean to true.
//             this.mouseClickfunc = mouseClickfunc;
//             // performed on mouseReleased()
//             // used for when you want to grab the value of something after having
//                 // finished dragging it or to set a draggable's 'isDragging' boolean to false.
//             this.mouseDragfunc = mouseDragfunc;
//             // the UIElement's index within the parent UIElement
//             this.index = index !== undefined ? index : 0;
//             // the number of elements that are siblings to this UIElement in the
//                 // parent.
//             // EXAMPLE:
//                 // index:0, len:2 = a UIElement that is the first element of two in the parent.
//             this.len = len || 1;
//             // mostly used for testing / to see the bounds of the UIELement
//             this.color = color
//             // used to offset the UIElement's position.
//             // depending on the UIElement this offset is applied to the top-left
//                 // corner (containers, sliders, icons, views) or to the middle of the
//                 // UIElement (buttons).
//             offsetX = offsetX != undefined ? offsetX : 0;
//             offsetY = offsetY != undefined ? offsetY : 0;
//             // the orientation of the UIElement.
//                 // true for row orientation
//                 // false for column orientation.
//             // defaults to a changing orientation where:
//                 // it is true if the screen's width is less than it's height
//                 // (portrait mode) and false if the screen's width is greater than its
//                 // height (landscape mode).
//             this.row = row != undefined ? row : p.windowWidth < p.windowHeight;
//             // given the relevant fields, positions the UIElement on the canvas.
//                 // depends on: the orientation, the parent's bounds and placement,
//                 // and the number of siblings and index of the UIElement.
//             if (this.row) {
//                 if (parent){
//                     // if row orientation and parent
//                     this.parent = parent;
//                     this.width = width || this.parent.width;
//                     this.height = height || this.parent.height / this.len;
//                     this.x = this.parent.x + offsetX;
//                     this.y = this.index * this.parent.height / this.len + this.parent.y + offsetY;
//                 } else {
//                     // if row orientation and no parent
//                     this.width = width || p.windowWidth;
//                     this.height = height || p.windowHeight / this.len;
//                     this.x = offsetX;
//                     this.y = this.index * p.windowHeight / this.len + offsetY;
//                 }
//             } else {
//                 if (parent) {
//                     // if column orientation and parent
//                     this.parent = parent;
//                     this.width = width || this.parent.width / this.len;
//                     this.height = height || this.parent.height;
//                     this.x = this.index * this.parent.width / this.len + this.parent.x + offsetX;
//                     this.y = this.parent.y + offsetY;
//                 } else {
//                     // if column orientation and no parent
//                     this.width = width || p.windowWidth / this.len;
//                     this.height = height || p.windowHeight;
//                     this.x = offsetX + this.index * p.windowWidth / this.len;
//                     this.y = offsetY;
//                 }
//             }
//             this.uiElements = []
//         }
//         // p5.js built-in methods
//         mouseOver(){}
//         mouseOut(){}
//         // abstract methods for subclasses
//         performClickFunctionality(){}
//         testForClick() {}
//         testForMouseOver() {}
//         performDragFunctionality(){}
//         // incorrect. will edit when parameters are finalized.
//         getParameterList(){
//              let parameters = {
//                 offsetX: "the offset of the container's left corner along the X-axis. if none, index * windowWidth / len",
//                 offsetY: "the offset of the container's left corner along the Y-axis. if none, index * windowHeight / len",
//                 widthOfParent: "the width of the parent container, if none, the windowWidth of the canvas",
//                 heightOfParent: "the height of the parent container, if none, the windowHeight of the canvas",
//                 orientation: "the orientation of the container: row or column, if none, windowWidth < windowHeight of the canvas",
//                 index: "the index of the container in the parent object, if none, 0",
//                 len: "the number of siblings contained in the parent container. if none, 1.",
//                 func: "a wildcard function. if none, nullFunction.",
//                 width: "the width of the container. if none, the windowWidth / len.",
//                 height: "the height of the container. if none, the windowHeight / len.",
//             };
//             return parameters
//         }
//     }
//
//     class Container extends UIElement{
//         constructor(parameterObject) {
//             super(parameterObject);
//             this.hasStroke = false;
//             this.hasFill = false;
//             this.clicked = false;
//             this.clickPerformed = false;
//             this.doOnce = false;
//             // some UI_elements respond to a single click, others to a mouse press
//                 // (a single click held down over a period of time.)
//             this.isInteractive = false;
//             this.growAmount = 1.3
//             this.mouseOverWidthSize = this.width * this.growAmount
//             this.mouseOverHeightSize = this.height * this.growAmount
//             this.screenHasSettled = false;
//             setTimeout(()=>{this.screenHasSettled = true;},500);
//         }
//         testForClick(){
//             if (p.mouseX > this.x
//                 && p.mouseX < this.x + this.width
//                 && p.mouseY > this.y
//                 && p.mouseY < this.y + this.height
//                 ){
//                 return true;
//             }
//         }
//         performClickFunctionality(){
//             if (this.mouseClickfunc){
//                 if (this.doOnce && !this.clickPerformed) {
//                     this.clickPerformed = true;
//                     return this.mouseClickfunc()
//                 } else if (!this.doOnce) {
//                     return this.mouseClickfunc()
//                 }
//             }
//         }
//         setStroke(bool){
//             this.hasStroke = bool
//         }
//         setFill(bool){
//             this.hasFill = bool
//         }
//         setClick(bool){
//             this.clicked = bool;
//             if (!this.clicked){
//                 this.clickPerformed = false;
//             }
//         }
//         setClickType(bool){
//             this.doOnce = bool;
//         }
//         setInteractivity(bool){
//             this.isInteractive = bool;
//         }
//         enlargeButton(){
//             if (this.isInteractive){
//                 if (this.width < this.mouseOverWidthSize){
//                     this.width = p.lerp(this.width, this.mouseOverWidthSize, 0.05);
//                 if (this.height < this.mouseOverHeightSize)
//                     this.height = p.lerp(this.height, this.mouseOverHeightSize, 0.05);
//                 }
//             }
//         }
//         shrinkButton(shrinkSpeed){
//             if (this.isInteractive){
//                 if (this.width > this.mouseOverWidthSize/1.5){
//                     this.width = p.lerp(this.width, this.mouseOverWidthSize/1.5, shrinkSpeed);
//                 if (this.height > this.mouseOverHeightSize/1.5)
//                     this.height = p.lerp(this.height, this.mouseOverHeightSize/1.5, shrinkSpeed);
//                 }
//             }
//         }
//         draw() {
//             if(this.testForClick()){
//                 if (this.clicked){
//                     this.performClickFunctionality();
//                     this.shrinkButton(.5)
//                 } else {
//                     this.enlargeButton()
//                 }
//             }
//             if (this.screenHasSettled){
//                 this.shrinkButton(.1)
//             }
//             this.hasStroke ? p.stroke(45) : p.noStroke();
//             this.hasFill ? p.fill(45) : p.noFill();
//             this.color ? p.fill(this.color) : p.noFill();
//             p.rect(this.x,this.y,this.width,this.height)
//             for (let i = 0; i < this.uiElements.length; i++){
//                 if (this.uiElements[i].draw){
//                     this.uiElements[i].draw();
//                 }
//             }
//         }
//     }
//
//     class ImageContainer extends Container{
//         constructor(paramsObject){
//             super(paramsObject)
//             this.loadedImg = undefined
//             this.imageWidth = undefined
//             this.imageHeight = undefined
//             this.imageX = this.parent ? this.parent.x + this.parent.width/2 : p.windowWidth/2
//             this.imageY = this.parent ? this.parent.y + this.parent.height/2 : p.windowHeight/2
//
//             this.offsetX = 0;
//             this.offsetY = 0;
//         }
//         // images can exceed the bounds of their container
//         setImageProps(loadedImg,imageWidth,imageHeight){
//             this.loadedImg = loadedImg
//             this.imageWidth = imageWidth
//             this.imageHeight = imageHeight
//         }
//         setImageOffsets(offsetX,offsetY){
//             this.offsetX = offsetX;
//             this.offsetY = offsetY;
//         }
//         // needs to be called every frame.
//         redrawImage() { p.image(this.loadedImg, this.imageX+this.offsetX, this.imageY+this.offsetY, this.imageWidth, this.imageHeight); }
//         draw() {
//             if (this.loadedImg){
//                 this.redrawImage()
//             }
//         }
//     }
//     class TextBox extends Container{
//         constructor(parameterObject){
//             super(parameterObject)
//             this.text = undefined
//             this.textColor = undefined;
//             // this.row determines the orientation of the font.
//             // use the orientation of the parent container for aligning
//                 // normally-oriented text, vertically.
//             this.textSize = this.row ? this.width / 5 : this.height / 10
//             if (this.textSize * 2.5 > this.height && this.row){this.textSize = this.width / 10}
//             p.textSize(this.textSize);
//             this.fontStyle = undefined
//         }
//         // call this after instantiating the object to set the text
//         setString(s) { this.text = s }
//         // call this after instantiating the object to set the text color
//         setTextColor(color) { this.textColor = color }
//         setFontStyle(fontStyle){this.fontStyle=fontStyle}
//         drawRotatedTextBox(){
//             p.push();
//                 super.draw()
//                 p.translate(this.x,this.y)
//                 p.rotate(p.radians(90))
//                 if (this.text){
//                     if (this.textColor){
//                         p.fill(this.textColor)
//                     }
//                     if (this.fontStyle){
//                         p.textFont(this.fontStyle)
//                     }
//                     p.text(this.text, 0, -this.width, this.height, this.width)
//                 }
//             p.pop();
//         }
//         drawNormalTextBox(){
//             super.draw()
//             if (this.text){
//                 if (this.textColor){
//                     p.fill(this.textColor)
//                 }
//                 if (this.fontStyle){
//                     p.textFont(this.fontStyle)
//                 }
//                 p.text(this.text, this.x, this.y, this.width, this.height)
//             }
//         }
//         draw() {
//             this.row ? this.drawNormalTextBox() : this.drawRotatedTextBox()
//         }
//     }
//
//     class DrawingContainer extends Container{
//         constructor(parameterObject){
//             super(parameterObject)
//             this.currentStroke = []
//             this.strokes = [];
//             // false for eraserMode
//             this.penMode = true;
//         }
//         setCurrentStroke(currentStroke){ this.currentStroke = currentStroke }
//         setStrokes(strokes){ this.strokes = strokes; }
//         getPenMode(){return this.penMode}
//         setPenMode(penMode){this.penMode=penMode;}
//         addCurrentStrokeToStrokesArray(){
//             this.strokes.push(this.currentStroke)
//             this.currentStroke = []
//         }
//         setClick(bool){
//             let mouseClickReleased = !bool
//             let userJustDrewAStroke = this.currentStroke.length && mouseClickReleased
//             if (userJustDrewAStroke) {
//                 this.addCurrentStrokeToStrokesArray()
//             }
//             super.setClick(bool)
//         }
//         drawStrokes(){
//             for (let i = 0; i < this.strokes.length;i++){
//                 for (let j = 0; j < this.strokes[i].length;j++){
//                     p.ellipse(this.strokes[i][j].x*sketchSide+this.x, this.strokes[i][j].y*sketchSide+this.y, sketchSide*.025,sketchSide*.025)
//                 }
//             }
//         }
//         draw() {
//             super.draw()
//             p.noStroke()
//             p.fill(100,0,0)
//             for (let i = 0; i < this.currentStroke.length;i++){
//                 p.ellipse(this.currentStroke[i].x*sketchSide+this.x, this.currentStroke[i].y*sketchSide+this.y, sketchSide*.025,sketchSide*.025)
//             }
//             p.fill(0)
//             this.drawStrokes()
//         }
//     }
//     class DisplayDrawingContainer extends Container{
//         constructor(parameterObject){
//             super(parameterObject)
//             this.submittedStrokes = []
//             this.submittedStrokeIndex = 0
//             // loops the drawing animation
//             this.loop = false;
//         }
//         setSubmittedStrokes(submittedStrokes,submittedStrokeIndex){
//             this.submittedStrokes = submittedStrokes
//             this.submittedStrokeIndex = submittedStrokeIndex ? submittedStrokeIndex : submittedStrokes.length
//         }
//         shouldLoopFinishedDrawing(){ this.loop = true; }
//         drawSubmittedStrokes(){
//             if (this.loop){
//                 for (let i = 0; i < this.submittedStrokeIndex; i++){
//                     if (i === this.submittedStrokeIndex) { i = 0; }
//                     p.ellipse(this.submittedStrokes[i].x*sketchSide+this.x, this.submittedStrokes[i].y*sketchSide+this.y, sketchSide*.025,sketchSide*.025)
//                 }
//             } else {
//                 for (let i = 0; i < this.submittedStrokeIndex; i++){
//                     p.ellipse(this.submittedStrokes[i].x*sketchSide+this.x, this.submittedStrokes[i].y*sketchSide+this.y, sketchSide*.025,sketchSide*.025)
//                 }
//             }
//         }
//         draw() {
//             super.draw();
//             p.noStroke();
//             p.fill(0);
//             this.drawSubmittedStrokes();
//         }
//     }
//     class TextInput extends Container{
//         constructor(parameterObject){
//             super(parameterObject)
//             this.text = undefined//"I drew a... (click me and finish the sentence)."
//             this.height = this.width / 3;
//             this.displayText = new TextBox({row:true,parent:this})
//
//             // should enlarge when selected and shrink when deselected.
//             this.displayText.setInteractivity(false)
//
//             this.displayText.setStroke(true)
//             this.displayText.setString(this.text)
//             this.textBoxSelected = false;
//             this.showCursor = false;
//             // this.toggleShowCursor(this);
//             // this.mouseClickfunc = this.toggleTextBoxSelected
//             this.setTimeoutVariable = undefined
//             this.setStroke(true)
//             this.referenceToMobileKeyboard = new Container({width:0,height:0}) // dummy object
//         }
//         setDisplayText(text){
//             // I'm not sure if I need a reference outside of this.displayText
//             this.text = text
//             this.displayText.setString(this.text)
//         }
//         setMobileKeyboardReference(ref){
//             this.referenceToMobileKeyboard = ref
//         }
//         performClickFunctionality(){
//             this.toggleTextBoxSelected(this.text)
//             super.performClickFunctionality()
//         }
//         toggleShowCursor(scope){
//             scope.showCursor = !scope.showCursor
//             if (scope.showCursor){
//                 scope.text+="|"
//                 // console.log("show",scope.text)
//             } else {
//                 scope.text = scope.text.replace("|","")
//                 // console.log("hide",scope.text)
//             }
//             scope.displayText.setString(scope.text)
//             scope.setTimeoutVariable = setTimeout(function(){scope.toggleShowCursor(scope)},800)
//         }
//         // it works but it's ugly.
//         // if the user clicks on the TextInputBox the cursor will begin to show
//         // if the user clicks on the TextInputBox again. nothing changes.
//         // if the user clicks off the TextInputBox, the cursor goes away.
//
//             // need to rename methods and variables
//                 // this.testForClick() -> this.testForMouseOver
//                 // this.clicked -> this.userClickedOnScreen
//                 // etc.
//         toggleTextBoxSelected(resetDisplayText){
//             if (this.testForClick() && !this.textBoxSelected && this.setTimeoutVariable === undefined ){
//                 this.textBoxSelected = true;
//                 this.text = ""
//                 // start cursor playing
//                 this.toggleShowCursor(this);
//             } else if (!this.testForClick() || resetDisplayText) {
//                     if (this.showCursor) {
//                         this.showCursor = false;
//                         this.text = this.text.replace("|","")
//                         this.displayText.setString(this.text)
//                     }
//                     this.textBoxSelected = false;
//                     clearTimeout(this.setTimeoutVariable);
//                     this.setTimeoutVariable = undefined;
//                     if (resetDisplayText){
//                         this.text = resetDisplayText
//                     } else {
//                         this.text = "I drew a... \n(click to finish the sentence)."
//                     }
//                     this.displayText.setString(this.text)
//                 }
//             }
//         handleTyping(keyCode){
//             const BACKSPACE = keyCode === 8
//             const ENTER = keyCode === 13
//             const SPACE = keyCode === 32
//             if (ENTER) {
//                 let drawingDescriptor = this.text.replace("|","")
//                 APP.handleSubmitDescription_React(drawingDescriptor)
//                 this.toggleTextBoxSelected(drawingDescriptor)
//                 // this.mouseClickfunc = null;
//             } else if (BACKSPACE) {
//                 this.text = this.text.replace("|","")
//                 this.text = this.text.substring(0, this.text.length - 1);
//                 this.displayText.setString(this.text)
//             } else if (SPACE) {
//                 this.text = this.text.replace("|","") + " "
//                 this.displayText.setString(this.text)
//             } else if (keyCode>=65 &&keyCode<=90) {
//                 if (this.text.length < 100){
//                     let newChar = String.fromCharCode(keyCode);
//                     this.text = this.text.replace("|","") + newChar.toLowerCase()
//                     this.displayText.setString(this.text)
//                 }
//             }
//         }
//         draw() {
//             super.draw()
//             // toggle off if user clicks off the TextInputBox
//             if ( this.clicked &&
//                 ( !this.testForClick() && !this.referenceToMobileKeyboard.testForClick() ) &&
//                 this.textBoxSelected) {
//                     let text = this.text.replace("|","")
//                     this.performClickFunctionality()
//             }
//             this.displayText.draw();
//         }
//     }
//
//     class Keyboard extends TextBox{
//         constructor(parameterObject){
//             super(parameterObject)
//             this.mouseClickfunc = this.searchClickedKey;
//             this.setClickType(true); // doOnce
//             this.referenceToInputTextBox = undefined
//
//             this.rowsOfKeys = []
//             {
//                 let row;
//                 for (let i = 0; i < 4; i++){
//                     row = new Container({parent:this,width:this.width-i*10,len:4,index:i,row:true, offsetX:i*10})
//                     // row.setStroke(true)
//                     this.rowsOfKeys.push(row)
//                 }
//             }
//
//             this.keyLetters = ["qwertyuiop","asdfghjkl","zxcvbnm"]
//             {
//                 let doOnce = true;
//                 let parameters;
//                 let keyboardButton;
//             for (let i = 0; i < this.keyLetters.length; i++){
//                 for (let j = 0; j < this.keyLetters[i].length; j++){
//                     parameters = {
//                                        parent:this.rowsOfKeys[i],
//                                        len:this.keyLetters[i].length,
//                                        index:j,
//                                        row:false,
//                                        // color:"white"
//                                      }
//                     keyboardButton = new KeyboardKey(parameters)
//                     keyboardButton.letter = this.keyLetters[i][j]
//                     keyboardButton.setClickType(doOnce)
//                     keyboardButton.setKeyLetterToDisplay(this.keyLetters[i][j])
//
//                     this.rowsOfKeys.push(keyboardButton)
//                 }
//             }
//             let controlButtons = ["SUBMIT","SPACE","BACKSPACE"]
//             for (let i = 0; i < controlButtons.length; i++){
//                 parameters = {
//                                    parent:this.rowsOfKeys[3],
//                                    len:controlButtons.length,
//                                    index:i,
//                                    row:false,
//                                    // color:"white"
//                                  }
//                 keyboardButton = new KeyboardKey(parameters)
//                 keyboardButton.letter = controlButtons[i]
//                 keyboardButton.setClickType(doOnce)
//                 keyboardButton.setKeyLetterToDisplay(controlButtons[i])
//                 this.rowsOfKeys.push(keyboardButton)
//             }
//         }
//
//         }
//         setReferenceToInputBox(ref){
//             this.referenceToInputTextBox = ref;
//         }
//         searchClickedKey(){
//             let newChar = undefined
//             // first 4 items of this.rowsOfKeys are the row containers.
//                 // skip.
//             for (let i = 4; i < this.rowsOfKeys.length; i++){
//                 if(this.rowsOfKeys[i].testForClick()){
//                     newChar = this.rowsOfKeys[i].pressKey();
//                     // set interactivity click response function here:
//                         // this.rowsOfKeys[i].displayText.myClickResponseFunc()
//                     this.rowsOfKeys[i].displayText.shrinkButton(1)
//
//                 }
//             }
//             if (this.referenceToInputTextBox){
//                 if (newChar){
//                     let keyCode;
//                     if (newChar.length === 1){
//                         newChar = newChar.toUpperCase()
//                         keyCode = newChar.charCodeAt(0);
//                     } else {
//                         if (newChar === "SUBMIT"){
//                             keyCode = 13
//                         } else if (newChar === "SPACE"){
//                             keyCode = 32
//                         } else if (newChar === "BACKSPACE"){
//                             keyCode = 8
//                         }
//                     }
//                     this.referenceToInputTextBox.handleTyping(keyCode)
//                 }
//             }
//         }
//         draw(){
//             super.draw()
//             for (let i = 0; i < this.rowsOfKeys.length; i++){
//                 this.rowsOfKeys[i].draw();
//             }
//         }
//     }
//     class KeyboardKey extends Container{
//         constructor(parameterObject){
//             super(parameterObject)
//             this.letter = undefined;
//             this.displayText = new TextBox({row:true,parent:this,color:"white"})
//             this.displayText.setStroke(true)
//             this.displayText.setInteractivity(true)
//             this.mouseClickfunc = this.pressKey
//         }
//         setKeyLetterToDisplay(letter){
//             this.letter = letter
//             this.displayText.setString(letter)
//         }
//         pressKey(){
//             return this.letter
//         }
//         draw(){
//             super.draw()
//             this.displayText.draw()
//         }
//     }
// };
