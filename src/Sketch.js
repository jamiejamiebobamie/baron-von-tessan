// import testCallBackButton from './uiClasses';
// import testView from './Views/test/testView';
// import testView2 from './Views/test/testView2';
// import IntroView from './Views/oldViews/IntroView';
// import DrawingView from './Views/oldViews/DrawingView';
// import EnterDescriptionView from './Views/oldViews/EnterDescriptionView';
import IntroViewWireframe from './Views/wireFrames/1_IntroViewWireframe';
import SlideshowViewWireframe from './Views/wireFrames/2_SlideshowViewWireframe';
import DrawingViewWireframe from './Views/wireFrames/3_DrawingViewWireframe';
import EnterDescriptionViewWireframe from './Views/wireFrames/4_EnterDescriptionViewWireframe';
import FlagInappropriateContentWireframe from './Views/wireFrames/5_FlagInappropriateContentWireframe';




// const fs = require('fs');
// const dotenv = require('dotenv').config();

export default class Sketch {
    constructor(app){
        this.REACT_APP = app;
        this.views= [];
        this.viewIndex = app.state.viewIndex;
        let view;
        view = new IntroViewWireframe();
        this.views.push(view);
        view = new SlideshowViewWireframe();
        this.views.push(view);
        // in progress
        // view = new DrawingViewWireframe();
        // this.views.push(view);
        view = new EnterDescriptionViewWireframe();
        this.views.push(view);
        view = new FlagInappropriateContentWireframe();
        this.views.push(view);
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
        p.keyPressed = () => {
            for (let i = 0; i < _ui.length; i++){
                if (_ui[i].textBoxSelected){
                    _ui[i].handleTyping(p.keyCode)
                }
            }
        }
        p.draw = () => {
            // temporary setup that works, but is not ideal.
                // the React App doesn't need to know about the views.
            if (this.viewIndex !== REACT_APP.state.viewIndex){
                _ui  = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP)
                this.viewIndex = REACT_APP.state.viewIndex
            }
            p.background(255)
            for (let i = 0; i < _ui.length; i++){
                _ui[i].draw();
            }
        }
    }
}