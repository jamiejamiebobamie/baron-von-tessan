// import testCallBackButton from './uiClasses';
import testView from './Views/testView';
import testView2 from './Views/testView2';
import IntroView from './Views/IntroView';
import DrawingView from './Views/DrawingView';


// const fs = require('fs');
// const dotenv = require('dotenv').config();

export default class Sketch {
    constructor(app){
        this.REACT_APP = app;
        this.views= [];
        this.viewIndex = app.state.viewIndex;
        let view = new IntroView();
        this.views.push(view)
        view = new DrawingView();
        this.views.push(view);
        view = new testView();
        this.views.push(view);
        // this.image = undefined;
        // this.fontStyle = undefined;
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
        REACT_APP.setNumberOfViews(this.views.length)
        p.preload = () => { }
        p.setup = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            let canvas = p.createCanvas(w,h);
            // parents the canvas to the DOM element 'sketch-holder'
            canvas.parent('sketch-holder');

            p.frameRate(24);

            p.textAlign(p.CENTER,p.CENTER);
            p.rectMode(p.CENTER,p.CENTER);
            let windowResized = false;
            _ui = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP,windowResized)
        }
        p.windowResized = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            p.resizeCanvas(w,h);
            let windowResized = true;
            let previousUI = this.views[REACT_APP.state.viewIndex].getUI()
            _ui  = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP,windowResized,previousUI)
        }
        p.mouseReleased = () => {
            if (mouseIsClicked){
                // for the drawing method. needs to moved to
                    // the drawingContainer class.
                p.frameRate(24);

                mouseIsClicked = false;
                for (let i = 0; i < _ui.length; i++){
                    _ui[i].setClick(mouseIsClicked);
                }
            }
        }
        p.mousePressed = () => {
            if (!mouseIsClicked){
                // for the drawing method. needs to moved to
                    // the drawingContainer class.
                p.frameRate(70);

                mouseIsClicked = true;
                for (let i = 0; i < _ui.length; i++){
                    _ui[i].setClick(mouseIsClicked);
                }
            }
        }
        p.draw = () => {
            // is this computationally expensive?
            if (this.viewIndex !== REACT_APP.state.viewIndex){
                _ui  = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP)
                this.viewIndex = REACT_APP.state.viewIndex
            }
            if (REACT_APP.state.isMobile){
                p.background(0)
            } else {
                p.background(255)
            }
            // p.background(255)
            for (let i = 0; i < _ui.length; i++){
                _ui[i].draw();
            }
        }
    }
}
