import Container from './uiClasses';

const testView = (p) => {
    // GLOBAL VARIABLES:
        let w, h;
        // ui objects to be drawn to the canvas.
        let _ui = []
        // mouseIsCurrentlyDown boolean.
        let mouseIsClicked = false;

        function setUI(){
            _ui = []
            for (let i = 0; i < 5; i++){
                let color = i%2 ?"blue" :"blue"
                let parameters = { p:p,
                                   windowWidth: w,
                                   windowHeight: h,
                                   row:false,
                                   len:5,
                                   index:i,
                                   color:color
                                 }
                let testClass = new Container(parameters)
                testClass.setInteractivity(true)
                _ui.push(testClass)
            }
                for (let j = 0; j < 5; j++){
                    let color = j%2 ? "white" : "white"
                    let parameters = { p:p,
                                       windowWidth:w,
                                       windowHeight: h,
                                       // row:false,
                                       len:5,
                                       index:j,
                                       color:color,
                                       parent: _ui[j],
                                     }
                    let testClassChild = new Container(parameters)
                    testClassChild.setInteractivity(true)
                    _ui.push(testClassChild)
                }
        }
        p.setup = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            let canvas = p.createCanvas(w,h);
            canvas.parent('sketch-holder');
            p.frameRate(24);
            p.textAlign(p.CENTER,p.CENTER);
            p.rectMode(p.CENTER,p.CENTER);
            setUI();
        }
        p.windowResized = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            p.resizeCanvas(w,h);
            setUI();
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
            for (let i = 0; i < _ui.length; i++){
                _ui[i].draw();
            }
        }
    }

export { testView as default }
