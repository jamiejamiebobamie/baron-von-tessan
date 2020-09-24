import Container from './Container'

export default class DisplayDrawingContainer extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.submittedStrokes = []
        this.submittedStrokeIndex = 0
        // loops the drawing animation
        this.loop = false;
        this.lengthOfDrawingSquare = 0
    }
    setLengthOfDrawingSquare(length){ this.lengthOfDrawingSquare = length }
    setSubmittedStrokes(submittedStrokes,submittedStrokeIndex){
        this.submittedStrokes = submittedStrokes
        this.submittedStrokeIndex = submittedStrokeIndex ? submittedStrokeIndex : submittedStrokes.length
    }
    shouldLoopFinishedDrawing(){ this.loop = true; }
    drawSubmittedStrokes(){
        if (this.loop){
            for (let i = 0; i < this.submittedStrokeIndex; i++){
                if (i === this.submittedStrokeIndex) { i = 0; }
                this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare+this.x, this.submittedStrokes[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        } else {
            for (let i = 0; i < this.submittedStrokeIndex; i++){
                this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare+this.x, this.submittedStrokes[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
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
