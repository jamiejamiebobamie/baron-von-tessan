import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';
import DisplayDrawingContainer from '../../uiClasses/DisplayDrawingContainer';
import TextBox from '../../uiClasses/TextBox'


export default class testView {
    constructor(previousView){
        this.drawing = previousView ? previousView.drawing : undefined;
        this.dialog = previousView ? previousView.dialog : undefined;
        this.responseIndex = 0
        this.charIndex = 0
        this.timeOutVar = undefined
    }
    addCharacterToDialogString(REACT_APP){
        if (this.charIndex<REACT_APP.state.response[this.responseIndex].descriptionData.length){
            let allOfDialog = REACT_APP.state.response[this.responseIndex].descriptionData
            let dialogString = allOfDialog.slice(0,this.charIndex)
            this.dialog.setString(dialogString)
            clearTimeout(this.timeOutVar)
            this.charIndex += 1
            this.timeOutVar = setTimeout(()=>{this.addCharacterToDialogString(REACT_APP)},50)
        }
        else {
            clearTimeout(this.timeOutVar)
            return
        }
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let _ui = []

        let drawingSpaceWidth = w > h ? w*(2/3) : w;
        let drawingSpaceHeight = w > h ? h : h*(2/3);
        let lengthOfDrawingSquare = w > h ? drawingSpaceHeight : drawingSpaceWidth;
        let longerSideOfScreen = w > h ? w : h;
        lengthOfDrawingSquare = lengthOfDrawingSquare > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : lengthOfDrawingSquare;
        let wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9,string:"this is where the drawings will be displayed."}
        let parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           offsetX:w>h?0:(w-lengthOfDrawingSquare)/2,
                           offsetY:w>h?(h-lengthOfDrawingSquare)/2:0,
                           width:lengthOfDrawingSquare,
                           height:lengthOfDrawingSquare,
                           len:3,
                           index:0,
                           color:"red",
                           wildcard:wildcard,
                         }
        let drawing = new Wireframe(parameters)

        wildcard = {shouldBeSquare:false,shrinkAmountWidth:1.1,shrinkAmountHeight:.7,string:"this is a container to place the description."}
        parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           len:3,
                           index:2,
                           color:"red",
                           wildcard:wildcard,
                           mouseClickfunc: REACT_APP.testViewSwitch
                         }
        let dialog = new Wireframe(parameters)

        let x,y,width,height;
        let drawingHasBeenDrawn = false
        let strokeIndex = 0;
        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
                drawingHasBeenDrawn = windowResized ? previousUI.drawing.drawingHasBeenDrawn : false;
                clearTimeout(previousUI.drawing.timeOut)
                strokeIndex = previousUI.drawing.submittedStrokeIndex
            }
        }
        wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
        parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard}
        this.drawing = new DisplayDrawingContainer(parameters)
        this.drawing.setLengthOfDrawingSquare(this.drawing.width)
        this.drawing.setFill(true)
        this.drawing.setSubmittedStrokes(REACT_APP.state.response[this.responseIndex].drawingData)
        this.drawing.submittedStrokeIndex = strokeIndex;

        let beginRedrawingStrokesAndAddingCharsFunc = () => {
            this.drawing.setSubmittedStrokeIndex(0)
            this.charIndex = 0
            this.addCharacterToDialogString(REACT_APP)
            let redrawStrokes = (timeOutVar) => {
                if (this.drawing.drawingHasBeenDrawn){
                    if (this.drawing.loop){
                        this.drawing.drawingHasBeenDrawn = false;
                        this.drawing.submittedStrokeIndex = 0;
                        clearTimeout(timeOutVar)
                    } else {
                        if (this.responseIndex < REACT_APP.state.response.length-1){
                            this.drawing.drawingHasBeenDrawn = false;
                            this.drawing.submittedStrokeIndex = 0;
                            this.charIndex = 0
                            this.addCharacterToDialogString(REACT_APP)
                            this.responseIndex += 1
                            this.drawing.setSubmittedStrokes(REACT_APP.state.response[this.responseIndex].drawingData)
                        } else {
                            REACT_APP.testViewSwitch();
                            return;
                        }
                    }
                }
                if (this.drawing.submittedStrokeIndex < this.drawing.submittedStrokes.length) {
                    this.drawing.submittedStrokeIndex += 1
                    timeOutVar = setTimeout(redrawStrokes, 1,timeOutVar);
                } else {
                    this.drawing.drawingHasBeenDrawn = true;
                    // pause three seconds to display drawing.
                        // then loop if this.displayDrawingSpace.loop
                        // is set to true otherwise return.
                    timeOutVar = setTimeout(redrawStrokes, 3000,timeOutVar);
                }
            }
            redrawStrokes();
        }
        _ui.push(this.drawing)

        if (previousUI){
            if (previousUI.dialog){
                x = previousUI.dialog.x;
                y = previousUI.dialog.y;
                width = previousUI.dialog.width;
                height = previousUI.dialog.height;
                this.charIndex = previousUI.charIndex;
            }
        }
        parameters = {p:p,objectToMirror:dialog,x:x,y:y,width:width,height:height}
        this.dialog = new TextBox(parameters)
        this.dialog.setFill(true)
        let fontSize = 40
        this.dialog.setFontSize(fontSize)

        if (this.charIndex>=REACT_APP.state.response[this.responseIndex].descriptionData.length){
            let allOfDialog = REACT_APP.state.response[this.responseIndex].descriptionData
            this.dialog.setString(allOfDialog)
        }

        _ui.push(this.dialog)

        if (!windowResized){
            beginRedrawingStrokesAndAddingCharsFunc();
        }

        return _ui;
    }
}
