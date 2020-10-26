import Wireframe from '../uiClasses/Wireframe';
import DisplayDrawingContainer from '../uiClasses/DisplayDrawingContainer';
import TextBox from '../uiClasses/TextBox'

export default class FlagInappropriateContentView {
    constructor(){
        this.instructions = undefined
        this.drawings = [undefined,undefined,undefined,undefined,undefined,undefined]
        this.drawing = undefined
        this.submitButton = undefined
        this.flaggedIndices = []
    }
    toggleDrawingPresentInFlaggedIndices(drawingReference,p){
        let notPresent = true;
        for (let i = 0; i < this.flaggedIndices.length;i++){
            if (this.flaggedIndices[i] === drawingReference.index){
                drawingReference.setStroke(false)
                drawingReference.color = "lightgrey"
                this.flaggedIndices.splice(i,1)
                notPresent = false
            }
        }
        if (notPresent){
            this.flaggedIndices.push(drawingReference.index)
            drawingReference.setStroke(true)
            drawingReference.color = p.color(100,40,40)
        }
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        let wireFrameElements = []
        let _ui = []
        /// ---- ******** BEGIN WIREFRAME OBJECTS
            // wireframe objects are not drawn to screen.
        for (let i = 0; i < 3; i++){
            let color = i%2 ?"pink" :"orange"
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:true,
                               len:3,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                             }
            let wireFrame = new Wireframe(parameters)
            wireFrameElements.push(wireFrame)
        }

        let topThirdOfScreen = wireFrameElements[0]

