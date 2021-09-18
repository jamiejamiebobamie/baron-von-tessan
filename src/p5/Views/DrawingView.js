import Wireframe from "../uiClasses/Wireframe";
import DrawingContainer from "../uiClasses/DrawingContainer";
import TextBox from "../uiClasses/TextBox";

export default class DrawingView {
  constructor() {
    // ui objects
    this.drawing = undefined;
    this.buttons = [undefined, undefined, undefined, undefined];
    this.instructions = undefined;
    // callbacks -- necessary
    this.toggleTool = this.toggleTool.bind(this);
    this.buildStroke = this.buildStroke.bind(this);
    this.undoLastStroke = this.undoLastStroke.bind(this);
    this.clearStrokes = this.clearStrokes.bind(this);
    this.removeStroke = this.removeStroke.bind(this);
  }
  toggleTool(buttonObject) {
    if (!this.drawing.userIsDrawingOrErasing) {
      this.drawing.penMode = !this.drawing.penMode;
      let buttonString = this.drawing.penMode ? "ERASER" : "PEN";
      buttonObject.setString(buttonString);
      this.drawing.mouseClickfunc = this.drawing.penMode
        ? this.buildStroke
        : this.removeStroke;
    }
  }
  undoLastStroke() {
    if (this.drawing) {
      if (this.drawing.strokes && !this.drawing.userIsDrawingOrErasing) {
        this.drawing.strokes.pop();
      }
    }
  }
  clearStrokes() {
    if (this.drawing) {
      if (this.drawing.strokes && !this.drawing.userIsDrawingOrErasing) {
        this.drawing.strokes = [];
      }
    }
  }
  buildStroke() {
    if (this.drawing !== undefined) {
      if (this.drawing.strokes) {
        this.drawing.currentStroke.push({
          x:
            (this.drawing.p.mouseX - this.drawing.x) /
            this.drawing.lengthOfDrawingSquare,
          y:
            (this.drawing.p.mouseY - this.drawing.y) /
            this.drawing.lengthOfDrawingSquare
        });
      }
    }
  }
  removeStroke() {
    if (this.drawing) {
      if (this.drawing.strokes) {
        for (let i = 0; i < this.drawing.strokes.length; i++) {
          for (let j = 0; j < this.drawing.strokes[i].length; j++) {
            if (
              this.drawing.p.mouseX >
                this.drawing.x +
                  this.drawing.strokes[i][j].x *
                    this.drawing.lengthOfDrawingSquare -
                  this.drawing.lengthOfDrawingSquare * 0.01 &&
              this.drawing.p.mouseX <
                this.drawing.x +
                  this.drawing.strokes[i][j].x *
                    this.drawing.lengthOfDrawingSquare +
                  this.drawing.lengthOfDrawingSquare * 0.01 &&
              this.drawing.p.mouseY >
                this.drawing.y +
                  this.drawing.strokes[i][j].y *
                    this.drawing.lengthOfDrawingSquare -
                  this.drawing.lengthOfDrawingSquare * 0.01 &&
              this.drawing.p.mouseY <
                this.drawing.y +
                  this.drawing.strokes[i][j].y *
                    this.drawing.lengthOfDrawingSquare +
                  this.drawing.lengthOfDrawingSquare * 0.01
            ) {
              this.drawing.strokes[i].splice(j, 1);
            }
          }
        }
      }
    }
  }
  getUI(previousUI) {
    return this;
  }
  setUI(p, w, h, REACT_APP, windowResized, previousUI, changeView) {
    /// ---- ******** BEGIN WIREFRAME OBJECTS
    // wireframe objects are not drawn to screen.
    let drawingSpaceWidth = w > h ? w * (2 / 3) : w;
    let drawingSpaceHeight = w > h ? h : h * (2 / 3);
    let lengthOfDrawingSquare = w > h ? drawingSpaceHeight : drawingSpaceWidth;
    let longerSideOfScreen = w > h ? w : h;
    lengthOfDrawingSquare =
      lengthOfDrawingSquare > longerSideOfScreen * (2 / 3)
        ? longerSideOfScreen * (2 / 3)
        : lengthOfDrawingSquare;
    let wildcard = {
      shouldBeSquare: false,
      shrinkAmountWidth: 0.9,
      shrinkAmountHeight: 0.9,
      string: "this is where the drawings will be displayed."
    };
    let parameters = {
      p: p,
      windowWidth: w,
      windowHeight: h,
      offsetX: w > h ? 0 : (w - lengthOfDrawingSquare) / 2,
      offsetY: w > h ? (h - lengthOfDrawingSquare) / 2 : 0,
      width: lengthOfDrawingSquare,
      height: lengthOfDrawingSquare,
      len: 3,
      index: 0,
      color: "red",
      wildcard: wildcard
    };
    let drawingArea = new Wireframe(parameters);

    wildcard = {
      shouldBeSquare: false,
      shrinkAmountWidth: 0.9,
      shrinkAmountHeight: 0.9
    };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: h,
      len: 3,
      index: 2,
      wildcard: wildcard
    };
    let controlsArea = new Wireframe(parameters);

