import TextBox from "../uiClasses/TextBox";
import DrawingContainer from "../uiClasses/DrawingContainer";
import Wireframe from "../uiClasses/Wireframe";
import DisplayDrawingContainer from "../uiClasses/DisplayDrawingContainer";

export default class MenuView {
  constructor() {
    this.drawing = undefined;
    // title ui object
    this.title = undefined;

    this.titleText = "Baron von Tessan";
    this.titleTextIndex = 0;

    // timeoutVariables
    this.timeOutVar1 = undefined;
    this.timeOutVar2 = undefined;

    // button ui objects
    this.enterSiteButton = undefined;
    this.justDrawButton = undefined;
    this.justWatchDrawingsButton = undefined;
    this.justWannaJudgePplButton = undefined;

    // background drawing ui objects
    this.backgroundDrawing1 = undefined;
    this.backgroundDrawing2 = undefined;
    this.backgroundDrawing3 = undefined;
    this.backgroundDrawing4 = undefined;
    this.screenHasSettled = false;

    this.buildStroke = this.buildStroke.bind(this);
    this.clearStrokes = this.clearStrokes.bind(this);
  }
  clearStrokes() {
    if (this.drawing) {
      if (this.drawing.strokes && !this.drawing.userIsDrawingOrErasing) {
        this.drawing.strokes = [];
        this.drawing.drawingHasBeenDrawn = false;
        this.drawing.submittedStrokeIndex = 0;
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
  addCharacterToTitle() {
    if (this.titleTextIndex < this.titleText.length + 1) {
      let allOfDialog = this.titleText;
      let dialogString = allOfDialog.slice(0, this.titleTextIndex++);
      if (this.title) {
        let hasCursor = this.title.text.includes("|");
        dialogString = hasCursor ? dialogString + "|" : dialogString;
        this.title.setString(dialogString);
        this.timeOutVar1 = setTimeout(() => {
          this.addCharacterToTitle();
        }, 200);
      }
    } else {
      clearTimeout(this.timeOutVar1);
      return;
    }
  }
  toggleShowCursor(bool) {
    if (this.title) {
      bool = !bool;
      if (bool) {
        if (!this.title.text.includes("|")) {
          this.title.text += "|";
        } else {
          this.title.text = this.title.text.replace("|", "");
        }
      }
    }
    this.timeOutVar2 = setTimeout(() => {
      this.toggleShowCursor(bool);
    }, 700);
  }
  // returns true if boxes overlap
  isOverlapping(box1, box2) {
    // https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b

    // no horizontal overlap
    if (box1.x >= box2.x + box2.width || box2.x >= box1.x + box1.width)
      return false;
    // no vertical overlap
    if (box1.y >= box2.y + box2.height || box2.y >= box1.y + box1.height)
      return false;

    return true;
  }
  getUI(previousUI) {
    return this;
  }
  setUI(p, w, h, REACT_APP, windowResized, previousUI, changeView) {
    let _ui = [];
    let objectsTotest = [];
    let wildcard;
    let parameters;
    /// ---- ******** BEGIN WIREFRAME OBJECTS
    // wireframe objects are not drawn to screen.
    wildcard = { shrinkAmountWidth: 0.99, shrinkAmountHeight: 0.99 };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: h,
      width: w > h ? w : h,
      offsetX: 0,
      row: true,
      wildcard: wildcard
    };
    let backgroundDrawingContainter = new Wireframe(parameters);
    wildcard = { shrinkAmountWidth: 1, shrinkAmountHeight: 0.9 };
    parameters = {
      p: p,
      windowWidth: w,
      windowHeight: h,
      width: w > 800 ? 800 : w,
      offsetX: w > 800 ? (w - 800) / 2 : 0,
      row: true,
      wildcard: wildcard
    };
    let menuContainer = new Wireframe(parameters);
    let menuSections = [];
    let section;
    for (let i = 0; i < 5; i++) {
      wildcard = { shrinkAmountWidth: 0.8, shrinkAmountHeight: 0.6 };
      parameters = {
        p: p,
        windowWidth: w,
        windowHeight: h,
        row: true,
        parent: menuContainer,
        len: 5,
        index: i,
        wildcard: wildcard,
        // color:i===0?"black":undefined,
        offsetY: i === 0 ? -menuContainer.height / 24 : 0
      };
      section = new Wireframe(parameters);
      menuSections.push(section);
    }
    if (w > 1100) {
      for (let i = 0; i < 2; i++) {
        let testWidth = w < h ? w / 6 : h / 6;
        let vertices = [
          {
            offsetX: w - testWidth - testWidth,
            offsetY: Math.random() * (h - testWidth - h / 4 + 1) + h / 4
          },
          {
            offsetX: (Math.random() * w) / 10,
            offsetY: Math.random() * (h - testWidth - h / 4 + 1) + h / 4
          },
          {
            offsetX: w - testWidth,
            offsetY: Math.random() * (h / 2 - testWidth - h / 4 + 1) + h / 4
          },
          {
            offsetX: (Math.random() * w) / 10,
            offsetY: Math.random() * (h - testWidth - h / 4 + 1) + h / 4
          }
        ];

        wildcard = { shrinkAmountWidth: 1, shrinkAmountHeight: 0.9 };
        parameters = {
          p: p,
          windowWidth: w,
          windowHeight: h,
          width: w > h ? w / 6 : h / 6,
          height: w > h ? w / 6 : h / 6,
          offsetX:
            i >= vertices.length
              ? Math.random() * (w - testWidth + 1)
              : vertices[i].offsetX,
          offsetY:
            i >= vertices.length
              ? Math.random() * (h - testWidth - h / 5 + 1) + h / 5
              : vertices[i].offsetY,
          row: true,
          color: p.color(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
          ),
          wildcard: wildcard
        };
        let testWireframe = new Wireframe(parameters);
        let isOverlapping = false;
        for (let i = 0; i < objectsTotest.length; i++) {
          if (!isOverlapping) {
            isOverlapping = this.isOverlapping(objectsTotest[i], testWireframe);
          }
        }
        if (!isOverlapping) {
          objectsTotest.push(testWireframe);
          // _ui.push(testWireframe)
        }
      }
    }
    /// ---- ******** END WIREFRAME OBJECTS

    /// ---- ******** BEGIN _UI OBJECTS
    // _ui objects are drawn to screen and mirror a wireframe object
    const instantiateBackgroundDrawings = () => {
      if (REACT_APP.state.response1.length) {
        for (let i = 0; i < objectsTotest.length; i++) {
          let drawingHasBeenDrawn = false;
          let strokeIndex = 0;
          if (i === 0) {
            if (previousUI) {
              if (previousUI.backgroundDrawing1) {
                x = previousUI.backgroundDrawing1.x;
                y = previousUI.backgroundDrawing1.y;
                width = previousUI.backgroundDrawing1.width;
                height = previousUI.backgroundDrawing1.height;
                drawingHasBeenDrawn =
                  previousUI.backgroundDrawing1.drawingHasBeenDrawn;
                strokeIndex =
                  previousUI.backgroundDrawing1.submittedStrokeIndex;
                clearTimeout(previousUI.backgroundDrawing1.timeOut1);
                clearTimeout(previousUI.backgroundDrawing1.timeOut2);
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
              objectToMirror: objectsTotest[i],
              x: x,
              y: y,
              width: width,
              height: height,
              wildcard: wildcard,
              lerpSpeed: 0.01
            };
            this.backgroundDrawing1 = new DisplayDrawingContainer(parameters);
            this.backgroundDrawing1.setLengthOfDrawingSquare(
              objectsTotest[i].width
            );
            this.backgroundDrawing1.setFill(true);
            this.backgroundDrawing1.setSubmittedStrokes(
              REACT_APP.state.response1[i].vertices
            );
            this.backgroundDrawing1.submittedStrokeIndex = strokeIndex;
            this.backgroundDrawing1.redrawStrokes();

            _ui.push(this.backgroundDrawing1);
          } else if (i === 1) {
            if (previousUI) {
              if (previousUI.backgroundDrawing2) {
                x = previousUI.backgroundDrawing2.x;
                y = previousUI.backgroundDrawing2.y;
                width = previousUI.backgroundDrawing2.width;
                height = previousUI.backgroundDrawing2.height;
                drawingHasBeenDrawn =
                  previousUI.backgroundDrawing2.drawingHasBeenDrawn;
                strokeIndex =
                  previousUI.backgroundDrawing2.submittedStrokeIndex;
                clearTimeout(previousUI.backgroundDrawing2.timeOut1);
                clearTimeout(previousUI.backgroundDrawing2.timeOut2);
              }
            }
            wildcard = {
              windowResized: windowResized,
              drawingHasBeenDrawn: drawingHasBeenDrawn
            }; //,strokeColor:objectsTotest[i].color}
            parameters = {
              p: p,
              w: w,
              h: h,
              objectToMirror: objectsTotest[i],
              x: x,
              y: y,
              width: width,
              height: height,
              wildcard: wildcard,
              lerpSpeed: 0.01
            }; //,color:"lightgrey"}
            this.backgroundDrawing2 = new DisplayDrawingContainer(parameters);
            this.backgroundDrawing2.setLengthOfDrawingSquare(
              objectsTotest[i].width
            );
            this.backgroundDrawing2.setFill(true);
            this.backgroundDrawing2.setSubmittedStrokes(
              REACT_APP.state.response1[i].vertices
            );
            this.backgroundDrawing2.submittedStrokeIndex = strokeIndex;
            this.backgroundDrawing2.redrawStrokes();

            _ui.push(this.backgroundDrawing2);
          } else if (i === 2) {
            if (previousUI) {
              if (previousUI.backgroundDrawing3) {
                x = previousUI.backgroundDrawing3.x;
                y = previousUI.backgroundDrawing3.y;
                width = previousUI.backgroundDrawing3.width;
                height = previousUI.backgroundDrawing3.height;
                drawingHasBeenDrawn =
                  previousUI.backgroundDrawing3.drawingHasBeenDrawn;
                strokeIndex =
                  previousUI.backgroundDrawing3.submittedStrokeIndex;
                clearTimeout(previousUI.backgroundDrawing3.timeOut1);
                clearTimeout(previousUI.backgroundDrawing3.timeOut2);
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
              objectToMirror: objectsTotest[i],
              x: x,
              y: y,
              width: width,
              height: height,
              wildcard: wildcard,
              lerpSpeed: 0.01
            };
            this.backgroundDrawing3 = new DisplayDrawingContainer(parameters);
            this.backgroundDrawing3.setLengthOfDrawingSquare(
              objectsTotest[i].width
            );
            this.backgroundDrawing3.setFill(true);
            this.backgroundDrawing3.setSubmittedStrokes(
              REACT_APP.state.response1[i].vertices
            );
            this.backgroundDrawing3.submittedStrokeIndex = strokeIndex;
            this.backgroundDrawing3.redrawStrokes();

            _ui.push(this.backgroundDrawing3);
          } else if (i === 3) {
            if (previousUI) {
              if (previousUI.backgroundDrawing4) {
                x = previousUI.backgroundDrawing4.x;
                y = previousUI.backgroundDrawing4.y;
                width = previousUI.backgroundDrawing4.width;
                height = previousUI.backgroundDrawing4.height;
                drawingHasBeenDrawn =
                  previousUI.backgroundDrawing4.drawingHasBeenDrawn;
                strokeIndex =
                  previousUI.backgroundDrawing4.submittedStrokeIndex;
                clearTimeout(previousUI.backgroundDrawing4.timeOut1);
                clearTimeout(previousUI.backgroundDrawing4.timeOut2);
              }
            }
            wildcard = {
              windowResized: windowResized,
              drawingHasBeenDrawn: drawingHasBeenDrawn
            };
            this.backgroundDrawing4 = new DisplayDrawingContainer(parameters);
            this.backgroundDrawing4.setLengthOfDrawingSquare(
              objectsTotest[i].width
            );
            this.backgroundDrawing4.setFill(true);
            this.backgroundDrawing4.setSubmittedStrokes(
              REACT_APP.state.response1[i].vertices
            );
            this.backgroundDrawing4.submittedStrokeIndex = strokeIndex;
            this.backgroundDrawing4.redrawStrokes();

            _ui.push(this.backgroundDrawing4);
          }
        }
      }
    };
    let x,
      y,
      width,
      height,
      objectToMirror,
      drawingMode,
      currentStroke,
      strokes;
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
      objectToMirror: backgroundDrawingContainter,
      x: x,
      y: y,
      width: width,
      height: height,
      w: w,
      h: h,
      color: "white",
      // lerpSpeed: windowResized ? 0.3 : 0.1
      lerpSpeed: 1
    };
    // BACKGROUND_DRAW
    this.drawing = new DrawingContainer(parameters);
    this.drawing.setCurrentStroke(currentStroke);
    this.drawing.setStrokes(strokes);
    // this.drawing.setStroke(true);
    this.drawing.setFill(true);
    this.drawing.setLengthOfDrawingSquare(menuContainer.width);
    let performClickOnce = false;
    this.drawing.setClickType(performClickOnce);
    this.drawing.penMode = drawingMode;
    this.drawing.mouseClickfunc = this.drawing.penMode
      ? this.buildStroke
      : this.removeStroke;
    _ui.push(this.drawing);
    if (!windowResized) {
      setTimeout(() => {
        instantiateBackgroundDrawings();
      }, 200);
    } else {
      instantiateBackgroundDrawings();
    }
    let text = "";
    let fontSize;
    for (let i = 0; i < menuSections.length; i++) {
      if (i === 0) {
        // TITLE
        if (previousUI) {
          if (previousUI.title) {
            x = previousUI.title.x;
            y = previousUI.title.y;
            width = previousUI.title.width;
            height = previousUI.title.height;
            text = previousUI.title.text;
          }
        }
        objectToMirror = menuSections[i];
        wildcard = {
          text: text,
          numberOfLines: 0.8,
          fontSize: w > h ? objectToMirror.width / 13 : objectToMirror.width / 8
        };
        parameters = {
          p: p,
          w: w,
          h: h,
          objectToMirror: objectToMirror,
          x: x,
          y: y,
          width: width,
          height: height,
          wildcard: wildcard
        };
        this.title = new TextBox(parameters);
        _ui.push(this.title);
      } else {
        // BUTTONS
        if (i === 1) {
          // 1: Enter Site
          if (previousUI) {
            if (previousUI.enterSiteButton) {
              x = previousUI.enterSiteButton.x;
              y = previousUI.enterSiteButton.y;
              width = previousUI.enterSiteButton.width;
              height = previousUI.enterSiteButton.height;
            }
          }
          objectToMirror = menuSections[i];
          wildcard = { numberOfLines: 4 };
          parameters = {
            p: p,
            w: w,
            h: h,
            objectToMirror: objectToMirror,
            x: x,
            y: y,
            width: width,
            height: height,
            wildcard: wildcard
          };
          this.enterSiteButton = new TextBox(parameters);
          let doOnce = true;
          this.enterSiteButton.setClickType(doOnce);
          let isInteractive = true;
          this.enterSiteButton.setInteractivity(isInteractive);
          this.enterSiteButton.setStroke(true);
          this.enterSiteButton.setFill(true);
          this.enterSiteButton.setColor("white");
          this.enterSiteButton.setTextColor("black");
          this.enterSiteButton.clickedColor = p.color(244, 129, 130);
          this.enterSiteButton.mouseClickfunc = () => {
            setTimeout(() => {
              if (this.drawing) {
                if (
                  this.drawing.strokes &&
                  !this.drawing.userIsDrawingOrErasing
                ) {
                  this.clearStrokes();
                  changeView();
                }
              }
            }, 250);
          };
          this.enterSiteButton.setString("ENTER SITE");

          if (REACT_APP.state.isMobile) {
            fontSize =
              w > h ? objectToMirror.height / 2 : objectToMirror.height / 3;
            this.enterSiteButton.setFontSize(fontSize);
          }
          _ui.push(this.enterSiteButton);
        } else if (i === 2) {
          // 2: I just want to draw!
          if (previousUI) {
            if (previousUI.justDrawButton) {
              x = previousUI.justDrawButton.x;
              y = previousUI.justDrawButton.y;
              width = previousUI.justDrawButton.width;
              height = previousUI.justDrawButton.height;
            }
          }
          objectToMirror = menuSections[i];
          wildcard = { numberOfLines: 3 };
          parameters = {
            p: p,
            w: w,
            h: h,
            objectToMirror: objectToMirror,
            x: x,
            y: y,
            width: width,
            height: height,
            wildcard: wildcard
          };
          this.justDrawButton = new TextBox(parameters);
          let doOnce = true;
          this.justDrawButton.setClickType(doOnce);
          let isInteractive = true;
          this.justDrawButton.setInteractivity(isInteractive);
          this.justDrawButton.setStroke(true);
          this.justDrawButton.setFill(true);
          this.justDrawButton.setColor("white");
          this.justDrawButton.setTextColor("black");
          this.justDrawButton.clickedColor = p.color(244, 129, 130);
          this.justDrawButton.mouseClickfunc = () => {
            setTimeout(() => {
              if (this.drawing) {
                if (
                  this.drawing.strokes &&
                  !this.drawing.userIsDrawingOrErasing
                ) {
                  this.clearStrokes();
                  changeView(4, 6);
                }
              }
            }, 250);
          };
          this.justDrawButton.setString("DRAW");
          this.justDrawButton.setFontSize(fontSize);
          _ui.push(this.justDrawButton);
        } else if (i === 3) {
          // 3: I want to see what other people drew!
          if (previousUI) {
            if (previousUI.justWatchDrawingsButton) {
              x = previousUI.justWatchDrawingsButton.x;
              y = previousUI.justWatchDrawingsButton.y;
              width = previousUI.justWatchDrawingsButton.width;
              height = previousUI.justWatchDrawingsButton.height;
            }
          }
          objectToMirror = menuSections[i];
          wildcard = { numberOfLines: 3 };
          parameters = {
            p: p,
            w: w,
            h: h,
            objectToMirror: objectToMirror,
            x: x,
            y: y,
            width: width,
            height: height,
            wildcard: wildcard
          };
          this.justWatchDrawingsButton = new TextBox(parameters);
          let doOnce = true;
          this.justWatchDrawingsButton.setClickType(doOnce);
          let isInteractive = true;
          this.justWatchDrawingsButton.setInteractivity(isInteractive);
          this.justWatchDrawingsButton.setStroke(true);
          this.justWatchDrawingsButton.setFill(true);
          this.justWatchDrawingsButton.setColor("white");
          this.justWatchDrawingsButton.setTextColor("black");
          this.justWatchDrawingsButton.clickedColor = p.color(244, 129, 130);
          this.justWatchDrawingsButton.mouseClickfunc = () => {
            setTimeout(() => {
              if (this.drawing) {
                if (
                  this.drawing.strokes &&
                  !this.drawing.userIsDrawingOrErasing
                ) {
                  this.clearStrokes();
                  changeView(8, 9);
                }
              }
            }, 250);
          };
          this.justWatchDrawingsButton.setString("VIEW DRAWINGS");
          this.justWatchDrawingsButton.setFontSize(fontSize);
          _ui.push(this.justWatchDrawingsButton);
        } else if (i === 4) {
          // 4: I just want to judge other people.
          if (previousUI) {
            if (previousUI.justWannaJudgePplButton) {
              x = previousUI.justWannaJudgePplButton.x;
              y = previousUI.justWannaJudgePplButton.y;
              width = previousUI.justWannaJudgePplButton.width;
              height = previousUI.justWannaJudgePplButton.height;
            }
          }
          objectToMirror = menuSections[i];
          wildcard = { numberOfLines: 3 };
          parameters = {
            p: p,
            w: w,
            h: h,
            objectToMirror: objectToMirror,
            x: x,
            y: y,
            width: width,
            height: height,
            wildcard: wildcard
          };
          this.justWannaJudgePplButton = new TextBox(parameters);
          let doOnce = true;
          this.justWannaJudgePplButton.setClickType(doOnce);
          let isInteractive = true;
          this.justWannaJudgePplButton.setInteractivity(isInteractive);
          this.justWannaJudgePplButton.setStroke(true);
          this.justWannaJudgePplButton.setFill(true);
          this.justWannaJudgePplButton.setColor("white");
          this.justWannaJudgePplButton.setTextColor("black");
          this.justWannaJudgePplButton.clickedColor = p.color(244, 129, 130);
          this.justWannaJudgePplButton.mouseClickfunc = () => {
            setTimeout(() => {
              if (this.drawing) {
                if (
                  this.drawing.strokes &&
                  !this.drawing.userIsDrawingOrErasing
                ) {
                  this.clearStrokes();
                  changeView(7, 8);
                }
              }
            }, 250);
          };
          this.justWannaJudgePplButton.setString("LIKE DRAWINGS");
          this.justWannaJudgePplButton.setFontSize(fontSize);
          _ui.push(this.justWannaJudgePplButton);
        }
      }
    }
    // only called once when the view
    // is loaded for the first time.
    if (!windowResized) {
      this.addCharacterToTitle();
      this.toggleShowCursor(true);
    }
    // if all of the characters of the title have been added
    // set the title to display all of the text
    // (only an issue if the user resizes the window after
    // 'addCharacterToTitle' has finished.)
    if (this.titleTextIndex >= this.titleText.length) {
      let allOfDialog = this.titleText;
      this.title.setString(allOfDialog);
    }
    return _ui;
  }
}
