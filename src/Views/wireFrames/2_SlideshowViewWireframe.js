import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';

export default class testView {
    constructor(previousView){
        console.log(previousView)
        this.drawing = previousView ? previousView.drawing : undefined;
        this.dialog = previousView ? previousView.dialog : undefined;
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
        let drawingArea = new Wireframe(parameters)

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
        let wireFrame = new Wireframe(parameters)

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
        parameters = {p:p,objectToMirror:wireFrame,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.dialog = new Mirror(parameters)
        _ui.push(this.dialog)
        return _ui;
    }
}
