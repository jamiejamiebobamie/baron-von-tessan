import TextBox from "../uiClasses/TextBox";
import Container from "../uiClasses/Container";

export default class TextInput extends TextBox {
  constructor(parameterObject) {
    super(parameterObject);
    this.text = "I drew a ...";
    this.isMobile = false;
    if (parameterObject.wildcard) {
      if (parameterObject.wildcard.REACT_APP) {
        this.handleSubmitDescription =
          parameterObject.wildcard.REACT_APP.handleSubmitDescription;
        this.testViewSwitch = parameterObject.wildcard.REACT_APP.testViewSwitch;
        this.isMobile = parameterObject.wildcard.REACT_APP.state.isMobile;
      }
      if (parameterObject.wildcard.text) {
        this.text = parameterObject.wildcard.text;
      }
    }
    // this.displayText = new TextBox({p:this.p,w:this.windowWidth,h:this.windowHeight,row:true,parent:this,wildcard:{text:this.text}})
    this.setTimeoutVariable = undefined;
    // dummy object
    this.referenceToMobileKeyboard = new Container({
      p: this.p,
      w: this.windowWidth,
      h: this.windowHeight,
      width: 0,
      height: 0
    });
    this.mouseClickfunc = this.clearFillerText;
    // perform mouseClickFunc once per click.
    this.doOnce = true;
    this.toggleShowCursor(this);
  }
  clearFillerText() {
    if (this.text === "I drew a..." || this.text === "I drew a...|") {
      this.text = "";
    }
  }
  setReferenceToAPP(APP) {
    this.referenceToAPP = APP;
  }
  setMobileKeyboardReference(ref) {
    this.referenceToMobileKeyboard = ref;
  }
  toggleShowCursor(scope) {
    scope.showCursor = !scope.showCursor;
    if (scope.showCursor) {
      scope.text += "|";
    } else {
      scope.text = scope.text.replace("|", "");
    }
    scope.setTimeoutVariable = setTimeout(function() {
      scope.toggleShowCursor(scope);
    }, 800);
  }
  handleTyping(keyCode) {
    const BACKSPACE = keyCode === 8;
    const ENTER = keyCode === 13;
    const SPACE = keyCode === 32;
    this.clearFillerText();

    if (this.isMobile) {
      this.color = this.p.color(244, 129, 130);
      setTimeout(() => {
        this.color = "white";
      }, 500);
    }
    if (ENTER) {
      let drawingDescriptor = this.text.replace("|", "");
      this.handleSubmitDescription(drawingDescriptor);
      this.testViewSwitch();
    } else if (BACKSPACE) {
      this.text = this.text.replace("|", "");
      this.text = this.text.substring(0, this.text.length - 1);
    } else if (SPACE) {
      this.text = this.text.replace("|", "") + " ";
    } else if (keyCode >= 65 && keyCode <= 90) {
      if (this.text.length < 100) {
        let newChar = String.fromCharCode(keyCode);
        this.text = this.text.replace("|", "") + newChar.toLowerCase();
      }
    }
  }
}
