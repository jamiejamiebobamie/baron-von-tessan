import Wireframe from '../uiClasses/Wireframe';
import DisplayDrawingContainer from '../uiClasses/DisplayDrawingContainer';
import TextBox from '../uiClasses/TextBox'

export default class SlideshowView {
    constructor(){
        this.drawing = undefined;
        this.dialog = undefined;
        this.responseIndex = 0
        this.charIndex = 0
        this.timeOutVar = undefined
        this.allCharsAdded = false;
    }
    addCharacterToDialogString(REACT_APP){
        if (this.charIndex<REACT_APP.state.response[this.responseIndex].description.length){
            let allOfDialog = REACT_APP.state.response[this.responseIndex].description
            let dialogString = allOfDialog.slice(0,this.charIndex)
            this.dialog.setString(dialogString)
            clearTimeout(this.timeOutVar)
            this.charIndex += 1
            this.timeOutVar = setTimeout(()=>{this.addCharacterToDialogString(REACT_APP)},45)
        }
        else {
            // this.compositeBoolean.allCharsAdded = true;
            // if (this.compositeBoolean.allCharsAdded && this.compositeBoolean.allStrokesAdded){
            //     // set both to false to stop other method from running logic
            //     this.compositeBoolean = {allCharsAdded:false, allStrokesAdded:false}
            //
            // }
            this.allCharsAdded = true;
            clearTimeout(this.timeOutVar)
            console.log('lolololo',this.allCharsAdded)
            return
        }
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        let _ui = []

        /// ---- ******** BEGIN WIREFRAME OBJECTS
            // wireframe objects are not drawn to screen.
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

        wildcard = {shouldBeSquare:false,shrinkAmountWidth:1,shrinkAmountHeight:.7,string:"this is a container to place the description."}
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
        parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard,lerpSpeed:windowResized?.3:.1}
        this.drawing = new DisplayDrawingContainer(parameters)
        this.drawing.setLengthOfDrawingSquare(drawing.width+drawing.width*.11)
        this.drawing.setFill(true)
        this.drawing.setSubmittedStrokes(REACT_APP.state.response[this.responseIndex].vertices)
        this.drawing.submittedStrokeIndex = strokeIndex;
        // this.drawing.redrawStrokes();

        let beginRedrawingStrokesAndAddingCharsFunc = () => {
            this.drawing.setSubmittedStrokeIndex(0)
            this.charIndex = 0
            // this.addCharacterToDialogString(REACT_APP)
            let redrawStrokes = (timeOutVar) => {
                if (this.drawing.drawingHasBeenDrawn){
                    // hardcoding five drawings to be show.
                        // 6 or more will be grabbed from backend
                        // for just want to judge other people option
                            // (no user drawing can be shown so showing 6 drawings)
                        // as well as for the menu background drawings.
                    if (this.responseIndex < 4){//REACT_APP.state.response.length-1){
                        this.drawing.drawingHasBeenDrawn = false;
                        this.drawing.submittedStrokeIndex = 0;
                        this.allCharsAdded = false;
                        this.charIndex = 0
                        this.responseIndex++
                        this.dialog.setString("")
                        this.drawing.setSubmittedStrokes(REACT_APP.state.response[this.responseIndex].vertices)
                    } else {
                        changeView();
                        return;
                    }
                }
                if (this.drawing.submittedStrokeIndex < this.drawing.submittedStrokes.length) {
                    this.drawing.submittedStrokeIndex++
                    timeOutVar = setTimeout(redrawStrokes, 1,timeOutVar);
                } else if (!this.allCharsAdded) {
                    this.addCharacterToDialogString(REACT_APP)
                    setTimeout(()=>{redrawStrokes()},500);

                } else if (this.allCharsAdded) {
                    console.log('whawha')
                    this.drawing.drawingHasBeenDrawn = true;
                    // pause three seconds to display drawing.
                        // then loop if this.displayDrawingSpace.loop
                        // is set to true otherwise return.
                    let lengthOfTimeForReading;
                    // if (REACT_APP.state.response){
                    //     if (this.responseIndex<REACT_APP.state.response.length){
                    //         lengthOfTimeForReading = REACT_APP.state.response[this.responseIndex].descriptionData.length*75
                    //         // max five seconds to read.
                    //         lengthOfTimeForReading = lengthOfTimeForReading < 1500?lengthOfTimeForReading: 1500;
                    //         // min seconds to read.
                    //         lengthOfTimeForReading = lengthOfTimeForReading < 850?850:lengthOfTimeForReading;
                    //     }
                    // }
                    lengthOfTimeForReading = 1500
                    // console.log(lengthOfTimeForReading,REACT_APP.state.response[this.responseIndex].description,REACT_APP.state.response[this.responseIndex].descriptionData.length)
                    timeOutVar = setTimeout(redrawStrokes, lengthOfTimeForReading,timeOutVar);
                } else {
                    console.log('yayayay')
                    setTimeout(()=>{redrawStrokes()},500);
                }
            }
            redrawStrokes();
        }

        _ui.push(this.drawing)

        let text;
        if (previousUI){
            if (previousUI.dialog){
                x = previousUI.dialog.x;
                y = previousUI.dialog.y;
                width = previousUI.dialog.width;
                height = previousUI.dialog.height;
                text = windowResized?previousUI.dialog.text:"";
            }
            this.charIndex = previousUI.charIndex;
        }
        let fontSize = w>h ? dialog.width/10 : dialog.width/10 ;
        wildcard = {text:text,fontSize:fontSize}//,numberOfLines:4}
        parameters = {p:p,objectToMirror:dialog,x:x,y:y,width:width,height:height,wildcard:{text:text,fontSize:fontSize}}
        this.dialog = new TextBox(parameters)
        this.dialog.setFill(true)
        // let fontSize = 40
        // this.dialog.setFontSize(fontSize)

        if (this.charIndex>=REACT_APP.state.response[this.responseIndex].vertices.length){
            let allOfDialog = REACT_APP.state.response[this.responseIndex].vertices
            this.dialog.setString(allOfDialog)
        }

        _ui.push(this.dialog)

        if (!windowResized){
            beginRedrawingStrokesAndAddingCharsFunc();
        }

        return _ui;
    }
}
