import UIElement from "./UIElement";

export default class Container extends UIElement {
  constructor(parameterObject) {
    super(parameterObject);
    this.hasStroke = false;
    this.hasFill = false;
    this.clicked = false;
    this.clickPerformed = false;
    this.doOnce = false;
    // some UI_elements respond to a single click, others to a mouse press
    // (a single click held down over a period of time.)
    this.isInteractive = false;
    this.scaleAmount = 0.3;
    this.mouseOverWidthSize = this.width + this.width * this.scaleAmount;
    this.mouseOverHeightSize = this.height + this.height * this.scaleAmount;
    this.screenHasSettled = false;
    setTimeout(() => {
      this.screenHasSettled = true;
      this.mouseOverWidthSize = this.width + this.width * this.scaleAmount;
      this.mouseOverHeightSize = this.height + this.height * this.scaleAmount;
    }, 500);
    this.mouseOverColor = undefined;
    this.clickedColor = undefined;
    this.storeColor = this.color;
  }
  testForClick() {
    if (this.p._renderer._rectMode === "center") {
      if (
        this.p.mouseX > this.x - this.width / 2 &&
        this.p.mouseX < this.x + this.width / 2 &&
        this.p.mouseY > this.y - this.height / 2 &&
        this.p.mouseY < this.y + this.height / 2
      ) {
        return true;
      }
    } else if (this.p._renderer._rectMode === "corner") {
      if (
        this.p.mouseX > this.x &&
        this.p.mouseX < this.x + this.width &&
        this.p.mouseY > this.y &&
        this.p.mouseY < this.y + this.height
      ) {
        return true;
      }
    }
  }
  performClickFunctionality() {
    if (this.mouseClickfunc) {
      if (this.doOnce && !this.clickPerformed) {
        this.clickPerformed = true;
        return this.mouseClickfunc();
      } else if (!this.doOnce) {
        return this.mouseClickfunc();
      }
    }
  }
  setStroke(bool) {
    this.hasStroke = bool;
  }
  setFill(bool) {
    this.hasFill = bool;
  }
  setColor(color) {
    this.color = color;
    this.storeColor = color;
  }
  setClick(bool) {
    this.clicked = bool;
    if (!this.clicked) {
      this.clickPerformed = false;
    }
  }
  setClickType(bool) {
    this.doOnce = bool;
  }
  setInteractivity(bool) {
    this.isInteractive = bool;
  }
  enlargeButton() {
    if (this.isInteractive && this.screenHasSettled) {
      if (this.width < this.mouseOverWidthSize) {
        this.width = this.p.lerp(
          this.width,
          this.mouseOverWidthSize + this.scaleAmount,
          0.05
        );
        if (this.height < this.mouseOverHeightSize)
          this.height = this.p.lerp(
            this.height,
            this.mouseOverHeightSize + this.scaleAmount,
            0.05
          );
      }
    }
  }
  shrinkButton(shrinkSpeed) {
    if (this.isInteractive && this.screenHasSettled) {
      if (this.width > this.mouseOverWidthSize) {
        this.width = this.p.lerp(
          this.width,
          this.mouseOverWidthSize,
          shrinkSpeed
        );
        if (this.height > this.mouseOverHeightSize)
          this.height = this.p.lerp(
            this.height,
            this.mouseOverHeightSize,
            shrinkSpeed
          );
      }
    }
  }
  draw() {
    this.hasStroke ? this.p.stroke(45) : this.p.noStroke();
    this.hasFill ? this.p.fill(45) : this.p.noFill();
    this.color ? this.p.fill(this.color) : this.p.noFill();
    if (this.testForClick()) {
      if (this.clicked) {
        this.performClickFunctionality();
        this.shrinkButton(0.5);
        if (this.clickedColor) {
          this.color = this.clickedColor;
        }
      } else {
        this.enlargeButton();
        if (this.mouseOverColor) {
          this.color = this.mouseOverColor;
        } else {
          this.color = this.storeColor;
        }
      }
    } else {
      this.color = this.storeColor;
    }
    if (this.screenHasSettled) {
      this.shrinkButton(0.1);
    }
    this.p.rect(this.x, this.y, this.width, this.height);
    for (let i = 0; i < this._ui.length; i++) {
      if (this._ui[i].draw) {
        this._ui[i].draw();
      }
    }
  }
}
