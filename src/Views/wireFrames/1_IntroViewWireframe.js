import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';


export default class IntroViewWireframe {
    constructor(){
        this.mirrorTest1 = undefined
        this.mirrorTest2 = undefined
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
        let wireFrame1 = new Wireframe(parameters)
        // _ui.push(wireFrame1)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this is where the text that is spoken will be displayed."}
        parameters = {     p:p,
                           windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           parent: wireFrame1,
                           index:2,
                           len:3,
                           row:true,
                         }
        let wireFrame2 = new Wireframe(parameters)
        // _ui.push(wireFrame2)

        let x,y,width,height;
        if (previousUI){
            if (previousUI.mirrorTest1){
                x = previousUI.mirrorTest1.x;
                y = previousUI.mirrorTest1.y;
                width = previousUI.mirrorTest1.width;
                height = previousUI.mirrorTest1.height;
            }
        }
        parameters = {p:p,objectToMirror:wireFrame1,x:x,y:y,width:width,height:height, mouseClickfunc: REACT_APP.testViewSwitch}
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
        parameters = {p:p,objectToMirror:wireFrame2,x:x,y:y,width:width,height:height, mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest2 = new Mirror(parameters)
        _ui.push(this.mirrorTest2)
        return _ui;
    }
}
