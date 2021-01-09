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
        this.textToDisplay = "and . . . "
    }
    addCharacterToDialogString(changeView){
        if (this.charIndex<this.textToDisplay.length){
            let allOfDialog = this.textToDisplay
            let dialogString = allOfDialog.slice(0,this.charIndex)
            this.dialog.setString(dialogString)
            this.charIndex++
            this.timeOutVar = setTimeout(()=>{this.addCharacterToDialogString(changeView)},100)
        }
        else {
            clearTimeout(this.timeOutVar)
            setTimeout(()=>{changeView()},2000)
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
        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
            }
        }
        wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
        parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard,lerpSpeed:windowResized?.3:.1}
        this.drawing = new DisplayDrawingContainer(parameters)
        this.drawing.setLengthOfDrawingSquare(drawing.width)
        this.drawing.setFill(true)
        _ui.push(this.drawing)

        let text = "";
        if (previousUI){
            if (previousUI.dialog){
                x = previousUI.dialog.x;
                y = previousUI.dialog.y;
                width = previousUI.dialog.width;
                height = previousUI.dialog.height;
                text = previousUI.dialog.text;
            }
            this.charIndex = windowResized? previousUI.charIndex:0;
        }
        parameters = {p:p,objectToMirror:dialog,x:x,y:y,width:width,height:height,wildcard:{text:text}}
        this.dialog = new TextBox(parameters)
        this.dialog.setFill(true)
        let fontSize = 40
        this.dialog.setFontSize(fontSize)

        if (!windowResized){
            this.addCharacterToDialogString(changeView)
        }

        if (this.charIndex>=this.textToDisplay.length){
            let allOfDescription = this.textToDisplay
            this.dialog.setString(allOfDescription)
        }

        _ui.push(this.dialog)
        
        return _ui;
    }
}
