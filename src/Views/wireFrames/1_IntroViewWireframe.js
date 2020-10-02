import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';


export default class IntroViewWireframe {
    constructor(previousView){
        this.drawing = previousView ? previousView.drawing : undefined;
        this.dialog = previousView ? previousView.dialog : undefined;
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let _ui = []
        let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"the entire window will begin drawing--stroke by stroke--the baron, as words begin to play."}
        let parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           color:"green",
                           wildcard:wildcard,
                         }
        let drawingArea = new Wireframe(parameters)
        // _ui.push(wireFrame1)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this is where the text that is spoken will be displayed."}
        parameters = {     p:p,
                           windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           parent: drawingArea,
                           index:2,
                           len:3,
                           row:true,
                         }
        let dialogBox = new Wireframe(parameters)
        // _ui.push(wireFrame2)

        let x,y,width,height;
        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
            }
        }
        parameters = {p:p,objectToMirror:drawingArea,x:x,y:y,width:width,height:height, mouseClickfunc: REACT_APP.testViewSwitch}
        this.drawing = new Mirror(parameters)
        _ui.push(this.drawing)

        if (previousUI){
            if (previousUI.dialog){
                x = previousUI.dialog.x;
                y = previousUI.dialog.y;
                width = previousUI.dialog.width;
                height = previousUI.dialog.height;
            }
        }
        parameters = {p:p,objectToMirror:dialogBox,x:x,y:y,width:width,height:height, mouseClickfunc: REACT_APP.testViewSwitch}
        this.dialog = new Mirror(parameters)
        _ui.push(this.dialog)

        return _ui;
    }
}
