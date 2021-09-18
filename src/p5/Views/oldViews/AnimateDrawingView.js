import Wireframe from "../uiClasses/Wireframe";
import AnimateDrawingContainer from "../uiClasses/AnimateDrawingContainer";
import TextBox from "../uiClasses/TextBox";

export default class AnimateDrawingView {
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
      let buttonString = this.drawing.penMode
        ? "SELECT SECTION"
        : "DRAW NEXT POSITION";
      buttonObject.setString(buttonString);
      this.drawing.mouseClickfunc = this.drawing.penMode
        ? this.buildStroke
        : this.removeStroke;
      this.drawing.ink =
        this.drawing.animationGroups[this.drawing.currentAnimationGroupIndex]
          .startPositions.length -
        this.drawing.animationGroups[this.drawing.currentAnimationGroupIndex]
          .endPositions.length;
    }
  }
  toggleMode(buttonObject) {
    if (this.drawing) {
      this.drawing.buildAnimationModeIsToggled = !this.drawing
        .buildAnimationModeIsToggled;
      let buttonString = this.drawing.buildAnimationModeIsToggled
        ? "SHOW ANIMATON"
        : "BUILD ANIMATON";
      buttonObject.setString(buttonString);
      if (!this.drawing.buildAnimationModeIsToggled) {
        this.drawing.setDrawnVerticesStartingPostions();
      } else {
        this.drawing.incrementDrawingGroupIndex();
      }
      console.log(
        this.drawing.animationGroups,
        this.drawing.currentAnimationGroupIndex
      );
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
      if (this.drawing.ink) {
        let vertice = {
          x:
            (this.drawing.p.mouseX - this.drawing.x) /
            this.drawing.lengthOfDrawingSquare,
          y:
            (this.drawing.p.mouseY - this.drawing.y) /
            this.drawing.lengthOfDrawingSquare,
          finished: false
        };
        this.drawing.animationGroups[
          this.drawing.currentAnimationGroupIndex
        ].endPositions.push(vertice);
        this.drawing.ink--;
      }
    }
  }
  removeStroke() {
    if (this.drawing) {
      if (this.drawing.submittedStrokes) {
        for (let i = 0; i < this.drawing.submittedStrokes.length; i++) {
          if (
            this.drawing.p.mouseX >
              this.drawing.x +
                this.drawing.submittedStrokes[i].x *
                  this.drawing.lengthOfDrawingSquare -
                this.drawing.lengthOfDrawingSquare * 0.01 &&
            this.drawing.p.mouseX <
              this.drawing.x +
                this.drawing.submittedStrokes[i].x *
                  this.drawing.lengthOfDrawingSquare +
                this.drawing.lengthOfDrawingSquare * 0.01 &&
            this.drawing.p.mouseY >
              this.drawing.y +
                this.drawing.submittedStrokes[i].y *
                  this.drawing.lengthOfDrawingSquare -
                this.drawing.lengthOfDrawingSquare * 0.01 &&
            this.drawing.p.mouseY <
              this.drawing.y +
                this.drawing.submittedStrokes[i].y *
                  this.drawing.lengthOfDrawingSquare +
                this.drawing.lengthOfDrawingSquare * 0.01
          ) {
            this.drawing.submittedStrokes[i].finished = false;
            this.drawing.animationGroups[
              this.drawing.currentAnimationGroupIndex
            ].startPositions.push(this.drawing.submittedStrokes[i]);
            this.drawing.submittedStrokes.splice(i, 1);
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
        wildcard.string = "SELECT SECTION";
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
    this.drawing = new AnimateDrawingContainer(parameters);
    let submittedStrokes = REACT_APP.state.drawingData;
    this.drawing.setSubmittedStrokes(submittedStrokes);
    // this.drawing.setCurrentStroke(currentStroke);
    // this.drawing.setStrokes(strokes);
    // this.drawing.setFill(true)
    this.drawing.setStroke(true);

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
      this.buttons[i].setTextColor("black");
      performClickOnce = true;
      this.buttons[i].setClickType(performClickOnce);
      // submit button logic
      let buttonString;
      if (i === 0) {
        buttonString = this.drawing.penMode
          ? "SELECT SECTION"
          : "DRAW NEXT POSITION";
      } else if (i === 1) {
        buttonString = this.drawing.buildAnimationModeIsToggled
          ? "SHOW ANIMATON"
          : "BUILD ANIMATON";
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
    // // UNDO
    // this.buttons[1].mouseClickfunc = ()=>{this.undoLastStroke;
    // CLEAR
    this.buttons[2].mouseClickfunc = this.clearStrokes;
    // SUBMIT
    let submitFunc = () => {
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

    // TOGGLE MODE BUTTON
    this.buttons[1].mouseClickfunc = () => {
      this.toggleMode(this.buttons[1]);
    };

    return _ui;
  }
}

// import Wireframe from '../../uiClasses/Wireframe';
// import Mirror from '../../uiClasses/Mirror';
//
// export default class testView {
//     constructor(){
//         this.mirrorTest1 = undefined
//         this.mirrorTest2 = undefined
//         this.mirrorTest3 = undefined
//         this.mirrorTest4 = undefined
//         this.mirrorTest5 = undefined
//     }
//     getUI(previousUI){return this}
//     setUI(p,w,h,REACT_APP,windowResized,previousUI){
//         let wireFrameElements = []
//         let _ui = []
//
//
//         let wildcard;
//         let parameters;
//         let wireFrame
//         for (let i = 0; i < 3; i++){
//             let color = i%2 ?"orange" :"orange"
//             wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1, string:"break the screen into 3 rows"}
//             parameters = { p:p,
//                                windowWidth: w,
//                                windowHeight: h,
//                                row:h>w,
//                                len:3,
//                                index:i,
//                                color:color,
//                                wildcard:wildcard,
//                              }
//             wireFrame = new Wireframe(parameters)
//             wireFrameElements.push(wireFrame)
//         }
//
//         wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight:  h,
//                            width: w>h?w:w*11/12,
//                           height:  w>h?h*11/12:h,
//
//                           offsetX:w>h?-w*1/6:w*1/24,
//                           offsetY:w>h?h*1/24:-h*1/6,
//
//                            color:"red",
//                            wildcard:wildcard,
//                            // row:w<h,
//                          }
//         let topTwoThirdsOfView = new Wireframe(parameters)
//         _ui.push(topTwoThirdsOfView)
//
//         wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.9, string:"this is the inputform container"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:w>h*3,
//                            color:"green",
//                            wildcard:wildcard,
//                            parent:wireFrameElements[2],
//                          }
//         let inputform = new Wireframe(parameters)
//         _ui.push(inputform)
//
//         // wireFrameElements.push(inputform)
//
//         wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:true,
//                            color:"orange",
//                            len:3,
//                            index:0,
//                            wildcard:wildcard,
//                            parent:inputform,
//                          }
//         let inputformContainer1 = new Wireframe(parameters)
//         // _ui.push(inputformContainer1)
//
//         wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:true,
//                            color:"red",
//                            len:3,
//                            index:2,
//                            wildcard:wildcard,
//                            parent:inputform,
//                          }
//         let inputformContainer2 = new Wireframe(parameters)
//         // _ui.push(inputformContainer2)
//
//         wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.95, string:"<< Back"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:false,
//                            color:"pink",
//                            len:2,
//                            index:0,
//                            wildcard:wildcard,
//                            parent:inputformContainer2,
//                          }
//         let backButton = new Wireframe(parameters)
//         // _ui.push(backButton)
//
//         wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.95, string:"Submit"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:false,
//                            color:"purple",
//                            len:2,
//                            index:1,
//                            wildcard:wildcard,
//                            parent:inputformContainer2,
//                          }
//         let submitButton = new Wireframe(parameters)
//         // _ui.push(submitButton)
//
//         wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"I drew a... (click me and type)"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            // height:20,
//                            row:true,
//                            color:"purple",
//                            wildcard:wildcard,
//                            parent:inputformContainer1,
//                          }
//         let input = new Wireframe(parameters)
//         // _ui.push(input)
//
//         wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h*2/3,
//                            color:"green",
//                            wildcard:wildcard,
//                          }
//         wireFrame = new Wireframe(parameters)
//         // _ui.push(wireFrame)
//
//         // let drawingSquareSide = w>h?h*(2/3):w*(2/3)
//         wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:1,string:"[user drawing just submitted]"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            // width:drawingSquareSide,
//                            // height:drawingSquareSide,
//                            color:"red",
//                            wildcard:wildcard,
//                            parent:topTwoThirdsOfView,//REACT_APP.state.isMobile?wireFrameElements[0]:wireFrame,
//                          }
//         let drawing = new Wireframe(parameters)
//         // _ui.push(drawing)
//
//
//         let x,y,width,height;
//         if (previousUI){
//             if (previousUI.mirrorTest1){
//                 x = previousUI.mirrorTest1.x;
//                 y = previousUI.mirrorTest1.y;
//                 width = previousUI.mirrorTest1.width;
//                 height = previousUI.mirrorTest1.height;
//             }
//         }
//         parameters = {p:p,objectToMirror:backButton,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
//         this.mirrorTest1 = new Mirror(parameters)
//         _ui.push(this.mirrorTest1)
//
//         if (previousUI){
//             if (previousUI.mirrorTest2){
//                 x = previousUI.mirrorTest2.x;
//                 y = previousUI.mirrorTest2.y;
//                 width = previousUI.mirrorTest2.width;
//                 height = previousUI.mirrorTest2.height;
//             }
//         }
//         parameters = {p:p,objectToMirror:submitButton,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
//         this.mirrorTest2 = new Mirror(parameters)
//         _ui.push(this.mirrorTest2)
//
//         if (previousUI){
//             if (previousUI.mirrorTest3){
//                 x = previousUI.mirrorTest3.x;
//                 y = previousUI.mirrorTest3.y;
//                 width = previousUI.mirrorTest3.width;
//                 height = previousUI.mirrorTest3.height;
//             }
//         }
//         parameters = {p:p,objectToMirror:input,x:x,y:y,width:width,height:height, mouseClickfunc:REACT_APP.testViewSwitch}
//         this.mirrorTest3 = new Mirror(parameters)
//         _ui.push(this.mirrorTest3)
//
//         if (previousUI){
//             if (previousUI.mirrorTest4){
//                 x = previousUI.mirrorTest4.x;
//                 y = previousUI.mirrorTest4.y;
//                 width = previousUI.mirrorTest4.width;
//                 height = previousUI.mirrorTest4.height;
//             }
//         }
//         parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
//         this.mirrorTest4 = new Mirror(parameters)
//         _ui.push(this.mirrorTest4)
//
//         return _ui;
//     }
// }
