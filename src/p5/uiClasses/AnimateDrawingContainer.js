import DisplayDrawingContainer from './DisplayDrawingContainer'
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

export default class AnimateDrawingContainer extends DisplayDrawingContainer{
    constructor(parameterObject){
        super(parameterObject)
        this.keyFrameIndex = 0
        this.keyFrameVertices = []
        // by entering animation mode
            // you start with two keyframes
            // keyframe1: the submitted drawing's vertices
            // keyframe2: the submitted drawing's vertices to edit.
        // only one KeyFrame instance is held at a time.
        // this.KeyFrame =
        //         new KeyFrame(
        //             this.keyFrames[this.keyFrameIndex],
        //             this.keyFrames[this.keyFrameIndex]
        //         )


        // when a user erases a vertex from the current keyframe
            // the popped vertex is added to the ink count
        // the vertex can then be redrawn to the screen.
        this.ink = 0

        // false for erase mode.
        this.penMode = true;

        // false for showKeyFrameMode
        this.showAnimationMode = false;

        //test
        this.AnimationSection = {startVertices:[],endVertices:[]}
    }
    checkForDuplicateVertices(vertexObjectToTest){
        // returns true if the tested vertex is a duplicate
        let vertexToTestString = vertexObjectToTest.x.toString()
                                + vertexObjectToTest.y.toString()
        let isDuplicate = false;

        let vertexX = undefined;
        let vertexY = undefined;
        let vertexString = undefined

        for (let i = 0; i<this.vertices.length; i++) {
            vertexX = this.vertices[i].x.toString()
            vertexY = this.vertices[i].y.toString()
            vertexString = vertexX + vertexY
            if (vertexToTestString === vertexString){
                isDuplicate = true;
            }
        }
        return isDuplicate;
    }
    eraseFromVerticesAndAddToInk(){
        for (let i = 0; i < this.submittedStrokes.length; i++ ){
            if ( this.p.mouseX > this.submittedStrokes[i].x*this.lengthOfDrawingSquare-this.lengthOfDrawingSquare*.1
                && this.p.mouseX < this.submittedStrokes[i].x*this.lengthOfDrawingSquare+this.lengthOfDrawingSquare*.1
                && this.p.mouseY > this.submittedStrokes[i].y*this.lengthOfDrawingSquare-this.lengthOfDrawingSquare*.1
                && this.p.mouseY < this.submittedStrokes[i].y*this.lengthOfDrawingSquare+this.lengthOfDrawingSquare*.1 ){
                    let vertex = {x:this.p.mouseX/this.lengthOfDrawingSquare, y:this.p.mouseY/this.lengthOfDrawingSquare, finished:false}
                    this.AnimationSection.startVertices.push(vertex)
                    this.submittedStrokes.splice(i,1);
                    this.ink++;
                    console.log('asassas')
            }
        }
    }
    addVertices(){
        // if(this.ink>0){
        //     let vertex = {x:this.p.mouseX/this.lengthOfDrawingSquare, y:this.p.mouseY/this.lengthOfDrawingSquare, finished:false}
        //     if (!this.checkForDuplicateVertices(vertex)){
        //         this.keyFrames[this.keyFrameIndex].push(vertex);
        //     }
        // }
    }
    drawSubmittedStrokes(){}
    showKeyFrame(){
        this.p.fill(0);
        for (let i = 0; i < this.vertices; i++){
            this.p.ellipse(this.vertices[i].x*this.lengthOfDrawingSquare+this.x, this.vertices[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
        this.p.fill(244,129,130);
        for (let i = 0; i < this.ink; i++){
            this.p.ellipse(this.ink[i].x*this.lengthOfDrawingSquare+this.x, this.ink[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
    }
    showAnimation(){
        this.p.fill(0);
        this.vertices.lerp()
        for (let i = 0; i < this.vertices; i++){
            this.p.ellipse(this.vertices[i].x*this.lengthOfDrawingSquare+this.x, this.vertices[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
        if (this.vertices.allKeyFramesAtEndPosition()){
            this.vertices.resetFinishedBooleans();
            this.incrementKeyFrames();
        }
    }
    addKeyFrame(){
        // reset ink count to 0
        // push current keyFrames to new keyFrame object's startPositions.
        // increment the keyFrameIndex
        // set the this.vertices to this.keyFrames[this.keyFrameIndex]
    }
    incrementKeyFrames(){
        let lastKeyFrameVertices = this.vertices;
        this.keyFrameIndex++
        if (this.keyFrameIndex > this.keyFrames.length - 1){
            this.keyFrameIndex = 0
        }
        let currentKeyFrameVertices = this.keyFrames[this.keyFrameIndex]
        // might pop for a millisecond as a result of being initialized.
        // this.KeyFrame = new KeyFrame(lastKeyFrameVertices,currentKeyFrameVertices)

        // might need to do this.
        // let nextKeyFrame = new KeyFrame(lastKeyFrameVertices,currentKeyFrameVertices)
        // this.KeyFrame = nextKeyFrame;
    }
    draw() {
        super.draw();
        this.p.fill(0)
        for (let i = 0; i < this.submittedStrokes.length; i++){
            this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare+this.x, this.submittedStrokes[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
        this.p.fill("pink")
        for (let i = 0; i < this.AnimationSection.startVertices.length; i++){
            this.p.ellipse(this.AnimationSection.startVertices[i].x*this.lengthOfDrawingSquare+this.x, this.AnimationSection.startVertices[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
        // super.drawSubmittedStrokes();
        // if (this.showAnimationMode){
        //     this.showAnimation();
        // } else {
        //     this.showKeyFrame();
        // }
    }
}
