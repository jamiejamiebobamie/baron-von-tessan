import testCallBackButton from './uiClasses';
// import testView from './Views/test/testView';
// import testView2 from './Views/test/testView2';
import IntroView from './Views/oldViews/IntroView';
import DrawingView from './Views/oldViews/DrawingView';
import EnterDescriptionView from './Views/oldViews/EnterDescriptionView';
import IntroViewWireframe from './Views/wireFrames/1_IntroViewWireframe';
import SlideshowViewWireframe from './Views/wireFrames/2_SlideshowViewWireframe';
import DrawingViewWireframe from './Views/wireFrames/3_DrawingViewWireframe';
import EnterDescriptionViewWireframe from './Views/wireFrames/4_EnterDescriptionViewWireframe';
import FlagInappropriateContentWireframe from './Views/wireFrames/5_FlagInappropriateContentWireframe';

export default class Sketch {
    constructor(app){
        this.REACT_APP = app;
        this.views= [];
        this.viewIndex = app.state.viewIndex;
        let view;

        // view = new IntroView();
        // this.views.push(view);
        // view = new DrawingView();
        // this.views.push(view);
        // view = new EnterDescriptionView();
        // this.views.push(view);


        view = new IntroViewWireframe();
        this.views.push(view);

        // view = new SlideshowViewWireframe(view);
        // this.views.push(view);
        view = new DrawingViewWireframe();
        this.views.push(view);
        view = new EnterDescriptionViewWireframe();
        this.views.push(view);
        view = new FlagInappropriateContentWireframe();
        this.views.push(view);
        this.img = undefined;
        this.font = undefined
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
        p.preload = () => {
            this.font = p.loadFont('fonts/PrintClearly.otf');
            this.img = p.loadImage('images/inspiration.jpg');
         }
        p.setup = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            let canvas = p.createCanvas(w,h);
            p.frameRate(24);
            p.textAlign(p.CENTER,p.CENTER);
            p.textFont(this.font);
            p.rectMode(p.CENTER,p.CENTER);
            let windowResized = false;
            _ui = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP,windowResized,undefined)
            console.log(_ui)
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
                let previousView = this.views[this.viewIndex].getUI()
                let windowResized = false
                _ui  = this.views[REACT_APP.state.viewIndex].setUI(p,w,h,REACT_APP,windowResized,previousView)
                this.viewIndex = REACT_APP.state.viewIndex
            }
            p.background(255)
            for (let i = 0; i < _ui.length; i++){
                _ui[i].draw();
            }
            // if (this.viewIndex === 0){
            //     p.tint(255,126)
            //     p.image(this.img,-340,-130,1008,756);
            // }

        }
    }
}
