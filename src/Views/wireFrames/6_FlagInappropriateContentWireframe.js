import Wireframe from '../../uiClasses/Wireframe';

export default class testView {
    getUI(previousUI){}
    setUI(p,w,h,REACT_APP){
        let _ui = []
        for (let i = 0; i < 3; i++){
            let color = i%2 ?"pink" :"orange"
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"do you find any of this content offensive or inappropriate?"}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:true,
                               len:3,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                             }
            let wireFrame = new Wireframe(parameters)
            _ui.push(wireFrame)
        }
        let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        let parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           offsetY:h*1/3,
                           // offsetX:w*1/3,
                           // row:w>h,
                           color:"green",
                           wildcard:wildcard,
                         }
        let wireFrame = new Wireframe(parameters)
        _ui.push(wireFrame)
        for (let i = 0; i < 2; i++){
            let color = i%2 ?"pink" :"red"
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this a container to place the drawings."}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:w>h,
                               len:2,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                               parent:_ui[3]
                             }
            let wireFrame = new Wireframe(parameters)
            _ui.push(wireFrame)
        }
        for (let i = 0; i < 3; i++){
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"[user drawing]"}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // offsetY:h*1/3,
                               len:3,
                               index:i,
                               color:"pink",
                               wildcard:wildcard,
                               parent:_ui[4]
                             }
            let wireFrame = new Wireframe(parameters)
            _ui.push(wireFrame)
        }
        for (let i = 0; i < 3; i++){
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"[user drawing]"}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // offsetY:h*1/3,
                               len:3,
                               index:i,
                               color:"red",
                               wildcard:wildcard,
                               parent:_ui[5]
                             }
            let wireFrame = new Wireframe(parameters)
            _ui.push(wireFrame)
        }
        // for (let i = 0; i < 3; i++){
        //     let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.9,shrinkAmountHeight:.9,string:"[user drawing]"}
        //     let parameters = { p:p,
        //                        windowWidth: w*2/3,
        //                        windowHeight: h*2/3,
        //                        offsetY:h*1/3,
        //                        len:3,
        //                        index:i,
        //                        color:'orange',
        //                        wildcard:wildcard,
        //                        parent:_ui[5]
        //                      }
        //     let wireFrame = new Wireframe(parameters)
        //     _ui.push(wireFrame)
        // }
        return _ui;
    }
}
