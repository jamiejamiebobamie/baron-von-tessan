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
        this.and = "and . . . "
    }
    addCharacterToDialogString(changeToNextViewMethod){
        console.log(changeToNextViewMethod)
        if (this.charIndex<this.and.length){
            let allOfDialog = this.and
            let dialogString = allOfDialog.slice(0,this.charIndex)
            this.dialog.setString(dialogString)
            clearTimeout(this.timeOutVar)
            this.charIndex += 1
            this.timeOutVar = setTimeout(()=>{this.addCharacterToDialogString(changeToNextViewMethod)},150)
        }
        else {
            clearTimeout(this.timeOutVar)
            this.timeOutVar = setTimeout(()=>{changeToNextViewMethod();}, 2000);
            return
        }
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let _ui = []

        let wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9,string:"this is a container to place the description."}
        let parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           mouseClickfunc: REACT_APP.testViewSwitch
                         }
        let dialog = new Wireframe(parameters)
        // _ui.push(dialog)

        let width, height, x, y;
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

        if (this.charIndex>=this.and.length){
            let allOfDialog = this.and
            this.dialog.setString(allOfDialog)
        }

        _ui.push(this.dialog)

        // this gets called once when the view is first shown
            // all other calls to the setUI method are due to windowResized
            // events or similar calls
        if (!windowResized){
            let changeToNextView = REACT_APP.testViewSwitch
            this.addCharacterToDialogString(changeToNextView)
        }

        return _ui;
    }
}
