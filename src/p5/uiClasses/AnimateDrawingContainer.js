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
        // when a user erases a vertex from the current keyframe
            // the popped vertex is added to the ink count
        // the vertex can then be redrawn to the screen.
        this.ink = 0;

        // false for erase mode.
        this.penMode = false;

        // false for showAnimationMode
        this.buildAnimationModeIsToggled = true;

        this.animationGroups = [
            {   currentVertices:[],
                startVertices:[],
                endVertices:[],
                startColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                endColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                finishedVerticesCount:0, // keep a count of the vertices
                                    // that have interpolated to the finish.
            }
        ]
    }
    setStartingPostions(){
        for (let i = 0; i < this.animationGroups.length; i++){
            this.animationGroups[i].currentVertices = this.animationGroups[i].startVertices
        }
        console.log(this.animationGroups[0].currentVertices[0],this.animationGroups[0].startVertices[0],this.animationGroups[0].endVertices[0])
    }
    buildAnimation(){ this.drawAnimationGroups(); }
    showAnimation(){
        for (let i = 0; i < this.animationGroups.length; i++){
            this.drawEllipsesToScreen(this.animationGroups[i].currentVertices, 100)
            // "when the animation has finished" logic.
                // right now: loop.
                // in the future cycle to next keyFrame.
            if (this.animationGroups[i].finishedVerticesCount === this.animationGroups[i].currentVertices.length){
                this.animationGroups[i].finishedVerticesCount = 0
                let animationGroupIndex = i;
                this.swapStartAndEndingVertices(animationGroupIndex)
                this.resetCurrentVerticesFinishedStatus(this.animationGroups[i])
            } else {
                this.lerpAnimationGroup(this.animationGroups[i])
            }
        }
    }
    lerpAnimationGroup(group){
        for (let i = 0; i < group.currentVertices.length; i++){
            group.currentVertices[i].x=this.p.lerp(group.currentVertices[i].x,group.endVertices[i].x,.1)
            group.currentVertices[i].y=this.p.lerp(group.currentVertices[i].y,group.endVertices[i].y,.1)
            if (!group.currentVertices[i].finished){
                if (Math.abs(group.currentVertices[i].x-group.endVertices[i].x)<this.lengthOfDrawingSquare*.000001 && Math.abs(group.currentVertices[i].y-group.endVertices[i].y)<this.lengthOfDrawingSquare*.000001){
                    group.currentVertices[i].finished = true
                    group.finishedVerticesCount++;
                    console.log('djdjdj')
                }
            }
        }
    }
    swapStartAndEndingVertices(animationGroupIndex){
        let newEnd = []
        let newStart = []
        for (let i = 0; i < this.animationGroups[animationGroupIndex].startVertices.length; i++){
            newEnd.push(this.animationGroups[animationGroupIndex].startVertices[i])
            newStart.push(this.animationGroups[animationGroupIndex].endVertices[i])
        }
        this.animationGroups[animationGroupIndex].startVertices = newEnd;
        this.animationGroups[animationGroupIndex].endVertices = newStart;
    }
    resetCurrentVerticesFinishedStatus(group){
        for (let i = 0; i < group.currentVertices.length; i++){
            group.currentVertices[i].finished = false
        }
    }
    setSubmittedStrokes(submittedStrokes){ this.submittedStrokes = submittedStrokes }
    drawEllipsesToScreen(ellipsesData, color){
        this.p.fill(color)
        for (let i = 0; i < ellipsesData.length; i++){
            this.p.ellipse(ellipsesData[i].x*this.lengthOfDrawingSquare+this.x, ellipsesData[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
    }
    drawSubmittedStrokes(){ this.drawEllipsesToScreen(this.submittedStrokes, 0) }
    drawAnimationGroups(){
        for (let i = 0; i < this.animationGroups.length; i++){
            this.drawEllipsesToScreen(this.animationGroups[i].startVertices, this.animationGroups[i].startColor?this.animationGroups[i].startColor:"pink")
            this.drawEllipsesToScreen(this.animationGroups[i].endVertices, this.animationGroups[i].endColor?this.animationGroups[i].endColor:"pink")
        }
    }
    draw() {
        console.log(this.animationGroups[0].currentVertices[0],this.animationGroups[0].startVertices[0],this.animationGroups[0].endVertices[0])
        super.draw();
        this.drawSubmittedStrokes();
        if (this.buildAnimationModeIsToggled){
            this.buildAnimation()
        } else {
            this.showAnimation();
        }
    }
}
