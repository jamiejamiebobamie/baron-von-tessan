import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';

export default class testView {
    constructor(){
        this.mirrorTest1 = undefined
        this.mirrorTest2 = undefined
        this.mirrorTest3 = undefined
        this.mirrorTest4 = undefined
        this.mirrorTest5 = undefined
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let wireFrameElements = []

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
            wireFrame = new Wireframe(parameters)
            wireFrameElements.push(wireFrame)
        }

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.5, string:"this is the inputform container"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"green",
                           wildcard:wildcard,
                           parent:REACT_APP.state.isMobile?wireFrameElements[1]:wireFrameElements[2],
                         }
        let inputform = new Wireframe(parameters)
        // wireFrameElements.push(inputform)

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"orange",
                           len:3,
                           index:0,
                           wildcard:wildcard,
                           parent:inputform,
                         }
        let inputformContainer1 = new Wireframe(parameters)
        // _ui.push(inputformContainer1)

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"red",
                           len:3,
                           index:2,
                           wildcard:wildcard,
                           parent:inputform,
                         }
        let inputformContainer2 = new Wireframe(parameters)
        // _ui.push(inputformContainer2)

        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:1.5, string:"<< Back"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:false,
                           color:"pink",
                           len:2,
                           index:0,
                           wildcard:wildcard,
                           parent:inputformContainer2,
                         }
        let backButton = new Wireframe(parameters)
        // _ui.push(backButton)

        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:1.5, string:"Submit"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:false,
                           color:"purple",
                           len:2,
                           index:1,
                           wildcard:wildcard,
                           parent:inputformContainer2,
                         }
        let submitButton = new Wireframe(parameters)
        // _ui.push(submitButton)

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1.8,string:"I drew a... (click me and type)"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           // height:20,
                           row:true,
                           color:"purple",
                           wildcard:wildcard,
                           parent:inputformContainer1,
                         }
        let input = new Wireframe(parameters)
        // _ui.push(input)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           color:"green",
                           wildcard:wildcard,
                         }
        wireFrame = new Wireframe(parameters)
        // _ui.push(wireFrame)

        wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:REACT_APP.state.isMobile?.9:1,string:"[user drawing just submitted]"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           parent:REACT_APP.state.isMobile?wireFrameElements[0]:wireFrame,
                         }
        let drawing = new Wireframe(parameters)
        // _ui.push(drawing)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           len:3,
                           index:2,
                           offsetY:REACT_APP.state.isMobile?0:h,
                           color:"red",
                           wildcard:wildcard,
                           parent:REACT_APP.state.isMobile?wireFrameElements[3]:wireFrame,
                         }
        let areaForKeyboard = new Wireframe(parameters)

        let x,y,width,height;
        let _ui = []
        if (previousUI){
            if (previousUI.mirrorTest1){
                x = previousUI.mirrorTest1.x;
                y = previousUI.mirrorTest1.y;
                width = previousUI.mirrorTest1.width;
                height = previousUI.mirrorTest1.height;
            }
        }
        parameters = {p:p,objectToMirror:backButton,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest1 = new Mirror(parameters)
        _ui.push(this.mirrorTest1)

        if (previousUI){
            if (previousUI.mirrorTest2){
                x = previousUI.mirrorTest2.x;
                y = previousUI.mirrorTest2.y;
                width = previousUI.mirrorTest2.width;
                height = previousUI.mirrorTest2.height;
            }
        }
        parameters = {p:p,objectToMirror:submitButton,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest2 = new Mirror(parameters)
        _ui.push(this.mirrorTest2)

        if (previousUI){
            if (previousUI.mirrorTest3){
                x = previousUI.mirrorTest3.x;
                y = previousUI.mirrorTest3.y;
                width = previousUI.mirrorTest3.width;
                height = previousUI.mirrorTest3.height;
            }
        }
        parameters = {p:p,objectToMirror:input,x:x,y:y,width:width,height:height, mouseClickfunc:REACT_APP.testViewSwitch}
        this.mirrorTest3 = new Mirror(parameters)
        _ui.push(this.mirrorTest3)

        if (previousUI){
            if (previousUI.mirrorTest4){
                x = previousUI.mirrorTest4.x;
                y = previousUI.mirrorTest4.y;
                width = previousUI.mirrorTest4.width;
                height = previousUI.mirrorTest4.height;
            }
        }
        parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest4 = new Mirror(parameters)
        _ui.push(this.mirrorTest4)

        if (previousUI){
            if (previousUI.mirrorTest5){
                x = previousUI.mirrorTest5.x;
                y = previousUI.mirrorTest5.y;
                width = previousUI.mirrorTest5.width;
                height = previousUI.mirrorTest5.height;
            }
        }
        parameters = {p:p,objectToMirror:areaForKeyboard,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest5 = new Mirror(parameters)
        _ui.push(this.mirrorTest5)

        return _ui;
    }
}
