import Menu from './Views/wireFrames/0_MenuViewWireframe';
import IntroViewWireframe from './Views/wireFrames/1_IntroViewWireframe';
import SlideshowViewWireframe from './Views/wireFrames/2_SlideshowViewWireframe';
import DrawingViewWireframe from './Views/wireFrames/3_DrawingViewWireframe';
import EnterDescriptionViewWireframe from './Views/wireFrames/4_EnterDescriptionViewWireframe';
import FlagInappropriateContentWireframe from './Views/wireFrames/5_FlagInappropriateContentWireframe';
import OutroViewWireframe from './Views/wireFrames/6_OutroViewWireframe';


export default class Sketch {
    constructor(app){
        this.REACT_APP = app;
        this.views= [];
        let view;
        view = new Menu();
        this.views.push(view);
        view = new IntroViewWireframe();
        this.views.push(view);
        view = new SlideshowViewWireframe(view);
        this.views.push(view);
        view = new DrawingViewWireframe();
        this.views.push(view);
        view = new EnterDescriptionViewWireframe();
        this.views.push(view);
        view = new FlagInappropriateContentWireframe();
        this.views.push(view);
        view = new OutroViewWireframe();
        this.views.push(view);

        // p5.js media references
        this.font = undefined

        this.currentViewIndex = 0;
        this.desiredViewIndex = this.currentViewIndex;
        this.lengthOfViews = this.views.length
        // 'this' binding is necessary here.
        this.changeView = this.changeView.bind(this);
    }

    // lengthOfViews parameter allows early exit from site if user chooses to
        // only draw or only view other people's drawings.
    changeView(desiredViewIndex,lengthOfViews){
        if (lengthOfViews !== undefined){
            this.lengthOfViews = lengthOfViews;
        }
        if (desiredViewIndex===undefined){
            if (this.currentViewIndex === this.lengthOfViews-1){
                this.desiredViewIndex = 0
                this.lengthOfViews = this.views.length;
            } else {
                this.desiredViewIndex++
            }
        } else {
            // if the desiredViewIndex is negative,
                // go backwards that number of views.
            // if the number of views to go backwards ends up passing the
                // first view, set the view index to 0.
            if (desiredViewIndex<0){
                if (this.currentViewIndex + desiredViewIndex < 0){
                    this.desiredViewIndex = 0
                    this.lengthOfViews = this.views.length;
                } else {
                    this.desiredViewIndex = this.currentViewIndex + desiredViewIndex
                }
            } else {
                this.desiredViewIndex = desiredViewIndex
            }
        }
        if (this.desiredViewIndex===0){
            this.views= [];
            let view;
            view = new Menu();
            this.views.push(view);
            view = new IntroViewWireframe();
            this.views.push(view);
            view = new SlideshowViewWireframe(view);
            this.views.push(view);
            view = new DrawingViewWireframe();
            this.views.push(view);
            view = new EnterDescriptionViewWireframe();
            this.views.push(view);
            view = new FlagInappropriateContentWireframe();
            this.views.push(view);
            view = new OutroViewWireframe();
            this.views.push(view);
        }
    }

    sketch = (p) => {
        // desired length and width of canvas
        let w, h;
        // ui objects to be drawn to the canvas.
        let _ui = []
        // mouseIsCurrentlyDown boolean.
        let mouseIsClicked = false;
        // reference to React App's 'this' variable.
        const REACT_APP = this.REACT_APP;
        p.preload = () => {
            this.font = p.loadFont('fonts/PrintClearly.otf');
         }
        p.setup = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            // necessary despite never being used anywhere else.
                // p5 won't display anything without a canvas.
            let canvas = p.createCanvas(w,h);
            p.frameRate(24);
            p.textAlign(p.CENTER,p.CENTER);
            p.textFont(this.font);
            p.rectMode(p.CENTER,p.CENTER);
            let windowResized = false;
            let previousUI = undefined
            _ui = this.views[this.currentViewIndex].setUI(p,w,h,REACT_APP,windowResized,previousUI,this.changeView)
        }
        p.windowResized = () => {
            w = p.windowWidth - (p.windowWidth/10)
            h = p.windowHeight - (p.windowHeight/10)
            p.resizeCanvas(w,h);
            let windowResized = true;
            let previousUI = this.views[this.currentViewIndex].getUI()
            _ui  = this.views[this.currentViewIndex].setUI(p,w,h,REACT_APP,windowResized,previousUI,this.changeView)
        }
        p.mouseReleased = () => {
            if (mouseIsClicked){
                mouseIsClicked = false;
                for (let i = 0; i < _ui.length; i++){
                    _ui[i].setClick(mouseIsClicked);
                }
            }
        }
        p.mousePressed = () => {
            if (!mouseIsClicked){
                mouseIsClicked = true;
                for (let i = 0; i < _ui.length; i++){
                    _ui[i].setClick(mouseIsClicked);
                }
            }
        }
        p.keyPressed = () => {
            for (let i = 0; i < _ui.length; i++){
                if (_ui[i].handleTyping){
                    _ui[i].handleTyping(p.keyCode)
                }
            }
        }
        p.draw = () => {
            p.background(255)
            if (this.currentViewIndex !== this.desiredViewIndex){
                let previousView = this.views[this.currentViewIndex].getUI()
                let windowResized = false
                _ui  = this.views[this.desiredViewIndex].setUI(p,w,h,REACT_APP,windowResized,previousView,this.changeView)
                this.currentViewIndex = this.desiredViewIndex
                // console.log(REACT_APP.state)
            }
            for (let i = 0; i < _ui.length; i++){
                _ui[i].draw();
            }
        }
    }
}
