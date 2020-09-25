import Wireframe from '../../uiClasses/Wireframe';

export default class IntroViewWireframe {
    getUI(previousUI){}
    setUI(p,w,h,REACT_APP){
        let _ui = []
        let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"the entire window will begin drawing--stroke by stroke--the baron, as words begin to play."}
        let parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           color:"green",
                           wildcard:wildcard,
                         }
        let wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)
        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this is where the text that is spoken will be displayed."}
        parameters = {     p:p,
                           windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           parent: wireFrame,
                           index:2,
                           len:3,
                           row:true,
                         }
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)
        return _ui;
    }
}