    let buttons = [];
    for (let i = 0; i < 4; i++) {
      wildcard = {
        shouldBeSquare: false,
        shrinkAmountWidth: w > h ? 0.5 : 0.9,
        shrinkAmountHeight: w > h ? 0.5 : 0.3
      };

      if (i === 0) {
        wildcard.string = "PEN";
      } else if (i === 1) {
        wildcard.string = "UNDO";
      } else if (i === 2) {
        wildcard.string = "CLEAR";
      } else {
        wildcard.string = "SUBMIT";
      }
      parameters = {
        p: p,
        windowWidth: w,
        windowHeight: h,
        row: w > h,
        len: w > h ? 4 : 3,
        offsetY: w < h ? -controlsArea.height / 3 : 0,
        index: i,
        wildcard: wildcard,
        parent: controlsArea
      };
      let button = new Wireframe(parameters);
      buttons.push(button);
    }
    wildcard = {
      shouldBeSquare: false,
      shrinkAmountWidth: 0.97,
      shrinkAmountHeight: 0.9,
      string: "SUBMIT"
    };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: h,
      row: true,
      len: 3,
      offsetY: -controlsArea.height / 4,
      index: 2,
      wildcard: wildcard,
      parent: controlsArea
    };
    let button = new Wireframe(parameters);
    buttons.push(button);

    //// ---- - - - - - - - -
    //// START OF DRAWN UI ELEMENTS
    let _ui = [];
    let x, y, width, height, drawingMode, currentStroke, strokes;
    drawingMode = true;
    currentStroke = [];
    strokes = [];
    if (previousUI !== undefined) {
      if (previousUI.drawing) {
        x = previousUI.drawing.x;
        y = previousUI.drawing.y;
        width = previousUI.drawing.width;
        height = previousUI.drawing.height;
        drawingMode = previousUI.drawing.drawingMode
          ? previousUI.drawing.drawingMode
          : true;
        currentStroke = previousUI.drawing.currentStroke
          ? previousUI.drawing.currentStroke
          : [];
        strokes = previousUI.drawing.strokes ? previousUI.drawing.strokes : [];
      }
    }
    parameters = {
      p: p,
      objectToMirror: drawingArea,
      x: x,
      y: y,
      width: width,
      height: height,
      w: w,
      h: h,
      color: "lightgrey",
      lerpSpeed: windowResized ? 0.3 : 0.1
    };
    this.drawing = new DrawingContainer(parameters);
    this.drawing.setCurrentStroke(currentStroke);
    this.drawing.setStrokes(strokes);
    this.drawing.setFill(true);
    this.drawing.setLengthOfDrawingSquare(lengthOfDrawingSquare);
    let performClickOnce = false;
    this.drawing.setClickType(performClickOnce);
    this.drawing.penMode = drawingMode;
    this.drawing.mouseClickfunc = this.drawing.penMode
      ? this.buildStroke
      : this.removeStroke;
    _ui.push(this.drawing);
    for (let i = 0; i < 4; i++) {
      if (previousUI) {
        if (previousUI.buttons) {
          if (previousUI.buttons[i]) {
            x = previousUI.buttons[i].x;
            y = previousUI.buttons[i].y;
            width = previousUI.buttons[i].width;
            height = previousUI.buttons[i].height;
          }
        }
      }
      let submitButtonMirror = buttons[i];
      // submit button logic
      if (i === 3) {
        submitButtonMirror = w > h ? buttons[3] : buttons[4];
      }
      let fontSize = w > h ? button.width / 10 : button.width / 20;
      wildcard = { fontSize: fontSize, numberOfLines: 0.8 };
      parameters = {
        p: p,
        objectToMirror: submitButtonMirror,
        x: x,
        y: y,
        row: true,
        width: width,
        height: height,
        wildcard: wildcard
      };
      this.buttons[i] = new TextBox(parameters);
      this.buttons[i].setInteractivity(true);
      this.buttons[i].setStroke(true);
      this.buttons[i].setFill(true);
      this.buttons[i].setColor("white");
      this.buttons[i].clickedColor = p.color(244, 129, 130);
      this.buttons[i].setTextColor("black");
      performClickOnce = true;
      this.buttons[i].setClickType(performClickOnce);
      // submit button logic
      let buttonString;
      if (i === 0) {
        buttonString = this.drawing.penMode ? "ERASER" : "PEN";
      } else {
        buttonString = buttons[i].wildcard.string;
      }
      this.buttons[i].setString(buttonString);
      _ui.push(this.buttons[i]);
    }
    // PEN
    let func = () => {
      this.toggleTool(this.buttons[0]);
    };
    this.buttons[0].mouseClickfunc = func;
    // UNDO
    this.buttons[1].mouseClickfunc = this.undoLastStroke;
    // CLEAR
    this.buttons[2].mouseClickfunc = this.clearStrokes;
    // SUBMIT
    let submitFunc = () => {
      setTimeout(() => {
        // flattens the 2d array of strokes
        // into a 1d array of vertices

        // removes repeated vertices.
        // (leaving in repeated strokes does add the element of time to
        // each drawing as slower-drawn strokes
        // have more repeated vertices.)
        // this really should be done inside the DrawingContainer object
        // as the user is drawing.
        if (this.drawing) {
          if (this.drawing.strokes && !this.drawing.userIsDrawingOrErasing) {
            let drawingData = [];
            let vertexX = undefined;
            let vertexY = undefined;
            let vertexString = undefined;
            let mySet = new Set();
            for (let i = 0; i < this.drawing.strokes.length; i++) {
              for (let j = 0; j < this.drawing.strokes[i].length; j++) {
                vertexX = this.drawing.strokes[i][j].x.toString();
                vertexY = this.drawing.strokes[i][j].y.toString();
                vertexString = vertexX + vertexY;
                if (!mySet.has(vertexString)) {
                  mySet.add(vertexString);
                  drawingData.push(this.drawing.strokes[i][j]);
                }
              }
            }
            REACT_APP.handleSubmitDrawing(drawingData);
            changeView();
          }
        }
      }, 200);
    };
    this.buttons[3].mouseClickfunc = submitFunc;

    let text = "Click here to draw!";
    if (previousUI !== undefined) {
      if (previousUI.instructions) {
        x = previousUI.instructions.x;
        y = previousUI.instructions.y;
        width = previousUI.instructions.width;
        height = previousUI.instructions.height;
        text = previousUI.instructions.text;
      }
    }
    parameters = {
      p: p,
      objectToMirror: drawingArea,
      x: x,
      y: y,
      width: width,
      height: height,
      w: w,
      h: h,
      wildcard: { text: text, fontSize: drawingArea.width / 15 }
    };
    this.instructions = new TextBox(parameters);
    // this.instructions.setString("Click here to draw!")
    // this.instructions.setFontSize(drawingArea.width/15)
    performClickOnce = true;
    this.instructions.setClickType(performClickOnce);
    this.instructions.mouseClickfunc = () => {
      this.instructions.setString("");
    };

    _ui.push(this.instructions);

    return _ui;
  }
}