        let wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.9}
        let parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           width: w>h? topThirdOfScreen.width*(3/5):topThirdOfScreen.width,
                           height: w>h? topThirdOfScreen.height:topThirdOfScreen.height*(3/5),
                           offsetY:w>h? 0:-topThirdOfScreen.height*(1/4),
                           offsetX:w>h? -topThirdOfScreen.width*(1/5):0,
                           row:w>h,
                           color:"red",
                           wildcard:wildcard,
                           parent: topThirdOfScreen
                         }
        let questionArea = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:w>h?.8:.5,shrinkAmountHeight:w>h?.3:.6}
        parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           width: w>h? topThirdOfScreen.width*(2/5):topThirdOfScreen.width,
                           height: w>h? topThirdOfScreen.height:topThirdOfScreen.height*(2/5),
                           offsetY:w>h? 0:topThirdOfScreen.height*(1/5),
                           offsetX:w>h? topThirdOfScreen.width*(1.5/5):0,
                           row:w>h,
                           color:"green",
                           wildcard:wildcard,
                           parent: topThirdOfScreen
                         }
        let submitButtonArea = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           offsetY:h*1/3,
                           // offsetX:w*1/3,
                           // row:w>h,
                           color:"green",
                           wildcard:wildcard,
                         }
        let wireFrame = new Wireframe(parameters)
        wireFrameElements.push(wireFrame)
        for (let i = 0; i < 2; i++){
            let color = i%2 ?"red" :"red"
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:w>h,
                               len:2,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                               parent:wireFrameElements[3]
                             }
            let wireFrame = new Wireframe(parameters)
            wireFrameElements.push(wireFrame)
        }
        // top or left row of drawings
        let topLeft = []
        for (let i = 0; i < 3; i++){
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // offsetY:h*1/3,
                               len:3,
                               index:i,
                               color:"red",
                               wildcard:wildcard,
                               parent:wireFrameElements[4]
                             }
            let wireFrame = new Wireframe(parameters)
            topLeft.push(wireFrame)
        }
        // bottom or right row of drawings
        let bottomRight = []
        for (let i = 0; i < 3; i++){
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // offsetY:h*1/3,
                               len:3,
                               index:i,
                               color:"red",
                               wildcard:wildcard,
                               parent:wireFrameElements[5]
                             }
            let wireFrame = new Wireframe(parameters)
            bottomRight.push(wireFrame)
        }
        let x,y,width,height;

        if (previousUI){
            if (previousUI.submitButton){
                x = previousUI.submitButton.x;
                y = previousUI.submitButton.y;
                width = previousUI.submitButton.width;
                height = previousUI.submitButton.height;
            }
        }
        let submitFunc = () => {
            REACT_APP.handleSubmitFlaggedIndices(this.flaggedIndices)
            changeView();
        }
        parameters = {p:p,objectToMirror:submitButtonArea,x:x,y:y,width:width,height:height,mouseClickfunc:submitFunc,wildcard:{fontSize:submitButtonArea.width/13}}
        this.submitButton = new TextBox(parameters)
        this.submitButton.setInteractivity(true);
        this.submitButton.setStroke(true)
        this.submitButton.setFill(true)
        this.submitButton.setTextColor("black")
        this.submitButton.setString("SUBMIT");
        setTimeout(()=>{this.submitButton.setFontSizeWithRegardToContainerHeight(submitButtonArea.width/13);},5);
        _ui.push(this.submitButton)

        // display question
        if (previousUI){
            if (previousUI.instructions){
                x = previousUI.instructions.x;
                y = previousUI.instructions.y;
                width = previousUI.instructions.width;
                height = previousUI.instructions.height;
            }
        }
        parameters = {p:p,objectToMirror:questionArea,x:x,y:y,width:width,height:height,wildcard:{fontSize:questionArea.width/15}}
        this.instructions = new TextBox(parameters)
        this.instructions.setFill(true)
        this.instructions.setTextColor("black")
        this.instructions.setString("Click any drawings you find offensive and press submit.");
        setTimeout(()=>{this.instructions.setFontSizeWithRegardToContainerHeight(questionArea.width/15);},5);
        _ui.push(this.instructions)


        // commented-out code below has to do with
            // the redrawStrokes() method being too intensive

        // let drawingHasBeenDrawn = false
        // let strokeIndex = 0;
        let drawingHasBeenDrawn = true
        let timeOutVar = undefined;
        let color = "lightgrey"
        let drawingOutline = false;

        for (let i = 0; i < 5; i++){
            if (previousUI){
                if (previousUI.drawings){
                    if (previousUI.drawings[i]){
                        // object placement properties
                            // without these the _ui object jitters
                            // with window resizing.
                        x = previousUI.drawings[i].x;
                        y = previousUI.drawings[i].y;
                        width = previousUI.drawings[i].width;
                        height = previousUI.drawings[i].height;

                        // redrawStrokes properties
                        // drawingHasBeenDrawn = windowResized && !previousUI.drawings[i].loop ? previousUI.drawings[i].drawingHasBeenDrawn : false;
                        // strokeIndex = previousUI.drawings[i].submittedStrokeIndex
                        // clearTimeout(previousUI.drawings[i].timeOut1)
                        // clearTimeout(previousUI.drawings[i].timeOut2)

                        // picture selected properties
                        color = previousUI.drawings[i].color
                        drawingOutline = previousUI.drawings[i].hasStroke
                    }
                }
            }
            wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
            parameters = {p:p,objectToMirror:i<=2?topLeft[i]:bottomRight[i-3],x:x,y:y,width:width,height:height,color:color,wildcard:wildcard}
            this.drawings[i] = new DisplayDrawingContainer(parameters)
            this.drawings[i].setLengthOfDrawingSquare(topLeft[0].width+topLeft[0].width*.07)
            // used in the toggleDrawingPresentInFlaggedIndices method
                // to tell backend which drawings have been selected
            this.drawings[i].index = i
            this.drawings[i].setFill(true)
            this.drawings[i].setStroke(drawingOutline)
            this.drawings[i].setInteractivity(true);
            let clickOnce = true;
            this.drawings[i].setClickType(clickOnce)
            this.drawings[i].setSubmittedStrokes(REACT_APP.state.response[i].drawingData)
            this.drawings[i].timeOut2 = timeOutVar
            let mouseClickfunc = () => {
                this.toggleDrawingPresentInFlaggedIndices(this.drawings[i],p)
            }
            this.drawings[i].mouseClickfunc = mouseClickfunc
            // this.drawings[i].redrawStrokes();
            // this.drawings[i].setLoopToTrueToLoopFinishedDrawing()

            _ui.push(this.drawings[i])
        }

        if (previousUI){
                if (previousUI.drawing){
                    // object placement properties
                        // without these the _ui object jitters
                        // with window resizing.
                    x = previousUI.drawing.x;
                    y = previousUI.drawing.y;
                    width = previousUI.drawing.width;
                    height = previousUI.drawing.height;

                    // redrawStrokes properties
                    // drawingHasBeenDrawn = windowResized && !previousUI.drawing.loop ? previousUI.drawing.drawingHasBeenDrawn : false;
                    // strokeIndex = previousUI.drawing.submittedStrokeIndex
                    clearTimeout(previousUI.drawing.timeOut1)
                    clearTimeout(previousUI.drawing.timeOut2)

                    // picture selected properties
                    color = previousUI.drawing.color
                    drawingOutline = previousUI.drawing.hasStroke
                }
        }
        wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
        parameters = {p:p,objectToMirror:bottomRight[2],x:x,y:y,width:width,height:height,color:color,wildcard:wildcard,lerpSpeed:windowResized?.3:.1}
        this.drawing = new DisplayDrawingContainer(parameters)
        this.drawing.setLengthOfDrawingSquare(topLeft[0].width+topLeft[0].width*.07)
        this.drawing.index = 5
        this.drawing.setFill(true)
        this.drawing.setStroke(drawingOutline)
        this.drawing.setInteractivity(true);
        let clickOnce = true;
        this.drawing.setClickType(clickOnce)
        // the last drawing on the view is either a user drawing or a drawing
            // from the response depending on which option the user chose in the
            // menuView
        REACT_APP.state.drawingData.length?this.drawing.setSubmittedStrokes(REACT_APP.state.drawingData):this.drawing.setSubmittedStrokes(REACT_APP.state.response[5].drawingData);
        this.drawing.timeOut2 = timeOutVar
        let mouseClickfunc = () => {
            this.toggleDrawingPresentInFlaggedIndices(this.drawing,p)
        }
        this.drawing.mouseClickfunc = mouseClickfunc
        // this.drawing.redrawStrokes();
        // this.drawing.setLoopToTrueToLoopFinishedDrawing()

        _ui.push(this.drawing)

        return _ui;
    }
}
