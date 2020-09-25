import Wireframe from '../../uiClasses/Wireframe';

export default class testView {
    getUI(previousUI){}
    setUI(p,w,h,REACT_APP){
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
            _ui.push(wireFrame)
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
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)

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
                           parent:_ui[3],
                         }
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)

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
                           parent:_ui[3],
                         }
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)

        wildcard = {shrinkAmountWidth:.7,shrinkAmountHeight:.7,string:"I drew a... (click me)"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           // height:20,
                           row:true,
                           color:"purple",
                           wildcard:wildcard,
                           parent:_ui[3],
                         }
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           color:"green",
                           wildcard:wildcard,
                         }
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)

        wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:1,string:"[user drawing just submitted]"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           parent:wireFrame,
                         }
        wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)
        return _ui;
    }
}
