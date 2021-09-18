import DrawingContainer from "./DrawingContainer";
// import KeyFrame from './KeyFrame'

//0.
// user submits drawing
// animated drawing view is loaded
// on the view, is the AnimateDrawingContainer class.

//1.
// user erases section of the drawing.
// by erasing vertices, he is adding them to his ink.
//2.
// user is happy with portions erased and clicks 'animate' button on view.
//3.
// the erased sections appear in [lightcolor/pink] as a background element
// the unerased base drawing is [anotherlightcolor/lightgrey]
// the above sections are drawn first to the canvas
// and cannot be interacted with. they act as guides.
//4.
// user draws on top of drawing.
// stroke appears in 'currentStroke' dark red color
//5.
// user is happy with newly drawn portions and clicks 'add animation'
// button on view.
//6.
// an AnimationSection is created (a class).
// vertices removed from base drawing remain removed,
// now a part of the Animation Section.
// An Animation Section contains the same number of vertices
// from the start position (the originally erased vertex positions)
// as the end position (the newly drawn vertices)
// (difficult?)

// upon object creation, the start vertices are rearranged in the array to
// match the index of the vertex position that they will end at.

// array position / end vertex is found by iterating over the two arrays
// and comparing the overall distance:
// Math.sqrt(
// (end.x - start.x)*(end.x - start.x)
//       + (end.y - start.y)*(end.x - start.x)
// )
// and finding the overall shortest sum distance of all of the distances.

// if lerping verts back and forth in an anim looks good.
// add a keyframe array class property to AnimationSection
// that cycles through vert positions.

// allows for multiple animations on one drawing.
// does not repeat the drawing of vertices.
// might not look good or even work. ("redrawing" with "ink" feature.)

