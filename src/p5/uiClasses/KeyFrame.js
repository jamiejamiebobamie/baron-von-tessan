export default class KeyFrame{
    constructor(startVertices,endVertices){
        super(startVertices,endVertices)
        this.startPositions = startVertices;
        this.endPositions = endVertices;
        this.vertices = startVertices;

        // 1 for max speed
        this.lerpSpeed = .4;

        this.vertexIsCloseEnoughDistance = .0001; //???
                                                  // I think is relative to the
                                                  // DrawingContainer size...

        this.finishedVerticesCount = 0;
    }
    // call lerp inside the draw method of AnimateDrawingContainer
    lerp(){
        for ( let i = 0; i < this.vertices.length; i++ ){
            // each vertex object contains a 'finished' boolean
            if (!this.vertices[i].finished){
                // if the vertex has reached its destination
                    // set its 'finished' boolean to true
                    // and increment the finishedVerticesCount
                if (Math.abs(this.endPositions[i].x - this.positions[i].x) <= this.vertexIsCloseEnoughDistance){
                    this.vertices[i].finished = true;
                    this.finishedVerticesCount++;
                }
            }
            this.vertices[i].x = this.p.lerp(this.startPositions[i].x,this.endPositions[i].x, this.lerpSpeed)
            this.vertices[i].y = this.p.lerp(this.startPositions[i].y,this.endPositions[i].y, this.lerpSpeed)
        }
    }
    allKeyFramesAtEndPosition(){
        if ( this.finishedVerticesCount === this.endPositions.length ){
            return true;
        }
    }
    resetFinishedBooleans(){
        for ( let i = 0; i < this.positions.length; i++ ){
            this.vertices[i].finished = false;
        }
    }
}

// drawSubmittedStrokes(){
//     let driftX = 0
//     let driftY = 0
//     for (let i = 0; i < this.submittedStrokeIndex; i++){
//         this.submittedStrokeIndex[i].lerp()
//         if (this.toLocation.length){
//             driftX = this.p.lerp(this.fromLocation[i].x,this.toLocation[i].x,.2)
//             driftY = this.p.lerp(this.fromLocation[i].y,this.toLocation[i].y,.2)
//         }
//         this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare+driftX+this.x, this.submittedStrokes[i].y*this.lengthOfDrawingSquare+driftY+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
//     }
// }
