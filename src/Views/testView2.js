import testCallBackButton from '../uiClasses';

export default class testView {
    setUI(p,w,h,REACT_APP){
        let _ui = []
        for (let i = 0; i < 5; i++){
            let color = i%2 ?"red" :"blue"
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // row:true,
                               len:5,
                               index:i,
                               color:color,
                               mouseClickfunc: REACT_APP.testViewSwitch
                               // mouseClickfunc: REACT_APP.testCallback

                             }
            let testClass = new testCallBackButton(parameters)
            let doOnce = true;
            testClass.setClickType(doOnce)
            let isInteractive = true;
            testClass.setInteractivity(isInteractive)
            _ui.push(testClass)
        }
        return _ui;
    }
}
