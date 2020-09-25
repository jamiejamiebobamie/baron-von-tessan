import Container from './Container'
export default class DisplayDrawingContainer extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.submittedStrokes = []
        this.submittedStrokeIndex = 0
        // loops the drawing animation
        this.loop = false;
        this.drawingHasBeenDrawn = false;
        this.lengthOfDrawingSquare = 0
    }
    setLengthOfDrawingSquare(length){ this.lengthOfDrawingSquare = length }
    setSubmittedStrokeIndex(index){ this.submittedStrokeIndex = index }
    setSubmittedStrokes(submittedStrokes,submittedStrokeIndex){
        this.submittedStrokes = submittedStrokes
        this.submittedStrokeIndex = submittedStrokeIndex ? submittedStrokeIndex : submittedStrokes.length
    }
    setLoopToTrueToLoopFinishedDrawing(){ this.loop = true; }
    drawSubmittedStrokes(){
        if (this.drawingHasBeenDrawn){
            for (let i = 0; i < this.submittedStrokes.length; i++){
                this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare, this.submittedStrokes[i].y*this.lengthOfDrawingSquare, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        } else {
            for (let i = 0; i < this.submittedStrokeIndex; i++){
                this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare, this.submittedStrokes[i].y*this.lengthOfDrawingSquare, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        }
    }
    draw() {
        super.draw();
        this.p.noStroke();
        this.p.fill(0);
        this.drawSubmittedStrokes();
    }
}
