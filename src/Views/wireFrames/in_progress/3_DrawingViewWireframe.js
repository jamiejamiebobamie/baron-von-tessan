import Wireframe from '../../uiClasses/Wireframe';

export default class testView {
    getUI(previousUI){}
    setUI(p,w,h,REACT_APP){
        let _ui = []
        for (let i = 0; i < 2; i++){
            let color = i%2 ?"green" :"red"
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // row:true,
                               len:2,
                               index:i,
                               color:color,
                               // mouseClickfunc: REACT_APP.testViewSwitch
                             }
            let testClass = new Wireframe(parameters)
            // let doOnce = true;
            // testClass.setClickType(doOnce)
            // let isInteractive = true;
            // testClass.setInteractivity(isInteractive)
            _ui.push(testClass)
        }
        return _ui;
    }
}
