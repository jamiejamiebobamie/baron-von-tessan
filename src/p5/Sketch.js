import Menu from "./Views/MenuView";
import IntroView from "./Views/IntroView";
import SlideshowView from "./Views/SlideshowView";
import AndView from "./Views/AndView";
import DrawingView from "./Views/DrawingView";
import EnterDescriptionView from "./Views/EnterDescriptionView";
import PickBestDrawingView from "./Views/PickBestDrawingView";
import OutroView from "./Views/OutroView";
import ViewDrawingsView from "./Views/ViewDrawingsView";

export default class Sketch {
  constructor(app) {
    this.REACT_APP = app;
    this.views = [];
    this.setViews();
    // p5.js media references
    this.font = undefined;
    this.img = undefined;
    // view variables
    this.currentViewIndex = 0;
    this.desiredViewIndex = this.currentViewIndex;
    this.lengthOfViews = this.views.length;
    // 'this' binding is necessary here.
    this.changeView = this.changeView.bind(this);
  }
  shuffleSimulatedData() {
    let randomIndex, storedValue;
    let copiedResponse = this.REACT_APP.state.response1;
    for (let i = copiedResponse.length - 1; i >= 0; i--) {
      randomIndex = Math.floor(Math.random() * copiedResponse.length);
      storedValue = copiedResponse[randomIndex];
      copiedResponse[randomIndex] = copiedResponse[i];
      copiedResponse[i] = storedValue;
    }
    this.REACT_APP.setState({ response: copiedResponse });
  }
  setViews() {
    this.views = [];

    let view;
    view = new Menu();
    this.views.push(view);
    view = new IntroView();
    this.views.push(view);
    view = new SlideshowView();
    this.views.push(view);
    view = new AndView();
    this.views.push(view);
    view = new DrawingView();
    this.views.push(view);
    view = new EnterDescriptionView();
    this.views.push(view);
    view = new OutroView();
    this.views.push(view);
    view = new PickBestDrawingView();
    this.views.push(view);
    view = new ViewDrawingsView();
    this.views.push(view);

    this.lengthOfViews = this.views.length;
    this.REACT_APP.resetStateVariables();

    // shuffle simulatedData.
    if (this.REACT_APP.state.isUsingSimulatedData) {
      this.shuffleSimulatedData();
    }
  }
  // lengthOfViews parameter allows early exit from view-flow if user chooses
  // one of the options on the menu view other than 'ENTER SITE'.
  // othewise views proceed in sequence.
  changeView(desiredViewIndex, lengthOfViews) {
    console.log(this.REACT_APP.state.shouldFetchData);
    if (lengthOfViews !== undefined) {
      this.lengthOfViews = lengthOfViews;
    }
    if (desiredViewIndex === undefined) {
      if (this.currentViewIndex === this.lengthOfViews - 1) {
        this.desiredViewIndex = 0;
        this.lengthOfViews = this.views.length;
      } else {
        this.desiredViewIndex++;
      }
    } else {
      // if the desiredViewIndex is negative,
      // go backwards that number of views.
      // if the number of views to go backwards ends up passing the
      // first view, set the view index to 0.
      if (desiredViewIndex < 0) {
        if (this.currentViewIndex + desiredViewIndex < 0) {
          this.desiredViewIndex = 0;
          this.lengthOfViews = this.views.length;
        } else {
          this.desiredViewIndex = this.currentViewIndex + desiredViewIndex;
        }
      } else {
        this.desiredViewIndex = desiredViewIndex;
      }
    }
    // reset the views if the this.desiredViewIndex reaches 0
    if (this.desiredViewIndex === 0) {
      this.setViews();
    }
  }
  sketch = p => {
    // desired length and width of canvas
    let w, h;
    // ui objects to be drawn to the canvas.
    let _ui = [];
    // mouseIsCurrentlyDown boolean.
    let mouseIsClicked = false;
    // reference to React App's 'this' variable.
    const REACT_APP = this.REACT_APP;
    p.preload = () => {
      this.font = p.loadFont("fonts/PrintClearly.otf");
    };
    p.setup = () => {
      w = p.windowWidth > 1500 ? 1500 : p.windowWidth; // - p.windowWidth / 10;
      h = p.windowHeight > 1500 ? 1500 : p.windowHeight; //- p.windowHeight / 10;
      p.createCanvas(w, h);
      p.frameRate(24);
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont(this.font);
      p.rectMode(p.CENTER, p.CENTER);
      let windowResized = false;
      let previousUI = undefined;
      _ui = this.views[this.currentViewIndex].setUI(
        p,
        w,
        h,
        REACT_APP,
        windowResized,
        previousUI,
        this.changeView
      );
    };
    p.windowResized = () => {
      w = p.windowWidth > 1500 ? 1500 : p.windowWidth; // - p.windowWidth / 10;
      h = p.windowHeight > 1500 ? 1500 : p.windowHeight; //- p.windowHeight / 10;
      p.resizeCanvas(w, h);
      let windowResized = true;
      let previousUI = this.views[this.currentViewIndex].getUI();
      _ui = this.views[this.currentViewIndex].setUI(
        p,
        w,
        h,
        REACT_APP,
        windowResized,
        previousUI,
        this.changeView
      );
    };
    p.mouseReleased = () => {
      if (mouseIsClicked) {
        mouseIsClicked = false;
        for (let i = 0; i < _ui.length; i++) {
          _ui[i].setClick(mouseIsClicked);
        }
      }
    };
    p.mousePressed = () => {
      if (!mouseIsClicked) {
        mouseIsClicked = true;
        for (let i = 0; i < _ui.length; i++) {
          _ui[i].setClick(mouseIsClicked);
        }
      }
    };
    p.keyPressed = () => {
      for (let i = 0; i < _ui.length; i++) {
        if (_ui[i].handleTyping) {
          _ui[i].handleTyping(p.keyCode);
        }
      }
    };
    p.draw = () => {
      p.background(255);
      if (this.currentViewIndex !== this.desiredViewIndex) {
        let previousView = this.views[this.currentViewIndex].getUI();
        let windowResized = false;
        _ui = this.views[this.desiredViewIndex].setUI(
          p,
          w,
          h,
          REACT_APP,
          windowResized,
          previousView,
          this.changeView
        );
        this.currentViewIndex = this.desiredViewIndex;
        // when the view changes, reset the mouse location
        // to be at the top left corner, so button mouseOver isn't
        // triggered by previous touch event.
        // DOES NOT move the user's cursor on desktop
        p.mouseX = 0;
        p.mouseY = 0;
      }
      for (let i = 0; i < _ui.length; i++) {
        _ui[i].draw();
      }
    };
  };
}