export default class AnimateDrawingContainer extends DrawingContainer {
  constructor(parameterObject) {
    super(parameterObject);
    // when a user erases a vertex from the current keyframe
    // the popped vertex is added to the ink count
    // the vertex can then be redrawn to the screen.
    this.ink = 0;

    // false for erase mode.
    this.penMode = false;

    // false for showAnimationMode
    this.buildAnimationModeIsToggled = true;

    this.animationGroups = [
      {
        drawnVertices: [],
        startPositions: [],
        endPositions: [],
        startColor: this.p.color(
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255
        ),
        endColor: this.p.color(
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255
        ),
        finishedVerticesCount: 0 // keep a count of the vertices
        // that have interpolated to the finish.
      }
    ];
    this.currentAnimationGroupIndex = 0;

    this.finishedVerticesCount = 0;
    this.totalVerticesCount = 0;
  }
  setSubmittedStrokes(submittedStrokes) {
    this.submittedStrokes = submittedStrokes;
  }
  setDrawnVerticesStartingPostions() {
    let vertice;
    this.totalVerticesCount = 0;
    for (let i = 0; i < this.animationGroups.length; i++) {
      // NOT WORKING ___

      // iterate through all of the startPositions
      // find the overall minimum distance from one startVertex to one endVertex
      // swap these values in their respective arrays with the j index
      // for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
      //     let minDist = Number.MAX_VALUE
      //     let testMin;
      //     let storeIndices = {start:0,end:0}
      //     // in the future, the endPositions.length
      //         // may be larger or smaller than the startPositions.length
      //         // will add vertices to starting position
      //     for (let k = j; k < this.animationGroups[i].endPositions.length; k++){
      //         testMin = Math.sqrt(
      //         (this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)*(this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)
      //               + (this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)*(this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)
      //         )
      //         minDist = Math.min(testMin,minDist)
      //         if (testMin === minDist){
      //             console.log("hi")
      //             storeIndices.start = j;
      //             storeIndices.end = k;
      //         }
      //     }
      //     // swap the found min pairs with the front of each array
      //     let storeStartValueToSwap = this.animationGroups[i].startPositions[j]
      //     this.animationGroups[i].startPositions[j] = this.animationGroups[i].startPositions[storeIndices.start]
      //     this.animationGroups[i].startPositions[storeIndices.start] = storeStartValueToSwap
      //     let storeEndValueToSwap = this.animationGroups[i].endPositions[j]
      //     this.animationGroups[i].endPositions[j] = this.animationGroups[i].endPositions[storeIndices.end]
      //     this.animationGroups[i].endPositions[storeIndices.end] = storeEndValueToSwap
      // }
      // console.log(this.animationGroups[0].startPositions[0],this.animationGroups[0].endPositions[0])

      // set the drawnVertices positions to startPositions
      this.animationGroups[i].drawnVertices = [];
      for (let j = 0; j < this.animationGroups[i].startPositions.length; j++) {
        vertice = {
          x: this.animationGroups[i].startPositions[j].x,
          y: this.animationGroups[i].startPositions[j].y,
          finished: false
        };
        this.animationGroups[i].drawnVertices.push(vertice);
        this.totalVerticesCount++;
      }
    }
  }
  incrementDrawingGroupIndex() {
    this.animationGroups.push({
      drawnVertices: [],
      startPositions: [],
      endPositions: [],
      startColor: this.p.color(
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255
      ),
      endColor: this.p.color(
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255
      ),
      finishedVerticesCount: 0 // keep a count of the vertices
      // that have interpolated to the finish.
    });
    this.currentAnimationGroupIndex++;
  }
  showAnimation() {
    // i do not know why, but i actually need three for loops here
    // and not just one.
    // it does not work otherwise. (work = all animations sync up and loop w/o popping)
    if (this.finishedVerticesCount === this.totalVerticesCount) {
      for (let i = 0; i < this.animationGroups.length; i++) {
        this.finishedVerticesCount = 0;
        this.resetDrawnVerticesFinishedStatus(this.animationGroups[i]);
        // swap starting and ending vertices.
        let storeStartingPositions = this.animationGroups[i].startPositions;
        this.animationGroups[i].startPositions = this.animationGroups[
          i
        ].endPositions;
        this.animationGroups[i].endPositions = storeStartingPositions;
      }
    } else {
      for (let i = 0; i < this.animationGroups.length; i++) {
        this.lerpAnimationGroup(this.animationGroups[i]);
      }
    }
    for (let i = 0; i < this.animationGroups.length; i++) {
      this.drawVerticesToScreen(this.animationGroups[i].drawnVertices, 0);
    }
  }
  lerpAnimationGroup(group) {
    for (let i = 0; i < group.drawnVertices.length; i++) {
      group.drawnVertices[i].x = this.p.lerp(
        group.drawnVertices[i].x,
        group.endPositions[i].x,
        0.1
      );
      group.drawnVertices[i].y = this.p.lerp(
        group.drawnVertices[i].y,
        group.endPositions[i].y,
        0.1
      );
      if (!group.drawnVertices[i].finished) {
        if (
          Math.abs(group.drawnVertices[i].x - group.endPositions[i].x) <
            this.lengthOfDrawingSquare * 0.00001 &&
          Math.abs(group.drawnVertices[i].y - group.endPositions[i].y) <
            this.lengthOfDrawingSquare * 0.00001
        ) {
          group.drawnVertices[i].finished = true;
          // group.finishedVerticesCount++;
          this.finishedVerticesCount++;
        }
      }
    }
  }
  resetDrawnVerticesFinishedStatus(group) {
    for (let i = 0; i < group.drawnVertices.length; i++) {
      group.drawnVertices[i].finished = false;
    }
  }
  drawVerticesToScreen(verticesData, color) {
    this.p.noStroke();
    this.p.fill(color);
    for (let i = 0; i < verticesData.length; i++) {
      this.p.ellipse(
        verticesData[i].x * this.lengthOfDrawingSquare + this.x,
        verticesData[i].y * this.lengthOfDrawingSquare + this.y,
        this.lengthOfDrawingSquare * 0.025,
        this.lengthOfDrawingSquare * 0.025
      );
    }
  }
  buildAnimation() {
    this.drawAnimationGroups();
  }
  drawAnimationGroups() {
    for (let i = 0; i < this.animationGroups.length; i++) {
      this.drawVerticesToScreen(
        this.animationGroups[i].startPositions,
        this.animationGroups[i].startColor
          ? this.animationGroups[i].startColor
          : "pink"
      );
      this.drawVerticesToScreen(
        this.animationGroups[i].endPositions,
        this.animationGroups[i].endColor
          ? this.animationGroups[i].endColor
          : "pink"
      );
    }
  }
  drawSubmittedStrokes() {
    this.drawVerticesToScreen(this.submittedStrokes, 0);
  }
  draw() {
    super.draw();
    this.drawSubmittedStrokes();
    if (this.buildAnimationModeIsToggled) {
      this.buildAnimation();
    } else {
      this.showAnimation();
    }
  }
}
