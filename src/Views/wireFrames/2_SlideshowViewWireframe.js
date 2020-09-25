import Wireframe from '../../uiClasses/Wireframe';

export default class testView {
    getUI(previousUI){}
    setUI(p,w,h,REACT_APP){
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
                           // row:true,
                           width:lengthOfDrawingSquare,
                           height:lengthOfDrawingSquare,
                           len:3,
                           index:0,
                           color:"red",
                           wildcard:wildcard,
                           // mouseClickfunc: REACT_APP.testViewSwitch
                         }
        let wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)

        wildcard = {shouldBeSquare:false,shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this is a container to place the description."}
        parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           // offsetY:h-10,
                           // row:false,
                           len:3,
                           index:2,
                           color:"green",
                           wildcard:wildcard,
                           // mouseClickfunc: REACT_APP.testViewSwitch
                         }
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)

        wildcard = {shouldBeSquare:false,shrinkAmountWidth:w>h?.9:2,shrinkAmountHeight:.9,string:"this is where the descriptions will be displayed."}
        parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           row:w>h,
                           len:w>h?2:3,
                           index:1,
                           color:"pink",
                           wildcard:wildcard,
                           parent:wireFrame,
                           // mouseClickfunc: REACT_APP.testViewSwitch
                         }
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)
        return _ui;
    }
}
