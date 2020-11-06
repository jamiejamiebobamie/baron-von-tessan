import DrawingContainer from './DrawingContainer'
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

export default class AnimateDrawingContainer extends DrawingContainer{
    constructor(parameterObject){
        super(parameterObject)

        // false for erase mode.
        this.penMode = false;

        // false for showAnimationMode
        this.buildAnimationModeIsToggled = true;

        this.animationGroups = [
            {   drawnVertices:[],
                startPositions:[],
                endPositions:[],
                // store the first vertex of the startPositions to keep track
                    // of which was originally the startPositions array
                    // as we swap start and end position array during showAnimation()
                startSignature:undefined,
                startColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                endColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                finishedVerticesCount:0, // keep a count of the vertices
                                    // that have interpolated to the finish.
            }
        ]
        this.currentAnimationGroupIndex = 0;

        this.finishedVerticesCount = 0;
        this.totalVerticesCount = 0;
    }
    setSubmittedStrokes(submittedStrokes){ this.submittedStrokes = submittedStrokes }
    setDrawnVerticesStartingPostions(){
        let vertice;
        this.totalVerticesCount = 0;
        for (let i = 0; i < this.animationGroups.length; i++){
            // the start position vertex count matches up with the end vertex position count
                // (never going to run.)
            if (this.animationGroups[i].startPositions.length === this.animationGroups[i].endPositions.length){
                // iterate through all of the startPositions
                    // find the overall minimum distance from one startVertex to one endVertex
                        // swap these values in their respective arrays with the j index
                for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
                    let minDist = Number.MAX_VALUE
                    let testMin;
                    let storeIndices = {start:0,end:0}
                    // in the future, the endPositions.length
                        // may be larger or smaller than the startPositions.length
                        // will add vertices to starting position
                    for (let k = j; k < this.animationGroups[i].endPositions.length; k++){
                        testMin = Math.sqrt(
                        (this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)*(this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)
                              + (this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)*(this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)
                        )
                        minDist = Math.min(testMin,minDist)
                        if (testMin === minDist){
                            storeIndices.start = j;
                            storeIndices.end = k;
                        }
                    }
                    // swap the found min pairs with the front of each array
                    let storeStartValueToSwap = this.animationGroups[i].startPositions[j]
                    this.animationGroups[i].startPositions[j] = this.animationGroups[i].startPositions[storeIndices.start]
                    this.animationGroups[i].startPositions[storeIndices.start] = storeStartValueToSwap
                    let storeEndValueToSwap = this.animationGroups[i].endPositions[j]
                    this.animationGroups[i].endPositions[j] = this.animationGroups[i].endPositions[storeIndices.end]
                    this.animationGroups[i].endPositions[storeIndices.end] = storeEndValueToSwap
                }
                // set the drawnVertices positions to startPositions
                this.animationGroups[i].drawnVertices = [];
                for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
                    vertice = {x:this.animationGroups[i].startPositions[j].x,y:this.animationGroups[i].startPositions[j].y,finished:false}
                    this.animationGroups[i].drawnVertices.push(vertice)
                    this.totalVerticesCount++;
                }
            // the start position vertex count is less than
                // the end vertex position count. (most likely to happen.)
            } else if (this.animationGroups[i].startPositions.length < this.animationGroups[i].endPositions.length) {
                // iterate through all of the startPositions
                    // find the overall minimum distance from one startVertex to one endVertex
                        // swap these values in their respective arrays with the j index
                for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
                    let minDist = Number.MAX_VALUE
                    let testMin;
                    let storeIndices = {start:0,end:0}
                    // in the future, the endPositions.length
                        // may be larger or smaller than the startPositions.length
                        // will add vertices to starting position
                    for (let k = 0; k < this.animationGroups[i].endPositions.length; k++){
                        testMin = Math.sqrt(
                        (this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)*(this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)
                              + (this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)*(this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)
                        )
                        minDist = Math.min(testMin,minDist)
                        if (testMin === minDist){
                            storeIndices.start = j;
                            storeIndices.end = k;
                        }
                    }
                    // swap the found min pairs with the front of each array
                    let storeStartValueToSwap = this.animationGroups[i].startPositions[j]
                    this.animationGroups[i].startPositions[j] = this.animationGroups[i].startPositions[storeIndices.start]
                    this.animationGroups[i].startPositions[storeIndices.start] = storeStartValueToSwap
                    // let storeEndValueToSwap = this.animationGroups[i].endPositions[j]
                    // this.animationGroups[i].endPositions[j] = this.animationGroups[i].endPositions[storeIndices.end]
                    // this.animationGroups[i].endPositions[storeIndices.end] = storeEndValueToSwap
                }
                // add extra start vertices to the this.animationGroups[i].startPositions array
                    // that are duplicates of existing start vertices
                    // to match the remaining number of end vertices.
                    // begin by iterating through all of the end vertices starting with the last matched
                    for (let k = this.animationGroups[i].startPositions.length; k < this.animationGroups[i].endPositions.length; k++){
                        let minDist = Number.MAX_VALUE
                        let testMin;
                        let storeStartVertex = this.animationGroups[i].startPositions[0]
                        for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
                            testMin = Math.sqrt(
                            (this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)*(this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)
                                  + (this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)*(this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)
                            )
                            minDist = Math.min(testMin,minDist)
                            if (testMin === minDist){
                                storeStartVertex = this.animationGroups[i].startPositions[j]
                            }
                        }
                        this.animationGroups[i].startPositions.push(storeStartVertex)
                    }
            // the start position vertex count is greater than
                // the end vertex position count. (possible.)
            } else {
                // in progress...
            }
            // check that the startPositions for the animationGroup was originally
                // the startPositions array when first submitted and not the endPositions array.
                // during showAnimation() method the startPositions and endPositions swap
                // and might need to be reset.
            if (this.animationGroups[i].startSignature !== this.animationGroups[i].startPositions[0]){
                console.log('resetting')
                // swap starting and ending vertices.
                let storeStartingPositions = this.animationGroups[i].startPositions
                this.animationGroups[i].startPositions = this.animationGroups[i].endPositions
                this.animationGroups[i].endPositions = storeStartingPositions
            }
            // set the drawnVertices positions to startPositions
            this.animationGroups[i].drawnVertices = [];
            for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
                vertice = {x:this.animationGroups[i].startPositions[j].x,y:this.animationGroups[i].startPositions[j].y,finished:false}
                this.animationGroups[i].drawnVertices.push(vertice)
            }
            this.totalVerticesCount+=this.animationGroups[i].startPositions.length
        }
    }
    incrementDrawingGroupIndex(){
        // SIDE EFFECT: store the first vertex of the startPositions to keep track of
            // what was originally the startPositions array.
        this.animationGroups[this.currentAnimationGroupIndex].startSignature = this.animationGroups[this.currentAnimationGroupIndex].startPositions[0]
        this.animationGroups.push(
            {   drawnVertices:[],
                startPositions:[],
                endPositions:[],
                startColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                endColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                finishedVerticesCount:0, // keep a count of the vertices
                                    // that have interpolated to the finish.
            }
        )
        this.currentAnimationGroupIndex++;
    }
    showAnimation(){
        // i do not know why, but i actually need three for loops here
            // and not just one.
        // it does not work otherwise. (work = all animations sync up and loop w/o popping)
        console.log(this.finishedVerticesCount,this.totalVerticesCount)
        if (this.finishedVerticesCount === this.totalVerticesCount){
            for (let i = 0; i < this.animationGroups.length; i++){
                this.finishedVerticesCount = 0;
                this.resetDrawnVerticesFinishedStatus(this.animationGroups[i])
                // swap starting and ending vertices.
                let storeStartingPositions = this.animationGroups[i].startPositions
                this.animationGroups[i].startPositions = this.animationGroups[i].endPositions
                this.animationGroups[i].endPositions = storeStartingPositions
            }
        } else {
            for (let i = 0; i < this.animationGroups.length; i++){
                this.lerpAnimationGroup(this.animationGroups[i])
            }
        }
        for (let i = 0; i < this.animationGroups.length; i++){
            this.drawVerticesToScreen(this.animationGroups[i].drawnVertices, "black")
        }
    }
    lerpAnimationGroup(group){
        for (let i = 0; i < group.drawnVertices.length; i++){
            group.drawnVertices[i].x = this.p.lerp( group.drawnVertices[i].x, group.endPositions[i].x, .1)
            group.drawnVertices[i].y = this.p.lerp( group.drawnVertices[i].y, group.endPositions[i].y, .1)
            if (!group.drawnVertices[i].finished){
                if (
                    Math.abs( group.drawnVertices[i].x - group.endPositions[i].x )
                     < this.lengthOfDrawingSquare * .00001
                     &&
                     Math.abs( group.drawnVertices[i].y - group.endPositions[i].y )
                     < this.lengthOfDrawingSquare * .00001
                   ) {
                    group.drawnVertices[i].finished = true
                    this.finishedVerticesCount++;
                }
            }
        }
    }
    resetDrawnVerticesFinishedStatus(group){
        for (let i = 0; i < group.drawnVertices.length; i++){
            group.drawnVertices[i].finished = false
        }
    }
    drawVerticesToScreen(verticesData, color){
        this.p.noStroke();
        this.p.fill(color)
        for (let i = 0; i < verticesData.length; i++){
            // testing
            // if (verticesData[i].finished){
            //     this.p.noFill()
            // } else {
            //     this.p.fill(color)
            // }
            this.p.ellipse(verticesData[i].x*this.lengthOfDrawingSquare+this.x, verticesData[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
    }
    buildAnimation(){
        this.drawAnimationGroups();
     }
    drawAnimationGroups(){
        for (let i = 0; i < this.animationGroups.length; i++){
            this.drawVerticesToScreen(this.animationGroups[i].startPositions, this.animationGroups[i].startColor?this.animationGroups[i].startColor:"pink")
            this.drawVerticesToScreen(this.animationGroups[i].endPositions, this.animationGroups[i].endColor?this.animationGroups[i].endColor:"pink")
        }
    }
    drawSubmittedStrokes(){ this.drawVerticesToScreen(this.submittedStrokes, 0) }
    draw() {
        super.draw();
        this.drawSubmittedStrokes();
        if (this.buildAnimationModeIsToggled){
            this.buildAnimation()
        } else {
            this.showAnimation();
        }
    }
}
