import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';
import DisplayDrawingContainer from '../../uiClasses/DisplayDrawingContainer';
import TextBox from '../../uiClasses/TextBox'

export default class FlagInappropriateContentWireframe {
    constructor(){
        this.instructions = undefined
        this.drawings1 = [undefined,undefined,undefined]
        this.drawings2 = [undefined,undefined,undefined]
        this.submitButton = undefined
        this.drawings2 = [undefined,undefined,undefined]
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
        console.log(drawingReference.index,this.flaggedIndices)
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let wireFrameElements = []
        let _ui = []

        for (let i = 0; i < 3; i++){
            let color = i%2 ?"pink" :"orange"
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"do you find any of this content offensive or inappropriate?"}
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
                           // len:5,
                           // index:0,

                           offsetY:w>h? 0:-topThirdOfScreen.height*(1/5),
                           offsetX:w>h? -topThirdOfScreen.width*(1/5):0,
                           row:w>h,
                           color:"red",
                           wildcard:wildcard,
                           parent: topThirdOfScreen
                         }
        let questionArea = new Wireframe(parameters)
        // _ui.push(questionArea)

        wildcard = {shrinkAmountWidth:w>h?.8:.5,shrinkAmountHeight:w>h?.5:.8}
        parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           width: w>h? topThirdOfScreen.width*(2/5):topThirdOfScreen.width,
                           height: w>h? topThirdOfScreen.height:topThirdOfScreen.height*(2/5),
                           // len:5,
                           // index:0,

