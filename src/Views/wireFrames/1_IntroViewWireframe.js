import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';
import DisplayDrawingContainer from '../../uiClasses/DisplayDrawingContainer';
import TextBox from '../../uiClasses/TextBox'

import baronData from '../../baronDrawingData'




export default class testView {
    constructor(previousView){
        this.drawing = previousView ? previousView.drawing : undefined;

        // NOT THE DIALOG BOX -- CONTROLS WINDOW
        this.dialog = previousView ? previousView.dialog : undefined;
        this.baronDialogIndex = 0
    }
    addCharacterToDialog(changeViewMethod){
        if (this.baronDialogIndex<baronData.descriptionData.length){
            this.baronDialogIndex += 1
            let allOfDialog = baronData.descriptionData
            let dialogString = allOfDialog.slice(0,this.baronDialogIndex)
            this.dialog.setString(dialogString)
            setTimeout(()=>{this.addCharacterToDialog(changeViewMethod)},200)
        } else {
            setTimeout(()=>{changeViewMethod()},2000)
        }
    }
    getUI(){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let wireFrameElements = []
        let _ui = []


        let wildcard;
        let parameters;
        let wireFrame
        for (let i = 0; i < 3; i++){
            let color = i%2 ?"orange" :"orange"
            wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1, string:"break the screen into 3 rows"}
            parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:true,
                               len:3,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                             }
            let viewBrokenIntoThirds = new Wireframe(parameters)
            wireFrameElements.push(viewBrokenIntoThirds)
        }

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           color:"green",
                           wildcard:wildcard,
                         }
        let topTwoThirdsOfView = new Wireframe(parameters)
        // _ui.push(topTwoThirdsOfView)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           color:"orange",
                           wildcard:wildcard,
                           row:false,
                           len:2,
                           index:0,
                           parent:topTwoThirdsOfView,
                         }
        let topTwoThirdsOfViewSplitInTwoFirstHalf = new Wireframe(parameters)
        // _ui.push(topTwoThirdsOfViewSplitInTwoFirstHalf)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           color:"green",
                           wildcard:wildcard,
                           row:false,
                           len:2,
                           index:1,
                           parent:topTwoThirdsOfView,
                         }
        let topTwoThirdsOfViewSplitInTwoSecondHalf = new Wireframe(parameters)
        // _ui.push(topTwoThirdsOfViewSplitInTwoSecondHalf)


        let topThirdOfView = wireFrameElements[0]
        let middleThirdOfScreen =  wireFrameElements[1];
        let bottomThirdOfScreen = wireFrameElements[2];

        let drawingParent = topTwoThirdsOfView;

        wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:REACT_APP.state.isMobile?.9:1,string:"[user drawing just submitted]"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           parent:drawingParent,
                         }
        let drawing = new Wireframe(parameters)
        // _ui.push(drawing)

        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.9}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"pink",
                           wildcard:wildcard,
                           parent:bottomThirdOfScreen,
                         }
        let dialog = new Wireframe(parameters)
        // _ui.push(dialog)


        let x,y,width,height;
        if (previousUI){
            if (previousUI.dialog){
                x = previousUI.dialog.x;
                y = previousUI.dialog.y;
                width = previousUI.dialog.width;
                height = previousUI.dialog.height;
            }
        }
        parameters = {p:p,objectToMirror:dialog,x:x,y:y,width:width,height:height,mouseClickfunc:REACT_APP.testViewSwitch}
        this.dialog = new TextBox(parameters)
        this.dialog.setFill(true)
        // this.dialog.setStroke(true)
        _ui.push(this.dialog)

        if (!windowResized){
            this.addCharacterToDialog(REACT_APP.testViewSwitch)
        }
        if (previousUI){
            if (previousUI.baronDialogIndex){
                this.baronDialogIndex = previousUI.baronDialogIndex
            }
        }

        let drawingHasBeenDrawn = false
        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
                drawingHasBeenDrawn = previousUI.drawing.drawingHasBeenDrawn
                clearTimeout(previousUI.drawing.timeOut)
            }
        }
        wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}

        parameters = {p:p,w:w,h:h,objectToMirror:drawing,x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard}
        this.drawing = new DisplayDrawingContainer(parameters)
        this.drawing.setLengthOfDrawingSquare(this.drawing.width)
        this.drawing.setFill(true)
        this.drawing.setSubmittedStrokes(baronData.drawingData)

        let beginRedrawingStrokesFunc = () => {
            this.drawing.setSubmittedStrokeIndex(0)
            let redrawStrokes = (timeOutVar) => {
                if (this.drawing.drawingHasBeenDrawn){
                    if (this.drawing.loop){
                        this.drawing.drawingHasBeenDrawn = false;
                        this.drawing.submittedStrokeIndex = 0;
                        clearTimeout(timeOutVar)
                    } else {
                        return;
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

        if (!windowResized){
            beginRedrawingStrokesFunc();
        }

        _ui.push(this.drawing)
        return _ui;
    }
}
