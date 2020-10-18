import Wireframe from '../uiClasses/Wireframe';
import DisplayDrawingContainer from '../uiClasses/DisplayDrawingContainer';
import TextBox from '../uiClasses/TextBox'
import baronData from '../baronDrawingDataReduced'

export default class OutroView {
    constructor(){
        this.drawing = undefined;
        this.drawingWireframe = undefined;
        this.dialogWireframe = undefined;

        this.dialog = undefined;
        this.baronDialogIndex = 0
        this.timeOutVar1 = undefined
        this.timeOutVar2 = undefined
        this.timeOutVar3 = undefined

        this.dialogText = baronData.outroDescriptionData
    }
    addCharacterToDialog(){
        if (this.baronDialogIndex<this.dialogText.length){
            this.baronDialogIndex++
            let allOfDialog = this.dialogText
            let dialogString = allOfDialog.slice(0,this.baronDialogIndex)
            this.dialog.setString(dialogString)
            this.timeOutVar1 = setTimeout(()=>{this.addCharacterToDialog()},50)
        }
        else {
            clearTimeout(this.timeOutVar1)
            return
        }
    }
    shrinkDrawing(changeView){
        if (this.drawingWireframe.width>0){
            this.drawingWireframe.width--
            this.drawingWireframe.height--
            if (this.drawing){
                this.drawing.setLengthOfDrawingSquare(this.drawingWireframe.width)
            }
            this.timeOutVar2 = setTimeout(()=>{this.shrinkDrawing(changeView)},30)
        } else {
            clearTimeout(this.timeOutVar2)
            setTimeout(()=>{changeView()},4000)
        }
    }
    raiseDialog(){
        this.dialogWireframe.y--;
        this.timeOutVar3 = setTimeout(()=>{this.raiseDialog()},60)
    }
    getUI(){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        let wireFrameElements = []
        let _ui = []
        /// ---- ******** BEGIN WIREFRAME OBJECTS
            // wireframe objects are not drawn to screen.
        let wildcard;
        let parameters;
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
        // let topTwoThirdsOfViewSplitInTwoFirstHalf = new Wireframe(parameters)
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
        // let topTwoThirdsOfViewSplitInTwoSecondHalf = new Wireframe(parameters)
        // _ui.push(topTwoThirdsOfViewSplitInTwoSecondHalf)


        // let topThirdOfView = wireFrameElements[0]
        // let middleThirdOfScreen =  wireFrameElements[1];
        let bottomThirdOfScreen = wireFrameElements[2];

        let drawingParent = topTwoThirdsOfView;

        let x,y, width, height;
        if (previousUI){
            if (previousUI.drawingWireframe){
                width = previousUI.drawingWireframe.width;
                height = previousUI.drawingWireframe.height;
            }
        }
        wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:REACT_APP.state.isMobile?.9:1,string:"[user drawing just submitted]"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           width:width?width:drawingParent.width,
                           height:height?height:drawingParent.height,
                           color:"red",
                           wildcard:wildcard,
                           parent:drawingParent,
                         }
        this.drawingWireframe = new Wireframe(parameters)
        // _ui.push(this.drawingWireframe)

        // if (previousUI){
        //     if (previousUI.dialogWireframe){
        //         y = previousUI.dialogWireframe.y;
        //     }
        // }

        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.9}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"pink",
                           wildcard:wildcard,
                           parent:bottomThirdOfScreen,
                         }
        this.dialogWireframe = new Wireframe(parameters)
        // _ui.push(dialog)

        let text = "";
        if (previousUI){
            if (previousUI.dialog){
                x = previousUI.dialog.x;
                y = previousUI.dialog.y;
                width = previousUI.dialog.width;
                height = previousUI.dialog.height;
                text = previousUI.dialog.text;
            }
        }
        let fontSize = w>h ? this.dialogWireframe.width/20 : this.dialogWireframe.width/15 ;
        wildcard = {fontSize:fontSize,numberOfLines:4}
        parameters = {p:p,objectToMirror:this.dialogWireframe,x:x,y:y,width:width,height:height,wildcard:wildcard}//color:"pink"}
        this.dialog = new TextBox(parameters)
        this.dialog.setFill(true)
        this.dialog.setString(text)

        if (!windowResized){
            this.addCharacterToDialog()
        }
        if (previousUI){
            if (previousUI.baronDialogIndex){
                this.baronDialogIndex = previousUI.baronDialogIndex
            }
        }

        if (this.baronDialogIndex>=this.dialogText.length){
            let allOfDialog = this.dialogText
            this.dialog.setString(allOfDialog)
        }

        let drawingHasBeenDrawn = false
        let strokeIndex = baronData.drawingData.length
        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
                // drawingHasBeenDrawn = previousUI.drawing.drawingHasBeenDrawn
                // strokeIndex = previousUI.drawing.submittedStrokeIndex
                // last view's this.drawing is a DrawingContainer and not a DisplayDrawingContainer
                    // a DrawingContainer does not have a submittedStrokeIndex.
                // only an issue when the view is changed.
                strokeIndex = windowResized?previousUI.drawing.submittedStrokeIndex:baronData.drawingData.length;
                clearTimeout(previousUI.drawing.timeOut)
            }
        }
        wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}

        parameters = {p:p,w:w,h:h,objectToMirror:this.drawingWireframe,x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard,lerpSpeed:windowResized?.3:.1}
        this.drawing = new DisplayDrawingContainer(parameters)
        this.drawing.setLengthOfDrawingSquare(this.drawingWireframe.width)
        this.drawing.setFill(true)
        this.drawing.setSubmittedStrokes(baronData.drawingData)
        this.drawing.submittedStrokeIndex = strokeIndex;
        this.drawing.undrawStrokes();

        if (!windowResized){
            this.shrinkDrawing(changeView)
            this.raiseDialog()
        }

        if (this.baronDialogIndex>=this.dialogText.length){
            this.dialog.setString(this.dialogText);
        }

        _ui.push(this.drawing)
        _ui.push(this.dialog)
        return _ui;
    }
}
