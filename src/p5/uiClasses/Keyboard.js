import KeyboardKey from "./KeyboardKey";
import Mirror from "./Mirror";

export default class Keyboard extends Mirror {
  constructor(parameterObject) {
    super(parameterObject);
    this.mouseClickfunc = this.searchClickedKey;
    let doOnce = true;
    this.setClickType(doOnce);
    this.referenceToInputTextBox = undefined;
    this.rowsOfKeys = [];
    this.keyLetters = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    if (parameterObject) {
      if (parameterObject.wildcard) {
        if (parameterObject.wildcard.keys) {
          this.keys = parameterObject.wildcard.keys;
        }
      }
    }
    let count = 0;
    let parameters;
    let keyboardButton;
    let x, y, width, height;
    {
      for (let i = 0; i < this.keyLetters.length; i++) {
        for (let j = 0; j < this.keyLetters[i].length; j++) {
          if (parameterObject.previousUI) {
            if (parameterObject.previousUI.keyBoard) {
              if (parameterObject.previousUI.keyBoard.rowsOfKeys) {
                if (parameterObject.previousUI.keyBoard.rowsOfKeys[count]) {
                  x = parameterObject.previousUI.keyBoard.rowsOfKeys[count].x;
                  y = parameterObject.previousUI.keyBoard.rowsOfKeys[count].y;
                  width =
                    parameterObject.previousUI.keyBoard.rowsOfKeys[count].width;
                  height =
                    parameterObject.previousUI.keyBoard.rowsOfKeys[count]
                      .height;
                }
              }
            }
          }
          parameters = {
            p: this.p,
            objectToMirror: this.keys[count++],
            x: x,
            y: y,
            width: width,
            height: height
          };
          keyboardButton = new KeyboardKey(parameters);
          keyboardButton.setClickType(doOnce);
          keyboardButton.letter = this.keyLetters[i][j];
          keyboardButton.setKeyLetterToDisplay(keyboardButton.letter);
          keyboardButton.setFontSize(this.object.width / 30);
          keyboardButton.setInteractivity(true);
          keyboardButton.setStroke(true);
          this.rowsOfKeys.push(keyboardButton);
        }
      }
      let controlButtons = ["SPACE", "BACKSPACE"];

      for (let i = 0; i < controlButtons.length; i++) {
        if (parameterObject.previousUI) {
          if (parameterObject.previousUI.keyBoard) {
            if (parameterObject.previousUI.keyBoard.rowsOfKeys) {
              if (parameterObject.previousUI.keyBoard.rowsOfKeys[count]) {
                x = parameterObject.previousUI.keyBoard.rowsOfKeys[count].x;
                y = parameterObject.previousUI.keyBoard.rowsOfKeys[count].y;
                width =
                  parameterObject.previousUI.keyBoard.rowsOfKeys[count].width;
                height =
                  parameterObject.previousUI.keyBoard.rowsOfKeys[count].height;
              }
            }
          }
        }
        parameters = {
          p: this.p,
          objectToMirror: this.keys[count++],
          x: x,
          y: y,
          width: width,
          height: height
        };
        keyboardButton = new KeyboardKey(parameters);
        keyboardButton = new KeyboardKey(parameters);
        keyboardButton.setClickType(doOnce);
        keyboardButton.letter = controlButtons[i];
        keyboardButton.setKeyLetterToDisplay(keyboardButton.letter);
        keyboardButton.setFontSize(this.object.width / 30);
        keyboardButton.setInteractivity(true);
        keyboardButton.setStroke(true);
        this.rowsOfKeys.push(keyboardButton);
      }
    }
  }
  setReferenceToInputBox(ref) {
    this.referenceToInputTextBox = ref;
  }
  searchClickedKey() {
    let newChar = undefined;
    for (let i = 0; i < this.rowsOfKeys.length; i++) {
      if (this.rowsOfKeys[i].testForClick()) {
        newChar = this.rowsOfKeys[i].pressKey();
      }
    }
    if (this.referenceToInputTextBox) {
      if (newChar) {
        let keyCode;
        if (newChar.length === 1) {
          newChar = newChar.toUpperCase();
          keyCode = newChar.charCodeAt(0);
        } else {
          if (newChar === "SUBMIT") {
            keyCode = 13;
          } else if (newChar === "SPACE") {
            keyCode = 32;
          } else if (newChar === "BACKSPACE") {
            keyCode = 8;
          }
        }
        this.referenceToInputTextBox.handleTyping(keyCode);
      }
    }
  }
  draw() {
    super.draw();
    for (let i = 0; i < this.rowsOfKeys.length; i++) {
      this.rowsOfKeys[i].draw();
    }
  }
}
