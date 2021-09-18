import TextBox from "./TextBox";

export default class KeyboardKey extends TextBox {
  constructor(parameterObject) {
    super(parameterObject);
    this.letter = undefined;
  }
  setKeyLetterToDisplay(letter) {
    this.letter = letter;
    this.setString(letter);
    this.setFontSize(this.object.width / 30);
  }
  pressKey() {
    this.color = this.p.color(244, 129, 130);
    setTimeout(() => {
      this.color = "white";
    }, 500);
    return this.letter;
  }
}
