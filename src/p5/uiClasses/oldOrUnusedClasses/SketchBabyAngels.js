import ImageContainer from "./ImageContainer";

export default class SketchBabyAngels extends ImageContainer {
  constructor(paramsObject) {
    super(paramsObject);
    this.loadedImg = undefined;
    this.imageWidth = undefined;
    this.imageHeight = undefined;
    this.imageX = this.parent
      ? this.parent.x + this.parent.width / 2
      : this.windowWidth / 2;
    this.imageY = this.parent
      ? this.parent.y + this.parent.height / 2
      : this.windowHeight / 2;

    this.offsetX = 0;
    this.offsetY = 0;
    this.headedUpward = Math.random() < 0.5;
  }
  // images can exceed the bounds of their container
  setImageProps(loadedImg, imageWidth, imageHeight) {
    this.loadedImg = loadedImg;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
  }
  setImageOffsets(offsetX, offsetY) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
  // needs to be called every frame.
  redrawImage() {
    this.p.image(
      this.loadedImg,
      this.imageX + this.offsetX,
      this.imageY + this.offsetY,
      this.imageWidth,
      this.imageHeight
    );
  }
  draw() {
    if (this.loadedImg) {
      this.redrawImage();
    }
  }
}
