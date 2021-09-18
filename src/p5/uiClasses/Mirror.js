import Container from "./Container";

export default class Mirror extends Container {
  constructor(parameterObject) {
    super(parameterObject);

    if (parameterObject) {
      this.object =
        parameterObject.objectToMirror !== undefined
          ? parameterObject.objectToMirror
          : undefined;
      this.x =
        parameterObject.x === undefined
          ? parameterObject.objectToMirror.x
          : parameterObject.x;
      this.y =
        parameterObject.y === undefined
          ? parameterObject.objectToMirror.y
          : parameterObject.y;
      this.width =
        parameterObject.width === undefined
          ? parameterObject.objectToMirror.width
          : this.width;
      this.height =
        parameterObject.height === undefined
          ? parameterObject.objectToMirror.height
          : this.height;
      this.delta = parameterObject.delta ? parameterObject.delta : 1;
      this.lerpSpeed = parameterObject.lerpSpeed
        ? parameterObject.lerpSpeed
        : 0.3;
    }
  }
  lerpX() {
    if (Math.abs(this.x - this.object.x) > this.delta) {
      this.x = this.p.lerp(this.x, this.object.x, this.lerpSpeed);
    }
  }
  lerpY() {
    if (Math.abs(this.y - this.object.y) > this.delta) {
      this.y = this.p.lerp(this.y, this.object.y, this.lerpSpeed);
    }
  }
  lerpWidth() {
    if (Math.abs(this.width - this.object.width) > this.delta) {
      this.width = this.p.lerp(this.width, this.object.width, this.lerpSpeed);
    }
  }
  lerpHeight() {
    if (Math.abs(this.height - this.object.height) > this.delta) {
      this.height = this.p.lerp(
        this.height,
        this.object.height,
        this.lerpSpeed
      );
    }
  }
  setObjectToMirror(object) {
    this.object = object;
  }
  draw() {
    super.draw();
    this.lerpX();
    this.lerpY();
    this.lerpWidth();
    this.lerpHeight();
  }
}
