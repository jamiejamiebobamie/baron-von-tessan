// import testCallBackButton from './uiClasses';
import testView from './Views/testView';
import testView2 from './Views/testView2';

export default class Sketch {
    constructor(app){
        this.REACT_APP = app;
        this.views= [];
        this.viewIndex = app.state.viewIndex;
        let view = new testView();
        this.views.push(view)
        view = new testView2();
        this.views.push(view)
    }
    sketch = (p) => {
        // GLOBAL VARIABLES:
        let w, h;
        // ui objects to be drawn to the canvas.
        let _ui = []
        // mouseIsCurrentlyDown boolean.
        let mouseIsClicked = false;
        // reference to React App's 'this' variable.
        const REACT_APP = this.REACT_APP;
        // will polymorphically called: myView.setUI(_ui)
        // testView.setUI(_ui,p,w,h,REACT_APP)
        // function setUI(){
        //     _ui = []
        //     for (let i = 0; i < 5; i++){
        //         let color = i%2 ?"blue" :"blue"
        //         let parameters = { p:p,
        //                            windowWidth: w,
        //                            windowHeight: h,
        //                            // row:true,
        //                            len:5,
        //                            index:i,
        //                            color:color,
        //                            mouseClickfunc: REACT_APP.testCallback
        //                          }
        //         let testClass = new testCallBackButton(parameters)
        //         testClass.setInteractivity(true)
        //         _ui.push(testClass)
        //     }
        //         for (let j = 0; j < 5; j++){
        //             let color = j%2 ? "white" : "white"
        //             let parameters = { p:p,
        //                                windowWidth:w,
        //                                windowHeight: h,
        //                                // row:false,
        //                                len:5,
        //                                index:j,
        //                                color:color,
        //                                parent: _ui[j],
        //                                mouseClickfunc: REACT_APP.testCallback
        //                              }
        //             let testClassChild = new testCallBackButton(parameters)
        //             testClassChild.setInteractivity(true)
        //             _ui.push(testClassChild)
        //         }
        // }
        p.setup = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            let canvas = p.createCanvas(w,h);
            // parents the canvas to the DOM element 'sketch-holder'
            canvas.parent('sketch-holder');
            p.frameRate(24);
            p.textAlign(p.CENTER,p.CENTER);
            p.rectMode(p.CENTER,p.CENTER);
            _ui = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP)
        }
        p.windowResized = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            p.resizeCanvas(w,h);
            _ui  = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP)
        }
        p.mouseReleased = () => {
            if (mouseIsClicked){
                p.frameRate(24);
                mouseIsClicked = false;
                for (let i = 0; i < _ui.length; i++){
                    _ui[i].setClick(mouseIsClicked);
                }
            }
        }
        p.mousePressed = () => {
            if (!mouseIsClicked){
                p.frameRate(70);
                mouseIsClicked = true;
                for (let i = 0; i < _ui.length; i++){
                    _ui[i].setClick(mouseIsClicked);
                }
            }
        }
        p.draw = () => {
            p.background(255)
            if (this.viewIndex !== REACT_APP.state.viewIndex){
                _ui  = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP)
                this.viewIndex = REACT_APP.state.viewIndex
            }
            for (let i = 0; i < _ui.length; i++){
                _ui[i].draw();
            }
        }
    }
}
