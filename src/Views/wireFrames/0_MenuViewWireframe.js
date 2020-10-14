import testCallBackButton from '../../uiClasses';
// import testCallBackButton from '../../uiClasses';

export default class testView {
    getUI(previousUI){}
    setUI(p,w,h,REACT_APP,windowResized,previousView,changeView){
        let _ui = []
        let testClass
        for (let i = 0; i < 4; i++){
            let color = i%2 ?"blue" :"red"
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:true,
                               len:4,
                               index:i,
                               // color:color,
                             }
            if (i !== 0){
                // buttons
                testClass = new testCallBackButton(parameters)
                let doOnce = true;
                testClass.setClickType(doOnce)
                let isInteractive = true;
                testClass.setInteractivity(isInteractive)
                testClass.setStroke(true)

                if (i === 1){
                    // 1: Enter Site
                    testClass.mouseClickfunc = changeView()
                } else if (i === 2){
                    // 2: I just want to draw!
                    testClass.mouseClickfunc = () => {changeView(3,4)} // need to pass in a variable to the views to signal early exit
                } else {
                    // 3: I want to see what other people drew!
                    testClass.mouseClickfunc = () => {changeView(2,2)} // need to pass in a variable to the views to signal early exit
                }
            } else {
                // 0: title: "baron von tessan"
                testClass = new testCallBackButton(parameters)
            }
            _ui.push(testClass)
        }
        return _ui;
    }
}
