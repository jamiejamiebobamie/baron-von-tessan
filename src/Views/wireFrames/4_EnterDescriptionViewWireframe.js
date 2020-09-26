import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';

export default class testView {
    constructor(){
        this.mirrorTest1 = undefined
        this.mirrorTest2 = undefined
        this.mirrorTest3 = undefined
        this.mirrorTest4 = undefined
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let _ui = []
        let wildcard;
        let parameters;
        let wireFrame
        for (let i = 0; i < 3; i++){
            let color = i%2 ?"pink" :"orange"
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
            // _ui.push(wireFrame)
        }

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:.3, string:"this is the inputform container"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"green",
                           wildcard:wildcard,
                           parent:wireFrame,
                         }
        let inputform = new Wireframe(parameters)
        // _ui.push(inputform)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.9,string:"<< Back"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           // height:20,
                           row:false,
                           len:8,
                           index:0,
                           color:"red",
                           wildcard:wildcard,
                           parent:inputform//_ui[3],
                         }
        let backButton = new Wireframe(parameters)
        // _ui.push(backButton)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.9,string:"Submit"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           // height:20,
                           row:false,
                           len:8,
                           index:7,
                           color:"red",
                           wildcard:wildcard,
                           parent:inputform//_ui[3],
                         }
        let submitButton = new Wireframe(parameters)
        // _ui.push(submitButton)

        wildcard = {shrinkAmountWidth:.7,shrinkAmountHeight:.7,string:"I drew a... (click me and type)"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           // height:20,
                           row:true,
                           color:"purple",
                           wildcard:wildcard,
                           parent:inputform,
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

        wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:1,string:"[user drawing just submitted]"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           parent:wireFrame,
                         }
        let drawing = new Wireframe(parameters)
        // _ui.push(drawing)

        let x,y,width,height;
        if (previousUI){
            if (previousUI.mirrorTest1){
                x = previousUI.mirrorTest1.x;
                y = previousUI.mirrorTest1.y;
                width = previousUI.mirrorTest1.width;
                height = previousUI.mirrorTest1.height;
            }
        }
        parameters = {p:p,objectToMirror:backButton,x:x,y:y,width:width,height:height}
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
        parameters = {p:p,objectToMirror:submitButton,x:x,y:y,width:width,height:height}
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
        parameters = {p:p,objectToMirror:input,x:x,y:y,width:width,height:height}
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
        parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height}
        this.mirrorTest4 = new Mirror(parameters)
        _ui.push(this.mirrorTest4)

        return _ui;
    }
}
