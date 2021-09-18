import Wireframe from "../uiClasses/Wireframe";
import DisplayDrawingContainer from "../uiClasses/DisplayDrawingContainer";
import TextBox from "../uiClasses/TextBox";
import baronData from "../simulatedData/baronDrawingDataReduced";

export default class IntroView {
  constructor() {
    this.drawing = undefined;
    this.dialog = undefined;
    this.baronDialogIndex = 0;
    this.timeOutVar = undefined;
    this.dialogText = baronData.introDescriptionData;
    this.isDialogFinished = false;
  }
  addCharacterToDialog() {
    if (this.baronDialogIndex < this.dialogText.length) {
      this.baronDialogIndex++;
      let allOfDialog = this.dialogText;
      let dialogString = allOfDialog.slice(0, this.baronDialogIndex);
      this.dialog.setString(dialogString);
      clearTimeout(this.timeOutVar);
      this.timeOutVar = setTimeout(() => {
        this.addCharacterToDialog();
      }, 100);
    } else {
      clearTimeout(this.timeOutVar);
      this.isDialogFinished = true;
      return;
    }
  }
  getUI() {
    return this;
  }
  setUI(p, w, h, REACT_APP, windowResized, previousUI, changeView) {
    let wildcard;
    let parameters;
    /// ---- ******** BEGIN WIREFRAME OBJECTS
    // wireframe objects are not drawn to screen.
    let wireFrameElements = [];

    for (let i = 0; i < 3; i++) {
      let color = i % 2 ? "orange" : "orange";
      wildcard = {
        shrinkAmountWidth: 1,
        shrinkAmountHeight: 1,
        string: "break the screen into 3 rows"
      };
      parameters = {
        p: p,
        windowWidth: w,
        windowHeight: h,
        row: true,
        len: 3,
        index: i,
        color: color,
        wildcard: wildcard
      };
      let viewBrokenIntoThirds = new Wireframe(parameters);
      wireFrameElements.push(viewBrokenIntoThirds);
    }

    wildcard = { shrinkAmountWidth: 1, shrinkAmountHeight: 1 };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: (h * 2) / 3,
      color: "green",
      wildcard: wildcard
    };
    let topTwoThirdsOfView = new Wireframe(parameters);

    wildcard = { shrinkAmountWidth: 1, shrinkAmountHeight: 1 };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: (h * 2) / 3,
      color: "orange",
      wildcard: wildcard,
      row: false,
      len: 2,
      index: 0,
      parent: topTwoThirdsOfView
    };
    wildcard = { shrinkAmountWidth: 1, shrinkAmountHeight: 1 };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: (h * 2) / 3,
      color: "green",
      wildcard: wildcard,
      row: false,
      len: 2,
      index: 1,
      parent: topTwoThirdsOfView
    };
    let bottomThirdOfScreen = wireFrameElements[2];

    let drawingParent = topTwoThirdsOfView;

    wildcard = {
      shouldBeSquare: true,
      shrinkAmountWidth: 1,
      shrinkAmountHeight: REACT_APP.state.isMobile ? 0.9 : 1,
      string: "[user drawing just submitted]"
    };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: h,
      color: "red",
      wildcard: wildcard,
      parent: drawingParent
    };
    let drawing = new Wireframe(parameters);

    wildcard = { shrinkAmountWidth: 0.9, shrinkAmountHeight: 0.9 };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: h,
      row: true,
      color: "pink",
      wildcard: wildcard,
      parent: bottomThirdOfScreen
    };
    let dialog = new Wireframe(parameters);

    /// ---- ******** END WIREFRAME OBJECTS

    /// ---- ******** BEGIN _UI OBJECTS
    // _ui objects are drawn to screen and mirror a wireframe object
    let _ui = [];
    let x, y, width, height, text;
    if (previousUI) {
      if (previousUI.dialog) {
        x = previousUI.dialog.x;
        y = previousUI.dialog.y;
        width = previousUI.dialog.width;
        height = previousUI.dialog.height;
        text = previousUI.dialog.text;
      }
    }
    let fontSize = w > h ? dialog.width / 30 : dialog.width / 15;
    wildcard = { text: text, fontSize: fontSize, numberOfLines: 4 };
    parameters = {
      p: p,
      objectToMirror: dialog,
      x: x,
      y: y,
      width: width,
      height: height,
      wildcard: wildcard
    };
    this.dialog = new TextBox(parameters);
    this.dialog.setFill(true);

    _ui.push(this.dialog);

    if (!windowResized) {
      this.addCharacterToDialog();
    }
    if (previousUI) {
      if (previousUI.baronDialogIndex) {
        this.baronDialogIndex = previousUI.baronDialogIndex;
      }
    }
    if (this.baronDialogIndex >= this.dialogText.length) {
      let allOfDialog = this.dialogText;
      this.dialog.setString(allOfDialog);
    }

    let drawingHasBeenDrawn = false;
    let strokeIndex = 0;
    if (previousUI) {
      if (previousUI.drawing) {
        x = previousUI.drawing.x;
        y = previousUI.drawing.y;
        width = previousUI.drawing.width;
        height = previousUI.drawing.height;
        drawingHasBeenDrawn = previousUI.drawing.drawingHasBeenDrawn;
        strokeIndex = previousUI.drawing.submittedStrokeIndex;
        clearTimeout(previousUI.drawing.timeOut);
      }
    }
    wildcard = {
      windowResized: windowResized,
      drawingHasBeenDrawn: drawingHasBeenDrawn
    };

    parameters = {
      p: p,
      w: w,
      h: h,
      objectToMirror: drawing,
      x: x,
      y: y,
      width: width,
      height: height,
      color: "lightgrey",
      wildcard: wildcard,
      lerpSpeed: windowResized ? 0.3 : 0.1
    };
    this.drawing = new DisplayDrawingContainer(parameters);
    this.drawing.setLengthOfDrawingSquare(drawing.width + drawing.width * 0.11);
    this.drawing.setFill(true);
    this.drawing.setSubmittedStrokes(baronData.drawingData);
    this.drawing.submittedStrokeIndex = strokeIndex;

    let beginRedrawingStrokesFunc = () => {
      let redrawStrokes = timeOutVar => {
        if (this.drawing.drawingHasBeenDrawn) {
          if (this.drawing.loop) {
            this.drawing.drawingHasBeenDrawn = false;
            this.drawing.submittedStrokeIndex = 0;
            clearTimeout(timeOutVar);
          } else {
            if (this.isDialogFinished) {
              clearTimeout(timeOutVar);
              changeView();
              return;
            }
          }
        }
        if (
          this.drawing.submittedStrokeIndex <
          this.drawing.submittedStrokes.length
        ) {
          this.drawing.submittedStrokeIndex++;
          clearTimeout(timeOutVar);
          timeOutVar = setTimeout(redrawStrokes, 1, timeOutVar);
        } else {
          this.drawing.drawingHasBeenDrawn = true;
          // pause to display drawing.
          // then loop if this.displayDrawingSpace.loop
          // is set to true otherwise return.
          timeOutVar = setTimeout(redrawStrokes, 5000, timeOutVar);
        }
      };
      redrawStrokes();
    };

    if (!windowResized) {
      beginRedrawingStrokesFunc();
    }

    _ui.push(this.drawing);
    return _ui;
  }
}