                           offsetY:w>h? 0:topThirdOfScreen.height*(1.5/5),
                           offsetX:w>h? topThirdOfScreen.width*(1.5/5):0,
                           row:w>h,
                           color:"green",
                           wildcard:wildcard,
                           parent: topThirdOfScreen
                         }
        let submitButtonArea = new Wireframe(parameters)
        // _ui.push(submitButtonArea)

        // let questionArea = topThirdOfScreen*(3/5)
        // let submitButtonArea =


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
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this is a container to place the drawings."}
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
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"[user drawing]"}
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
            // _ui.push(wireFrame)
        }
        // bottom or right row of drawings
        let bottomRight = []
        for (let i = 0; i < 3; i++){
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"[user drawing]"}
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
            // _ui.push(wireFrame)
        }
        let x,y,width,height;

        // display question
        if (previousUI){
            if (previousUI.instructions){
                x = previousUI.instructions.x;
                y = previousUI.instructions.y;
                width = previousUI.instructions.width;
                height = previousUI.instructions.height;
            }
        }
        wildcard = {fontSize:questionArea.width/10, text:"Did you find any of these drawings offensive?"}
        parameters = {p:p,objectToMirror:questionArea,x:x,y:y,width:width,height:height,wildcard:wildcard}
        this.instructions = new TextBox(parameters)
        this.instructions.setFill(true)
        let fontSize = 10//questionArea.width/10// w>h ? 1 : 100 ;
        this.instructions.setFontSize(fontSize)
        _ui.push(this.instructions)

        if (previousUI){
            if (previousUI.submitButton){
                x = previousUI.submitButton.x;
                y = previousUI.submitButton.y;
                width = previousUI.submitButton.width;
                height = previousUI.submitButton.height;
            }
        }
        wildcard = {fontSize:submitButtonArea.width/5}
        let submitFunc = () => {
            REACT_APP.handleSubmitFlaggedIndices(this.flaggedIndices)
            REACT_APP.testViewSwitch()
        }
        parameters = {p:p,objectToMirror:submitButtonArea,x:x,y:y,width:width,height:height,mouseClickfunc:submitFunc,wildcard:wildcard}
        this.submitButton = new TextBox(parameters)
        this.submitButton.setInteractivity(true);
        this.submitButton.setStroke(true)
        this.submitButton.setFill(true)
        this.submitButton.setTextColor("black")
        this.submitButton.setString("SUBMIT");
        _ui.push(this.submitButton)

        let beginRedrawingStrokesAndAddingCharsFunc = (drawingSpace) => {
            drawingSpace.setSubmittedStrokeIndex(0)
            let redrawStrokes = (timeOutVar) => {
                if (drawingSpace.drawingHasBeenDrawn){
                    if (drawingSpace.loop){
                        drawingSpace.drawingHasBeenDrawn = false;
                        drawingSpace.submittedStrokeIndex = 0;
                        clearTimeout(timeOutVar)
                    } else {
                        return;
                    }
                }
                if (drawingSpace.submittedStrokeIndex < drawingSpace.submittedStrokes.length) {
                    drawingSpace.submittedStrokeIndex += 1
                    timeOutVar = setTimeout(redrawStrokes, 1, timeOutVar);
                } else {
                    drawingSpace.drawingHasBeenDrawn = true;
                    // pause three seconds to display drawing.
                        // then loop if this.displayDrawingSpace.loop
                        // is set to true otherwise return.
                    timeOutVar = setTimeout(redrawStrokes, 3000,timeOutVar);
                }
            }
            redrawStrokes();
        }

        let drawingHasBeenDrawn = false
        let strokeIndex = 0;
        // top left row to mirror
        for (let i = 0; i < 3; i++){
            if (previousUI){
                if (previousUI.drawings1){
                    if (previousUI.drawings1[i]){
                        x = previousUI.drawings1[i].x;
                        y = previousUI.drawings1[i].y;
                        width = previousUI.drawings1[i].width;
                        height = previousUI.drawings1[i].height;
                        drawingHasBeenDrawn = windowResized ? previousUI.drawings1[i].drawingHasBeenDrawn : false;
                        clearTimeout(previousUI.drawings1[i].timeOut)
                        strokeIndex = previousUI.drawings1[i].submittedStrokeIndex
                    }
                }
            }
            wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
            parameters = {p:p,objectToMirror:topLeft[i],x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard}
            this.drawings1[i] = new DisplayDrawingContainer(parameters)
            this.drawings1[i].setLengthOfDrawingSquare(this.drawings1[i].width)
            this.drawings1[i].index = i
            console.log(this.drawings1[i].index)
            this.drawings1[i].setFill(true)
            let clickOnce = true;
            this.drawings1[i].setClickType(clickOnce)
            this.drawings1.submittedStrokeIndex = strokeIndex;
            this.drawings1[i].setSubmittedStrokes(REACT_APP.state.response[i].drawingData)
            let mouseClickfunc = () => {
                this.toggleDrawingPresentInFlaggedIndices(this.drawings1[i],p)
            }
            this.drawings1[i].mouseClickfunc = mouseClickfunc
            _ui.push(this.drawings1[i])
            if (!windowResized){
                beginRedrawingStrokesAndAddingCharsFunc(this.drawings1[i]);
            }
        }
        // bottom right row to mirror
        for (let i = 0; i < 3; i++){
            if (previousUI){
                if (previousUI.drawings2){
                    if (previousUI.drawings2[i]){
                        x = previousUI.drawings2[i].x;
                        y = previousUI.drawings2[i].y;
                        width = previousUI.drawings2[i].width;
                        height = previousUI.drawings2[i].height;
                        drawingHasBeenDrawn = windowResized ? previousUI.drawings2[i].drawingHasBeenDrawn : false;
                        clearTimeout(previousUI.drawings2[i].timeOut)
                        strokeIndex = previousUI.drawings2[i].submittedStrokeIndex
                    }
                }
            }
            wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
            parameters = {p:p,objectToMirror:bottomRight[i],x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard}
            this.drawings2[i] = new DisplayDrawingContainer(parameters)
            this.drawings2[i].setLengthOfDrawingSquare(this.drawings2[i].width)
            this.drawings2[i].index = i + 3
            console.log(this.drawings2[i].index)

            this.drawings2[i].setFill(true)
            let clickOnce = true;
            this.drawings2[i].setClickType(clickOnce)
            this.drawings2.submittedStrokeIndex = strokeIndex;

            // if user's drawing
            if (i===2){
                console.log(REACT_APP.state.drawingData)
                this.drawings2[i].setSubmittedStrokes(REACT_APP.state.drawingData)
            } else {
                this.drawings2[i].setSubmittedStrokes(REACT_APP.state.response[i].drawingData)
            }
            let mouseClickfunc = () => {
                this.toggleDrawingPresentInFlaggedIndices(this.drawings2[i],p)
            }
            this.drawings2[i].mouseClickfunc = mouseClickfunc
            _ui.push(this.drawings2[i])
            if (!windowResized){
                beginRedrawingStrokesAndAddingCharsFunc(this.drawings2[i]);
            }
        }

        return _ui;
    }
}
